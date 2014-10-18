<?
	// This is where you would put your DB queries

	// Did the query succeed? (hardcoded for testing)
	$success = 1;

	// Return a response
	if ($success){
		$response['message'] = 'success';
		$response['details'] = '';
	}else{
		$response['message'] = 'failure';
		$response['details'] = 'Shit broke';
	}
	// Return the response
	echo json_encode($response);
	// print_r($_GET);
?>