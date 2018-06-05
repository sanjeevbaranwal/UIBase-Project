document.writeln("<script type='text/javascript' src='resources/js/loadConfig.js'></script>");
//document.writeln("<script type='text/javascript' src='resources/js/jquery-1.11.3.js'></script>");
 document.writeln("<script type='text/javascript' src='resources/js/adminchatxmpp.js'></script>");
 document.writeln("<script type='text/javascript' src='resources/js/jquery.xmpp.js'></script>");
//document.writeln("<script type='text/javascript' src='resources/jquery-ui.js'></script>");
//document.writeln("<script type='text/javascript' language='Javascript' src='https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.21/jquery-ui.min.js'></script>");

var activeNavBar = "present";
var myurl = localStorage.getItem( 'globalCEUrl');
 function showChangePasswordModal(){
	//$('#myModal').css('display','block');
	$("#mynewModal").fadeIn(600);
	$('#currentPassword').css('border','');
	$('#currentPassAlert').hide();
	$('#newPassword').css('border','');
	$('#newPassAlert').hide(); 
	$('#confirmPassword').css('border','');
	$('#confirmPassAlert').hide();
}
function closePasswordModel(){
	//$('#myModal').css('display','none');
	$("#mynewModal").fadeOut(600);
}
$( function() {
    $( "#myModal" ).draggable();
  } );
 /*$(function() {
		var h=window.innerHeight-115;
		var w=((window.innerWidth/10 )*3);
		//var map = $('#map');
		var mw =  $( "#myModal" ).width();
		var mh =  $( "#myModal" ).height();
		var x1 = -mw + w;
		var y1 = -mh + h;
		map.draggable({containment:[x1,y1,0,0]});
	});*/
/* Tree Population Code*/
var parentNode = "";
var expandFlag = false;
var endConversationFlag=false;
var closeWindowFlag=false;
var endChatWithAgent=false;
var loggedInFullName="";
var totalQueries=0;
/*map used to store agent names*/
var myMap=new Map();
var refreshInterval='';
//var parentNode ="";
/*$(document).ready(function(){
	//First call the tree data to create data object completely.
	populateAllTreeNodeData();
	setTimeout(function(){
		createTreeView(expandFlag);
	}, 2000);
});*/
/*function call on click of OK*/
function selectedCategoryName(p_node){
	var categoryName=p_node.text;
	parentNode=p_node;
}

/**
 * This function is used when you want to load the childs on click on + button.
 * */
/*function populateTreeNodeData(nodeName) {
	//alert('working ... name is - ' + nodeName);
	//alert(myurl);
	var tempURL = myurl + 'getResolutionForSubClasses/' + nodeName;
	$.ajax({
		url : tempURL,
		type : 'POST',
		data : '',
		cache : false,
		beforeSend : function(xhr) {
			//xhr.setRequestHeader("Accept", "application/json");  
			//xhr.setRequestHeader("Content-Type", "application/json");  
		},
		success : function(response) {
			//alert('response - ' + response);
			//var resVal = JSON.stringify(response);
			//alert('resVal - '+resVal);
			jsonData = response;
			expandFlag = true;
			//createTreeView(expandFlag);
		},
		error : function(xhr, status, error) {
			alert(xhr.responseText);
		}
	});
}*/

/**
 * This function is used when you want to load the all the childs at a time.
 * */
/*function populateAllTreeNodeData() {
	//alert('working ... name is - ' + nodeName);
	//alert(myurl);
	var tempURL = myurl + 'fetchTreeData';
	$.ajax({
		url : tempURL,
		type : 'POST',
		data : '',
		cache : false,
		beforeSend : function(xhr) {
			//xhr.setRequestHeader("Accept", "application/json");  
			//xhr.setRequestHeader("Content-Type", "application/json");  
		},
		success : function(response) {
			//var resVal = JSON.stringify(response);
			jsonData = response;
			expandFlag = true;
			//createTreeView(expandFlag);
		},
		error : function(xhr, status, error) {
			alert(xhr.responseText);
		}
	});
}*/

/**
 * This function is used to create a tree view.
 * */
/*function createTreeView(expandFlag) {
	var activeNode;
	var isFolder = false;

	$("#btnClose").click(function(e) {
		HideDialog();
		e.preventDefault();
	});

	$("#btnSubmit").click(
		function(e) {
			var name = document.getElementById("namearea").value;
			if (isFolder)
				activeNode.createChildNode(name, true,
						'resources/images/blue_key.png', null,
						'context1');
			else
				activeNode.createChildNode(name, true,
						'resources/images/key_green.png', null,
						'context1');
			HideDialog();
	});

	//Initializing Tree Context Menu Structure
	var contex_menu = {
		'context1' : {
			elements : [ {
				text : 'Add SubCategory',
				icon : 'resources/images/blue_key.png',
				action : function(node) {
				 parentNode=node.text;
					//alert(parentNode);
					$('#expandTreeCategory').html('<div style="width: 99%;height: 99%;float: right;border: solid 1px black;"> <div style="width: 98%;height: 98%;float: right;margin-left: -19%;border= solid 1px grey;"> <table id="def" style="height:100%;width: 99%;"> <tbody> <tr> <td style="width: 90%;"> <div><font style="color:mediumblue;">Sub Category Name</font><div><br> <textarea placeholder="Sub Category Name" style="resize :none;width: 100%;font-family: calibri;font-size: 15px;" rows="2" cols="30" id="categoryName_id" onkeyup="PlaceHolderChange();"/> </td> </tr> <tr> <td style="width: 90%;"> <div><font style="color:mediumblue;">Definition</font></div><br><textarea placeholder="Type definition of....." style="resize :none;width: 100%;font-family: calibri;font-size: 15px;" rows="4" cols="30" id="definitionName_id"/> </td> </tr> <tr style="display:none;"> <td> <div><font style="color:mediumblue;">identifier</font></div><textarea placeholder="identifier" style="resize :none;width: 100%;font-family: calibri;font-size: 15px;" rows="2" cols="30" id="identifierName_id"/> </td> </tr> <tr style="display:none;"> <td> <div><font style="color:mediumblue;">nameToShow</font></div><textarea placeholder="nameToShow" style="resize :none;width: 100%;font-family: calibri;font-size: 15px;" rows="1" cols="30" id="nameToShowName_id"/> </td> </tr> <tr style="display:none;"> <td> <div><font style="color:mediumblue;">specialCaseKeys</font></div><textarea placeholder="specialCaseKeys" style="resize :none;width: 100%;font-family: calibri;font-size: 15px;" rows="1" cols="30" id="specialCaseKeysName_id"/> </td> </tr> <tr> <td> <button type="submit" onclick="AddCategorysubmitfunction()" style="border-radius: 6px; float:right;background: #3885D2;color: white;font-size: 15px;border: 1px solid black; height:50px; width:150px">Submit</button> </td> </tr> </tbody> </table> </div> </div>');
					$('#expandTree').hide();
					$('#expandTreeCategory').show();
					//alert(node.text+".................!");
				}
			}]
		}
	};

	//Creating the tree
	tree = createTree('div_tree', 'white', contex_menu);

	div_log = document.getElementById('div_log');

	//Setting custom events
	tree.nodeBeforeOpenEvent = function(node) {
		div_log.innerHTML += node.text + ': Before expand event<br/>';
	}

	tree.nodeAfterOpenEvent = function(node) {
		div_log.innerHTML += node.text + ': After expand event<br/>';
	}

	tree.nodeBeforeCloseEvent = function(node) {
		div_log.innerHTML += node.text + ': Before collapse event<br/>';
	}
	
	//alert('In function before create tree - jsondata is - ' + jsonData);
	var obj = JSON.parse(jsonData);
	
	//If you want to exapnd tree at load then make expandFlag to true.
	node1 = tree.createNode('Categories', expandFlag, 'resources/images/star.png', null, null, 'context1');
	//alert(obj['1']["children"]);
	//var childs = obj['1']["children"].split(',');
	
	//obj[key] - from where it consider it as root.
	var childs = obj['Categories']["children"].split(',');
	if (childs[0] != "") {
		for (var i = 0; i < childs.length; i++) {
			node2 = node1.createChildNode(obj[childs[i]]["text"], true,	'resources/images/blue_key.png', null, 'context1');
			var subchilds = obj[childs[i]]["children"].split(',');
			if (subchilds[0] != "") {
				renderChildrens(obj, node2, subchilds);
			}
		}
	}
	//Rendering the tree
	tree.drawTree();
	$("#divLoading").hide();
}
*/
/*function renderChildrens(obj, pnode, childs) {
	for (var i = 0; i < childs.length; i++) {
		cnode = pnode.createChildNode(obj[childs[i]]["text"], true,
				'resources/images/blue_key.png', null, 'context1');
		var sub = obj[childs[i]]["children"].split(',');
		if (sub[0] != "")
			renderChildrens(obj, cnode, sub);
	}
}*/

