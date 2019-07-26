
$(function(){
    function AddCart(){
        this.addEvent=function(){
            var that=this;
            $('.detail .goCart,.pro-list .goCart').on('click',function(){
                const pId=$(this).data('pid');
                const count=$(this).siblings('.input').find('input').val()-0;
                that.goCartAjax(count,pId);
            })
            $('.detail .addCart .btn,.pro-list .addCart .btn').on('click',function(){
                that.countChange($(this))
            });
            $('.index .goCart').on('click',function(){
                const pId=$(this).data('pid');
                that.goCartAjax(1,pId);
            })
        }
        this.goCartAjax=function(count,pId){
            $.ajax({
                url:'/order/addcart',
                type:'post',
                data:{'count':count,'pid':pId,'ajax':1},
                dataType:'json',
                success:function(data){
                    if(data.loginStatus==1) return location.href="/order?callback="+location.href;
                    if(data.status==1){
                        alert('已加入购物车');
                        if(data.count) $('header .cart .badge').html(data.count);
                    }else{
                        alert('加入购物车失败了，请重新尝试')
                    }; 
                }
            })
        }
        this.countChange=function(ele){
            var input=ele.siblings('.input').find('input');
            var count=input.val()-0;
            
            if(ele.hasClass('plus')) input.val(++count);
            if(ele.hasClass('minus')){
                if(count>1)  input.val(--count);
            }
        }
    }
    (new AddCart()).addEvent();
   
})
