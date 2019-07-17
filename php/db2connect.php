
<?php
date_default_timezone_set('Europe/Berlin');

$timestamp = time();
$datum = date("Y-m-d", $timestamp);
$uhrzeit = date("H:i:s", $timestamp);
echo $datum, " - ", $uhrzeit, " Uhr <br>";
error_reporting(E_ALL);

$database = "SAMPLE";        # Get these database details from
$hostname = "172.17.0.4";  # the web console 192.168.1.123  172.17.0.4
$user     = "db2inst1";   	#
$password = "db2admin";   	#
$port     = 50000;          #
$ssl_port = 50001;          #

# Build the connection string
#
$driver  = "DRIVER={IBM DB2 ODBC DRIVER};";
$dsn     = "DATABASE=$database; " .
           "HOSTNAME=$hostname;" .
           "PORT=$port; " .
           "PROTOCOL=TCPIP; " .
           "UID=$user;" .
           "PWD=$password;";
$ssl_dsn = "DATABASE=$database; " .
           "HOSTNAME=$hostname;" .
           "PORT=$ssl_port; " .
           "PROTOCOL=TCPIP; " .
           "UID=$user;" .
           "PWD=$password;" .
           "SECURITY=SSL;";
           
          
$conn_string = $driver . $dsn;     # Non-SSL
#echo "non - " , $conn_string ;
#$conn_string = $driver . $ssl_dsn; # SSL
$conn_string = $dsn;     # simple
echo $conn_string ;

# Connect
# $conn = odbc_connect( $conn_string, "", "" );
$conn = ( $conn_string);
if( $conn )
{
    echo "Connection succeeded.";

    # Disconnect
    #odbc_close( $conn );
        
}
else
{
    echo "Connection failed.";
}
?>
