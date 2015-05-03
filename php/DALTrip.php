<?php

Class DALTrip
{
	
	public static function getTrips()
	{		
		 return DALTrip::runSQL("select * from trip;", true); 
	}
	
	public static function setTrips($action, $trips)
	{		
		foreach ($trips as $trip){									
			if ($action == "create")
			{								
				$sql = <<<EOT
insert into trip(
    user_id,
    start_date,
    end_date,
    trip_name
)
values(
      $trip->user_id  ,
      '$trip->start_date',
      '$trip->end_date',
      '$trip->trip_name'  
);
EOT;
				$trip_id = DALTrip::runSQL($sql, false, true);
				$trip->trip_id = $trip_id;
			}
			else if ($action=="update")
			{
				$sql = <<<EOT
update trip
set
	start_date = '$trip->start_date',
	end_date = '$trip->end_date',
	trip_name = '$trip->trip_name'
where
	trip_id = $trip->trip_id;
EOT;
				DALTrip::runSQL($sql, false, false);
			}
			else if ($action=="delete")
			{
				$sql = <<<EOT
delete trip from trip where trip.trip_id = $trip->trip_id;
EOT;
				DALTrip::runSQL($sql, false, false);
			}
		}
		return $trips;
	}
	
	public static function runSQL($sql, $getRecordset, $getIdentity){		
		global $conn;  		
		try {
				//$statement=$conn->prepare($sql);	 
				//$statement->execute();
				$statement=$conn->query($sql);
				if ($getRecordset){
					$results=$statement->fetchAll(PDO::FETCH_ASSOC);
				}
				$statement->closeCursor();
				if ($getRecordset){
					return $results;
				}
				if ($getIdentity) {
					return $conn->lastInsertId();
				}				
		}
		catch(Exception $e)
		{
		    echo "Connection failed: ";
				echo $e->getMessage();
		}
	}
}

?>