<?php

function get_MY_connect($sql) {
    // MYSQL config

    $db = mysqli_connect("server11.hxx", "hypo_usr", "Txx", "hypo");
    if (mysqli_connect_errno()) {
        printf("Verbindung fehlgeschlagen: %s", mysqli_connect_error());
        exit();
    }
    
    $sql = "select * from hp_objekt";
    $result = mysqli_query($db, $sql) ;

    echo '<br>$result($sql)' . $sql;
  
}
?>