/*function ShowDialog(modal) {
	$("#overlay").show();
	$("#dialog").fadeIn(300);

	if (modal) {
		$("#overlay").unbind("click");
	} else {
		$("#overlay").click(function(e) {
			HideDialog();
		});
	}
}*/

/*function HideDialog() {
	$("#overlay").hide();
	$("#dialog").fadeOut(300);
}*/
/*tree population code*/

function setScreenValues(){
	loadConfig();
	var h=window.innerHeight-115;
	var w=((window.innerWidth/10 )*3)

	$("#headerRow").height(85);		
	$("#headerRow").width(w);
	$("#menuheader").height(25);
	$("#headerRow").width(w);
	$("#tabRow").height( (h/10)*8);
	$("#tabRow").width(w);
	$("#tabRow1").height( $("#tabRow").height()+20);
	//$("#tabRow1").width($("#tabRow").width()-10);
	$("#sltbl").height( $("#tabRow").height()+5);
	$("#sltbl").width($("#tabRow").width()+8);
	$(".tab-content").height( $("#sltbl").height()-33);
	
	$("#imgLogo").attr("src", "resources/images/ngGenieLogo.png");
	$("#imgLogo").css("height", '60%');
	onLoaddialogHide();
	$("#dialog").dialog({ 
		autoOpen: false ,
		dialogClass: 'myTitleClass'
	});
	/*setTimeout(function(){
		loadAllSL();
		
	}, 1000);*/
}

