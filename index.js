var base64 = require('base-64');
var utf8 = require('utf8');
var math = require('mathjs');
var express = require('express');
var app = express();



//route handling
app.get('/calculus', function (req, res) {

	//check for valid input
	if(!('query' in req.query) || req.query.query === ""){
		res.json({"error": true, "message": "Missing or empty query parameter!"});
	}

	//base64 decode
	var decoded = handleBase64(req.query.query)
	if (decoded.error) {res.json(decoded)}

	//math expression evaluation.
	var result = matheval(decoded.text)
	if (result.error) {res.json(result)}

	//check for allowed operations
	var finalResult = checkAllowedOperations(decoded.text)
	if (!finalResult){res.json({"error": true, "message": "Illegal math operation!"})}

	//everything ok
  	res.json({"error": false, "result": result.result});
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

function handleBase64(query){
	//handle base64 decoding
	try {
		var bytes = base64.decode(query);
		var text = utf8.decode(bytes);
	}catch(e){
		return {"error": true, "message": "BASE64 decoding failed!"}
	}
	text = text.replace(" ", "");
	return {"error": false, "text": text}
}

function matheval(text){
	try {
		var result = math.eval(text);
	}catch(e){
		return {"error": true, "message": "Math expression is incorrect!"}	
	}
	return {"error": false, "result": result}
}

//start http at port 80 or let Heroku decide
var server = app.listen(process.env.PORT || 80, function () {
  var host = server.address().address;
  var port = server.address().port;
});
