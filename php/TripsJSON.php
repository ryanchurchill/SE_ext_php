<?php

Class TripsJSON
{
	public $success = false;
	//public $total = 0;
	public $trips;
	
	function __construct($trips)
	{
		$this->trips = $trips;
		$this->success = true;
		//$this->total = 5;
	}
}

?>