function setScreenValuesforLogin(){
	var h=window.innerHeight-100;//50;
	var w=((window.innerWidth/10 )*3)

	$("#headerRow").height(85);		
	$("#headerRow").width(w);
	$("#menuheader").height(25);
	$("#headerRow").width(w);
	$("#tabRow").height( (h/10)*8);
	$("#tabRow").width(w);
	$("#tabRow1").height( $("#tabRow").height()-10);
	$("#tabRow1").width($("#tabRow").width()-10);
	$("#sltbl").height( $("#tabRow").height()-10);
	$("#sltbl").width($("#tabRow").width()-10);
	$("#imgLogo").attr("src", "resources/images/ngGenieLogo.png");
	$("#imgLogo").css("width", 150);
}
function loadAllSL(){
	var attended=0;
	var unAttended=0;
	var userId = $('#loginusername').val();

	//$("#sltbl").empty();
	$.ajax({
		url: myurl+"getAllSLDataByStatus/"+userId+"/"+activeNavBar,
        type: 'POST',        
        data: '', 
        cache:false,
        beforeSend: function(xhr) {  
            xhr.setRequestHeader("Accept", "application/json");  
            xhr.setRequestHeader("Content-Type", "application/json");  
        },       
        success:function(response){ 
			
		  	var resVal = JSON.stringify(response);
		  	var attendedhtmlText=''; var count=1;
			var slNoUnattended=1;
			var slNoAttended=1;
			var unAttendedhtmlText='';
		  	var allUserUtterance='';
		  	
			/*creating attended queries table header*/
		  	attendedhtmlText += '<table class="table table-hover table-striped table-fixed">';
		  	attendedhtmlText += '<thead><tr>';
		  	attendedhtmlText += '<th width="5%"><font face="arial" size="2" colo="#2c2c2c"><b>Sr.no</font></td>';
		  	attendedhtmlText += '<th width="35%"><font face="arial" size="2" color="#2c2c2c" ><b>Failed Utterances	</font></td>';
		  	attendedhtmlText += '<th width="25%"><font face="arial" size="2" color="#2c2c2c" ><b>Failure Reason</font></td>';
		  	attendedhtmlText += '<th width="12%"><font face="arial" size="2" color="#2c2c2c" ><b>Agent </font></td>';
		  	attendedhtmlText += '<th width="15%"><font face="arial" size="2" color="#2c2c2c" ><b>Action</font></td>';
		  	attendedhtmlText += '</thead></tr>';
			/*ending attended queries table header*/
			
			/*creating attended queries table header*/
		  	unAttendedhtmlText += '<table class="table table-hover table-striped table-fixed">';
		  	unAttendedhtmlText += '<thead><tr>';
		  	unAttendedhtmlText += '<th width="5%"><font face="arial" size="2" colo="#2c2c2c"><b>Sr.no</font></td>';
		  	unAttendedhtmlText += '<th width="35%"><font face="arial" size="2" color="#2c2c2c" ><b>Failed Utterances	</font></td>';
		  	unAttendedhtmlText += '<th width="25%"><font face="arial" size="2" color="#2c2c2c" ><b>Failure Reason</font></td>';
		  	unAttendedhtmlText += '<th width="12%"><font face="arial" size="2" color="#2c2c2c" ><b>Agent </font></td>';
		  	unAttendedhtmlText += '<th width="15%"><font face="arial" size="2" color="#2c2c2c" ><b>Action</font></td>';
		  	unAttendedhtmlText += '</thead></tr>';
			/*ending attended queries table header*/
		  	$.each(JSON.parse(resVal), function(idx, obj) {
				
				if(obj.UDF1 == 'Read'){
					
						attendedhtmlText += '<input type="hidden" id="inputText' + count +'" value="'+ obj.userUtterance +'">';
						attendedhtmlText += '<input type="hidden" id="transId' + count +'" value="'+ obj.transactionId +'">';
						attendedhtmlText += '<input type="hidden" id="userId' + count +'" value="'+ "" +'">';
						attendedhtmlText += '<input type="hidden" id="userName' + count +'" value="'+ "" +'">';
						attendedhtmlText += '<input type="hidden" id="ontologyNode' + count +'" value="'+ obj.ontologyNode +'">';
						attendedhtmlText += '<input type="hidden" id="questionNode' + count +'" value="'+ obj.questionNode +'">';
						attendedhtmlText += '<input type="hidden" id="recWords' + count +'" value="'+ obj.UDF2 +'">';
						attendedhtmlText += '<input type="hidden" id="ontologyFileName' + count +'" value="'+ obj.ontologyFileName +'">';
						
						attendedhtmlText += '<tr bgcolor="#FFFFFF">';
						attendedhtmlText += '<td><font face="arial" size="2">' + slNoAttended + '</font></td>';
						attendedhtmlText += '<td style="word-wrap: break-word;"><font face="arial" size="2">'+ obj.userUtterance +'</font></td>';
						attendedhtmlText += '<td style="word-wrap: break-word;"><font face="arial" size="2">'+ obj.reason +'</font></td>';
						
						attended++;
						attendedhtmlText += '<td style="word-wrap: break-word;"><font face="arial" size="2">'+""+'</font><img id="callImage' + count +'" src="resources/images/CC-Icon-Gray.png" style="width: 12%;margin-left: 5%;/* align-content: center; */" title="Call done with '+""+' ">';
						
						if(obj.reason == 'Knowledge is not found')
						{
							
							attendedhtmlText += '<td style="word-wrap: break-word;"><img id="delImage"  onclick="removeSelectedRow('+count+')" src="resources/images/Delete2.png" style="width: 12%;margin-left: 55%;/* align-content: center; */" title="Click Here to Delete "> ';
						}
						else
						{
							
							attendedhtmlText += '<td style="word-wrap: break-word;"><img id="addImage"  onclick="addNewNode('+count+')" src="resources/images/Add2.png" style="width: 12%;margin-left: 20%;/* align-content: center; */" title="Click Here to Add "> <img id="delImage"  onclick="removeSelectedRow('+count+')" src="resources/images/Delete2.png" style="width: 12%;margin-left: 20%;/* align-content: center; */" title="Click Here to Delete "> ';
						}
						attendedhtmlText += '</td></tr>';
						
						count++;
						slNoAttended++;
					
					
				}
				else{
					
				
					unAttendedhtmlText += '<input type="hidden" id="inputText' + count +'" value="'+ obj.userUtterance +'">';
					unAttendedhtmlText += '<input type="hidden" id="transId' + count +'" value="'+ obj.transactionId +'">';
					unAttendedhtmlText += '<input type="hidden" id="userId' + count +'" value="'+ "" +'">';
					unAttendedhtmlText += '<input type="hidden" id="userName' + count +'" value="'+ "" +'">';
					unAttendedhtmlText += '<input type="hidden" id="ontologyNode' + count +'" value="'+ obj.ontologyNode +'">';
					unAttendedhtmlText += '<input type="hidden" id="questionNode' + count +'" value="'+ obj.questionNode +'">';
					unAttendedhtmlText += '<input type="hidden" id="recWords' + count +'" value="'+ obj.UDF2 +'">';
					unAttendedhtmlText += '<input type="hidden" id="ontologyFileName' + count +'" value="'+ obj.ontologyFileName +'">';
					
					unAttendedhtmlText += '<tr bgcolor="#FFFFFF">';
					unAttendedhtmlText += '<td><font face="arial" size="2">' + slNoUnattended + '</font></td>';
					unAttendedhtmlText += '<td style="word-wrap: break-word;"><font face="arial" size="2">'+ obj.userUtterance +'</font></td>';
					unAttendedhtmlText += '<td style="word-wrap: break-word;"><font face="arial" size="2">'+ obj.reason +'</font></td>';
					
					
					unAttended++;
					unAttendedhtmlText += '<td style="word-wrap: break-word;"><font face="arial" size="2">'+""+'</font><img id="callImage' + count +'"  onclick="addReadStatus('+count+')" src="resources/images/CC-Icon-Blue.png" style="width: 12%;margin-left: 5%;/* align-content: center; */" title="Click here to call '+""+' ">'
					
					if(obj.reason == 'Knowledge is not found')
					{
						
						unAttendedhtmlText += '<td style="word-wrap: break-word;"><img id="delImage"  onclick="removeSelectedRow('+count+')" src="resources/images/Delete2.png" style="width: 12%;margin-left: 55%;/* align-content: center; */" title="Click Here to Delete "> '
					}
					else
					{
						
						unAttendedhtmlText += '<td style="word-wrap: break-word;"><img id="addImage"  onclick="addNewNode('+count+')" src="resources/images/Add2.png" style="width: 12%;margin-left: 20%;/* align-content: center; */" title="Click Here to Add "> <img id="delImage"  onclick="removeSelectedRow('+count+')" src="resources/images/Delete2.png" style="width: 12%;margin-left: 20%;/* align-content: center; */" title="Click Here to Delete "> '
					}
					unAttendedhtmlText += '</td></tr>';
					
					count++;
					slNoUnattended++;
				}
				
				
		  		/*htmlText += '<input type="hidden" id="inputText' + count +'" value="'+ obj.userUtterance +'">';
		  		htmlText += '<input type="hidden" id="transId' + count +'" value="'+ obj.transactionId +'">';
				htmlText += '<input type="hidden" id="userId' + count +'" value="'+ obj.user.fullname +'">';
				htmlText += '<input type="hidden" id="userName' + count +'" value="'+ obj.user.username +'">';
		  		htmlText += '<input type="hidden" id="ontologyNode' + count +'" value="'+ obj.ontologyNode +'">';
		  		htmlText += '<input type="hidden" id="questionNode' + count +'" value="'+ obj.questionNode +'">';
		  		htmlText += '<input type="hidden" id="recWords' + count +'" value="'+ obj.UDF2 +'">';
		  		htmlText += '<input type="hidden" id="ontologyFileName' + count +'" value="'+ obj.ontologyFileName +'">';
		  		
		  		htmlText += '<tr bgcolor="#FFFFFF">';
		  		htmlText += '<td><font face="arial" size="2">' + count + '</font></td>';
		  		htmlText += '<td style="word-wrap: break-word;"><font face="arial" size="2">'+ obj.userUtterance +'</font></td>';
		  		htmlText += '<td style="word-wrap: break-word;"><font face="arial" size="2">'+ obj.reason +'</font></td>';
		  		
				if(obj.UDF1 == 'Read'){
					attended++;
					htmlText += '<td style="word-wrap: break-word;"><font face="arial" size="2">'+obj.user.fullname+'</font><img id="callImage' + count +'" src="resources/images/CC-Icon-Gray.png" style="width: 12%;margin-left: 5%;" title="Call done with '+obj.user.fullname+' ">'
				}else {
					unAttended++;
					htmlText += '<td style="word-wrap: break-word;"><font face="arial" size="2">'+obj.user.fullname+'</font><img id="callImage' + count +'"  onclick="addReadStatus('+count+')" src="resources/images/CC-Icon-Blue.png" style="width: 12%;margin-left: 5%;" title="Click here to call '+obj.user.fullname+' ">'
				}
				if(obj.reason == 'Knowledge is not found')
				{
					
					htmlText += '<td style="word-wrap: break-word;"><img id="delImage"  onclick="removeSelectedRow('+count+')" src="resources/images/Delete2.png" style="width: 12%;margin-left: 55%;" title="Click Here to Delete "> '
				}
				else
				{
					
					htmlText += '<td style="word-wrap: break-word;"><img id="addImage"  onclick="addNewNode('+count+')" src="resources/images/Add2.png" style="width: 12%;margin-left: 20%;" title="Click Here to Add "> <img id="delImage"  onclick="removeSelectedRow('+count+')" src="resources/images/Delete2.png" style="width: 12%;margin-left: 20%;" title="Click Here to Delete "> '
				}
		  		htmlText += '</td></tr>';
		  		
				count++;*/
			});
			attendedhtmlText += '</table>';
			
			unAttendedhtmlText +='</table>';
			
			//$("#past1").empty();
			//$("#present1").empty();
			$('#unAttendedCollapseToday').empty();
			$('#attendedCollapseToday').empty();
			$('#unAttendedCollapsePast').empty();
			$('#attendedCollapsePast').empty();
			
			if(activeNavBar == 'present' ){
				$('#todaysStatus').text('Todays Status: You have '+unAttended +' unattended queries');
				//$("#present1").html(htmlText);
				$('#unAttendedCollapseToday').html(unAttendedhtmlText);
				$('#attendedCollapseToday').html(attendedhtmlText);
			}else{
				
				//$("#past1").html(htmlText);
				$('#unAttendedCollapsePast').html(unAttendedhtmlText);
				$('#attendedCollapsePast').html(attendedhtmlText);
				$('#divLoading').hide();
			}
			
			
		  	
		  	$("#rowcount").val(count);
			if(activeNavBar!='past'){
				if(totalQueries==0){
					totalQueries=response.length;			
				}	
				if(response.length>totalQueries){
					var d=response.length-totalQueries;
					$('#chatAudio').remove();
					totalQueries=response.length;	
					$.notify({
							// options
							icon: 'fa fa-bell',
							title: '<strong>Attention Please :</strong>',
							message: d+' new request(s) added <br>'+unAttended+' request(s) are still pending with you',
						},
						{
							// settings
							element: 'body',
							type: "info",
							allow_dismiss: true,
							newest_on_top: true,
							offset: 20,
							spacing: 10,
							z_index: 1031,
							delay: 14000,//time after these many seconds the notification disappears
							timer: 500,//time for appearing of notification
							url_target: '_blank',
							mouse_over: null,
							animate: {
								enter: 'animated fadeInDown',
								exit: 'animated fadeOutUp'
							}
						});	
						$('<audio id="chatAudio"><source src="resources/jingle-bells-sms.mp3" type="audio/mpeg"><source src="resources/jingle-bells-sms.wav" type="audio/wav"></audio>').appendTo('body');
						$('#chatAudio')[0].play();
				}
			}
		  	//loadAppNames();
        },
		error : function(xhr, status, error) {
			alert(xhr.responseText+" inside error!!!!!!!!!!!!!!!");
		}
	 });
	 return true;
}
function minimizeWindow(){
	//$("#myModal").css("display","none");
	$("#myModal").fadeOut(600);
}
function onLoaddialogHide(){
	 $("#alertDialog").dialog({
		autoOpen : false,
	dialogClass : 'myTitleClass'
	 }); 
}
function closeWindow() {
	
	if(myMap.size>1){
		$("#alertDialog").dialog('open'); 
			closeWindowFlag=true;
			ChangeMessage("Please close all agent tabs one by one");
			$('.ui-dialog-titlebar-close').hide();
			closeWindowFlag=false;
	}
	else{
		closeChatWindow();
	}
	
			/*setTimeout(function() {
				$("#alertDialog").dialog("close");
				
		}, 3000);	*/
/*
	 if (confirm('All The Conversations will be wiped out. Are you sure, you want to close?')) {
        	
			//$("#myModal").css("display","none");
			$("#myModal").fadeOut(600);
			 setTimeout(function(){ 
							$('.msg_body').remove();
							myMap.clear();
					 }, 600);
			
    }*/

    //modal.style.display = "none";
}

