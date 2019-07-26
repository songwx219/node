const express=require('express');   //引入express框架
const bodyParser=require('body-parser')   //引入第三方中间件body-parser
const cookieParser = require('cookie-parser');  //引入cookie模块
const session=require('express-session');
const ejs=require('ejs')
const app=express();    //创建连接
const pool=require('./pool.js');
app.listen(3000); //监听端口

app.use(express.static('./public'));    //托管静态文件
app.use(bodyParser.urlencoded({ extended:false}))   //调用第三方中间件body-parser
app.use(cookieParser('songwx'));   //配置cookie-parser中间件，xxx表示加密的随机数(相当于密钥)
app.use(session({
    secret:'songwx',
    resave:false,
    saveUninitialized:true
}));

app.set('views', './view');
app.set( 'view engine', 'html' );
app.engine( '.html', ejs.__express );

const userRouter=require('./router/user');  //引入user模块路由
const proRouter=require('./router/product');  //引入product模块路由
const orderRouter=require('./router/order');  //引入order模块路由

// 中间件获取用户登录信息
app.use((req,res,next)=>{
    const uid=req.session["uid"];   //获取加密的cookie
    if(uid===undefined){
        req.query.login={status:0}; 
        next();
    }else{
        pool.query('select * from user_reg where id=?',[uid],(err,result)=>{
            if(err) throw err;
            if(result.length>0){
                pool.query('select * from cart where uId=?',[uid],(err,result1)=>{
                    if(err) throw err;
                    req.query.login={status:1,uname:result[0].uname,cartCount:result1.length}
                }) 
            }else req.query.login={status:0};
            next();
        });
    }
});


app.get('/',(req,res)=>{
    let hotData={};
    let newData={};
    let pageMsg={path:"index",title:'home'};
    Promise.all([
        new Promise(function(next){
            pool.query('select id,pname,unitPrice,salePrice,pImg,pcolor,pslogan from pro_infor where isHot=1 limit 0,4',(err,result)=>{
                if(err) throw err;
                hotData=result.length>0?{status:1,msg:result}:{status:0};
                next();
            });
        }),
        new Promise(function(next){
            pool.query('select id,pname,unitPrice,salePrice,pImg,pcolor,pslogan from pro_infor ORDER BY id DESC limit 0,4',(err,result)=>{
                if(err) throw err;
                newData=result.length>0?{status:1,msg:result}:{status:0};
                next();
            });
        })
    ]).then(function(){
        res.render('./components/main',{page:pageMsg,login:req.query.login,pro:hotData,newPro:newData})
    })   
})

app.use('/user',userRouter);
app.use('/product',proRouter);
app.use('/order',orderRouter);


app.use((req,res)=>{
    res.send('404 您输入的页面不存在')
})