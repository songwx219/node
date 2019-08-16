const express=require('express');   //引入express框架
const pool=require('../pool.js');
const router=express.Router();    //调用路由功能

/**   ==================== 产品列表 ==================== */
router.get('/list',(req,res)=>{
    let typeId=req.query.typeId;
    let pro={};
    const pagesize=8;
    let pageInfo={
        pno:req.query.pno?req.query.pno:1,
    }
    let pageMsg={path:"product/list",title:'产品列表'};
    const sql= `select *,(
        select BrandName from pro_brand where id=brandId
    ) as brand from pro_infor where typeId=?`;
    pool.query(sql,[typeId],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            pageInfo.count=Math.ceil(result.length/pagesize);
            pageInfo.url=req.originalUrl.replace(/(&pno=).*&?/,'');
            pro={
                status:1,
                msg:result.splice(pagesize*(pageInfo.pno-1),pagesize),
                page:pageInfo
            };
        }else{
            pro={status:0};
        }
        
        res.render('./components/main',{page:pageMsg,login:req.query.login,product:pro})
    }); 
})


/**   ==================== 产品详情 ==================== */
router.get('/detail',(req,res)=>{
    let pid=req.query.pid;
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
