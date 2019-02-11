var express = require('express');
var fs = require('fs');
var beautify = require('js-beautify').js;
var app = express();
var templateEngine = require('./templateEngine.js');
var connection = require('./db.js');
var result = templateEngine.beforeString();

connection.connect(function(error){
	if(!!error){
		console.log('Error');
	} else{
		console.log('Connected');
	}
});

app.get('/', function(req, res){
	connection.query("SELECT * FROM tc1", function(error, rows, fields){	
		if(!!error){
			console.log("Error in query");
		} else {
			res.send("Hi " + rows[0].targetval);
			for (var i = 0; i < rows.length; i++){
				result = result + templateEngine.templateString(rows[i]) + '\n';				
			}
			result = result + templateEngine.afterString();
			result = beautify(result, { indent_size: 2, space_in_empty_paren: true });
			fs.writeFile('Output.java', result, (err) => {
				if (err) throw err;
			});
		}
	});
});

app.listen(1337);