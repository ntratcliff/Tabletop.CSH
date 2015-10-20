<?php

// Ajax Request Proxy for Google Forms
// Author: Steven Mirabito <smirabito@csh.rit.edu>

$postURL = 'https://docs.google.com/forms/d/1K0ohoAFxozQpW7niuqLWCPOvkTW53unOeVfK_7c8Zps/formResponse';
$post = $_POST;

if(!$post){
    $response = json_encode(array('success' => false, 'error' => 'No form data received.'));
} else {
    $ch = curl_init($postURL);

    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_HEADER, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);

    $response = curl_exec($ch);
    curl_close($ch);
}

print($response);

?>