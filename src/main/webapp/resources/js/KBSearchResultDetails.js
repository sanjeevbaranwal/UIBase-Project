document.writeln("<script type='text/javascript' src='resources/js/loadConfig.js'></script>");
document.writeln("<script type='text/javascript' src='resources/js/jquery-1.11.3.js'></script>");
document.writeln("<script type='text/javascript' src='https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js'></script>");

function pageOnLoad(){
	loadConfig();
	$('#appSelect').append($(document.createElement("option")).
    attr("value",'0').text('-- Please select --'));
	$("#dialog").dialog({ 
		autoOpen: false ,
		dialogClass: 'myTitleClass'
	});
	disableAllInputs();
	var docId = getURLParameter('param');
	setTimeout(function(){
		loadKBData(docId);
	}, 1000);
}

function loadKBData(docId){
	$('#divLoading').show();
	$.ajax({
        url: myurl+"kbFindDataDetail/get",
        type: 'POST',        
        data: docId, 
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
        	var fileName = obj.fileName;
        	var createdDate = obj.createdDate;
        	var fileId = obj.fileId;
        	
        	$('#questionDescription').val(questionDescription);        	
        	$('#nouns').val(nouns);        	
        	$('#verbs').val(verbs);        	
        	$('#dataRequired').val(dataRequired);
        	$('#answerDescription').val(answerDescription);
        	$('#followUpDescription').val(followUpDescription);
        	$('#isOfApplication').val(isOfApplication);
        	$('#manwords').val(manwords);
        	$('#quedesc').val(questionDescription);
        	$('#datareq').val(dataRequired);
        	$('#recowords').val(nouns+','+verbs);
        	$('#answer').val(answerDescription);
        	$('#fileName').val(fileName);
        	$('#createdDate').val(createdDate);
        	$('#fileid').val(fileId);
        	loadAppNames(obj.isOfApplication);
        },
		error : function(xhr, status, error) {
			alert(xhr.responseText);
		}
	 });
}

function disableAllInputs(){
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
	  	
    	var myOptions = [] ;
        $('#appSelect option').each(function(){
          myOptions.push( this.value );
        });
        alert(  myOptions ); // 1,2,3
    	alert('end')
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
	var questionDescription = $('#questionDescription').val().trim().replace(/ /g, "_");//'this is question'//$('#questionDescription').val().trim().replace(/ /g, "_");
	
	var nouns = ',' + $('#nouns').val() +',' ;
	var verbs = ',' + $('#verbs').val() +',' ;
	if( $('#verbs').val() ==''){
		verbs = 'NA';
	}
	
	var fileName			= $('#uploadedFileName').val().trim();
	var dataRequired 		= $('#datareq').val().trim();
	var isOfApplication 	= $('#appSelect').val().trim();
	var answerDescription 	= $('#answer').val().trim();
	var mandatoryAssertions = $('#manwords').val();
	var adjective           = 'NA';
	var hasAnswer           = 'ans_'+questionDescription;  //'ans_test_node5';
	var hasFollowUpQuestion = 'FU_'+questionDescription;    //'FU_test_node5';
	var followUpDescription = $('#followUpDescription').val();//$('#appSelect').val().trim() + '_' + questionDescription; + ' followup description'    //'testing fd5';
	var isOfQuestion		= $('#appSelect').val().trim() + '_' + questionDescription + '_case';    //'test_node_qnn5';
	var questionNodeName    = $('#appSelect').val().trim() + '_' + questionDescription + '_case';    //'test_node_qnn5';
	var answerNodeName      = 'ans_' + $('#appSelect').val().trim() + '_' + questionDescription;;    //'ans_test_node5';
	var followUpNodeName    = 'FU_' + $('#appSelect').val().trim() + '_' + questionDescription;;    //'FU_test_node5';
	var fileId 				= $('#fileid').val().trim();
	var userProfilerDataRequired = 'NA';
	
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
	var appNames =$('#appnames').val().split(":");
  	for(var count=0; count < appNames.length ; count++ ){
  		if(appNames[count].trim().length > 0 && appNames[count].trim() ==  $('#appSelect').val().trim() ){  			
  			newApplication=false; break;
		}
  	}
	var json={"questionDescription":questionDescription,"nouns":nouns,"verbs":verbs,"dataRequired":dataRequired,"mandatoryAssertions":mandatoryAssertions,"adjective":adjective,"isOfApplication":isOfApplication,"hasAnswer":hasAnswer,"hasFollowUpQuestion":hasFollowUpQuestion,"followUpDescription":followUpDescription,"answerDescription":answerDescription,"isOfQuestion":isOfQuestion,"questionNodeName":questionNodeName,"answerNodeName":answerNodeName,"followUpNodeName":followUpNodeName,"newApplication":newApplication, "fileName":fileName, "fileId":fileId, "userProfilerDataRequired":userProfilerDataRequired}
	//alert(JSON.stringify(json));
	$.ajax({
        url: myurl+ "addOnlyNewKbNode/",
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
			var resVal = JSON.stringify(xhr.responseText).replace(/["']/g, "");
		  	loadAppNames('');
		  	$("#dialog").dialog('open'); 
            //Change content on the fly
            ChangeMessage(resVal);
            disableAllInputs();
            //Auto Close JQueryUI Dialog  Box
            AutoCloseDialogBox(4000);
            parent.location='KBSearchResults';
		}
	 });
	
}


function ChangeMessage(Message) {  
	 $("#dialog").dialog({
			  width: 250		  
	 });
	 $( "#dialog" ).dialog({
			  height: 100
	 });
	 $("#dialog").dialog("option","title",'KB Learning');
	 $("#dialog").css("background-color","white");
	 $("#dialog").html( '<font color="green"  size="2">'+ Message + '</font>');
	 $('#dialog').dialog('option', 'position', 'center');
}

function AutoCloseDialogBox(WaitSeconds) {
   //Auto Close Dialog Box after few seconds
   setTimeout(
       function () {
           $("#dialog").dialog("close");
       }, WaitSeconds);
}
