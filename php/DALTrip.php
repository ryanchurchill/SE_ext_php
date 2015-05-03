<?php

Class DALTrip
{
	
	public static function getTrips()
	{		
		 return DALTrip::runSQL("select * from trip;"); 
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
#SELECT LAST_INSERT_ID();				 				 				
				$results = DALTrip::runSQL($sql);
				//$results = DALTrip::runSQL("select * from trip;"); 
				//var_dump($results);
			}
			
		}
	}
	
	public static function runSQL($sql){		
		global $conn;  		
		try {
				//$statement=$conn->prepare($sql);	 
				//$statement->execute();
				echo "1";
				$statement=$conn->query($sql);
				echo "2";
				$results=$statement->fetchAll(PDO::FETCH_ASSOC);
				echo "3";
				$statement->closeCursor();
				echo "4";
				return $results;				
		}
		catch(Exception $e)
		{
		    echo "Connection failed: ";
				echo $e->getMessage();
		}
	}
}

?>