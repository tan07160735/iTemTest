// get 请求

function getSend(url,callback){
     
    var xhr = new XMLHttpRequest();
    xhr.open('GET',url);
    xhr.onload = function(){
        callback(xhr.responseText)
    }
    xhr.send()
    
}

//post 请求

function postSend(url,callback,data){
     
    var xhr = new XMLHttpRequest();
    xhr.open('POST',url);
    xhr,onload = function(){
          callback(xhr.responseText)
    }
    xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
    xhr.send(data);

}