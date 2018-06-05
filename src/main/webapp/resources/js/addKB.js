document.writeln("<script type='text/javascript' src='resources/js/loadConfig.js'></script>");
document.writeln("<script type='text/javascript' src='resources/jquery-1.11.3.js'></script>");
document.writeln("<script type='text/javascript' src='https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js'></script>");

/* Tree Population Code*/
var parentNode = "";
var expandFlag = false;
$(document).ready(function() {
	//First call the tree data to create data object completely.
	populateAllTreeNodeData();
	setTimeout(function(){
		createTreeView(expandFlag);
	}, 2000);
});

function pageOnLoad(){
	loadConfig();
	/*$('#appSelect').append($(document.createElement("option")).
            attr("value",'0').text('-- Please select --'));*/
	$("#dialog").dialog({ 
		autoOpen: false ,
		dialogClass: 'myTitleClass'
	});
	disableAllInputs();
	//$("#answer").jqte();
	//$("#addinfo").jqte();
	//$("#mytextarea").jqte();
	//$('.jqte-test').jqte();
	//loadLocalFile();
}

/*function call on click of OK*/
/* function selectedCategoryName(p_node){
	var categoryName=p_node.text;
	
	parentNode=p_node;
	alert("clicked category name is "+categoryName+" parent node "+parentNode);
} */
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
	var project = localStorage.getItem( 'projectVal');
	if(project == null || project == "" )
		project = "base";
	var tempURL = myurl + 'fetchTreeData/'+project;
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
					$('#expandTreeCategory').html('<div style="width: 99%;height: 99%;float: right;border: solid 1px black;"> <div style="width: 98%;height: 98%;float: right;margin-left: -19%;border= solid 1px grey;"> <table id="def" style="height:100%;width: 99%;"> <tbody> <tr> <td style="width: 90%;"> <div><font style="color:mediumblue;">Sub Category Name</font><div><br> <textarea placeholder="Sub Category Name" style="resize :none;width: 100%;font-family: calibri;font-size: 15px;" rows="2" cols="30" id="categoryName_id" onkeyup="PlaceHolderChange();"/> </td> </tr> <tr> <td style="width: 90%;"> <div><font style="color:mediumblue;">Definition</font></div><br><textarea placeholder="Type definition of....." style="resize :none;width: 100%;font-family: calibri;font-size: 15px;" rows="4" cols="30" id="definitionName_id"/> </td> </tr> <tr style="display:none;"> <td> <div><font style="color:mediumblue;">identifier</font></div><textarea placeholder="identifier" style="resize :none;width: 100%;font-family: calibri;font-size: 15px;" rows="2" cols="30" id="identifierName_id"/> </td> </tr> <tr style="display:none;"> <td> <div><font style="color:mediumblue;">nameToShow</font></div><textarea placeholder="nameToShow" style="resize :none;width: 100%;font-family: calibri;font-size: 15px;" rows="1" cols="30" id="nameToShowName_id"/> </td> </tr> <tr style="display:none;"> <td> <div><font style="color:mediumblue;">specialCaseKeys</font></div><textarea placeholder="specialCaseKeys" style="resize :none;width: 100%;font-family: calibri;font-size: 15px;" rows="1" cols="30" id="specialCaseKeysName_id"/> </td> </tr> <tr> <td> <button type="submit" onclick="AddCategorysubmitfunction()" style="border-radius: 6px; float:right;background: #3885D2;color: white;font-size: 15px;border: 1px solid black; height:50px; width:150px">Submit</button> </td> </tr> </tbody> </table> </div> </div>');
					$('#expandTree').hide();
					$('#expandTreeCategory').show();
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

var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

function treePopUp(){
	//textBoxCount=count;
	$("#myModal").css("display","block");
	//$("#myModal").fadeIn(5000);
    //modal.style.display = "block";
}
function closeWindow() {
	$("#myModal").css("display","none");
    //modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
		$("#myModal").css("display","none");
		
        //modal.style.display = "none";
    }
}

function selectedCategory(){
	//alert("you clicked on..."+parentNode);
	if(parentNode=="Categories" || parentNode==''){
		alert("please select a valid category name");
		return;
	}
	//alert("id of text box is appName"+textBoxCount);
	/* var appNameId="appName"+textBoxCount;
	$('#'+appNameId).val(parentNode); */
	$('#problem_type_id').val(parentNode);
	closeWindow();
	//getQueByAppName(textBoxCount);
	
}

function loadLocalFile(){
	alert('in ----');
	 $.get('file:///D:/pps.txt', function(data) {
	        alert(data);
	    }, "text");
}

