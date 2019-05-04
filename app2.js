const http = require( 'http' );
const hostname = 'localhost';
const port = 3011;

var friendLists = require( "./friends2.json" );
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
	+		'<h1>App2.js</h1>'
	+		'<p>Current time is: ' + date + '</p>'
	);

	// friends!
	response.write(
	
			'<table class="table table-bordered table-hover">'
			// table head
		+	'<thead>'
		+		'<tr>'
		+			'<th scope="col">First Name</th>'
		+			'<th scope="col">Last Name</th>'
		+			'<th scope="col">Phone</th>'
		+			'<th scope="col">Gender</th>'
		+		'</tr>'
		+	'</thead>'
			// table body
		+	'<tbody>'
	);

	// Some helper functions
	// (I found it easier to code in something like type info for variable names o.O)
	
	function writeFriendsJSON( jObj ){
		for( el in jObj ){
			if( el === "boys" ){
				writeFriendsList( jObj[ el ], "male" );
			}
			else if( el === "girls" ){
				writeFriendsList( jObj[ el ], "female" );
			}
			else {
				writeFriendsList( jObj[ el ], "" );
			}
		}
	}

	function writeFriendsList( list, gender ){
		for( record in list ){
			r = list[ record ];
			r.gender = gender;
			writeFriendRecord( r );
		}
	}

	function writeFriendRecord( record ){
		response.write( '<tr>' );

		for( var key in record ){
			response.write( '<td>' + record[ key ] + '</td>' );
		}
		response.write( '</tr>' );
	}

	writeFriendsJSON( friendLists );

	response.write(

			'</tbody>'
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