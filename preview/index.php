<?php

// log all the requests POST Data in a log file
$logFile = 'data/data.txt';
$requestData = file_get_contents($logFile);
//pretify json
$requestData = json_decode($requestData, JSON_PRETTY_PRINT);

$markdown = end($requestData);


preg_match('/```json(.*?)```/s', $markdown, $matches);

// Check if we found a match
if (isset($matches[1])) {
    // Get the content inside the json markdown block
    $jsonString = trim($matches[1]);

    // Decode the JSON
    $data = json_decode($jsonString, true);

    // Output the JSON data or HTML content
    if ($data) {
        echo ($data['html']);
    } else {
        echo "Error: Invalid Data.";
    }
} else {
    echo "No data block found.";
}





// print_r($cleanedString);

// print_r($requestData);
?>
<script>
    window.addEventListener("message", (event) => {
        if (event.origin !== "http://localhost:3000") return; // Don't trust strangers, babe

        if (event.data?.type === "reload-preview") {
            window.location.reload(); // This reloads itself safely
        }
    });
</script>