var li = document.querySelectorAll(".pro-con.product-list li");

   console.log(li)
   var arr = [];

   for(var i=0,len = li.length;i<len;i++){

    var ele = li[i];
    
    var o ={};
    var img = ele.querySelector(".imgbig img").src;
    var price = ele.querySelector(".fixprice").innerText;
    var title = ele.querySelector(".pro-check").innerText;
    o.img = img;
    o.price = price;
    o.title = title;
    arr.push(o);
    
   }
   JSON.stringify(arr);

   var li =document.querySelectorAll('.product-list li')
   console.log(li);
   
   var arr = [];

   for(var i =0;i<li.length;i++){
         
      var ele = li[i]
      var o ={};
      
      var title = ele.querySelector('.product-title a').text
      var sales = ele.querySelector('.item-summary .item-sum strong').textContent
      var price = ele.querySelector('.item-summary .item-price strong').textContent
      var img = ele.querySelector('.product-img img').src

      o.title = title;
      o.sales = sales;
      o.price = price;
      o.img = img;
      arr.push(o);
         
   }
   JSON.stringify(arr)
   