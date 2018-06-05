document.writeln("<script type='text/javascript' src='resources/js/loadConfig.js'></script>");
document.writeln("<script type='text/javascript' src='resources/js/jquery-1.11.3.js'></script>");
//document.writeln("<script type='text/javascript' src='resources/jquery-ui.js'></script>");
//document.writeln("<script type='text/javascript' language='Javascript' src='https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.21/jquery-ui.min.js'></script>");

/* Tree Population Code*/
var parentNode = "";
var expandFlag = false;
var myurl = localStorage.getItem( 'globalCEUrl');
//var parentNode ="";
$(document).ready(function(){
	//First call the tree data to create data object completely.
	populateAllTreeNodeData();
	setTimeout(function(){
		createTreeView(expandFlag);
	}, 2000);
});
/*function call on click of OK*/
function selectedCategoryName(p_node){
	var categoryName=p_node.text;
	parentNode=p_node;
}

/**
 * This function is used when you want to load the childs on click on + button.
 * */
function populateTreeNodeData(nodeName) {
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
}

/**
 * This function is used when you want to load the all the childs at a time.
 * */
function populateAllTreeNodeData() {
	//alert('working ... name is - ' + nodeName);
	//alert(myurl);
	var tempURL = myurl + 'fetchTreeData/base';
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
}

/**
 * This function is used to create a tree view.
 * */
