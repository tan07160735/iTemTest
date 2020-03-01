<?php

  $username = $_POST['username'];
  $password = $_POST['password'];

  
  //数据库连接
  $conn = mysqli_connect('localhost','root','112233','user');

   if(!$conn){
       echo '连接失败！';
   }

   $sql =  "SELECT * FROM `users` WHERE `username`='$username' AND `password`='$password'";
   $res = mysqli_query($conn,$sql);
   $row = mysqli_fetch_assoc($res);
   mysqli_close($conn);

   if($row){
    
    $arr = array("message"=> "登录成功","code"=>1);
        
   }else{
       
    $arr = array("message"=>"登录失败","code"=>0);

   }
   
   print_r(json_encode($arr));





?>