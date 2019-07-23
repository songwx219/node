const express=require('express');   //引入express框架
const bodyParser=require('body-parser')   //引入第三方中间件body-parser
const cookieParser = require('cookie-parser');  //引入cookie模块
const ejs=require('ejs')
const app=express();    //创建连接
const pool=require('./pool.js');
app.listen(3000); //监听端口

app.use(express.static('./public'));    //托管静态文件
app.use(bodyParser.urlencoded({ extended:false}))   //调用第三方中间件body-parser
app.use(cookieParser('songwx'));   //配置cookie-parser中间件，xxx表示加密的随机数(相当于密钥)


app.set('views', './view');
app.set( 'view engine', 'html' );
app.engine( '.html', ejs.__express );

const userRouter=require('./router/user');  //引入user模块路由
const proRouter=require('./router/product');  //引入user模块路由

app.get('/',(req,res)=>{
    let proData={};
    let loginData={};
    pool.query('select id,pname,unitPrice,salePrice,pImg,pcolor,pslogan from pro_infor limit 0,4',(err,result)=>{
        if(err) throw err;
        proData=result.length>0?{status:1,msg:result}:{status:0};
        console.log(proData)
        const uid=req.signedCookies.uid;   //获取加密的cookie
        if(uid){
            pool.query('select * from user_reg where id=?',[uid],(err,result)=>{
                if(err) throw err;
                if(result.length>0){
                    loginData={status:1,uname:result[0].uname}
                }else{
                    loginData={status:0};
                };
            });
        }else{
            loginData={status:0};
            res.render('index',{title:'home',login:loginData,pro:proData})
        }
    });
    
    
    
})

app.use('/user',userRouter);
app.use('/product',proRouter);

app.use((req,res)=>{
    res.send('404 您输入的页面不存在')
})