function createTreeView(expandFlag) {
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

function renderChildrens(obj, pnode, childs) {
	for (var i = 0; i < childs.length; i++) {
		cnode = pnode.createChildNode(obj[childs[i]]["text"], true,
				'resources/images/blue_key.png', null, 'context1');
		var sub = obj[childs[i]]["children"].split(',');
		if (sub[0] != "")
			renderChildrens(obj, cnode, sub);
	}
}

function ShowDialog(modal) {
	$("#overlay").show();
	$("#dialog").fadeIn(300);

	if (modal) {
		$("#overlay").unbind("click");
	} else {
		$("#overlay").click(function(e) {
			HideDialog();
		});
	}
}

function HideDialog() {
	$("#overlay").hide();
	$("#dialog").fadeOut(300);
}
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
	$("#tabRow1").height( $("#tabRow").height()+5);
	$("#tabRow1").width($("#tabRow").width()-10);
	$("#sltbl").height( $("#tabRow").height()-10);
	$("#sltbl").width($("#tabRow").width()-10);
	$("#imgLogo").attr("src", "resources/images/ngGenieLogo.png");
	$("#imgLogo").css("width", 100);
	$("#dialog").dialog({ 
		autoOpen: false ,
		dialogClass: 'myTitleClass'
	});
	setTimeout(function(){
		loadAllSL();
		
	}, 1000);
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
	
	$("#sltbl").empty();
	$.ajax({
        url: myurl+"getAllSLData",
        type: 'POST',        
        data: '', 
        cache:false,
        beforeSend: function(xhr) {  
            xhr.setRequestHeader("Accept", "application/json");  
            xhr.setRequestHeader("Content-Type", "application/json");  
        },       
        success:function(response){  	
		  	var resVal = JSON.stringify(response);
		  	var htmlText=''; var count=1;
		  	var allUserUtterance='';
		  	//htmlText += '<input type=button value="Accept" onclick="saveToFile()" ><br/>'; 
		  	htmlText += '<center><table border="0" width="100%" cellspacing="4" cellpadding="4" ';
		  	htmlText += '<tr><td colspan=6 align=right><input type=button value="Submit All" onclick="performAction()" ></td></tr>';
		  	htmlText += '<tr bgcolor="#F1F1F1">';
		  	htmlText += '<td width="5%"><font face="arial" size="2" colo="#2c2c2c"><b>Sr.no</font></td>';
		  	htmlText += '<td width="15%"><font face="arial" size="2" color="#2c2c2c" ><b>Failed Utterances	</font></td>';
		  	htmlText += '<td width="15%"><font face="arial" size="2" color="#2c2c2c" ><b>Problem Type</font></td>';
		  	htmlText += '<td width="25%"><font face="arial" size="2" color="#2c2c2c" ><b>Issue Type</font></td>';
		  	htmlText += '<td width="20%"><font face="arial" size="2" color="#2c2c2c" ><b>Failure Reason</font></td>';
		  	htmlText += '<td width="20%"><font face="arial" size="2" color="#2c2c2c" ><b>Recommendation</font></td>';
		  	//htmlText += '<td width="10%"><font face="arial" size="2" color="#2c2c2c" ><b>Action</font></td>';
		  	htmlText += '</tr>';
		  	$.each(JSON.parse(resVal), function(idx, obj) {
		  		htmlText += '<input type="hidden" id="inputText' + count +'" value="'+ obj.userUtterance +'">';
		  		htmlText += '<input type="hidden" id="transId' + count +'" value="'+ obj.transactionId +'">';
		  		htmlText += '<input type="hidden" id="ontologyNode' + count +'" value="'+ obj.ontologyNode +'">';
		  		htmlText += '<input type="hidden" id="recWords' + count +'" value="'+ obj.UDF2 +'">';
		  		htmlText += '<input type="hidden" id="ontologyFileName' + count +'" value="'+ obj.ontologyFileName +'">';
		  		
		  		htmlText += '<tr bgcolor="#FFFFFF">';
		  		htmlText += '<td><font face="arial" size="2">' + count + '</font></td>';
		  		htmlText += '<td style="word-wrap: break-word;"><font face="arial" size="2">'+ obj.userUtterance +'</font></td>';
		  		htmlText += '<td style="word-wrap: break-word; width: 16%;"> <div style="float : left; width:84%;"><font face="arial" size="2"><input type="text" id="appName' + count + '"  readOnly="true" placeholder="App Name" onchange="getQueByAppName(' + count + ')"> </font> </div> <div id="queImage'+ count +'"> <img id="treePopImage" src="resources/images/QuesMark1.png" alt="image"  style="padding-left: 10px; height:20px;" onclick="treePopUp('+count+');"> </div> </td>';
		  		htmlText += '<td style="word-wrap: break-word;"><font face="arial" size="2"><select id="queSelect' + count + '" style="width:90%;"></select></font></td>';
		  		htmlText += '<td style="word-wrap: break-word;"><font face="arial" size="2">'+ obj.reason +'</font></td>';
		  		//htmlText += '<td style="word-wrap: break-word;"><font face="arial" size="2"><div id=words' + count + '>' + obj.UDF2 + '</div></font></td>';

		  		htmlText += '<td style="word-wrap: break-word;"><font face="arial" size="2">'
		  		htmlText += '<table border="0" cellspacing="2" cellpadding="2" width="100%" >';
		  		var words =obj.UDF2.split(',');
		  		htmlText += '<input type="hidden" id="acceptWordsSize' + count +'" value="'+ words.length +'">';
		  		var rowidex=0;
		  		for(n=0;n < words.length ; n++){
		  			if( words[n].length > 0 ){
			  			if( n % 2 == 0 ){
			  				htmlText += '<tr>';
			  			}
			  			var chkname='Accept_' + count + '_' + n ;
			  			//alert(chkname)
			  			htmlText += '<td width="50%"><input type=checkbox id="'+chkname+'" value="' + words[n] + '">';
			  			htmlText += words[n];
			  			htmlText += '</td>';
			  			
			  			if(  n % 2 == 2 ){
			  				htmlText += '</tr>';		  				
			  			}
		  			}
		  		}
		  		htmlText += '<tr><td colspan=2>';
		  		htmlText += '<input type=checkbox id="Reject' + count + '"><font face="arial" size="2" color=red>Reject';
		  		htmlText += '</td></tr>';
		  		htmlText += '</table>';
			  	htmlText += '</font></td>';
		  		//htmlText += '<td style="word-wrap: break-word;"><font face="arial" size="2"><input type=checkbox id="Accept' + count + '"> Accept <br> <input type=checkbox id="Reject' + count + '"> Reject</td>';
		  		htmlText += '</tr>';
		  		
				count++;
			});
		  	$("#sltbl").html(htmlText);
		  	$("#rowcount").val(count);
		  	loadAppNames();
        },
		error : function(xhr, status, error) {
			alert(xhr.responseText+" inside error!!!!!!!!!!!!!!!");
		}
	 });
	 return true;
}
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

function loadAppNames() {
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
}

function getQueByAppName(rowcount){
	//alert(textBoxValue+" !!!!!!!!!!!!!!!!!!!");
	var selectedOption = $('#appName'+rowcount).val();
	var tempURL = myurl +"getAllQUestionsOfaClass/"+selectedOption,base;
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

function getNounsVerbs(userText, count){
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
	alert(json)
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
		  	alert(resVal)
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
        url: myurl+"writeWordsInOntologyFile/Demo",
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
	 $("#dialog").dialog({width: 250});
	 $("#dialog").dialog({height: 100});
	 $("#dialog").dialog("option","title",'AssistedLearning');
	 $("#dialog").css("background-color","white");
	 $("#dialog").html( '<font face="verdana" color="#A6A6A6"  size="2">'+ Message + '</font>');
	 $('#dialog').dialog('option', 'position', 'center');
}

function AutoCloseDialogBox(WaitSeconds) {
    //Auto Close Dialog Box after few seconds
    setTimeout(function () {
            $("#dialog").dialog("close");
    }, WaitSeconds);
}
