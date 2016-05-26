//js
function log(method, state){
	//$.post("https://www.censys.io/api/v1/client_test/{testname}", JSON.stringify(stateJSON));

	var http = new XMLHttpRequest();
	var url = "http://certifiedtest.me/log";
	var params = state; 
	http.open("POST", url, true);

	var debug = method + "      **      ";
	params = debug + params;

	console.log(params);

	//Send the proper header information along with the request
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	//http.setRequestHeader("Content-length", params.length);
	//http.setRequestHeader("Connection", "close");

	http.onreadystatechange = function() {
		if(http.readyState == 4 && http.status == 200) {
					//alert(http.responseText);
						}
	}
	http.send(params);
}

function load_external_img(arg_url, arg_resource, fn_success, fn_fail){ 
	var img = document.createElement("img");
	img.src = arg_url + arg_resource;
	img.hidden = true;

	img.onload=function(){
		fn_success();
		clearTimeout(imgTimeout);
	};

	var imgTimeout = setTimeout(fn_fail, 5000);

}

function load_cors_js(arg_url, arg_resource, fn_success, fn_fail){
	var createCORSRequest = function(method, url) {
		var xhr = new XMLHttpRequest();
		if ("withCredentials" in xhr) {
			// Most browsers.
			xhr.open(method, url, true);
		} else if (typeof XDomainRequest != "undefined") {
			// IE8 & IE9
			xhr = new XDomainRequest();
			xhr.open(method, url);
		} else {
			// CORS not supported.
			xhr = null;
		}
		return xhr;
	};

	var url = arg_url + arg_resource;
	var method = 'GET';
	var xhr = createCORSRequest(method, url);

	xhr.onload = function(request){
		fn_success();
	};

	xhr.onerror = function(request){
		fn_fail();
	};

	xhr.send();
}


//TODO set timeouts on logs and fix calls
function jsonp_callback(data){
	console.log(data);
	jsonp_result_global = "success";
}

function load_js_jsonp(arg_url, arg_resource, fn_success, fn_fail){
	var xmlHttp = new XMLHttpRequest();

	xmlHttp.open("GET", arg_url + arg_resource + "?callback=jsonp_callback", true);

	xmlHttp.onreadystatechange=function(){
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
			clearTimeout(xmlHttpTimeout); 
			fn_success();
		}
	}
	xmlHttp.send("");
	var xmlHttpTimeout=setTimeout(ajaxTimeout,5000);
	function ajaxTimeout(){
		xmlHttp.abort();
		fn_fail();
	}
}

