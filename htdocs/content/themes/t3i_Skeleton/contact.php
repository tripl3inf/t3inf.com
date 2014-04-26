<?php

// Here we get all the information from the fields sent over by the form.
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

	$to = 'tripl3infinity@gmail.com';
	$subject = 'the subject';
	$message = 'FROM: '.$name.' Email: '.$email.'Message: '.$message;
	$headers = 'From: contact@tripl3inf.com' . "\r\n";

if (filter_var($email, FILTER_VALIDATE_EMAIL)) { // this line checks that we have a valid email address
    mail($to, $subject, $message, $headers); //This method sends the mail.
	echo '<h2 id="formSuccessMsg">Got it! <br /> <span>I\'ll get back to you right away...<span></h2>'; // success message


}else{
	echo "Please provide a correct email address.";
}







?>