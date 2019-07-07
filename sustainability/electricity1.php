<html>
<body>


<?php
//use SimpleExcel\SimpleExcel;
require_once('./SimpleExcel/SimpleExcel.php');
//$data = new Spreadsheet_Excel_Reader();
//$data->setOutputEncoding('CP1251');
//print_r ($data);
//$excel = new SimpleExcel('xml');                    // instantiate new object (will automatically construct the parser & writer type as XML)

// $excel->parser->loadFile('data.xml');            // load an XML file from server to be parsed

// $foo = $excel->parser->getField();                  // get complete array of the table
// $bar = $excel->parser->getRow(3);                   // get specific array from the specified row (3rd row)
// $baz = $excel->parser->getColumn(4);                // get specific array from the specified column (4th row)
// $qux = $excel->parser->getCell(2,1);                // get specific data from the specified cell (2nd row in 1st column)

// echo '<pre>';
// print_r($foo);                                      // echo the array
// echo '</pre>';
//Open our CSV file using the fopen function.
$fh = fopen("data1.csv", "r");

//Setup a PHP array to hold our CSV rows.
$csvData = array();

//Loop through the rows in our CSV file and add them to
//the PHP array that we created above.
while (($row = fgetcsv($fh, 0, ",")) !== FALSE) {
    $csvData[] = $row;
}

//$ymd = DateTime::createFromFormat('d/m/y', $csvData[$i][5])->format('d-m-y');
//echo $ymd;
//Finally, encode our array into a JSON string format so that we can print it out.
//echo count($csvData);
$TimeWithDefaultStartDate=0;
$TimeWithoutDefaultStartDate=0;
$totalTime=0;

function getHours(Array $csvData,$day,$bldg){
for ($i=1;$i<count($csvData);$i++){
   // echo '<br>';
   //$startDate=$csvData[$i][5];
   //$startDate=DateTime::createFromFormat('d/m/y', $csvData[$i][5])->format('Y-m-d');
   //$endDate=$csvData[$i][6];
   //$endDate=DateTime::createFromFormat('d/m/y', $csvData[$i][6])->format('Y-m-d');
   $days=$csvData[$i][5];
   $startTime=strtotime($csvData[$i][6]);
   $endTime=strtotime($csvData[$i][7]);
   $building=$csvData[$i][8];
   //$date1 = new DateTime($startDate);
   //$date2 = new DateTime($endDate);
   $defaultStartDate=DateTime::createFromFormat('d/m/y', '22/01/19')->format('Y-m-d');
  // echo "dsdadada".strlen($days)."<br>";
   //$totalDaysBetweenStartAndEndDate = $date1->diff($date2);
    // if($startDate==$defaultStartDate)
    // {
        for($j=0;$j<strlen($days);$j++)
        {
        if($days[$j]==$day){
      //      echo $startDate."         ";
        //    echo $endDate;
        // echo "    ".round($difference->days/7);
      //  echo "      $days";
    // $weeksPerSemester=round($totalDaysBetweenStartAndEndDate->days/7);
    if (strpos($building, $bldg) !== false) {
        //echo 'true';
        $totalTime=abs(($endTime-$startTime)/60);//*$weeksPerSemester;
       //echo $totalTime."     ".$building;
       //echo "      ".$days;
       $TimeWithDefaultStartDate+=$totalTime;
        //echo '<br>';
    }
       
        }
        }
   // }
    // else
    // {
    //     for($j=0;$j<strlen($days);$j++)
    //     {
    //     if($days[$j]==$day)
    //     {
    //    // echo $startDate."   ".$endDate."   ".round($difference->days/7);
    //    $weeksPerSemester=round($totalDaysBetweenStartAndEndDate->days/7);
    //     $totalTime=abs(($endTime-$startTime)/60);//*$weeksPerSemester;
    //     $TimeWithoutDefaultStartDate+=$totalTime;
    //     echo "      $days";
    //     echo '<br>';
    //     }
    // }
    // }

}
//$totalTime=($TimeWithDefaultStartDate+$TimeWithoutDefaultStartDate)/60;
$totalTime=$TimeWithDefaultStartDate/60;
return round($totalTime,2);
}

// R is Thursday 
// TR is Tuesday and Thursday
 //echo json_encode($csvData);
//echo round($totalMondayTime,2);
//echo getHours($csvData,"M","FA")." Hours <br>";
echo getHours($csvData,$_POST["day"],$_POST["building"])." Hours <br>";

//echo getHours($csvData,"S")-getHours($csvData,"U");

?>
</body>

    </html>