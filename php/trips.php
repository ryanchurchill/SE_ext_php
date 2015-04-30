<?php
include 'TripsJSON.php';

/*
$json = "
{\"success\":true,\"total\":5,\"trips\":[{\"trip_id\":2,\"user_id\":1,\"start_date\":\"2014-01-01\",\"end_date\":\"2014-01-10\",\"trip_name\":\"Miami Trip\"},{\"trip_id\":4,\"user_id\":1,\"start_date\":\"2014-03-14\",\"end_date\":\"2014-03-17\",\"trip_name\":\"Cali Trip 2\"},{\"trip_id\":45,\"user_id\":1,\"start_date\":\"2015-02-01\",\"end_date\":\"2015-02-15\",\"trip_name\":\"Del2\"},{\"trip_id\":47,\"user_id\":1,\"start_date\":\"2015-02-15\",\"end_date\":\"2015-02-15\",\"trip_name\":\"Trip6\"},{\"trip_id\":51,\"user_id\":1,\"start_date\":\"2015-02-01\",\"end_date\":\"2015-02-04\",\"trip_name\":\"Trip8\"}]}
";
print $json;
 */
$servername = "sh-exp-dev-mysql.inhomecountry.com";
$username = "ryaninhomecountr";
$password = "qwerty";
$dbname = "sh_exp_dev";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //echo "Connected successfully";
	$statement=$conn->prepare("select * from trip;");	
	$statement->execute();
	$results=$statement->fetchAll(PDO::FETCH_ASSOC);
	//$json=json_encode($results);
	//echo $json;
	$tripsJson = new TripsJSON($results);
	$json=json_encode($tripsJson);
	echo $json;
}
catch(Exception $e)
{
    echo "Connection failed: ";
	echo $e->getMessage();
}
?>