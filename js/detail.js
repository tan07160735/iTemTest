/// <reference path="../lib/jquery/dist/jquery.min.js" />

window.onload = function () {
    const product = JSON.parse(localStorage.getItem('product-info'))
    console.log(product);
    let str =''
    //渲染商品信息
      function bandhtml(){
        str = ` <div class="info">
        <div class="title">
           <h3>${product.title}</h3>
        </div>

        <div class="price">

            <div class="priceNum">
                <span>价格:</span>
                <strong><i class="iconfont icon-jiage"></i>${product.price}</strong>
            </div>

            <div class="priceCount">
                <span>本店活动</span>
                <strong>满两件8.5折</strong>
            </div>

        </div>

        <div class="sales">
            <div class="fast">
               <span>运费</span>
               <strong>广东广州 至 广州市<i class="iconfont icon-com-xiajiaobiao"></i>荔湾区</strong>
            </div>

            <div class="weight">
                   <span>重量</span>
                   <strong>4.8kg</strong>
            </div>

            <div class="salesnum">
                 <span>月销量<i>4.5万+</i></span> 
                 <span>累计评价<i>564865</i></span> 
                 <span>送天猫积分<i>8</i></span> 
            </div>
            
            <div class="buyNum">
                 <span class="buyword">数量</span>
                 
                 <input type="text" class="inp" value="1">

                 <div class="count">
                     <span class="iconfont icon-com-shangjiaobiao"></span>
                     <span class="iconfont icon-com-xiajiaobiao"></span>
                 </div>
              
                 <span class="buyword">件</span>

              
            </div>

        </div>
        
        <div class="btn">
            <button class="bTn">加入购物车</button>
        </div>


        <div class="message"></div>
   </div>`
  

   $('.product-info').html(str)
      }
      bandhtml()
       


    var biger = document.getElementById('biger');
    var main = document.getElementById('squer');
    var smaller = document.getElementById('smaller');
    var mask = document.getElementById('mask');
    var wrap = biger.parentNode;

    var imgArr = [
        { "path": `${product.pic.pic1}` },
        { "path": `${product.pic.pic2}` },
        { "path": `${product.pic.pic3}`},
        { "path": `${product.pic.pic4}` },
        { "path": `${product.pic.pic5}` }
    ];

    var imgSum = imgArr.length;

    if (imgSum > 5) {
        imgSum = 5;
    }
    for (var i = 0; i < imgSum; i++) {
        var lis = document.createElement('li');
        var imgs = document.createElement('img');
        imgs.src = imgArr[i].path;
        lis.appendChild(imgs);
        smaller.appendChild(lis);
    }


    var mainImg = document.createElement('img');
    var bigImg = document.createElement('img');
    var liArr = smaller.children;
    bigImg.src = mainImg.src = liArr[0].children[0].src;
    main.insertBefore(mainImg, mask);
    biger.appendChild(bigImg);
    var bigPic = biger.children[0];
    liArr[0].className = 'current';
    for (var i = 0; i < liArr.length; i++) {
        liArr[i].index = i;
        liArr[i].onclick = function () {
            this.className = 'current';
            bigPic.src = main.children[0].src = this.children[0].src;
            for (var j = 0; j < liArr.length; j++) {
                if (this != liArr[j]) {
                    liArr[j].removeAttribute('class');
                    liArr[j].removeAttribute('className');
                }
            }
        }
    }
    main.onmouseenter = function () {
        mask.style.display = 'block';
        biger.style.display = 'block';
    }
    main.onmouseleave = function () {
        mask.style.display = 'none';
        biger.style.display = 'none';
    }

    main.onmousemove = function (e) {
        var e = e || window.event;
        var pagex = e.pageX || scroll().left + e.clientX;
        var pagey = e.pageY || scroll().top + e.clientY;
        pagex = pagex - wrap.offsetLeft - mask.offsetWidth / 2;;
        pagey = pagey - wrap.offsetTop - mask.offsetHeight / 2;
        if (pagex < 0) {
            pagex = 0;
        }
        if (pagey < 0) {
            pagey = 0;
        }
        if (pagex > main.offsetWidth - mask.offsetWidth) {
            pagex = main.offsetWidth - mask.offsetWidth;
        }
        if (pagey > main.offsetHeight - mask.offsetHeight) {
            pagey = main.offsetHeight - mask.offsetHeight;
        }
        mask.style.left = pagex + 'px';
        mask.style.top = pagey + 'px';
        var scale = (bigPic.offsetWidth - biger.offsetWidth) / (main.offsetWidth - mask.offsetWidth);
        var xx = pagex * scale;
        var yy = pagey * scale;
        bigPic.style.left = -xx + 'px';
        bigPic.style.top = -yy + 'px';
    }
    

    //购物车
    //数量按钮
    var product_num = 1;
    console.log(product_num);
    
    $('.count').children().first().on('click',function(){
       
        product_num ++
        console.log( product_num);
        $('.buyNum .inp').attr('value',product_num)  
    })

    $('.count').children().last().on('click',function(){
       if(product_num > 0)
        product_num --
        console.log( product_num);
        $('.buyNum .inp').attr('value',product_num)
        
    })
    
    $('.btn .bTn').click(function(){
        
        //先判断是否登录

        //
        const carlist = JSON.parse(localStorage.getItem('carlist')) || [] 

        //点击添加，将本页商品信息放入创建的购物车数组当中
        //再存进localstorage

        //返回值，是布尔值。是否有这个条信息
        let exits = carlist.some(item =>{
            return item.id === product.id
        })
        
        if(exits){
            
            //有同样的，找到同样的，给他的number++
        
            for(let i =0; i<carlist.length;i++){
                   if(carlist[i].id === product.id){
                      carlist[i].number++
                      carlist[i].xiaoji = carlist[i].number * carlist[i].price
                      break;
                   }
            }
   
        }else{
          //push前设置好 number 
          product.number = 1;
          product.xiaoji = product.price*1;
          product.isselect = false //默认
          carlist.push(product)
        }
        
       
        localStorage.setItem('carlist',JSON.stringify(carlist))
        
        
        
        
    })


   
    
    

}
