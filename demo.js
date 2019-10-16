const express=require('express');   //引入express框架
const app=express();    //创建连接
app.listen(3001); //监听端口

const mysql=require('mysql');
let pool=mysql.createPool({
    host:'127.0.0.1',
    port:3306,
    user:'root',
    password:'root',
    database:'tedu',
    connectionLimit:20
}); 

app.get('/',(req,res)=>{
    let hotData={};
    let newData={};
    let pageMsg={path:"index",title:'home'};
    const sql="select p.id,p.name,p.price,s.years,s.mouth,s.count FROM product p,sales s WHERE p.id=s.pid AND s.years=2018"
    pool.query(sql,(err,result)=>{
        if(err) throw err;
       console.log(result)
    });
})