function disableAllInputs(){
	$('#divLoading').hide();
	$('#but_prodesc').prop('disabled', true);
	$('#but_quedesc').prop('disabled', true);
	$('#but_manwords').prop('disabled', true);
	$('#but_datareq').prop('disabled', true);
	$('#but_answer').prop('disabled', true);
	$('#but_addinfo').prop('disabled', true);
	$('#but_addart').prop('disabled', true);
	
	$('#divLoading').hide();
	$('#prodesc').val('');
	$('#quedesc').val('');
	$('#manwords').val('');
	$('#datareq').val('');
	$('#recowords').val('');
	$('#answer').val('');
	$('#addinfo').val('');
	$('#appSelect').empty();
	$('#appSelect').append($(document.createElement("option")).
            attr("value",'0').text('-- Please select --'));
}

function enableAllInputs(){
	$('#but_prodesc').prop('disabled', false);
	$('#but_quedesc').prop('disabled', false);
	$('#but_manwords').prop('disabled', false);
	$('#but_datareq').prop('disabled', false);
	$('#but_answer').prop('disabled', false);
	$('#but_addinfo').prop('disabled', false);
	$('#but_addart').prop('disabled', false);
}

function validateForm(){
	var file = $('#file')[0].files[0];
	$('#uploadedFileName').val(file.name.replace(/ /g, ''));
	//alert($('#uploadedFileName').val())
	
	 var formData = new FormData($('#upload_form')[0]);
	 formData.append('file', $('input[type=file]')[0].files[0]);
	 //alert(myurl)
	 $.ajax({
	     type: "POST",
	     url:  myurl+'uploadfile',
	     data: formData,
	     //use contentType, processData for sure.
	     contentType: false,
	     processData: false,
	     beforeSend: function() {
	     },
	     success: function(msg) {
	        // alert(msg)
	    	 
	    	 $('#divLoading').show();
	    	 
	    	 processFile();
	    	 $('#ajax_message').html('<font color=green size=2>'+ msg+'</font>');
	     },
	     error : function(xhr, status, error) {
				alert(xhr.responseText);
	    	 $('#divLoading').hide();
	    	 alert('error while uploading file\n' + error)
	     }
	 });
	   return false;
}


function isPDFFile(){
	var file = $('#file')[0].files[0]
    var ext = file.name.split(".").pop().toLowerCase();
    if($.inArray(ext, ["pdf"]) == -1) {
		//alert('Kindly upload pdf file');
    	$('#ajax_message').html('<font color=green size=2>Kindly upload pdf file</font>');
		$('#file').val('');
		$('#file').focus();
		return;
    }        
}


function processFile(){
	enableAllInputs();
	var formData = $('#uploadedFileName').val();
	$.ajax({
        url: myurl+"getInfoFromPDF",
        type: 'POST',        
        data: formData, 
        cache:false,
        beforeSend: function(xhr) {  
            xhr.setRequestHeader("Accept", "application/json");  
            xhr.setRequestHeader("Content-Type", "application/json");  
        },       
        success:function(response){ 
        	$('#divLoading').hide();
        	
        	var resVal = JSON.stringify(response);
        	var obj = JSON.parse(resVal);
        	var questionDescription = obj.questionDescription.replace(/[^a-zA-Z0-9 ]/g, '');
        	var nouns =obj.nouns.replace(/[^a-zA-Z0-9 ]/g, ',');
        	var verbs = obj.verbs.replace(/[^a-zA-Z0-9 ]/g, ',');
        	var dataRequired = obj.dataRequired.replace(/[^a-zA-Z0-9 ]/g, '');
        	var answerDescription =obj.answerDescription;//.replace(/[^a-zA-Z0-9 ]/g, '');
        	var followUpDescription =obj.followUpDescription;
        	var isOfApplication=obj.isOfApplication;
        	var manwords = obj.mandatoryAssertions;
        	//alert(obj.mandatoryAssertions);
        	$('#questionDescription').val(questionDescription);        	
        	$('#nouns').val(nouns);        	
        	$('#verbs').val(verbs);        	
        	$('#dataRequired').val(dataRequired);
        	$('#answerDescription').val(answerDescription);
        	$('#followUpDescription').val(followUpDescription);
        	$('isOfApplication').val(isOfApplication);
        	$('#manwords').val(manwords);
        	$('#quedesc').val(questionDescription);
        	$('#datareq').val(dataRequired);
        	$('#recowords').val(nouns+','+verbs);
        	$('#answer').val(answerDescription);
        	//loadAppNames(obj.isOfApplication);
        },
		error : function(xhr, status, error) {
			alert(xhr.responseText);
		}
	 });
	
}

