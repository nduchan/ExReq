var http_url = "http://certifiedtest.me";
var https_url = "https://certifiedtest.me";

var json_uri = "/json/test.json";
var jsonp_uri = "/jsonp/test.json";
var img_uri = "/img/test.png";

var logging_uri = "/log";

function test_suite(url, testname){
	load_external_img(url, img_uri, function(){log(testname + "_IMG", "could_load");}, function(){log(testname + "_IMG", "could_not_load");});
	load_cors_js(url, json_uri, function(){log(testname + "_CORS", "could_load");}, function(){log(testname + "_CORS", "could_not_load");});
	load_js_jsonp(url, jsonp_uri, function(){log(testname + "_JSONP", "could_load");}, function(){log(testname + "_JSONP", "could_not_load");});
}
