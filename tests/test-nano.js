// Test our understanding of nano
var docId = "56d8e35efaa2604f06173dc5";

var nano = require("nano")("http://localhost:5984");
var test1 = nano.use("test1");
test1.get(docId, function(err, body, header) {
	dump(err, body, header);
	console.log("Got something!");
});
console.log("test-nanon: Core completed");

function dump(err, body, header) {
  console.log("err: " + JSON.stringify(err) + "\nbody: " + JSON.stringify(body) + "\nheader: " + JSON.stringify(header));
}