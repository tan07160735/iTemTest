/// <reference path="../lib/jquery/dist/jquery.min.js" />


//判断是否登录

// console.log();
// if(document.cookie == ''){
//      alert('请登录')
//      window.location.href = './login.html' 
// }
    


window.onload = function () {
    
    var flag = true; //排序使用的全局变量
    var global_data = [] //接收请求的数据
     

    //请求json数据
    //商品数据渲染
    getlist()
    function getlist() {
        $.ajax({

            url: '../lib/list.json',
            dataType: 'json',
            success: function (res) {
                console.log(res);
                global_data = res
                //分页器渲染
                $('.M-box3').pagination({
                    pageCount: Math.ceil(res.length / 8),
                    jump: true,
                    coping: true,
                    homePage: '首页',
                    endPage: '末页',
                    prevContent: '上页',
                    nextContent: '下页',
                    callback: function (api) {

                        //当前页面
                        let curr = api.getCurrent()
                        console.log(curr);
                        
                        //分页 切割本地数据
                        var list = res.slice((curr - 1) * 8, curr * 8)
                        console.log(list);

                        //切换页面渲染相应数据
                        bandhtml(list)
                        
                    }
                });


                bandhtml(res.slice(0,8))
            }
        })
    }

    function bandhtml(list) {
        let str = ''
        //商品数据渲染
        list.forEach(item => {
            str += `  <li class="product" data-id="${item.id}">
            <div class="productInfo">
    
                <div class="product-img">
                    <a href="javascript:void(0);">
                        <img src=${item.img} alt="">
                    </a>
                </div>
    
                <h3 class="product-title">${item.title}</h3>
    
                <div class="item-summary">
    
                    <div class="item-sum">
                        <span>总销量:</span>
                        <strong>${item.sales}</strong>
                    </div>
    
                    <div class="item-price">
                        <span><i class="iconfont icon-jiage"></i>${item.price}</span>
                    </div>
                    <div class="car-img">
                        <img src="../images/list-car.png" alt="">
                     </div>
                </div>
            </div>
        </li>`


        });
        $('.product-item .item-list')
            .html(str)
    }

    
    //商品排序
    $('.product-list .search-sort .s-price').click(function(){
        
        flag = !flag //排序标识

        global_data.sort(function(a,b){
              if(flag == true){
                 return a.price - b.price
              }else{
                  return b.price - a.price
              }
        })

        console.log(global_data);

        //分页器渲染
        $('.M-box3').pagination({
            pageCount: Math.ceil(global_data.length / 8),
            jump: true,
            coping: true,
            homePage: '首页',
            endPage: '末页',
            prevContent: '上页',
            nextContent: '下页',
            callback: function (api) {

                //当前页面
                let curr = api.getCurrent()
                console.log(curr);
                
                //分页 切割本地数据
                var list = global_data.slice((curr - 1) * 8, curr * 8)
                console.log(list);

                //切换页面渲染相应数据
                bandhtml(list)
                
            }
        });

        bandhtml(global_data.slice(0,8))
            
        
         
    })

    //页面通讯，用localstorage模拟

    
    console.log($('.product-list .item-list'));

    $('.product-list .item-list').on('click','li',function(){
         
        var id = $(this).data('id')
        console.log(id);
        
        
        let data = {}
        
        for(let i = 0;i< global_data.length ;i++){
            if(global_data[i].id == id){
                 data = global_data[i]
                 break;
            }
        }
        
        console.log(data);
        
        //localstorage

        localStorage.setItem('product-info',JSON.stringify(data))
        window.location.href = './detail.html'

          
    })
    
    
    
    










}