function changeCloseImg()
	{
	var close=document.getElementById("closeJS");
	$('.chatBox').css('visibility','hidden');
	}
	function showDiv()
	{
	$('.chatBox').css('visibility','visible');
	}
$( document ).ready(function() {
	setScreenValues();
	setTimeout(function(){ 
		if(activeNavBar=='present'){
			//$('.unAttendedPanel').height('425px');
			$('.unAttendedPanel').height($(".tab-content").height()-120);
			
		}
	}, 100);
	
	loggedInFullName=$('#loginfullname').val();
	console.log($.fn.jquery);
   //setInterval(refreshPartial, 20000);
   /*browser dependent refreshing*/
    
	// Internet Explorer 6-11
	var isIE = /*@cc_on!@*/false || !!document.documentMode;
	var isEdge = !isIE && !!window.StyleMedia;
	
	if(isIE || isEdge){
		refreshInterval=setInterval(refreshPartial, 20000);
	}
	else{
		refreshInterval=setInterval(refreshPartial, 15000);
	}
	
   loadAllSL();
    $('#liveChatBtn').hide();
	$('#liveChatBtn').click(function(){
		$("#myModal").fadeIn(600);
		//alert('myMap.size>1...'+myMap.size);
	});
	
		$(".collapse.in").each(function(){
        	$(this).siblings(".panel-heading").find(".glyphicon").addClass("glyphicon-chevron-up").removeClass("glyphicon-chevron-down");
			//$('.unAttendedPanel').height('450px');
        });
        
        // Toggle up down icon on show hide of collapse element
        $(".collapse").on('show.bs.collapse', function(){
        	$(this).parent().find(".glyphicon").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
			$('.attendedPanel').height($(".tab-content").height()-120);
        });
		$(".collapse").on('hide.bs.collapse', function(){
        	$(this).parent().find(".glyphicon").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
		
        });
    
});

$(function() {
$('#userText').keydown(function(e) {
    if (e.keyCode === 13) {
       if($('#userText').val()!=0){
			openAdminOpChat();
		}
		$(this).val('').focus();
			 return false;
        
    }        
});
}); 
function sendQuery(){
	if($('#userText').val()!=0){
			openAdminOpChat();
		}
		$(this).val('').focus();
			 return false;
             
}


function checkNavChange(e) {
   
   activeNavBar =  e.target.id;
   if(activeNavBar=='past'){
	   $('.unAttendedPanel').height($(".tab-content").height()-120);
	   $('#divLoading').show();
	   clearInterval(refreshInterval);
   }
   else{
	    /*browser dependent refreshing*/
    
	// Internet Explorer 6-11
	var isIE = /*@cc_on!@*/false || !!document.documentMode;
	var isEdge = !isIE && !!window.StyleMedia;
	
	if(isIE || isEdge){
		refreshInterval=setInterval(refreshPartial, 20000);
	}
	else{
		refreshInterval=setInterval(refreshPartial, 15000);
	}
	
   /*browser dependent refreshing*/
   }
  loadAllSL(); 
  
}
 

function getActiveNavBar(){
	return $('li.active a').attr('href');
}
function refreshPartial() {
	//alert('function called after ');
	if(activeNavBar != 'past'){
		loadAllSL();
	}
	
}

/* 
function messageFromChat()
{

//$('<div class="msg_a">'+"dhasvd"+'</div>').insertBefore('.msg_push');
//$('.msg_body').scrollTop($('.msg_body')[0].scrollHeight);

} */

	function sendMessage()
	{
	 var msg =$('.inputBox').val();
	  if(msg!='')
			 {
			$('<div class="msg_b">'+msg+'</div>').insertBefore('.msg_push');
			$('.msg_body').scrollTop($('.msg_body')[0].scrollHeight);
			$('.inputBox').val("");
			e.preventDefault();
			messageFromChat();
			 }
	
	}

function popUp(count){
	
	//$('.msg_body').remove();
	$('#div_Contact').empty();
		var userId = $("#userName"+count).val();
		var transactionId=$('#transId'+count).val();
		var fullName= $("#userId"+count).val();
		var initialMsgSent=false;
		//alert(transactionId);
		var obj={transactionId:transactionId,fullName:fullName,initialMsgSent:initialMsgSent};
		myMap.set(userId,obj);
		myMap.forEach(logMapElements);
	
	//$("#myModal").css("display","block");
	$("#myModal").fadeIn(600);
	if(myMap.size>0){
		$('#liveChatBtn').show();
	}
}

/*function to send message on enter*/
function userMsgSend(e){
	if(e.which==13){
		if($('#userText').val()!=0){
			openAdminOpChat();
		}
	}
}
function EndConversation(chatIdName){
	endConversationFlag=true;
	closeChat(chatIdName);
	endConversationFlag=false;
	//alert("End"+chatIdName);
}

