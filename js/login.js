//注册功能
window.onload = function () {
    
    var btnRe = document.querySelector('.btn2');
    var rePage = document.querySelector('.regit');
    btnRedit = document.querySelector('.btnRedit');
    
    btnRe.onclick = function(){
        
        rePage.style.display = 'block';   
   
    }

    btnRedit.onclick = function(){
        var xhr = new XMLHttpRequest();
        xhr.open('POST','../server/redit.php');
        xhr.onload = function(){
           
            var res = xhr.responseText;
            console.log(res);
            
           
        }
        xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
        xhr.send(`username=${username.value}&password=${password.value}`);
    }




    //登录功能

    var username  = document.querySelector('.username-text');
    var password = document.querySelector('.password-text');
    var login = document.querySelector('.btn1');
    console.log(login);
    
    login.onclick = function(){
       
        var xhr = new XMLHttpRequest();
        xhr.open('POST','../server/login.php');
        xhr.onload = function(){
           
            var res = JSON.parse(xhr.responseText);
            
            if(res.code == 0){
               console.log('错误提示');
               
            }else{
                window.location.href = '../pages/index.html'
            }  
        }
        
        xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
        xhr.send(`username=${username.value}&password=${password.value}`);
      
        
        
    }
    
}