<?php
include 'TripsJSON.php';
include 'db_connection.php';
include 'DALTrip.php';

/*
$json = "
{\"success\":true,\"total\":5,\"trips\":[{\"trip_id\":2,\"user_id\":1,\"start_date\":\"2014-01-01\",\"end_date\":\"2014-01-10\",\"trip_name\":\"Miami Trip\"},{\"trip_id\":4,\"user_id\":1,\"start_date\":\"2014-03-14\",\"end_date\":\"2014-03-17\",\"trip_name\":\"Cali Trip 2\"},{\"trip_id\":45,\"user_id\":1,\"start_date\":\"2015-02-01\",\"end_date\":\"2015-02-15\",\"trip_name\":\"Del2\"},{\"trip_id\":47,\"user_id\":1,\"start_date\":\"2015-02-15\",\"end_date\":\"2015-02-15\",\"trip_name\":\"Trip6\"},{\"trip_id\":51,\"user_id\":1,\"start_date\":\"2015-02-01\",\"end_date\":\"2015-02-04\",\"trip_name\":\"Trip8\"}]}
";
print $json;
 */


$action =  $_GET["action"];
if ($action == "read"){
	read();
}
/*
else if ($action == "create"){
	create();
}
else if ($action == "update"){
	update();
}
else if ($action == "delete"){
	delete();
}
*/
else{
	dal($action);
}

function read()
{	
	$trips = DALTrip::getTrips();
	$tripsJson = new TripsJSON($trips); // for serialization into format ext expects
	$json=json_encode($tripsJson);
	echo $json;
}

function dal($action){
	$entityBody = file_get_contents('php://input');
	$trips = json_decode($entityBody);
	//var_dump($trips);
	$trips = DALTrip::setTrips($action, $trips);
}

/*
function create()
{
	$entityBody = file_get_contents('php://input');
	echo $entityBody;
}

function update()
{
	$entityBody = file_get_contents('php://input');
	$trips = json_decode($entityBody);
	var_dump($trips);
}

function delete()
{
	$entityBody = file_get_contents('php://input');
	echo $entityBody;
}
*/

?>