/*function for iterating map elements*/
function logMapElements(value, key, map) {
	var imageId=key+"close";
	var divId=key+"mainDiv";
	var endChatButtonId=key+"closeButton";
	
    //alert(key +'='+ value);
	$('#div_Contact').append('<div class="divClass" id='+divId+' style="background-color:#444753; height:8%; border-bottom:1px solid white;"  onmouseover="changeColor(this);" onmouseout="defaultColor(this);"><div class="contacts_list" id='+key+' style="border-radius:5px; float:left; width:80%; cursor:pointer; margin-top:6%; margin-left:4%; word-wrap:break-word;" onclick="showDiv(this);"><label style="cursor:pointer;">'+value.fullName+'</label></div><div style="float:right; margin-top:6%; margin-right:4%; width:10%; cursor:pointer;"><span id='+imageId+'  class="pull-right fa fa-close" style="font-size:12px;display:none;" onclick="closeChat(this);" title="close chat"></span><span class="fa fa-comments" style="font-size:20px;" onclick="chatDetails(\''+value.transactionId+'\'); return false;" title="chat info"></span></div></div>');
	
	
	var chatDivId=key+"chatDiv";
	var hiddenTransId=key+"TransId";
	if(($("#" + chatDivId).length == 0) || $('#'+hiddenTransId).val()!=value.transactionId){
		//alert('it doesnt exist let it create '+$("#" + chatDivId).length);
		//end chat and opchat history buttons
		/*<button type="button" onclick="OPChatDetails(\''+value.transactionId+'\'); return false;" style="margin: 4%; display:none">Show OP Chat History</button> <button id="endChatButtonId" class="btn btn-danger" type="button" onclick="EndConversation(this);" style="margin: 4%;">End-Chat</button> */
		$('#'+chatDivId).remove();
		$('.messageWrap').prepend('<div class="msg_body" id='+chatDivId+' style="display:none;"><input type="hidden" id="'+hiddenTransId+'" value="'+value.transactionId+'"> <button type="button" class="btn btn-primary" onclick="chatDetails(\''+value.transactionId+'\'); return false;" style="margin: 4%; display:none;">Show Chat History</button> </div>');
		
		//var json = {  "transactionId": value.transactionId};
		/*$.ajax({
			url : myurl + "getOpChatHistory",
			type : 'POST',
			data : JSON.stringify(json),
			cache : false,
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			},
			success : function(response) {
				
				//alert(JsonResponse.responseBy);
				
				for(i=0; i<response.length; i++){
					var JsonResponse = JSON.parse(response[i]);
					if(JsonResponse.responseBy=="SME"){
						$('#'+chatDivId).first().append('<div class="msg_b">'+JsonResponse.response+'</div>');
						$('.msg_body').scrollTop($('.msg_body')[0].scrollHeight);
					}
					else if(JsonResponse.responseBy=="AGENT"){
						$('#'+chatDivId).first().append('<div class="msg_a">'+JsonResponse.response+'</div>');
						$('.msg_body').scrollTop($('.msg_body')[0].scrollHeight);
					}
					
				}
			},
			error:function(response){
				//alert('error');
			}
		});*/
		
	}
	
	
	/*$('.messageWrap').prepend('<div class="msg_body" id='+chatDivId+' style="display:none;"><button type="button" onclick="chatDetails(\''+value+'\'); return false;" style="margin-bottom: 2%;">Show Chat History</button></div>');*/
	//should be inserted after button element if sth wrong with message display  <div class="msg_push"></div>
	$('.msg_body').hide();
	$('#'+key+'chatDiv').show();
	$('#agentId').val(key);
	
	$('#agentNameId').empty();
	$('#agentNameId').append('<label>'+loggedInFullName +', currently chatting with '+ value.fullName+'</label>');
	/*$('#'+key).hover(function(){
		$('#'+key).css('background-color','blue');
	});*/
	$('.divClass').removeClass('activeTab');
	$('#'+key+'mainDiv').addClass('activeTab');
	$('.fa-close').hide();
	$('#'+key+"close").show();
	
	
	/*initial message sending code*/
	var mapValueObj=myMap.get(key);
	if(!mapValueObj.initialMsgSent){
		
		$('#userText').val(loggedInFullName+' has picked your query he will get back to you shortly');
		openAdminOpChat();
		var obj={transactionId:value.transactionId,fullName:value.fullName,initialMsgSent:true};
		myMap.set(key,obj);
	}
	
	
	
}
function closeChat(closeId){
	//alert(closeId.id);
	
	var closeImageId=closeId.id;
	var closeAgentId=closeImageId.substring(0,closeImageId.length-5);
	
	$('#agentId').val(closeAgentId);
	/*endChatWithAgent=true;
	openAdminOpChat();
	endChatWithAgent=false;*/
	//alert(endConversationFlag);
	if(endConversationFlag){
		
			if(myMap.size>1){
			//$("#chatdialog").dialog("close");
			//alert(closeId.id);
				$('#'+closeId+"close").remove();
				var closeDivId=closeId;
				//alert(closeDivId);
				$('#'+closeDivId+'mainDiv').remove();
				$('#'+closeDivId).remove();
				$('#'+closeDivId+'chatDiv').remove();
				if(myMap.delete(closeDivId)){
					endChatWithAgent=true;
				openAdminOpChat();
				endChatWithAgent=false;
					//alert('removed successfully');
					$('.divClass').remove();
					myMap.forEach(logMapElements);
				}
				
			}
			else{
				//alert popup asking for confirmation
				//closeWindow();
				closeChatWindow();
			}
			
	}
	else{
		if(myMap.size>1){
		//$("#chatdialog").dialog("close");
		//alert(closeId.id);
			var chatclose=closeId.id;
			$('#'+chatclose).remove();
			var closeDivId=chatclose.substring(0,chatclose.length-5);
			//alert(closeDivId);
			$('#'+closeDivId+'mainDiv').remove();
			$('#'+closeDivId).remove();
			$('#'+closeDivId+'chatDiv').remove();
			if(myMap.delete(closeDivId)){
				endChatWithAgent=true;
			openAdminOpChat();
			endChatWithAgent=false;
				//alert('removed successfully');
				$('.divClass').remove();
				myMap.forEach(logMapElements);
			}
			
		}
		else{
			//alert popup asking for confirmation
				//closeWindow();
				closeChatWindow();
		}
	}
	//alert(closeId.id);
	/*$("#chatdialog").dialog("close");
	alert(closeId.id);
	var chatclose=closeId.id;
	$('#'+chatclose).remove();
	var closeDivId=chatclose.substring(0,chatclose.length-5);
	alert(closeDivId);
	$('#'+closeDivId+'mainDiv').remove();
	$('#'+closeDivId).remove();
	$('#'+closeDivId+'chatDiv').remove();*/
	//delete myMap[]
	/*if(myMap.size>1){
		//$("#chatdialog").dialog("close");
		//alert(closeId.id);
		var chatclose=closeId.id;
		$('#'+chatclose).remove();
		var closeDivId=chatclose.substring(0,chatclose.length-5);
		//alert(closeDivId);
		$('#'+closeDivId+'mainDiv').remove();
		$('#'+closeDivId).remove();
		$('#'+closeDivId+'chatDiv').remove();
		if(myMap.delete(closeDivId)){
			//alert('removed successfully');
			$('.divClass').remove();
			myMap.forEach(logMapElements);
		}
	}
	else{
		closeWindow();
	}*/
}
function showDiv(divId){
	$('.divClass').removeClass('activeTab');
	var div_id=divId.id;
	var mapValueObj=myMap.get(div_id);
	
	//alert(div_id);
	$('#agentNameId').empty();
	$('#agentNameId').append('<label>'+loggedInFullName +', currently chatting with '+mapValueObj.fullName+'</label>');
	$('#agentId').val(div_id);
	$('.msg_body').hide();
	$('#'+div_id+'chatDiv').show();
	$('#'+div_id+"close").show();
	$('#'+div_id+"mainDiv").addClass('activeTab')
	//$('#'+div_id+"mainDiv").removeAttr('onmouseout');
	//$('#'+div_id+"mainDiv").;
}
function changeColor(id){
	$('#'+id.id).css('background-color','#6A6C75');
	var str=id.id.substring(0,id.id.indexOf('m'));
	//	alert(str);
	$('#'+str+"close").show();
	//$('#'+str+"mainDiv").addClass('')
}
function defaultColor(contactId){
	$('#'+contactId.id).css('background-color','#444753');
	var str=contactId.id.substring(0,contactId.id.indexOf('m'));
	
	if(!$('#'+str+'mainDiv').is('.activeTab')){
		$('#'+str+"close").hide();
	}
	
}
function chatDetails(tid) {
	var html = '';
	try {
		var errorText = '';
		$.ajax({
			url : myurl + "loadChatHistory",
			type : 'POST',
			data : JSON.stringify(tid),
			cache : false,
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			},
			success : function(response) {
				$.ajax({
					url : url,
					type : 'HEAD',
					error : function() {
						alert('error');
					},
					success : function() {
						alert('success');
					}
				});
			},
			error : function(xhr, status, error) {
				var str = xhr.responseText;
	
				$("#chatdialog").dialog({
					width : 500
				});
				$("#chatdialog").dialog({
					height : 600
				});
				$("#chatdialog").css("background-color", "#f4f6f9");
				$("#chatdialog").css("padding", "0px 10px");
				$("#chatdialog").parent().css('max-height','550px');
				$("#chatdialog").css('overflow','auto');
				$("#chatdialog").siblings('div.ui-dialog-titlebar').remove();
				var n = str.length;
				var html = '';
				for (var i = 0; i < n; i++) {
					if (str[i] == '$') {
						
						html += '<br>' + str[i]
						
					} else {
						html += str[i]
						
					}
				}
				// alert(html);
				html = html.replace(/&amp;rsquo;/g, "'");
				html = html.replace(/&amp;rdquo;/g, "\"");
				html = html.replace(/&amp;ldquo;/g, "\"");
				html = html.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;nbsp;/g, " ");
				html = html.replace(/&rsquo;/g, '\"');
				html = html.replace('@MORE_NODE@', 'Genie found more than one resolution to your query. Here is the first resolution.<br><br>');
	
				html = "<table width=100%  height=100% border=0><tr><td height=5% align=right style='background-color:rgba(77, 79, 92, 0.25);'><a href=# onclick='closeChatHistory()'><span class='glyphicon glyphicon-remove' style='font-size: 15px;padding-right: 1%;'></span></a></td></tr>"
						+ "<tr><td height=95%  valign=top>"
						+ html + "</td></tr>" + "</table>";
	
				$("#chatdialog").html('<font face="verdana" color="#A6A6A6"  size="2">' + html + '</font>');
				// $("#chatdialog" ).dialog( "open" );
				/*
				 * $('#chatdialog').dialog({
				 * 
				 * open: function(){ alert('open') var closeBtn =
				 * $('.ui-dialog-titlebar-close'); closeBtn.append('<span
				 * class="ui-button-icon-primary ui-icon
				 * ui-icon-closethick"></span><span
				 * class="ui-button-text">close</span>'); } });
				 */
	
			}

		});
	} catch (err) {
		alert(err);
	}
}
/*function OPChatDetails(tid){
	var html = '';
	var json = {
         "transactionId": "8b315839-5a43-4706-9062-2498f007690c"
     };
		$.ajax({
			url : myurl + "getOpChatHistory",
			type : 'POST',
			data : JSON.stringify(json),
			cache : false,
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			},
			success : function(response) {
				//alert(response.LIVECHATRESPONSE);
				
				
				var str = response.LIVECHATRESPONSE;
				//alert(str);
	
				$("#chatdialog").dialog({
					width : 500
				});
				$("#chatdialog").dialog({
					height : 600
				});
				$("#chatdialog").css("background-color", "white");
				$("#chatdialog").parent().css('max-height','550px');
				$("#chatdialog").css('overflow','auto');
				$("#chatdialog").siblings('div.ui-dialog-titlebar').remove();
				var n = str.length;
				var html = '';
				for (var i = 0; i < n; i++) {
					if (str[i] == '$') {
						html += '<br>' + str[i]
					} else {
						html += str[i]
					}
				}
				// alert(html);
				html = html.replace(/&amp;rsquo;/g, "'");
				html = html.replace(/&amp;rdquo;/g, "\"");
				html = html.replace(/&amp;ldquo;/g, "\"");
				html = html.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;nbsp;/g, " ");
				html = html.replace(/&rsquo;/g, '\"');
				html = html.replace('@MORE_NODE@', 'Genie found more than one resolution to your query. Here is the first resolution.<br><br>');
	
				html = "<table width=100%  height=100% border=0><tr><td height=5% align=right bgcolor=yellow><a href=# onclick='closeChatHistory()'><b><font color=green size=2 > Close</a></td></tr>"
						+ "<tr><td height=95%  valign=top>"
						+ html + "</td></tr>" + "</table>";
	
				$("#chatdialog").html('<font face="verdana" color="#A6A6A6"  size="2">' + html + '</font>');
			},
			error:function(response){
				alert('error');
			}
		});
}*/
function closeChatHistory(){
	$("#chatdialog").dialog("close");
}
/*
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

//text box count to know which tree is getting populated
var textBoxCount='';

// When the user clicks the button, open the modal 
function treePopUp(count){
	textBoxCount=count;
	$("#myModal").css("display","block");
	//$("#myModal").fadeIn(5000);
    //modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
function closeWindow() {
	$("#myModal").css("display","none");
    //modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
		$("#myModal").css("display","none");
        //modal.style.display = "none";
    }
}
function selectedCategory(){
	if(parentNode=="Categories" || parentNode==''){
		alert("please select a valid category name");
		return;
	}
	var appNameId="appName"+textBoxCount;
	$('#'+appNameId).val(parentNode);
	closeWindow();
	getQueByAppName(textBoxCount);
}
*/

