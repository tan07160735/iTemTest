/// <reference path="../lib/jquery/dist/jquery.min.js" />
//轮播图
window.onload = function(){
    var mySwiper = new Swiper('.swiper-container', {
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

//选项卡

$('.layout > .list1 > li').hover(function(){
      
    //点击的 li 
    $(this)
    .siblings()//所有的兄弟元素，不包括自己
    .removeClass('active') //移除active类名
    .parent() // 找到li的父元素 ul
    .next()// ul的父元素ol
    .children() //ol下的li
    .removeClass('active') //移除类名
    .eq($(this).index()) //找到点击的li对应的ol下的li
    .addClass('active') //添加类名
   
},function(){
    $(this)
    .siblings()//所有的兄弟元素，不包括自己
    .removeClass('active') //移除active类名
    .parent() // 找到li的父元素 ul
    .next()// ul的父元素ol
    .children() //ol下的li
    .removeClass('active') //移除类名
    .eq($(this).index()) //找到点击的li对应的ol下的li
    .removeClass('active')
})



        




  
    
  
    




