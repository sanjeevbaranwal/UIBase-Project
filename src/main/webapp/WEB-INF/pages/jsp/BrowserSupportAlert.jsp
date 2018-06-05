<!doctype html>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@page session="true"%>

<html lang="en">
<head>
  <meta charset="utf-8">
  <title>NgGenie Support - Alerts</title>
</head>
<script>
function msieversion() {
    var ua = window.navigator.userAgent;                                      
    var msie = ua.indexOf("MSIE ");
    if (msie > 0)
    {      // If Internet Explorer, return version number
	      var version = parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)));
	      document.getElementById("divBrowserVersion").innerHTML = version;
	      //alert(version);
/* 	      if(version < 10)
	      {
	      	//alert('Sorry we are not supporting this version of Internet browser');
	      	window.location="BrowserSupportAlert"
	      		
	      } */       
     }      
}
</script>
<body onload="msieversion()" style="background-color: #759AB3;">

<div>
	<div id="divBrowser" style="font-family: verdana; margin-left: 10%;color: #863629;">
		<!-- Your current browser version is on <label id="divBrowserVersion"></label>, Please change the compatibility setting or upgrade your browser version.<br>
		For best viewed use IE10 and above, Mozilla Firefox, Google Chrome V.34 and above. Copyright @2015 Wipro Ltd. All Rights reserved -->
		Your current browser version is IE <label id="divBrowserVersion"></label>.<br> 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-	If your IE version is 11, please uncheck the option "Display all websites in Compatibility view" at Tools -> Compatibility View setting.<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-	If your IE version is lower than IE10, please upgrade it to IE10 or above.<br><br>

Best viewed in IE11, Mozilla Firefox and Google Chrome V.34 & above. Copyright @2015 Wipro Ltd. All Rights reserved
		
	</div>
</div>

</body>
</html>