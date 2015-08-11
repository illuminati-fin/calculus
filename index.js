var base64 = require('base-64');
var utf8 = require('utf8');
var math = require('mathjs');
var express = require('express');
var app = express();



//route handling
app.get('/calculus', function (req, res) {

	//handle base64 decoding
	try {
		var bytes = base64.decode(req.query.query);
		var text = utf8.decode(bytes);
	}catch(e){
		res.json({"error": true, "message": "BASE64 decoding failed!"});
	}
	text = text.replace(" ", "");
	
	//math expression evaluation. Reverse Polish Notation
	try {
		var result = math.eval(text);
	}catch(e){
		res.json({"error": true, "message": "Math expression is incorrect!"});	
	}

	//check for allowed operations
	var finalResult = checkAllowedOperations(text)
	if (!finalResult){
		res.json({"error": true, "message": "Illegal math operation!"});	
	}

	//everything ok
  	res.json({"error": false, "result": result});
});



var allowed = ["+", "-", "*", "/", "(", ")"]

function checkAllowedOperations(mathtext){
	for (var i = 0; i < mathtext.length; i++){
		if (isNaN(mathtext.charAt(i)) && allowed.indexOf(mathtext.charAt(i)) === -1) {
			return false
		}
	}
	return true
}

//start http at port 80
var server = app.listen(process.env.PORT || 80, function () {
  var host = server.address().address;
  var port = server.address().port;
});
