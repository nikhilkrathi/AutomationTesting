var express = require('express');
var fs = require('fs');
const async = require('async');
var beautify = require('js-beautify').js;
var app = express();
var templateEngine = require('./templateEngine.js');
var connection = require('./db.js');
var needReport = false; //false if report not needed
var testNumber;
var result;

connection.connect(function(error){
	if(!!error){
		console.log('Error');
	} else{
		console.log('Connected');
	}
});

var fetchFromDB = function (result, testNumber, req, res){
	return new Promise ( (resolve, reject) => {
		resolve([result, testNumber, req, res]);
	});
}

var afterFetching = function(result){
		result = result + templateEngine.getPostTestCode();
		result = beautify(result, { indent_size: 2, space_in_empty_paren: true });
		fs.writeFile('Output.java', result, (err) => {
			if (err) throw err;
		});
		return result;
} 


var fetchTestCase = function(testNumber) {
	return new Promise( (resolve, reject) => {
		connection.query(`SELECT * FROM tc1`, (error, rows, fields) => {	
		if(error){
			console.log("Error in query");
			reject("Error in query");
		} else {
			let result = "" + templateEngine.getStartTestCode(`${testNumber}`);	//testNumber value increments in case of multiple tables i.e multuple test cases. Default value = 1
			for (var i = 0; i < rows.length; i++){
				result = result + templateEngine.getTestCode(rows[i]);					
			}
			result = result + templateEngine.getEndTestCode();
			resolve([result, testNumber]);
		}
		});
	});
}

app.get('/', function(req, res) {

	if(needReport == false) {
		res.send("Hi!!!!");
		let result = templateEngine.getImportStatements() + templateEngine.getPreTestCode();
		//get list of all the tables for all tests for a user. Set testNumber = Number of tests
		let testNumber = 2;
		let promises = [];
		let promise = null;
		while(testNumber > 0) {
			promise = fetchTestCase(testNumber);
			promises.push(promise);
			testNumber -= 1;
			
		}

		Promise.all(promises)
			.then((results) => {
				let finalResult = "";
				finalResult = templateEngine.getImportStatements() + templateEngine.getPreTestCode();

				for(let temp of results) {
					[result, testNumber] = temp;
					finalResult += result;
				}
				return finalResult;
			}).then((result) => {
				result = afterFetching(result);
			}).catch(() => {
				//TODO: write error handling code here
			});

			//NOTE: Using async await
			// (async function() {
			// 	let finalResult = "";
			// 	finalResult = templateEngine.getImportStatements() + templateEngine.getPreTestCode();
			// 	let testNumber = 2;
			// 	while(testNumber > 0) {
			// 		let temp = await fetchTestCase(testNumber);
			// 		[result, testNumber] = temp;
			// 		finalResult += result;
			// 		testNumber -= 1;
			// 	}
			// 	finalResult = afterFetching(finalResult);
			// 	console.log("-----987654321-------===="+finalResult);
			// })();
	} else {

	}
});

app.listen(1337);