function loadAppNames(selOpt){
	$('#appSelect').empty();
	 //alert('in load app names ' + selOpt)
	$.ajax({
        url: myurl+"getAppNames",
        type: 'POST',        
        data: '', 
        cache:false,
        beforeSend: function(xhr) {  
            //xhr.setRequestHeader("Accept", "application/json");  
           // xhr.setRequestHeader("Content-Type", "application/json");  
        },       
        success:function(response){  	
		  	var resVal = JSON.stringify(response).replace(/["']/g, "");
		  	$('#appnames').val(resVal);
		  //	alert('success app -- ' +resVal);
		  	var appNames = resVal.split(":");
		  	var found=false;
		  	for(var count=0; count < appNames.length ; count++ ){
		  		if(appNames[count].trim().length > 0  ){
		  			if(appNames[count].trim() == selOpt.trim()){
			  			var opt =$(document.createElement("option")).attr("value",appNames[count]).text(appNames[count]);
		  				opt.prop("selected", "selected");		  				
						$('#appSelect').append(opt);
						found=true;
		  			}
		  			else{
		  				$('#appSelect').append($(document.createElement("option")).
		                        attr("value",appNames[count]).text(appNames[count]));
		  			}
	  			}
		  	}	
		  	if(!found){
		  		var opt =$(document.createElement("option")).attr("value",'-1').text('None of the above');
  				opt.prop("selected", "selected");		  				
				$('#appSelect').append(opt);
		  	}
		  	else{
		  		$('#appSelect').append($(document.createElement("option")).attr("value",'-1').text('None of the above'));
		  	}
        },
		error : function(xhr, status, error) {
			alert(xhr.responseText);
		}
	 });
}

function editTextArea(id){	
	id=id.replace('but_','');	
	$("#"+id).attr("readonly", false);
	$("#"+id).focus();
}

function addProbType(id){
	editTextArea(id);
	
	if($("#but_prodesc").text() == 'Add New'){
		$("#but_prodesc").text('Save');
	}else if('Save'){
		$("#but_prodesc").text('Add New');
		$('#appSelect').empty();
		$('#appSelect').append($(document.createElement("option")).
	            attr("value",'0').text('-- Please select --'));
		var appNames =$('#appnames').val().split(":");
	  	for(var count=0; count < appNames.length ; count++ ){
	  		if(appNames[count].trim().length > 0 ){
  				$('#appSelect').append($(document.createElement("option")).
	                        attr("value",appNames[count]).text(appNames[count]));
  			}
	  	}	
	  	var prodesc = $('#prodesc').val().trim().replace(/ /g, "_");;
	  	$('#appSelect').append($(document.createElement("option")).
                attr("value",prodesc).text(prodesc));
	  	$('#appSelect').append($(document.createElement("option")).
                attr("value",'-1').text('None of the above'));
	  	$('#prodesc').val('');
	  	
	  /*	var numberOfOptions = $('select#appSelect option').length;
    	var values = $("select#appSelect option").map(function() { 
    		if($('isOfApplication').val() == prodesc)
    			$(this).prop("selected", "selected");
    		//alert($(this).text()); 
    		}
    	);*/
    	var myOptions = [] ;

        $('#appSelect option').each(function(){
          myOptions.push( this.value );
        });
	}
}

function addArticle(){
	var selectedOption = $('#appSelect').val();
	if('0' == selectedOption || 
		'-1' == selectedOption){
		alert('Kindly select problem type')
		$('#appSelect').focus();
		return;
	}
	
	if( $('#quedesc').val() =='' ){
		alert('Kindly add issue type')
		$('#quedesc').focus();
		return;
	}
	if( $('#recowords').val() =='' ){
		alert('Kindly add recommendations ')
		$('#recowords').focus();
		return;
	}
	if( $('#answer').val() =='' ){
		alert('Kindly add answer')
		$('#answer').focus();
		return;
	}
	
	var questionVariation 	= $('#questionDescription').val().trim();
	var questionDescription = $('#questionDescription').val().trim().replace(/ /g, "_");//'this is question'//$('#questionDescription').val().trim().replace(/ /g, "_");
	var nouns = ',' + $('#nouns').val() +',' ;
	var verbs = ',' + $('#verbs').val() +',' ;
	if( $('#verbs').val() ==''){
		verbs = 'NA';
	}
	
	var fileName			= $('#uploadedFileName').val().trim();
	var dataRequired 		= $('#datareq').val().trim();
	var isOfApplication 	= $('#problem_type_id').val().trim();
	var answerDescription 	= $('#answer').val().trim();
	var mandatoryAssertions = $('#manwords').val();
	var adjective           = 'NA';
	var hasAnswer           = 'ans_'+questionDescription;  //'ans_test_node5';
	var hasFollowUpQuestion = 'FU_'+questionDescription;    //'FU_test_node5';
	var followUpDescription = $('#followUpDescription').val();//$('#appSelect').val().trim() + '_' + questionDescription; + ' followup description'    //'testing fd5';
	var isOfQuestion		= $('#problem_type_id').val().trim() + '_' + questionDescription + '_case';    //'test_node_qnn5';
	var questionNodeName    = $('#problem_type_id').val().trim() + '_' + questionDescription + '_case';    //'test_node_qnn5';
	var answerNodeName      = 'ans_' + $('#problem_type_id').val().trim() + '_' + questionDescription;;    //'ans_test_node5';
	var followUpNodeName    = 'FU_' + $('#problem_type_id').val().trim() + '_' + questionDescription;;    //'FU_test_node5';
	var userProfilerDataRequired = 'NA';
	var jbpmfilepath 		=  'NA';
	
	//alert(mandatoryAssertions);
	if($('#manwords').val().trim() == ''){
		mandatoryAssertions='NA';
	}
	else{
		var tempmandatoryAssertions='';
		var wordsArray = $('#manwords').val().trim().replace(/,/g, " ").split(' ');
		for(var i=0; i<wordsArray.length ; i++ ){
			if(wordsArray[i].trim().length > 0 ){
				tempmandatoryAssertions += ',' +wordsArray[i];
			}
		}
		tempmandatoryAssertions += ',';		
		mandatoryAssertions=tempmandatoryAssertions;
	}
	if($('#datareq').val().trim() == ''){
		dataRequired='NA';
	}
	else{
		var tempdataRequired='';
		var wordsArray = $('#datareq').val().trim().replace(/,/g, " ").split(' ');
		for(var i=0; i<wordsArray.length ; i++ ){
			if(wordsArray[i].trim().length > 0 ){
				tempdataRequired += ',' +wordsArray[i];
			}
		}
		dataRequired=tempdataRequired.substring(1);
	}
	
	answerDescription=answerDescription.replace(/(?:\r\n|\r|\n)/g, '<br />');
	answerDescription += '<br/><br/> Did the resolution solve your problem? (Yes / No)';
	
	var newApplication=true;
	/*var appNames =$('#appnames').val().split(":");
  	for(var count=0; count < appNames.length ; count++ ){
  		if(appNames[count].trim().length > 0 && appNames[count].trim() ==  $('#problem_type_id').val().trim() ){  			
  			newApplication=false; break;
		}
  	}*/
  	
	//Create json data to submit and create node in ontology.
	var json={"questionDescription":questionDescription,"nouns":nouns,"verbs":verbs,"dataRequired":dataRequired,"mandatoryAssertions":mandatoryAssertions,"adjective":adjective,"isOfApplication":isOfApplication,"hasAnswer":hasAnswer,"hasFollowUpQuestion":hasFollowUpQuestion,"followUpDescription":followUpDescription,"answerDescription":answerDescription,"isOfQuestion":isOfQuestion,"questionNodeName":questionNodeName,"answerNodeName":answerNodeName,"followUpNodeName":followUpNodeName,"newApplication":newApplication, "fileName":fileName, "userProfilerDataRequired":userProfilerDataRequired, "questionVariations": questionVariation, "jbpmFilePath":jbpmfilepath}
	
	//alert(JSON.stringify(json));
	$.ajax({
        url: myurl+ "addNewKbNodes",
        type: 'POST',        
        data: JSON.stringify(json), 
        cache:false,
        beforeSend: function(xhr) {  
           xhr.setRequestHeader("Accept", "application/json");  
           xhr.setRequestHeader("Content-Type", "application/json");  
        },       
        success:function(response){  	
        	var resVal = JSON.stringify(xhr.responseText).replace(/["']/g, "");
        	//alert('success app -- ' +resVal);
        },
		error : function(xhr, status, error) {
			//alert(xhr.responseText);
			var resVal = JSON.stringify(xhr.responseText).replace(/["']/g, "");
		  	loadAppNames('');
		  	$("#dialog").dialog('open'); 
            //Change content on the fly
            ChangeMessage(resVal);
            disableAllInputs();
            //Auto Close JQueryUI Dialog  Box
            AutoCloseDialogBox(4000);
		}
	 });
}

function ChangeMessage(Message) {  
	 $("#dialog").dialog({width: 250});
	 $("#dialog").dialog({height: 100});
	 $("#dialog").dialog("option","title",'KB Learning');
	 $("#dialog").css("background-color","white");
	 $("#dialog").html( '<font color="green"  size="2">'+ Message + '</font>');
	 $('#dialog').dialog('option', 'position', 'center');
}

function AutoCloseDialogBox(WaitSeconds) {
   //Auto Close Dialog Box after few seconds
   setTimeout(function() {
           $("#dialog").dialog("close");
       }, WaitSeconds);
}