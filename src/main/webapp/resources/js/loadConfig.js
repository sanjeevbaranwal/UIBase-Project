//var myurl='http://52.7.133.111/demo2ce/';
//Use above line when deploying the application on AWS or something and
//comment below line and the code inside loadconfig() function.
var myurl;

function loadConfig() {
	$.ajax({
		url : "resources/config/js/webConfig.xml",
		dataType : "text",
		success : function(data) {
			var xml = data;
			var xmlDoc = $.parseXML(xml);
			var $xml = $(xmlDoc);
			var $configuration = $xml.find("configuration");

			$configuration.each(function() {
				var name = $(this).find('DeploymentType').text();
				var ceurl = $(this).find('ceurl').find(name).text();
				myurl = ceurl;
			});
		}
	});
	
}

function getconfigParam(param) {
	var paramval;
	$.ajax({
		url : "resources/config/js/webConfig.xml",
		dataType : "text",
		async: false,
		success : function(data) {
			var xml = data;
			var xmlDoc = $.parseXML(xml);
			var $xml = $(xmlDoc);
			var $configuration = $xml.find("configuration");

			$configuration.each(function() {
				var name = $(this).find('DeploymentType').text();
				paramval = $(this).find(param).find(name).text();
			});
		}
	});
	
	return paramval;
	
}

function getURLParameter(sParam){
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++){
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam){
            return sParameterName[1];
        }
    }
}
