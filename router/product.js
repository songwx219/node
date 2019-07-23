const express=require('express');   //引入express框架
const pool=require('../pool.js');
const router=express.Router();    //调用路由功能



/**   ==================== 用户登录 ==================== */
router.post('/detail',(req,res)=>{
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
