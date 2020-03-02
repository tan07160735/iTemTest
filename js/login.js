//注册功能
window.onload = function () {
    
    var btnRe = document.querySelector('.btn2');
    var rePage = document.querySelector('.regit');
    var btnRedit = document.querySelector('.btnRedit');
    var reusername = document.querySelector('.reusername');
    var repassword = document.querySelector('.repassword')
    
    
    btnRe.onclick = function(){
        
        rePage.style.display = 'block';   
        
         
    }

    btnRedit.onclick = function(){
        
        
        
        var xhr = new XMLHttpRequest();
        xhr.open('POST','/redit.php');
        xhr.onload = function(){
           
           var res = JSON.parse(xhr.responseText);
           
           if(res.code == 1){
            window.location.reload();
           }
        
           
        }
        xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
        xhr.send(`username=${reusername.value}&password=${repassword.value}`);
    }




    //登录功能

    var username  = document.querySelector('.username-text');
    var password = document.querySelector('.password-text');
    var login = document.querySelector('.btn1');
    
    
    login.onclick = function(){
       
        var xhr = new XMLHttpRequest();
        xhr.open('POST','/login.php');
        xhr.onload = function(){
           
            var res = JSON.parse(xhr.responseText);
            
            if(res.code == 0){
               console.log('错误提示');
               
            }else{
                window.location.href = '../index3.html'
            }  
        }

        xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
        xhr.send(`username=${username.value}&password=${password.value}`);
      
        
        
    }
    
}