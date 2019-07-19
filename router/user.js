const express=require('express');   //引入express框架
const pool=require('../pool.js');
const router=express.Router();    //调用路由功能



/**   ==================== 用户登录 ==================== */
router.post('/login',(req,res)=>{

    const name=req.body.uname;
    const pwd=req.body.upwd;
    
    pool.query('select * from user_reg where uname=? and upwd=?',[name,pwd],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.cookie('uid',result[0].id,{maxAge:3600*1000,signed:true});  //signed 表示对cookie加密
            res.redirect('/');
        }else{
            res.send(`您的输入不正确，请重新输入！`);
        };
    }); 
});


/**   ==================== 用户注册 ==================== */
router.post('/register',(req,res)=>{
    let data=req.body;
    const codeStatu=req.signedCookies.code;
    if(codeStatu=='succ'){
        pool.query('select * from user_reg where uname=?',[data.uname],(err,result)=>{
            if(err) throw err;
            if(result.length==0){
                pool.query('INSERT INTO user_reg(uname,upwd) VALUES(?,?)',[data.uname,data.upwd],(err,result1)=>{
                    if(err) throw err;
                    if(result1.affectedRows>0){
                        pool.query('INSERT INTO user_infor(uid,uname) VALUES(?,?)',[result1.insertId,data.uname],(err,result2)=>{
                            if(result2.affectedRows>0){
                                res.cookie('uid',result1.insertId,{maxAge:3600*1000,signed:true});  //signed 表示对cookie加密
                                res.redirect('/');
                            }
                        });  
                    }
                });
            }else{
                res.send(`当前用户已存在，请重新注册！`);
            };
        }); 
    }else{
        res.send(`验证码无效，请完成验证码验证！`);
    }
    
});
// ajax接口===判断用户名是否存在
router.get('/isRegUserExist',(req,res)=>{
    let uname=req.query.uname;
    pool.query('select * from user_reg where uname=?',[uname],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({status:1});
        }else{
            res.send({status:0});
        };
    }); 
});
//  ajax接口===获取验证码
router.get('/code',(req,res)=>{
    const codeStatu=req.signedCookies.code;
    if(codeStatu=='succ'){
        res.send({status:202})
    }else{
        pool.query('select COUNT(id) from code',(err,result)=>{
            if(err) throw err;
            const count=result[0]['COUNT(id)'];
            if(count>0){
                const idCode=Math.ceil(Math.random()*count);
                
                pool.query('select * from code where id=?',[idCode],(err,result)=>{
                    if(err) throw err;
                    if(result.length>0){
                        res.send({status:200,info:{id:idCode,url:result[0].url} });
                    }else{
                        res.send({status:400});
                    } 
                }); 
            }else{
                res.send({status:400});
            }
        }); 
    }  
});
//  ajax接口===验证码提交验证
router.get('/codeSub',(req,res)=>{
    const idCode=Number(req.query.id);
    const value=Number(req.query.value);
    if(idCode&&value){
        pool.query('select (value) from code where id=?',[idCode],(err,result)=>{
            if(err) throw err;
            if(value>=result[0].value-10&&value<=result[0].value+10){
                res.cookie('code','succ',{maxAge:300*1000,signed:true});
                res.send({status:200 });
            }else{ res.send({status:400}); }
        });
    }else{ res.send({status:400}); }     
});

/**   ==================== 用户退出 ==================== */
router.get('/exit',(req,res)=>{
    res.cookie('uid','',{maxAge:0,signed:true});
    res.redirect('/');
});


router.get('/list',(req,res)=>{
    pool.query('select * from user_infor limit 0,5',(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send(result);
        }else{
            res.send(`当前无数据！`);
        };
    }); 
});



module.exports=router;