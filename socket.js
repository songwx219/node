const ws=require('ws');
let server=new ws.Server({port:9001});

let userArr=[];

server.on('connection',function(socket){
    socket.send(JSON.stringify({type:'login',loginStatus:1}));
    socket.on('message',(msg)=>{
        var info=JSON.parse(msg);
        // 新上线用户 
        if(info.type=='login'){
            if(!checkLoginStatus(info.uid)){   //如果用户列表中无此用户
                var arr=[];
                userArr.forEach(function(e){
                    arr.push({uid:e.uid});
                    e.so.send(JSON.stringify({type:'friends',msg:[{uid:info.uid}],info:1}));
                })
                userArr.push({uid:info.uid,so:socket});
                socket.send(JSON.stringify({type:'friends',msg:arr,info:0}))
            }
            
        }

        // 发送消息
        if(info.type=='msg'){
            var soIndex=checkLoginStatus(info.touid);
            if(soIndex)
            userArr[soIndex-1].so.send(JSON.stringify({type:'msg',fromuid:info.uid,msg:info.msg}));
        }

        if(info.type=='close'){
            if(checkLoginStatus(info.uid)){
                userArr.splice(checkLoginStatus(info.uid)-1,1);
                userArr.forEach(function(e){
                    e.so.send(JSON.stringify({type:'del',msg:{uid:info.uid}}));
                })
            }
        } 
    });
})

function checkLoginStatus(uid){
    for(let i=0;i<userArr.length;i++){
        if(userArr[i].uid==uid){
            return i+1;
        }
    }
    return false;
}