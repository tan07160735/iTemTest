window.onload = function(){



    //购物车渲染

   const carlist = JSON.parse(localStorage.getItem('carlist'))
   console.log(carlist);
   
   if(!carlist){
       alert('数据为空')
   }else{
      //页面渲染
      
      bandhtml()

      //添加按钮事件
      bandevent()
   }
   function bandhtml(){
    let selectAll = carlist.every(item => {
        // 如果每一条都是 true, 就会返回 true
        // 如果任意一条是 false, 就会返回 false
        return item.isselect === true
      })
       let str =` 
       <div class="title">
       <span>全部商品</span>
       <span>降价商品</span>
       <span>库存紧张</span>
   </div>
       <div class="info-title">
       <span><input type="checkbox" class="info-check" ${ selectAll ? 'checked' : '' }> 全选</span>
       <span>商品信息</span>
       <span>单价</span>
       <span>数量</span>
       <span>金额</span>
       <span>操作</span>
   </div>`
       
   
       
       carlist.forEach(item => {
           str+=`
           <div class="product-item">
           <div class="product">
               <div class="img">
                
                       <input type="checkbox" data-id=${item.id} class="inp" ${item.isselect ? 'checked':''}>
                 
                   <img src=${item.img} alt="">
               </div>

               <div class="info">
                   <span>${item.title}</span>
               </div>
               <div class="price">
                   <span class="priceNum">￥${item.price}</span>
               </div>

               <div class="number">
                       <span class="add" data-id=${item.id}>+</span>
                       <input type="text" value=${item.number}>
                       <span class="red" data-id=${item.id}>-</span>
               </div>

               <div class="xiaoji">
                   <span>￥${item.xiaoji}</span>
               </div>

               <div class="handle">
                   <span class="del" data-id=${item.id}>删除</span>
               </div>
               </div>
           </div>
         `
       });

        
       //渲染选中后的信息

       //找到选中的商品
       
       let selectArr = carlist.filter(function(item){
           return item.isselect
       })

       let selectNum = 0;
       let selectAllPrice = 0;
       selectArr.forEach(function(item){
            selectNum += item.number
            selectAllPrice += item.xiaoji * item.number
       })



       str+=` <div class="allHandle">

       <div class="handLayout">
           <span>删除</span>
           <span>移入收藏夹</span>
           <span>分享</span>
           <span>已选商品${selectNum}件</span>
           <span>总计:${selectAllPrice.toFixed(2)}</span>
           <span ${selectArr.length ? 'class="active"' : 'class="disable" '}>结算</span>
       </div>


   </div>`

       $('.layout').html(str)

       
   }

   function bandevent(){
       
    //全选按钮
    
    $('.layout').on('change','.info-check',function(){
         
        console.log(this.checked);
        
         carlist.forEach(item =>{
             item.isselect = this.checked
         })
         
         bandhtml() 
         localStorage.setItem('carlist', JSON.stringify(carlist))
         

    })
    
    //单选按钮
    $('.layout').on('change','.inp',function(){
         
        //用id找到点击的那一条数据
       const id = $(this).data('id')
        carlist.forEach(function(item){
            if(item.id === id ){
               item.isselect = !item.isselect
            }
        })

        bandhtml()
        localStorage.setItem('carlist', JSON.stringify(carlist))
              
    }) 

    //删除商品

    $('.layout').on('click','.del',function(){
           
          const id = $(this).data('id');
          console.log(id);
          
         for(let i =0;i<carlist.length;i++){
               if(carlist[i].id === id){
                   carlist.splice(i,1)
                   
               }
         }
         
          bandhtml()
          localStorage.setItem('carlist', JSON.stringify(carlist))  
    })

    //添加减少商品
    
    
    $('.layout').on('click','.add',function(){
        
         
        const id = $(this).data('id')

        carlist.forEach(item =>{
            if(item.id === id){
                 item.number++
            }
        })

        bandhtml()
        localStorage.setItem('carlist',JSON.stringify(carlist))
    })

    $('.layout').on('click','.red',function(){

        const id = $(this).data('id')
        carlist.forEach(function(item){
            if(item.id === id && item.number>0){
                  item.number--
            }
        })

        bandhtml()
        localStorage.setItem('carlist',JSON.stringify(carlist))
    })
  
    
   }
   

}