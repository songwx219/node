const express=require('express');   //引入express框架
const pool=require('../pool.js');
const router=express.Router();    //调用路由功能


router.use((req,res,next)=>{
    const uid=req.session["uid"];   //获取加密的cookie
    
    if(uid==undefined){   
        let pageMsg={path:"components/redirect",title:'redirect'};
        let infor={
            status:'warning',
            title:'登录提示',
            toUrl:'/login.html?callback='+req.originalUrl,
            content:'您的操作需登录后方可使用，即将为您跳转至登录页面！'
        }
        if(req.body.ajax){
            res.send({loginStatus:1})
        }else{
            if(req.query.callback){
                infor.toUrl='/login.html?callback='+req.query.callback;
            }
            res.render('./components/main',{page:pageMsg,login:req.query.login,msg:infor});
        }
    }else{
        next();
    }
});

/**   ==================== 我的购物车 ==================== */
router.get('/cart',(req,res)=>{
    const uid=req.session["uid"]; 
    let pageMsg={path:"order/cart",title:'我的购物车'};
    const sql=`select cid,count,pId,pname,pedition,pcolor,salePrice,unitPrice,(
        select typeName from pro_type where id=typeId
    ) as tName,(
        select brandName from pro_brand where id=brandId
    ) as bName from cart LEFT OUTER JOIN pro_infor ON id=pId where uId=?`;
    let pro={};
    pool.query(sql,[uid],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            pro={status:1,msg:result}
        }else{pro={status:0}}
        res.render('./components/main',{page:pageMsg,login:req.query.login,pro:pro})
        
    }); 
});

/**   ==================== 添加购物车 ==================== */
router.post('/addcart',(req,res)=>{
    const uid=req.session["uid"]; 
    let pid=req.body.pid;
    let count=Number(req.body.count);
    
    pool.query('select * from cart where uId=? and pId=?',[uid,pid],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            count+=Number(result[0].count);
            pool.query('UPDATE cart SET count=? WHERE uId=? and pId=?',[count,uid,pid],(err,result1)=>{
                if(err) throw err;
                if(result1.affectedRows>0){
                    res.send({status:1});
                }else{res.send({status:0})}
            })
        }else{
            pool.query('INSERT INTO cart(uId,pId,count) VALUES(?,?,?)',[uid,pid,count],(err,result1)=>{
                if(err) throw err;
                if(result1.affectedRows>0){
                    pool.query('select cid from cart where uId=?',[uid,pid],(err,result)=>{
                        if(err) throw err;
                        res.send({status:1,count:result.length});
                    })
                }else{res.send({status:0})}
            });
        }
        
    }); 
});


/**   ====================AJAX API 购物车数量修改/删除 ==================== */
router.post('/cart/:method',(req,res)=>{
    const uid=req.session["uid"];
    const method=req.params.method;
    if(method=='del'){
        const cid=[].concat(req.body['cid[]']).map(e=>Number(e));
        let cidArr=[];
        cid.forEach(function(){cidArr.push('cid=?') });
        const sql=`DELETE FROM cart WHERE ${cidArr.join(' or ')}  `;
        pool.query(sql,cid,(err,result)=>{
            if(err) throw err;
            if(result.affectedRows>0){
                pool.query('select cid from cart where uId=?',[uid],(err,result)=>{
                    if(err) throw err;
                    res.send({status:200,delCid:cid,count:result.length});
                })
            }else res.send({status:400})
        })
    }else{
        let count=0;
        const cid=req.body.cid;
        pool.query(`select count from cart where cid=?`,[cid],(err,result)=>{
            if(err) throw err;
            if(result.length>0){
                count=result[0].count-0;
                if(method=='plus'){
                    count++;
                }else if(method=='minus'){
                    if(count>1) count--;
                }
                pool.query(`update cart set count=? where cid=?`,[count,cid],(err,result1)=>{
                    if(err) throw err;
                    if(result1.affectedRows>0) res.send({status:200});
                    else res.send({status:400});
                })
            }else res.send({status:400});
        });
    }
});
/**   ==================== 购物车结算 ==================== */
router.get('/settle',(req,res)=>{
    let pageMsg={path:"order/settle",title:'订单结算'};
    const uid=req.session["uid"]; 
    const cid=([].concat(req.query.cid)).map(a=>Number(a));

    let cidArr=[];
    cid.forEach(function(){cidArr.push('cid=?') });

    const sql=`select cid,count,pId,pname,pedition,pcolor,salePrice,unitPrice,(
        select typeName from pro_type where id=pId
    ) as tName,(
        select brandName from pro_brand where id=pId
    ) as bName from cart LEFT OUTER JOIN pro_infor ON id=pId where ${cidArr.join(' or ')}  `;
    let pro={};
    pool.query(sql,cid,(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            pro={status:1,msg:result}
        }else{pro={status:0}}
        res.render('./components/main',{page:pageMsg,login:req.query.login,pro:pro})
        
    }); 
});
module.exports=router;