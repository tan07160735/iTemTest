<?php

$username = $_POST['username'];
$password = $_POST['password'];


//数据库连接
$conn = mysqli_connect('localhost','root','112233','user');

 if(!$conn){
     echo '连接失败！';
 }

 $sql = "INSERT INTO `users` values (`$username`,`$password`)";
 $res = mysqli_query($conn,$sql);
 mysqli_close($conn);
 if($res){
    echo '注册成功！';
 }else{
     echo '注册失败!';
 }


?>