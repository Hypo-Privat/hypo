<?php

namespace Google;

session_start ();

header ( 'content-type: application/json; charset=utf-8' );
date_default_timezone_set ( 'Europe/Berlin' );

$db = mysqli_connect ( "server11.hostfactory.ch", "hypo_usr", "Tekki-1234", "hypo" );
// $db = mysqli_connect ( "www.jamfinder.info", "jamfinder_usr", "Name0815", "jamfinder" );
if (mysqli_connect_errno ()) {
	printf ( "Verbindung fehlgeschlagen: %s", mysqli_connect_error () );
	exit ();
}

ini_set ( 'max_execution_time', 300 );

$api = new \Google\MapsAPI ();

if (isset ( $_GET ["function"] )) {
	$function = strip_tags ( $_GET ['function'] );
} else {
	$function = $_SESSION ['parm'];
}
// echo '$function ', $function . "\n";
// http://hypo-privat.com/php/getLatLngByAddress.php?function=location

If ($function === 'objekt') {
	$sql = ("SELECT obj_indexkey, obj_strasse, obj_plz, obj_ort, obj_land, 
			  obj_latitude, obj_longitude FROM hp_objekt where obj_latitude = 0");
} elseif ($function === 'user') {
	// bei table tuser
	$sql = (" SELECT indexkey,   strasse, hausnr, ort, kanton, plz, sprache, land,  latitude, longitude, ipaddress 
			FROM hp_user 	where  longitude = 0" );
}
elseif ($function === 'CONTACTS') {
	//bei table tJamContacts
	
	$db = mysqli_connect("www.jamfinder.info", "jamfinder_usr", "Name0815", "jamfinder");
	if (mysqli_connect_errno()) {
		printf("Verbindung fehlgeschlagen: %s\n", mysqli_connect_error());
		exit();
	}
	$sql = ("SELECT   ADDRESS, CITY,  POSTALCODE, COUNTRY,  INDEXKEY
 		FROM CONTACTS 
        where  latitude = 0 	and 	POSTALCODE > 0
		order by POSTALCODE desc
		");
	
	//--  and CITY != '' and  POSTALCODE > 0 || POSTALCODE != NULL  and  ADDRESS != '' || ADDRESS = NULL 
};

 echo $sql . "\n";

$result = mysqli_query ( $db, $sql ) or die ( mysqli_error ( $db ) );

while ( $row = mysqli_fetch_array ( $result ) ) {
	
	If ($function === 'objekt') {
		// bei table location
		$location_id = htmlentities ( $row ['obj_indexkey'] );
		$address = (htmlentities ( $row ['obj_land'] ) . ',+' . htmlentities ( $row ['obj_ort'] ) . ',+ ' . htmlentities ( $row ['obj_plz'] ) . ' ' . htmlentities ( $row ['obj_strasse'] ));
		echo $address;
	} elseif ($function === 'user') {
		// bei table tuser
		
		$location_id = htmlentities ( $row ['indexkey'] );
		$address = (htmlentities ( $row ['land'] ) . ',+' . htmlentities ( $row ['strasse'] ) . ',+' . htmlentities ( $row ['hausnr'] ) . ',+ ' . htmlentities ( $row ['plz'] ) . ' ' . htmlentities ( $row ['ort'] ));
	} elseif ($function === 'CONTACTS') {
		//bei table tJamContacts
		$location_id = htmlentities($row['INDEXKEY']);
		$address = (htmlentities($row['ADDRESS']) . ',+ ' . htmlentities($row['POSTALCODE']) . ' ,+ ' . htmlentities($row['CITY']. ' ,+ ' . htmlentities($row['COUNTRY']) ));
	}
	
	var_dump ( $api->getLatLngByAddress ( $db, $location_id, $address, $function ) );
}

/*
 * A demo class for our Google Maps API tutorial
 *
 * @author Michael Sommerfeld
 * @version 0.0.1
 * @package Google\MapsAPI
 * @link http://phplernen.org
 * @see https://developers.google.com/maps/documentation/geocoding/?hl=de&csw=1
 * @todo Add more functions
 */
class MapsAPI {
	const URL = 'http://maps.googleapis.com/maps/api/geocode/json?';
	
	/**
	 * Get lat and lng values for an given address
	 *
	 * @param string $address
	 *        	The address you want to get geocoordinates for
	 * @return (mixed[]|bool) Array with lat and lng as keys and appropriate values or false on error
	 */
	public function getLatLngByAddress($db, $location_id, $address, $function) {
		// echo 'URL adr: ' . $address;
		$count = 0;
		if (! is_object ( $result = self::_callAPI ( array (
				'address' => $address 
		) ) ))
			return false;
		
		if (! isset ( $result->results [0] ))
			return false;
			// auslesen der werte f�r speichern in DB
		$latlng = array (
				'lat' => $result->results [0]->geometry->location->lat,
				'lng' => $result->results [0]->geometry->location->lng 
		);
		
		foreach ( $latlng as $wert_des_array => $value ) {
			// echo 'Schl�ssel: ' . $wert_des_array . '; Wert: ' . $value . '<br />' . "\n";
			// echo $location_id;
			$count ++;
			// $count = da zwei werte aus der schleife gelesen werden WICHTIG !!!
			if ($wert_des_array == 'lat') {
				$lat = $value;
				$float_lat = floatval ( $lat );
				// echo $wert_des_array . '--: ' . $float_lat . ' count--: ' . $count;
			}
			if ($wert_des_array == 'lng') {
				$lng = $value;
				$float_lng = floatval ( $lng );
				// echo $wert_des_array . '--: ' . $float_lng . ' count--: ' . $count . '<br />';
			}
			
			if ($count == 2) {
				// schreiben der Daten
				update_location ( $db, $float_lat, $float_lng, $location_id, $function );
				$count = 0;
				$lat = 0;
				$lng = 0;
				$float_lat = 0;
				$float_lng = 0;
			}
		}
		return array (
				'lat' => $result->results [0]->geometry->location->lat,
				'lng' => $result->results [0]->geometry->location->lng 
		);
	}
	private function _callAPI($params, $sensor = 'false') {
		$ch = curl_init ();
		
		// set some default values for request
		$params ['sensor'] = $sensor;
		
		curl_setopt ( $ch, CURLOPT_URL, self::URL . http_build_query ( $params ) );
		curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, true );
		
		$body = curl_exec ( $ch );
		$info = curl_getinfo ( $ch );
		
		curl_close ( $ch );
		
		if ($info ['http_code'] !== 200) // Google Maps API not available
			return false;
		
		$body = json_decode ( $body );
		
		if ($body->status !== 'OK') // Google Maps returns status not equal to OK
			return false;
		
		return $body;
	}
}

function update_location($db, $float_lat, $float_lng, $location_id, $function) {
	/* update lat und lng on location */
	echo 'Location_id: ' . $location_id . '; float_lat: ' . $float_lat . 'float_lng: ' . $float_lng . "\n";
	// echo 'fumction' ,$function;
	
	If ($function === 'objekt') {
		// bei table location
		$sql = "UPDATE hp_objekt SET   obj_latitude =  '" . $float_lat . "',
	        obj_longitude = '" . $float_lng . "'  WHERE obj_indexkey = '" . $location_id . "'";
	} elseif ($function === 'user') {
		// bei tuser
		$sql = "UPDATE hp_user SET   latitude =  '" . $float_lat . "',
	 longitude = '" . $float_lng . "'  WHERE indexkey = '" . $location_id . "'";
	}
	elseif ($function === 'CONTACTS') {
		// bei tJamContacts
		$sql = "UPDATE CONTACTS SET   latitude =  '" . $float_lat . "',
	 longitude = '" . $float_lng . "'  WHERE indexkey = '" . $location_id . "'";
	}
	$result = mysqli_query ( $db, $sql ) or die ( mysqli_error ( $db ) );
	// $ergebnis = mysql_query($sql);
	//echo ' Ergebnis: ' . $ergebnis . ' ' . $sql . '<br />' . "\n";
}
?>