/*function loadAppNames() {
	var rcount = $("#rowcount").val();
	for (var i = 1; i < rcount; i++) {
		if ($('#ontologyNode' + i).val().trim() == ''
				|| $('#ontologyNode' + i).val().trim() == 'None of the above') {
			$('#appName' + i).val('');
			// getQueByAppName( i );
			$('#queSelect' + i).empty();
			$('#queSelect' + i).append(
					$(document.createElement("option")).attr("value", 0).text(
							"--- Please select ---"));
			$('#queSelect' + i).attr("disabled", true);
		} else {
			// alert('#appName'+i+" not empty");
			$('#queImage' + i).hide();
			$('#queSelect' + i).empty();
			$('#appName' + i).val($('#ontologyNode' + i).val());
			$('#queSelect' + i).attr("disabled", false);
			getQueByAppName(i);
		}
	}
}*/

/*function getQueByAppName(rowcount){
	//alert(textBoxValue+" !!!!!!!!!!!!!!!!!!!");
	var selectedOption = $('#appName'+rowcount).val();
	var tempURL = myurl +"getAllQUestionsOfaClass/"+selectedOption;
	$.ajax({
        url: tempURL,
        type: 'POST',        
        data: '', 
        cache:false,
        beforeSend: function(xhr) {  
            //xhr.setRequestHeader("Accept", "application/json");  
           // xhr.setRequestHeader("Content-Type", "application/json");  
        },       
        success:function(response){  	
			response=JSON.parse(response);
			var length=response.length;
			for(var k=0; k<1; k++){
				$('#queSelect'+rowcount).empty();
				$('#queSelect'+rowcount).append($(document.createElement("option")).
						attr("value",0).text("--- Please select ---"));
						$('#queSelect'+rowcount).attr("disabled", true);
				for(var i=1; i<=length; i++){
					$('#queSelect'+rowcount).append($(document.createElement("option")).
	                        attr("value",response[i-1]).text(response[i-1]));	
							$('#queSelect'+rowcount).attr("disabled", false);
				}	
			}
        },
		error : function(xhr, status, error) {
			alert(xhr.responseText);
		}
	 });
}
*/

