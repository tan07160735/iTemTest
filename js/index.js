/// <reference path="../lib/jquery/dist/jquery.min.js" />
//轮播图

//判断是否登录




window.onload = function(){
    var mySwiper = new Swiper('.banner1', {
        direction: 'horizontal', // 垂直切换选项
        loop: true, // 循环模式选项

        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
        },

        // 如果需要前进后退按钮
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // 如果需要滚动条
        scrollbar: {
            el: '.swiper-scrollbar',
        },
        autoplay: {
            delay: 1000,//1秒切换一次
        }


    })

    var mySwiper = new Swiper('.banner2', {
        direction: 'horizontal', // 垂直切换选项
        loop: true, // 循环模式选项

        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
        },

        // 如果需要前进后退按钮
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // 如果需要滚动条
        scrollbar: {
            el: '.swiper-scrollbar',
        },
        autoplay: {
            delay: 1500,//1秒切换一次
        }


    })


}

//渲染选项卡
getlist()
function getlist(){
    $.ajax({
        url:'./lib/index-nav.json',
        dataType:'json',
        success:function(res){
          

           let str ='';
           
           res.forEach(item => {
               str += `<li>${item.title}</li>`
           })

           $('.content-item > .left > ul ')
           .html(str)
           .on({
               mouseenter:()=>{
                   $('.left-item').stop().fadeIn()
               },
               mouseleave:()=>{
                $('.left-item').stop().fadeOut()
               }
           })
            .children('li')
            .on('mouseover',function(){
               
             const index = $(this).index()
             const list  = res[index].list
           

             let str2 = ''

             list.forEach(item=>{
                 str2 += `<li>${item.name}</li>`
             })

            
            
             $('.left-item-list')
             .html(str2)

            $('.left-item')
            .on({
                mouseover:function(){
                    $(this).finish().show()
                },
                mouseleave:function(){
                    $(this).stop().fadeOut()
                }
            })

            

            
             
             
            
                
                
            })
             
            
           
        }
    })  
}








  
    
  
    




