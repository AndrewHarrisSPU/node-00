const http = require( 'http' );
const hostname = 'localhost';
const port = 3011;

var friends = require( "./friends.json" );
var bootstrapLink = '<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">';

const server = http.createServer(( request, response ) => {
	response.statusCode = 200;
	response.setHeader( 'Content-type', 'text/html' );

	var date = new Date();

	// head
	response.write(

		'<!DOCTYPE html>'
	+	'<html>'
	+	'<head>'
	+		'<meta charset="utf­-8">'
	+    	'<meta http-equiv="X-UA-Compatible" content="IE=edge">'
	+		'<meta name="viewport" content="width=device-width, initial-scale=1">\n'
	+		'<meta name="description" content="Home Page">'
	+		'<meta name="author" content="Andrew Harris">'
	+		'<title>A Node App</title>'
	+		bootstrapLink
	+	'</head>'
	);

	// body
	// opening
	response.write(

		'<body>'
	+		'<div class="container" style="text-align: center">'
	+		'<p>Current time is: ' + date + '</p>'
	);

	// friends!
	function writeFriends() {
		for( var key in friends )
			for( var f in friends[ key ])
				response.write(

						'<tr>'
					+	'<td>' + friends[ key ][ f ][ "firstName" ] + '</td>'
					+	'<td>' + friends[ key ][ f ][ "lastName" ] + '</td>'
					+	'<td>' + friends[ key ][ f ][ "phone" ] + '</td>'
					+	'<td>' + friends[ key ][ f ][ "gender" ] + '</td>'
					+	'</tr>'
				);
	}

	response.write(
	
			'<table class="table table-bordered table-hover">',
			// head
		+	'<thead>'
		+		'<tr>'
		+			'<th scope="col">First Name</th>'
		+			'<th scope="col">Last Name</th>'
		+			'<th scope="col">Phone</th>'
		+		'</tr>'
		+	'</thead>'
			//body
		+	'<tbody>'
	);

	writeFriends();

	response.write(
		+	'</tbody>'
		+	'</table>'
	);

	// (closing)
	response.write(

		'</body>'
	+	'</html>'
	);
	response.end();
});

server.listen( port, hostname, () => {
	console.log( `Server running at http://${hostname}:${port}/` )
});