/*function getNounsVerbs(userText, count){
	//alert(JSON.stringify(userText))
	$('#'+count).empty();
	$.ajax({
        url: myurl+"getNounsVerbs",
        type: 'POST',        
        data: JSON.stringify(userText), 
        cache:false,
        beforeSend: function(xhr) {  
            //xhr.setRequestHeader("Accept", "application/json");  
        	xhr.setRequestHeader("Content-Type", "application/json");  
        },       
        success:function(response){  	
		  	var resVal = JSON.stringify(response).replace(/"/g, "");
			$('#'+count).html(resVal);
        },
		error : function(xhr, status, error) {
			alert(xhr.responseText);
		}
	 });
}
*/
function saveToFile(count){
	var userText=$("#inputText"+count).val();
	var appSelectedOption = $('#appSelect').val();
	if(appSelectedOption == 0){
		alert('Please select problem type');
		$('#appSelect').focus();
		return;
	}
	var queSelectedOption = $('#queSelect').val();
	if(queSelectedOption == 0){
		alert('Please select issue type');
		$('#queSelect').focus();
		return;
	}	
	 //json = {"errorText" : errorText,"userInputText" : newUserInputText,"id" : id,"errorCode" : errorCode,"transactionId" : transactionId,"userId" : userId,"typeOfMessage" : typeOfMessage,"answerType" : answerType, "dataToCollect" : dataToCollect, "currentLanguage" : currentLanguage};
	var recWords=$("#words"+count).val();
	var json={"userText": userText ,"appSelect": appSelectedOption ,"queSelect": queSelectedOption,"recWords":recWords};
	//alert(json)
	$.ajax({
        url: myurl+"saveInOWLFile",
        type: 'POST',        
        data: JSON.stringify(json), 
        cache:false,
        beforeSend: function(xhr) {  
            //xhr.setRequestHeader("Accept", "application/json");  
        	xhr.setRequestHeader("Content-Type", "application/json");  
        },       
        success:function(response){  	
		  	var resVal = JSON.stringify(response).replace(/"/g, "");
		  	//alert(resVal)
		  	if(resVal == 'Success'){
		  		alert('Added data successfully')
		  	}
        },
		error : function(xhr, status, error) {
			alert(xhr.responseText);
		}
	 });
}

function performAction(){
	var isRowToBeRemove=false;
	var isRowToBeAdd=false;
	var rcount = $("#rowcount").val();
	
	for( var i=1; i< rcount; i++ ){
		var acceptWordsSize = $("#acceptWordsSize"+i).val();
		for(var m=0 ; m < acceptWordsSize ; m++){
			if($("#Accept_"+i+"_"+m).prop("checked")){
				isRowToBeAdd=true;
				break;
			}
		}
		if(isRowToBeAdd == true){
			break;
		}
	}
	
	for( var i=1; i< rcount; i++ ){
		if($("#Reject"+i).prop("checked")){
			isRowToBeRemove=true;
			break;
		}
	}
	if(isRowToBeRemove == false && isRowToBeAdd == false){
		alert('Currently, you have not selected any option from recommendation.\nPlease select atleast one option from recommendation column')
		return;
	}
	for( var i=1; i< rcount; i++ ){
		var acceptWordsSize = $("#acceptWordsSize"+i).val();
		for(var m=0 ; m < acceptWordsSize ; m++){
			if($("#Accept_"+i+"_"+m).prop("checked")){
				var selectedOption = $('#appSelect'+i).val();
				if('None of the above' == selectedOption){
					//alert('found noa')
					$("#Accept_"+i+"_"+m).prop("checked",false);
					$("#Reject"+i).prop("checked",true);
					isRowToBeRemove=true;
				}
			}
		}
	}
	
	for( var i=1; i< rcount; i++ ){
		var acceptWordsSize = $("#acceptWordsSize"+i).val();
		for(var m=0 ; m < acceptWordsSize ; m++){
			if($("#Accept_"+i+"_"+m).prop("checked")){
				var selectedOption = $('#queSelect'+i).val();
				if('None of the above' == selectedOption){
					$("#Accept_"+i+"_"+m).prop("checked",false);
					$("#Reject"+i).prop("checked",true);
					isRowToBeRemove=true;
				}
			}
		}
	}
	
	if(isRowToBeRemove){
		removeAllSelectedRows();
	}
	if(isRowToBeAdd){
		saveAllToFile();
	}
}

function removeAllSelectedRows(){
	var rcount = $("#rowcount").val();
	var transIdArray='';
	
	for( var i=1; i< rcount; i++ ){
		var acceptWordsSize = $("#acceptWordsSize"+i).val();
		for(var m=0 ; m < acceptWordsSize ; m++){
			if($("#Accept_"+i+"_"+m).prop("checked") && $("#Reject"+i).prop("checked") ){
				alert('For row Sr.no = '+ i +' , You cannot select reject and other options at a time. \n Please select either of them')
				$("#Accept_"+i+"_"+m).prop("checked",false);
				$("#Reject"+i).prop("checked",false);
				return;
			}			
		}
		if($("#Reject"+i).prop("checked") ){
			transIdArray += $("#transId"+i).val() + ":";
		}
	}
	
	//alert(transIdArray);
	$.ajax({
        url: myurl+"deleteTransIDs",
        type: 'POST',        
        data: transIdArray, 
        cache:false,
        beforeSend: function(xhr) {  
            //xhr.setRequestHeader("Accept", "application/json");  
        	xhr.setRequestHeader("Content-Type", "application/json");  
        },       
        success:function(response){  	
		  	var resVal = JSON.stringify(response).replace(/"/g, "");
		  	//alert(resVal)
		  	loadAllSL();
		  	
        },
		error : function(xhr, status, error) {
			alert(xhr.responseText);
		}
	 });
//	setTimeout(function(){ 
//		loadAllSL();
//	}, 1000);
	
}

function saveAllToFile(){
	var rcount = $("#rowcount").val();
	var acceptFound=false;
	for( var i=1; i< rcount; i++ ){
		var acceptWordsSize = $("#acceptWordsSize"+i).val();
		for(var m=0 ; m < acceptWordsSize ; m++){
			if($("#Accept_"+i+"_"+m).prop("checked")){
				acceptFound=true; break;
			}
		}
	}
	
	if(!acceptFound) 
		return;
	
	for( var i=1; i< rcount; i++ ){
		var acceptWordsSize = $("#acceptWordsSize"+i).val();
		for(var m=0 ; m < acceptWordsSize ; m++){
			if($("#Accept_"+i+"_"+m).prop("checked") && $("#Reject"+i).prop("checked") ){
				alert('For row Sr.no = '+ i +' , You cannot select reject and other options at a time. \n Please select either of them')
				$("#Accept_"+i+"_"+m).prop("checked",false);
				$("#Reject"+i).prop("checked",false);
				return;
			}
		}
	}
	var json='';
	for( var i=1; i< rcount; i++ ){
		var found=false;
		var transId = $('#transId'+i).val();
		var fileName = $('#ontologyFileName'+i).val();
		var recWords = '';// $("#recWords"+i).val();
		var acceptWordsSize = $("#acceptWordsSize"+i).val();
		for(var m=0 ; m < acceptWordsSize ; m++){
			if($("#Accept_"+i+"_"+m).prop("checked")){
				found=true;
				var userText=$("#inputText"+i).val().replace(/,/g, " ");
				var appSelectedOption = $('#appSelect'+i).val();
				var queSelectedOption = $('#queSelect'+i).val();
				if(appSelectedOption == 0){
					alert('Please select problem type');
					$('#appSelect'+i).focus();
					return;
				}
				
				if(queSelectedOption == 0){
					alert('Please select issue type');
					$('#queSelect'+i).focus();
					return;
				}	
				recWords+=$("#Accept_"+i+"_"+m).val() +",";
			}
		}
		if(found){
			json += JSON.stringify({"transId": transId,"userText": userText ,"appSelect": appSelectedOption ,"queSelect": queSelectedOption,"recWords":recWords, "fileName":fileName}) + '##';
			//alert(json);
		}
	}
	
	$.ajax({
        url: myurl+"writeWordsInOntologyFile/base",
        type: 'POST',        
        data: JSON.stringify(json), 
        cache:false,
        beforeSend: function(xhr) {  
            //xhr.setRequestHeader("Accept", "application/json");  
        	xhr.setRequestHeader("Content-Type", "application/json");  
        },       
        success:function(response){  	
		  	var resVal = JSON.stringify(response).replace(/"/g, "");
		  	if(resVal == 'Success'){
		  		loadAllSL();
		  		$("#dialog").dialog('open'); 
                //Change content on the fly
                ChangeMessage("Added data successfully"); 
                //Auto Close JQueryUI Dialog Box
                AutoCloseDialogBox(4000);
		  		
		  	}
        },
		error : function(xhr, status, error) {
			alert(xhr.responseText);
		}
	 });
	
	/*setTimeout(function(){ 
		loadAllSL();
	}, 3000);*/
	
}

function ChangeMessage(Message) {  
	 $("#alertDialog").dialog({width: 250});
	 $("#alertDialog").dialog({height: 100});
	 $("#alertDialog").dialog("option","title",'AssistedLearning');
	 $("#alertDialog").css("background-color","white");
	 var html="";
	 html+='<font face="verdana" color="black"  size="2">'+ Message + '</font>';
	 
	 /*html+='<div style="margin-top:2%;"><button type="submit" onclick="closeChatWindow();" style="border-radius: 6px;">OK</button><button type="submit" onclick="closeAlertDialog();" style="border-radius: 6px; margin-left: 5%;">Cancel</button></div>';*/
	 if(closeWindowFlag){
		html+='<div style="margin-top:2%;"><button type="submit" onclick="closeAlertDialog();" style="border-radius: 6px; margin-left: 5%;">OK</button></div>';
	 }
	 $("#alertDialog").html(html);
	  /*$("#alertDialog").html( '<div><button type="submit" onclick="" style="border-radius: 6px;">OK</button><button type="submit" onclick="" style="border-radius: 6px;">Cancel</button>');*/
	 $('#alertDialog').dialog('option', 'position', 'center');
}
function closeAlertDialog(){
	$("#alertDialog").dialog("close");

}
function closeChatWindow(){
	endChatWithAgent=true;
	openAdminOpChat();
	endChatWithAgent=false;
	$("#alertDialog").dialog("close");
	$("#myModal").fadeOut(600);
	setTimeout(function(){ 
					$('.msg_body').remove();
					myMap.clear();
					$('#liveChatBtn').hide();
			 }, 600);
}

function AutoCloseDialogBox(WaitSeconds) {
    //Auto Close Dialog Box after few seconds
    setTimeout(function () {
            $("#alertDialog").dialog("close");
    }, WaitSeconds);
}

function addNewNode(count){
	var ontologyNode = $("#ontologyNode"+count).val();
	var transactionId = $("#transId"+count).val();
	var inputText = $("#inputText"+count).val();
	var questionNode = $("#questionNode"+count).val();
	//alert('In add - ontologyNode = '+ontologyNode);
	doSearch(ontologyNode, transactionId, inputText, questionNode);
}

function removeSelectedRow(count){
	var transactionId = $("#transId"+count).val();
	$("#alertDialog").dialog('open'); 
	changeMessageDeleteRow('Are you sure you want to delete ?',transactionId);
	/*var confirmation = confirm("Are you sure you want to delete ?");
	if(confirmation){
		$.ajax({
			url: myurl+"deleteTransIDs",
			type: 'POST',        
			data: transactionId+ ":", 
			cache:false,
			beforeSend: function(xhr) {  
				//xhr.setRequestHeader("Accept", "application/json");  
				xhr.setRequestHeader("Content-Type", "application/json");  
			},       
			success:function(response){  	
				var resVal = JSON.stringify(response).replace(/"/g, "");
				//alert(resVal)
				loadAllSL();
				
			},
			error : function(xhr, status, error) {
				alert(xhr.responseText);
			}
		 });
	 }
//	setTimeout(function(){ 
//		loadAllSL();
//	}, 1000);*/
	
}

function doSearch(category, transactionId, inputText,  questionNode){
	parent.location='assistedOntologyManager?param1='+encodeURIComponent(category)+"&param2="+transactionId+"&param3="+encodeURIComponent(inputText)+"&param4="+questionNode;
	return;
}

function addReadStatus(count){
	var transactionId = $("#transId"+count).val();
	updateStatusForAssistedLearning(transactionId, count);
}

function updateStatusForAssistedLearning(transactionId, count){
	var tempURL = myurl+'updateReadStatusForLearning?trId='+transactionId;
	$.ajax({
        url: tempURL,
        type: 'POST',        
        data: '', 
        cache:false,
        beforeSend: function(xhr) {  
            //xhr.setRequestHeader("Accept", "application/json");  
            //xhr.setRequestHeader("Content-Type", "application/json");  
        },       
        success:function(response){ 
			popUp(count);
		
			$('#callImage'+count).attr('src', 'resources/images/CC-Icon-Gray.png');
			$('#callImage'+count).attr('title', 'Call done');
			$('#callImage'+count).prop('onclick',null).off('click'); 
        },
		error : function(xhr, status, error) {
			alert(xhr.responseText);
		}
	 });
}
function changeMessageDeleteRow(Message,transactionId){
	 $("#alertDialog").dialog({width: 250});
	 $("#alertDialog").dialog({height: 120});
	 $("#alertDialog").dialog("option","title",'AssistedLearning');
	 $("#alertDialog").css("background-color","white");
	 var html="";
	 html+='<font face="verdana" color="black"  size="2">'+ Message + '</font>';
		html+='<div style="margin-top:2%;"><button type="submit" onclick="deleteRow(\''+transactionId+'\');" style="border-radius: 6px;">OK</button><button type="submit" onclick="closeAlertDialog();" style="border-radius: 6px; margin-left: 5%;">Cancel</button></div>';
	 $("#alertDialog").html(html);
	  /*$("#alertDialog").html( '<div><button type="submit" onclick="" style="border-radius: 6px;">OK</button><button type="submit" onclick="" style="border-radius: 6px;">Cancel</button>');*/
	 $('#alertDialog').dialog('option', 'position', 'center');
}
function deleteRow(transactionId){
	
	//var transactionId=count;
	$.ajax({
			url: myurl+"deleteTransIDs",
			type: 'POST',        
			data: transactionId+ ":", 
			cache:false,
			beforeSend: function(xhr) {  
				//xhr.setRequestHeader("Accept", "application/json");  
				xhr.setRequestHeader("Content-Type", "application/json");  
			},       
			success:function(response){  
				$('#alertDialog').dialog('close');
				var resVal = JSON.stringify(response).replace(/"/g, "");
				//alert(resVal)
				loadAllSL();
				
			},
			error : function(xhr, status, error) {
				alert(xhr.responseText);
			}
		 });
		 
	 }
