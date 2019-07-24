const express=require('express');   //引入express框架
const pool=require('../pool.js');
const router=express.Router();    //调用路由功能

/**   ==================== 产品列表 ==================== */
router.get('/list',(req,res)=>{
    let typeId=req.query.typeId;
    let pro={}
    let pageMsg={path:"product/list",title:'产品列表'};
    pool.query('select * from pro_infor where typeId=?',[typeId],(err,result)=>{
        if(err) throw err;
        pro=result.length>0?{status:1,msg:result}:{status:0};
        console.log(pro)
        res.render('./components/main',{page:pageMsg,login:req.query.login,product:pro})
    }); 
})


/**   ==================== 产品详情 ==================== */
router.get('/detail',(req,res)=>{
    let pid=req.query.id;
    let pro={}
    let pageMsg={path:"product/detail",title:'detail'};
    pool.query('select * from pro_infor where id=?',[pid],(err,result)=>{
        if(err) throw err;
        pro=result.length>0?{status:1,msg:result[0]}:{status:0};
        res.render('./components/main',{page:pageMsg,login:req.query.login,product:pro})
    }); 
})



/**   ==================== 添加产品 ==================== */
router.post('/addPro',(req,res)=>{
    const value=[
        Number(req.body.typeId),
        Number(req.body.brandId),
        req.body.pname,
        req.body.pedition,
        req.body.pcolor,
        req.body.pslogan,
        Number(req.body.isHot)];
    console.log(value)
    pool.query(
        'INSERT INTO pro_infor(typeId,brandId,pname,pedition,pcolor,pslogan,isHot) VALUES(?,?,?,?,?,?,?)',value,(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({status:200});
        }else{
            res.send({status:400});
        };
    }); 
});

module.exports=router;
