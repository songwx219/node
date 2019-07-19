$(function(){
    document.cookie ="code='';expires='maxAge:0'";
    class dragImg{
        constructor(){
            this.curX=0;

            this.canvas=$('#VerifiCode')[0];
            this.ctx=this.canvas.getContext("2d");

            this.width=600;
            this.height=300;

            this.canvas.width=this.width;
            this.canvas.height=this.height;

            this.img1 =new Image();
            this.img2 =new Image();
            this.id=null;

            
            $('.code span.button').off('click');
            $('.slider_block').off('mousedown');
            $('.code_box').off('mouseup');
            $('.code_box').off('mousemove');
            this.addEvent();
        }
        init(){
            this.curX=0;

            $.get('/user/code',(data)=>{
                if(data.status==202){
                    alert('您已通过验证，请填写完毕直接提交您的信息！');
                }else if(data.status==200){
                    $('.code_box').show();
                    $('.code_box .loading').addClass('show');
                    this.id=data.info.id;
                    this.img1.src = `/code/1/${data.info.url}-1.png`;
                    this.img1.onload=()=>{
                        this.img2.src = `/code/1/${data.info.url}-2.png`;
                    }
                    this.img2.onload=()=>{
                        this.update(0);
                    }
                    $('.code_box .loading').removeClass('show');
                }else{
                    alert('验证码获取失败，请重新尝试！');
                    $('.code_box').hide();
                } 
            });     
        }
        update(x){
            this.curX=x*2;
            this.ctx.clearRect(0,0,this.width,this.height);
            this.ctx.drawImage(this.img1, 0, 0,this.width,this.height);
            this.ctx.drawImage(this.img2, this.curX, 0,120,this.height); 
        }
        addEvent(){
            var that=this;
            var status=false;
            var sx=0;

            $('.code span.button').on('click',function(){
                that.init();
            })
            $('.code_box .refresh').on('click',function(){
                that.init();
            })
            $('.code_box .remove').on('click',function(){
                $('.code_box').hide();
            })
            
            $('.slider_block').on('mousedown',function(e){
                status=true;
                sx=e.clientX;
                $('.slider').addClass('drag');
            });
            $('.code_box .slider').on('mouseup',function(e){
                status=false;
                $('.code_box .loading').addClass('show');
                $.get(`/user/codeSub?id=${that.id}&value=${that.curX+10}`,(data)=>{
                    console.log(data)
                    if(data.status==200){
                        $('.code_box .loading .box').addClass('text-success').html('<span class="fa fa-check-circle "></span><span>验证成功</span>')
                        setTimeout(function(){
                            $('.code_box .loading').removeClass('show');
                            $('.code_box .loading .box').removeClass('text-success').html('');
                            $('.code_box').hide();
                            $('.code span.button').removeClass('btn-warning').addClass('btn-success').html('<i class="fa fa-check-circle "> </i> 验证成功') 
                        },300);
                    }else{
                        $('.slider').addClass('err');
                        $('.code_box .loading .box').html('<span class="fa fa-exclamation-circle "></span><span>验证失败</span>')
                        setTimeout(function(){
                            that.init();
                            $('.slider').removeClass('err');
                            $('.slider').removeClass('drag');
                            $('.code_box .loading .box').html('')
                            $('.slider_block').css('transform','translateX(0px)');
                            $('.slider_done').css({'display':'none','width':`0px`}); 
                        },300);
                    }
                })
                
            });
            $('.code_box .slider').on('mousemove',function(e){
                if(status){
                    if(e.clientX-sx>=-2&&e.clientX-sx<=262){
                        $('.slider_block').css('transform',`translateX(${e.clientX-sx}px)`);
                        $('.slider_done').css({'display':'block','width':`${e.clientX-sx+20}px`});
                        that.update(e.clientX-sx);
                    }
                }
            });   
        }  
    }
    
    new dragImg();
})