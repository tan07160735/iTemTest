<?php

$username = $_POST['username'];
$password = $_POST['password'];


//数据库连接
$conn = mysqli_connect('localhost','root','112233','user');

 if(!$conn){
     echo '连接失败！';
 }


 $res = mysqli_query($conn,"INSERT INTO `users` (`username`, `password`) VALUES('$username','$password')");
 mysqli_close($conn);

 if($res){
    
    $arr = array("message"=> "注册成功","code"=>1);
        
   }else{
       
    $arr = array("message"=>"注册失败","code"=>0);

   }
   
   print_r(json_encode($arr));

 

?>