<?php
header("Content-type:text/xml");
print("<?xml version=\"1.0\" encoding=\"iso-8859-1\" ?>");

$hostname = '9e6e23e07d2ab98ce22ffb74f3d0aed7652a8010.rackspaceclouddb.com';
$username = 'twice';
$password = 'twicePW9246Q31';
$database = 'dictionary';

$options = $_POST['wordOptions'];
//$options = explode(',', $options);

$connection = mysql_connect($hostname, $username, $password); 

if (!$connection) { 
     die('Could not connect to the database. The error is: ' . mysql_error()); 
} 

mysql_select_db($database, $connection); 

$query = "SELECT * FROM wordlist WHERE ";

foreach($options as $option){
	$query .= "word = '$option' OR ";
}

$query = substr($query,0,-4);

$result = mysql_query($query);

print('<response>');
while($row = mysql_fetch_array($result)){
	print('<word>' . $row['word'] . '</word>');
}
print('</response>');
$num = mysql_numrows($result);
?>