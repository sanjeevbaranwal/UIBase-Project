<!doctype html>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@page session="true"%>

<html lang="en">
<head>
  <meta charset="utf-8">
  <title>NgGenie Support - Alerts</title>

  <!-- <script src="//code.jquery.com/jquery-1.10.2.js"></script>
  <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script> -->
  <link rel="stylesheet" href="resources/style.css">  
  <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css"> 
 <!------------  for chart------------ -->
 <script type="text/javascript" src="resources/canvasjs.min.js"></script> 
 <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
<script src="//cdn.jsdelivr.net/excanvas/r3/excanvas.js" type="text/javascript"></script>
<script src="//cdn.jsdelivr.net/chart.js/0./Chart.js" type="text/javascript"></script>
 <!------------ Including jQuery Date UI with CSS -------------->
	<script src="http://code.jquery.com/jquery-1.10.2.js"></script>
	<script src="http://code.jquery.com/ui/1.11.0/jquery-ui.js"></script>
	<link rel="stylesheet" href="http://code.jquery.com/ui/1.11.0/themes/smoothness/jquery-ui.css">
<!-- jQuery Code executes on Date Format option ----->

</head>
<style>

.chartCss{
		-webkit-box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.43);
		-moz-box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.43);
		box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.43);
		border-radius: 10px 10px 10px 10px;
		-moz-border-radius: 10px 10px 10px 10px;
		-webkit-border-radius: 10px 10px 10px 10px;
		border: 0px solid #000000;
	}
	.red {
		width:100px;
		height:20px;
		color:#FFF;
		text-shadow:-1px -1px 0 #A84155;
		background: #D25068;
		border:1px solid #D25068;
		
		background-image:-webkit-linear-gradient(top, #F66C7B, #D25068);
		background-image:-moz-linear-gradient(top, #F66C7B, #D25068);
		background-image:-ms-linear-gradient(top, #F66C7B, #D25068);
		background-image:-o-linear-gradient(top, #F66C7B, #D25068);
		background-image:linear-gradient(to bottom, #F66C7B, #D25068);
		
		-webkit-border-radius:5px;
		-moz-border-radius:5px;
		border-radius:5px;
		
		-webkit-box-shadow:0 1px 0 rgba(255, 255, 255, .5) inset, 0 -1px 0 rgba(255, 255, 255, .1) inset, 0 4px 0 #AD4257, 0 4px 2px rgba(0, 0, 0, .5);
		-moz-box-shadow:0 1px 0 rgba(255, 255, 255, .5) inset, 0 -1px 0 rgba(255, 255, 255, .1) inset, 0 4px 0 #AD4257, 0 4px 2px rgba(0, 0, 0, .5);
		box-shadow:0 1px 0 rgba(255, 255, 255, .5) inset, 0 -1px 0 rgba(255, 255, 255, .1) inset, 0 4px 0 #AD4257, 0 4px 2px rgba(0, 0, 0, .5);
	}
	
	.red:hover {
		background: #F66C7B;
		background-image:-webkit-linear-gradient(top, #D25068, #F66C7B);
		background-image:-moz-linear-gradient(top, #D25068, #F66C7B);
		background-image:-ms-linear-gradient(top, #D25068, #F66C7B);
		background-image:-o-linear-gradient(top, #D25068, #F66C7B);
		background-image:linear-gradient(top, #D25068, #F66C7B);
	}
	.headerGradient{
		background: #000D13;
		background: -moz-linear-gradient(top, #000D13 0%, #003E7C 100%);
		background: -webkit-gradient(left top, left bottom, color-stop(0%, #000D13), colorstop(100%, #003E7C));
		background: -webkit-linear-gradient(top, #000D13 0%, #003E7C 100%);
		background: -o-linear-gradient(top, #000D13 0%, #003E7C 100%);
		background: -ms-linear-gradient(top, #000D13 0%, #003E7C 100%);
		background: linear-gradient(to bottom, #000D13 0%, #003E7C 100%);
	}
</style>

<script>

function enabletxt(count){
//	alert(document.getElementById("img"+count).src)
	var imgCap = document.getElementById("img"+count);
	if(imgCap.src.toUpperCase().indexOf('EDIT') > 0){
//		alert('edit')
		imgCap.src="resources/images/save.png";
		document.getElementById('txt'+count).readOnly=false;
		document.getElementById('txt'+count).focus();
		document.getElementById('chk'+count).disabled = false;
/*		document.getElementById('bt'+count).value="Save"; 
		document.getElementById('bt'+count).style.color="white"; 
		document.getElementById('bt'+count).style.background="linear-gradient(to bottom, #FF3333 0%, #FF6A00 100%)";
		document.getElementById('bt'+count).style.color="rgb(255, 255, 255);"*/
		document.getElementById('txt'+count).style.width=100;
	}
	else if(imgCap.src.toUpperCase().indexOf('SAVE')  > 0){
//		alert('save')
		imgCap.src="resources/images/edit.jpg";
		//		document.getElementById('bt'+count).value="Edit"; 
		document.getElementById('txt'+count).readOnly=true;
		document.getElementById('chk'+count).disabled = false;
//		document.getElementById('bt'+count).style.color="red"; 
/*		document.getElementById('bt'+count).style.background="linear-gradient(to bottom, #00aaff 0%, #09539d 100%)";
		document.getElementById('bt'+count).style.color="rgb(255, 255, 255);"*/

		var alertKey =document.getElementById('hid'+count).value;
		var message=document.getElementById('txt'+count).value;
		var active=document.getElementById('chk'+count).checked;
		saveAlert(alertKey, message,active);

	}
}
function enabletxt1(count){
	alert("edit")

	var btCap = document.getElementById('bt'+count).value;
	if(btCap == 'Edit'){
		document.getElementById('txt'+count).readOnly=false;
		document.getElementById('txt'+count).focus();
		document.getElementById('chk'+count).disabled = false;
		document.getElementById('bt'+count).value="Save"; 
		document.getElementById('bt'+count).style.color="white"; 
		document.getElementById('bt'+count).style.background="linear-gradient(to bottom, #FF3333 0%, #FF6A00 100%)";
		document.getElementById('bt'+count).style.color="rgb(255, 255, 255);"
		document.getElementById('txt'+count).style.width=100;
	}
	else if(btCap == 'Save'){
		document.getElementById('bt'+count).value="Edit"; 
		document.getElementById('txt'+count).readOnly=true;
		document.getElementById('chk'+count).disabled = false;
//		document.getElementById('bt'+count).style.color="red"; 
		document.getElementById('bt'+count).style.background="linear-gradient(to bottom, #00aaff 0%, #09539d 100%)";
		document.getElementById('bt'+count).style.color="rgb(255, 255, 255);"

		var alertKey =document.getElementById('hid'+count).value;
		var message=document.getElementById('txt'+count).value;
		var active=document.getElementById('chk'+count).checked;
		saveAlert(alertKey, message,active);
	}
}
function saveAlert(alertKey, message,active){
	//alert('saveAlert  ' + alertKey +'->'+ message+'->'+active)
	var dataStr = alertKey + '@#@'+message + "@#@"+active;
	try{
			$.ajax({
	          url: "manageActiveMessages",
	          type: 'POST',        
	          data: JSON.stringify(dataStr), 
	          cache:false,
	          beforeSend: function(xhr) {  
	              xhr.setRequestHeader("Accept", "application/json");  
	              xhr.setRequestHeader("Content-Type", "application/json");  
	          },       
	          success:function(response){
	        	  getActiveMessages();
				
	          },
	          error : function(xhr, status, error) {
	        	  //alert(xhr.responseText);
	        	  //alert('error')
	        	  var str = xhr.responseText;
					alert(str)
					getActiveMessages();
					
	          }
	        });
		 }
		 catch(err) {
		        //alert(err);
		 }

}
function addNewMessage(){
	var	alertKey ='0';
	var message = document.getElementById('newMsg').value;
	var active = document.getElementById('newchkbox').checked;
	if(message == ''){
		alert("Please Enter message");
		document.getElementById('newMsg').focus();
		return;
	}
	saveAlert(alertKey, message,active);
	$('#addMessage').empty();
	//getActiveMessages();
	//location.reload();
}

function deleteMessage(keyVal){
	//alert(' KeyVal ' + keyVal)
		//alert("delete")
	var retVal = confirm("Do you want to delete this message ?");
	if (retVal == true)
    {
		try{
				$.ajax({
		          url: "deleteAlertMessage",
		          type: 'POST',        
		          data: JSON.stringify(keyVal), 
		          cache:false,
		          beforeSend: function(xhr) {  
		              xhr.setRequestHeader("Accept", "application/json");  
		              xhr.setRequestHeader("Content-Type", "application/json");  
		          },       
		          success:function(response){
		        	  getActiveMessages();
					
		          },
		          error : function(xhr, status, error) {
		        	  //alert(xhr.responseText);
		        	  //alert('error')
		        	  var str = xhr.responseText;
						alert(str)
						getActiveMessages();
						
		          }
		        });
			 }
			 catch(err) {
			        //alert(err);
		 }
    }
}
function showNewMessage(){
	var count=0;
	$.each(JSON.parse($("#alertMessages").val()), function(idx, obj) {
		count=count+1;
	});
//	alert(count)
	if(count==7){
		alert("You have exceeded alert message limit.\nPlease delete old messages and try to add new message.")
		return;
	}
	
	var res	='<center><table border="1" width="75%"  cellpadding="2px" style="border: 2px #00aaff solid;">';
	res += '<tr style="background: linear-gradient(to bottom, #00aaff 0%, #09539d 100%); color: rgb(255, 255, 255);">';
	res += '<td align="center"><font face="verdana" color="#FFFFFF"  size="2">Message Desc</td>';
	res += '<td align="center"><font face="verdana" color="#FFFFFF"  size="2">Active</td>';
	res += '<td align="center"><font face="verdana" color="#FFFFFF"  size="2">Save</td>';
	res += '</tr>';
	res += '<tr bgcolor="#FFFFFF">';
//	res += '<td><input type="text" id="newMsg"</td>';
	res += '<td><textarea rows="5" cols="75" id="newMsg"></textarea>';
	res += '<td align="center"><input type=checkbox id="newchkbox"></td>';
//	res	+= '<td align="center"><input type=button value="Save" style="background: linear-gradient(to bottom, #00aaff 0%, #09539d 100%); color: rgb(255, 255, 255);" onclick=addNewMessage()></td>';
	res	+= '<td align="center"> <a href="#" onclick=addNewMessage()><img src="resources/images/save.png" alt="Edit" title="Add Message" height="20" width="20" ></a></td>';
	res += '</tr>';
	res	+='</table>'
	res += '</br>';;
	$('#addMessage').html(res);
	document.getElementById('newMsg').focus();
//	alert('end')
}


function getActiveMessages(){
	setHeight();
	try{
	      $.ajax({
	          url: "getAllMessages",
	          type: 'POST',        
	          cache:false,
	          beforeSend: function(xhr) {  
	              xhr.setRequestHeader("Accept", "application/json");  
	              xhr.setRequestHeader("Content-Type", "application/json");  
	          },       
	          success:function(response){
				var count=0;

				$("#alertMessages").val(JSON.stringify(response));	
				var res	='<center><table width="80%" cellpadding="2px" style="border: 2px #000D13 solid;">';
				res += '<tr style="background: linear-gradient(to bottom, #000D13 0%, #000D13 100%); color: rgb(255, 255, 255);">';
				res += '<td align="center"><font face="verdana" color="#FFFFFF"  size="2">Sr.no</td>';
				res += '<td align="center"><font face="verdana" color="#FFFFFF"  size="2">Alert Message Description</td>';
				res += '<td align="center"><font face="verdana" color="#FFFFFF"  size="2">Active</td>';
				res += '<td align="center"><font face="verdana" color="#FFFFFF"  size="2">Created Date</td>';
				res += '<td align="center"><font face="verdana" color="#FFFFFF"  size="2">Modified Date</td>';
				res += '<td align="center"><font face="verdana" color="#FFFFFF"  size="2">Actions</td>';
				//res += '<td align="center"><font face="verdana" color="#FFFFFF"  size="2">Edit/Save Message</td>';
				//res += '<td align="center"><font face="verdana" color="#FFFFFF"  size="2">Delete  Message</td>';
				res += '</tr>';
				$.each(JSON.parse($("#alertMessages").val()), function(idx, obj) {
					res += '<tr bgcolor="#FFFFFF">';
					count=count+1;
					res = res + '<td align="center"><font face="verdana" color="#2c2c2c"  size="2">' + (count) +'</td>';
//					res = res + '<td><input type="text" id="txt'+count+'" value="' + obj.message+'" readonly></td>';
					var alertMsg = obj.message.replace(/\\n/g, "<br/>");
					res = res + '<td><textarea rows="3" cols="75" class="chartCss" id="txt'+count+'" readonly>' + alertMsg +'</textarea>';
					  
					if(obj.isActive == '1'){
						res = res + '<td align="center"><input type=checkbox  id="chk'+count+'" checked disabled="disabled"></td>';
					}
					else{
						res = res + '<td align="center"><input type=checkbox  id="chk'+count+'" disabled="disabled"></td>';
					}
					var cdate="";
					var mdate="";
					
					if(obj.hasOwnProperty("createdDate")){
						cdate=obj.createdDate;
						cdate=cdate.replace(/T/g, " ").substring(0,16);
					}
					else{
						cdate="-";
					}
					if(obj.hasOwnProperty("modifiedDate")){
						mdate= obj.modifiedDate;
						mdate= mdate.replace(/T/g, " ").substring(0,16);
					}
					else{
						mdate="-";
					}

					res = res + '<td align="center"><font face="verdana" color="#2c2c2c"  size="2">' + cdate +'</td>';
					res = res + '<td align="center"><font face="verdana" color="#2c2c2c"  size="2">' + mdate +'</td>';
					res=res+ '<td align="center"><a id="a'+count+'" href="#" onclick="enabletxt('+count+')"><img src="resources/images/edit.jpg" id="img'+count+'" alt="Edit" title="Edit/Save Message" height="20" width="20" ></img></a> &nbsp;&nbsp;&nbsp;';
					res=res+ '<a href="#" onclick="deleteMessage('+ obj.alertKey +')"><img src="resources/images/delete.jpg" alt="Edit" title="Delete Message" height="20" width="20" ></td>';
					//res=res+ '<td align="center"><a id="a'+count+'" href="#" onclick="enabletxt('+count+')"><img src="resources/images/edit.jpg" id="img'+count+'" alt="Edit" title="Edit/Save Message" height="20" width="20" ></img></a></td>';
					//res=res+ '<td align="center"><a href="#" onclick="deleteMessage('+ obj.alertKey +')"><img src="resources/images/delete.jpg" alt="Edit" title="Delete Message" height="20" width="20" ></td>';

					<!-- res=res+ '<td align="center"><input type=button id="bt'+count+'" value="Edit" onclick=enabletxt('+count+') style="background: linear-gradient(to bottom, #00aaff 0%, #09539d 100%); color: rgb(255, 255, 255);"></td>';-->
					<!-- res=res+ '<td align="center"><input type=button   id="bt'+count+'" value="Delete" onclick="deleteMessage('+ obj.alertKey +')" style="background: linear-gradient(to bottom, #00aaff 0%, #09539d 100%); color: rgb(255, 255, 255);"></td>'; -->

					res += '</tr>';
					res += '<input type=hidden  id="hid'+count+'" value="' + obj.alertKey+'">'
					
				});
				res += '</table>';
				res += '<p><p><table cellpadding="2px">';
				res += '<tr>';
				res += '<td>';
				res += '<a href="#" onclick="showNewMessage()"><img src="resources/images/add.jpg" alt="Add" title="Add Message" height="20" width="20" >'
				res += '</td>';
				res += '<td>';
				res += '<a href="#" onclick="clearNewMessage()"><img src="resources/images/clear.jpg" alt="clear" title="Clear Message" height="20" width="20" >'
				res += '</td>';
				res += '</tr>';
				res += '</table>';
				
//				res += '<p><p><input type=button   id="AddNewMessage" value="Add New Message" onclick=showNewMessage() style="background: linear-gradient(to bottom, #00aaff 0%, #09539d 100%); color: rgb(255, 255, 255);">';
//				res += '&nbsp;&nbsp;&nbsp;&nbsp;';
//				res += '<input type=button   id="clear" value="Clear New Message" onclick=clearNewMessage() style="background: linear-gradient(to bottom, #00aaff 0%, #09539d 100%); color: rgb(255, 255, 255);">';
				$('#showMessages').html(res);
	          },
	          error : function(xhr, status, error) {
	        	  alert('error')
	        	  var str = xhr.responseText;
	          }
	        });
		 }
		 catch(err) {
		        //alert(err);
		 }
}


function setHeight(){
	var h=window.innerHeight;
	$("#showMessage").height( ((h/10)*9 )-70);

}

function clearNewMessage(){
	$('#addMessage').empty();
}
</script>
<body onload="getActiveMessages()" bgcolor="#E8E8E8">

<form:form commandName="messageBean" method="post" action="" >
<table width="100%" border="0"  cellspacing="0" cellpadding="0" class="bodybackground" bgcolor="#E8E8E8"  >
	<!--  Header view -->
	<tr id="headerRow" class="headerGradient" >
		<td>
		<br>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			
			<font face="verdana" color="white"  size="5">&nbsp;&nbsp;&nbsp;&nbsp;ngGenie ABC Limited </font>
			<font face="verdana" color="white"  size="3">Dash board </font><p><p>
			
		</td>
		<td align="right">
		<c:if test="${pageContext.request.userPrincipal.name != null}">
			<font face="verdana" color="white"  size="3">
				Welcome : <label id="userName">${userId}</label> | <a
					href="<c:url value="j_spring_security_logout" />" ><font face="verdana" color="Red"  size="2">Logout</font></a>
					&nbsp;&nbsp;&nbsp;&nbsp;
			</font>
			
		</c:if>	
		</td>
	</tr>
	<tr>
	<td colspan=2 id="menuheader" class="headerGradient">
	<font face="verdana" color="white"  size="2">&nbsp;&nbsp;&nbsp;&nbsp; Home | Online Services | Special Offers |  <a  href="#"  onclick="parent.location='admin'" style="color:white ">Admin Page</a></font>
	</td>
	</tr>
	<tr  class="chartCss" BGCOLOR="#E8E8E8">
		<td  colspan=2 >
			<br>
			<div id="showMessage"  style=" overflow-y: scroll;" >
			<div id="showMessages" ></div>
			<div id="addMessage" ></div>
			</div>
			<form:hidden path="alertMessages" id="alertMessages"/>
		</td>
	</tr>
		<!--  footer view -->
	<tr class="headerGradient" >
		<td align="center"  colspan=2 >
			
			<font face="verdana" color="white"  size="1"><font face="verdana" color="white"  size="2">ABC GROUP COM | CAREERS | TERMS AND CONDITIONS | KEY POLICIES & COMMITMENTS | PRIVACY SECURITY | SITE MAP</font>
		</td>	
	</tr>
	
</table>
	
	
	
<!-- <input type="button" class="red" name="viewReportBtn" value="Back to Admin Page " onclick="parent.location='admin'"/>  
	<center><font face="verdana" color="#2c2c2c"  size="4">Add / Update Alerts </font>	<center>-->
	
</form:form>  
</body>
</html>