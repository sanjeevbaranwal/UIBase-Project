document.writeln("<script type='text/javascript' src='resources/js/loadConfig.js'></script>");
document.writeln("<script type='text/javascript' src='resources/jquery-1.11.3.js'></script>");
document.writeln("<script type='text/javascript' src='https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js'></script>");
//document.writeln("<script type='text/javascript' src='resources/jquery-ui.js'></script>");
//document.writeln("<script type='text/javascript' language='Javascript' src='https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.21/jquery-ui.min.js'></script>");


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
		loadAllFeedback();
		
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
function loadAllFeedback(){
	
	$("#sltbl").empty();
	$.ajax({
        url: myurl+"getAllFeedBackData",
        type: 'POST',        
        data: '', 
        cache:false,
        beforeSend: function(xhr) {  
            xhr.setRequestHeader("Accept", "application/json");  
            xhr.setRequestHeader("Content-Type", "application/json");  
        },       
        success:function(response){  	
		  	var resVal = JSON.stringify(response);
		  	//alert('success -- ' +JSON.parse(resVal));
		  	 
		  	var htmlText=''; var count=1;
		  	var allUserUtterance='';
		  	//htmlText += '<input type=button value="Accept" onclick="saveToFile()" ><br/>'; 
		  	htmlText += '<center><table border="0" width="100%" cellspacing="4" cellpadding="4" ';
		  	htmlText += '<tr><td colspan=6 align=right><input type=hidden value="Submit All" onclick="performAction()" ></td></tr>';
		  	htmlText += '<tr bgcolor="#F1F1F1">';
		  	htmlText += '<td width="5%"><font face="arial" size="2" colo="#2c2c2c"><b>Sr.no</font></td>';
		  	htmlText += '<td width="15%"><font face="arial" size="2" color="#2c2c2c" ><b>User Utterances	</font></td>';
		  	htmlText += '<td width="15%"><font face="arial" size="2" color="#2c2c2c" ><b>User FeedBack</font></td>';
		  	htmlText += '<td width="30%"><font face="arial" size="2" color="#2c2c2c" ><b>Reason</font></td>';
		  	htmlText += '<td width="15%"><font face="arial" size="2" color="#2c2c2c" ><b>Ontology Node</font></td>';
		  	htmlText += '<td width="10%"><font face="arial" size="2" color="#2c2c2c" ><b>Feedback Emotion</font></td>';
		  	//htmlText += '<td width="20%"><font face="arial" size="2" color="#2c2c2c" ><b>Recommendation</font></td>';
		  	//htmlText += '<td width="10%"><font face="arial" size="2" color="#2c2c2c" ><b>Action</font></td>';
		  	htmlText += '</tr>';
		  	$.each(JSON.parse(resVal), function(idx, obj) {
			  	//alert(obj.userUtterance + " :" + obj.transactionId)
		  		
		  			
		  		htmlText += '<input type="hidden" id="inputText' + count +'" value="'+ obj.userUtterance +'">';
		  		htmlText += '<input type="hidden" id="transId' + count +'" value="'+ obj.transactionId +'">';
		  		htmlText += '<input type="hidden" id="ontologyNode' + count +'" value="'+ obj.ontologyNode +'">';
		  		htmlText += '<input type="hidden" id="recWords' + count +'" value="'+ obj.UDF2 +'">';
		  		htmlText += '<input type="hidden" id="ontologyFileName' + count +'" value="'+ obj.ontologyFileName +'">';
		  		
		  		htmlText += '<tr bgcolor="#FFFFFF">';
		  		htmlText += '<td><font face="arial" size="2">' + count + '</font></td>';
		  		htmlText += '<td style="word-wrap: break-word;"><font face="arial" size="2">'+ obj.userUtterance +'</font></td>';
		  		htmlText += '<td style="word-wrap: break-word;"><font face="arial" size="2">'+ obj.userFeedbackUtterance +'</font></td>';
		  		htmlText += '<td style="word-wrap: break-word;"><font face="arial" size="2">'+ obj.reason +'</font></td>';
		  		htmlText += '<td style="word-wrap: break-word;"><font face="arial" size="2">'+ obj.ontologyNode +'</font></td>';
		  		htmlText += '<td style="word-wrap: break-word;"><font face="arial" size="2">'+ obj.UDF1 +'</font></td>';
		  		//htmlText += '<td style="word-wrap: break-word;"><font face="arial" size="2"><div id=words' + count + '>' + obj.UDF2 + '</div></font></td>';
//
//		  		htmlText += '<td style="word-wrap: break-word;"><font face="arial" size="2">'
//		  		htmlText += '<table border="0" cellspacing="2" cellpadding="2" width="100%" >';
//		  		//var words =obj.UDF2.split(',');
//		  		htmlText += '<input type="hidden" id="acceptWordsSize' + count +'" value="'+ words.length +'">';
//		  		var rowidex=0;
//		  		for(n=0;n < words.length ; n++){
//		  			if( words[n].length > 0 ){
//			  			if( n % 2 == 0 ){
//			  				htmlText += '<tr>';
//			  				
//			  			}
//			  			var chkname='Accept_' + count + '_' + n ;
//			  			//alert(chkname)
//			  			htmlText += '<td width="50%"><input type=checkbox id="'+chkname+'" value="' + words[n] + '">';
//			  			htmlText += words[n];
//			  			htmlText += '</td>';
//			  			
//			  			if(  n % 2 == 2 ){
//			  				htmlText += '</tr>';		  				
//			  			}
//		  			}
		  		htmlText += '</tr>';
		  		
//		  		}
//		  		htmlText += '<tr><td colspan=2>';
//		  		htmlText += '<input type=checkbox id="Reject' + count + '"><font face="arial" size="2" color=red>Reject';
//		  		htmlText += '</td></tr>';
//		  		htmlText += '</table>';
//		  		
//			  	htmlText += '</font></td>';
//			  	
//		  		
//		  		//htmlText += '<td style="word-wrap: break-word;"><font face="arial" size="2"><input type=checkbox id="Accept' + count + '"> Accept <br> <input type=checkbox id="Reject' + count + '"> Reject</td>';
//		  		htmlText += '</tr>';
		  		count++;
	  		
			});
		  	htmlText += '</table>';
		  	$("#sltbl").html(htmlText);
		  	$("#rowcount").val(count);
		  	
		  	//loadAppNames();
        },
		error : function(xhr, status, error) {
			alert(xhr.responseText);
		}
	 });
	 return true;
}

function loadAppNames(){
	
	var rcount = $("#rowcount").val();
	
	
	//$('#queSelect').disable();
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
		  	//alert('success app -- ' +resVal);
		  	var appNames = resVal.split(":");
		  	
		  	for( var i=1; i< rcount; i++ ){
			  	for(var count=0; count < appNames.length ; count++ ){
			  		if(appNames[count].trim().length > 0 ){
			  			//alert(appNames[count].trim() + " " + $('#ontologyNode'+i).val())
			  			if(appNames[count].trim() == $('#ontologyNode'+i).val().trim() ){
			  				var opt =$(document.createElement("option")).attr("value",appNames[count]).text(appNames[count]);
			  				opt.prop("selected", "selected");
			  				$('#appSelect'+i).attr("disabled", true);
							$('#appSelect'+i).append(opt);
							getQueByAppName( i );
			  			}
			  			else{
			  				$('#appSelect'+i).append($(document.createElement("option")).
		                        attr("value",appNames[count]).text(appNames[count]));
			  			}
			  		}
			  	}
			  	
		  		if($('#ontologyNode'+i).val().trim() == '' || $('#ontologyNode'+i).val().trim() == 'None of the above'){
		  			var opt =$(document.createElement("option")).attr("value",'None of the above').text('None of the above');
	  				opt.prop("selected", "selected");
					$('#appSelect'+i).append(opt);
					getQueByAppName( i );
		  		}
		  		else{
		  			$('#appSelect'+i).append($(document.createElement("option")).
	                        attr("value",'None of the above').text('None of the above'));
		  		}

		  	}
        },
		error : function(xhr, status, error) {
			alert(xhr.responseText);
		}
	 });
//	for( var i=1; i< rcount; i++ ){
//		$('#appSelect'+i).append($(document.createElement("option")).
//            attr("value",rcount+1).text("None Of the Above"));
//		$('#queSelect'+i).append($(document.createElement("option")).
//				attr("value",rcount+1).text("None Of the Above"));
//	}
}


function getQueByAppName(rowcount){
	//alert(rowcount)
	var selectedOption = $('#appSelect'+rowcount).val();
	//alert(selectedOption)
	$('#queSelect'+rowcount).empty();
	if('None of the above' == selectedOption){
		$('#queSelect'+rowcount).append($(document.createElement("option")).
				attr("value",0).text("--- Please select ---"));
		$('#queSelect'+rowcount).attr("disabled", true);
		return;
	}
	else{
		$('#queSelect'+rowcount).attr("disabled", false);
	}
	
	//$('#queSelect'+rowcount).empty();
	$('#queSelect'+rowcount).append($(document.createElement("option")).
			attr("value",0).text("--- Please select ---"));
	
	var tempURL =myurl+'getQueByAppName/'+JSON.stringify(selectedOption.trim());
	
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
		  	var resVal = JSON.stringify(response).replace(/["']/g, "");
		  	//alert('success app -- ' +JSON.stringify(response));
		  	var queNames = resVal.split("##")[0];
		  	var queNode = resVal.split("##")[1];
		  	
		  	
		  	var appNames = queNames.split(":");
		  	var queNode = queNode.split(":");
		  	
		  	for(var count=0; count < appNames.length ; count++ ){
		  		if(appNames[count].trim().length > 0 ){
		  			$('#queSelect'+rowcount).append($(document.createElement("option")).
	                        attr("value",queNode[count]).text(appNames[count]));
		  		}
		  	}
		  	
		  	$('#queSelect'+ rowcount).append($(document.createElement("option")).
                    attr("value",'None of the above').text('None of the above'));
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
		  //	alert('noune verbs ----> ' +resVal)
		  	/*
		  	var wordsSplit = resVal.split(",");
		  	var htmltext = '';
		  	htmltext+= '<div><table>';
		  	var myarray = resVal.split(',');

		  	for(var i = 0; i < myarray.length; i++)
		  	{
		  	 	if( (i+1) % 4 == 0 ){
		  	 		htmltext += '<tr>';
		  	 	}
		  		htmltext += '<td>';
		  		htmltext += '<td><input type=checkbox id=count'+i +'>';
		  		htmltext+= myarray[i] ;
			  	htmltext+= '</td>';
			  	if( (i+1) % 4 == 0 ){
		  	 		htmltext += '</<tr>';
		  	 	}
		  	 	
		  	 }
		  	htmltext+= '</table></div>';*/
			$('#'+count).html(resVal);
		  	
        },
		error : function(xhr, status, error) {
			alert(xhr.responseText);
		}
	 });
	
}

function saveToFile(count){
	
	//alert(count)
	var userText=$("#inputText"+count).val();
	//alert( $("#inputText"+count).val())
	var appSelectedOption = $('#appSelect').val();
	//alert(appSelectedOption);
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
	//alert(queSelectedOption)
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
	/*for( var i=1; i< rcount; i++ ){
		if($("#Accept"+i).prop("checked")){
			isRowToBeAdd=true;
			break;
		}
	}*/
	
	for( var i=1; i< rcount; i++ ){
		var acceptWordsSize = $("#acceptWordsSize"+i).val();
		for(var m=0 ; m < acceptWordsSize ; m++){
			if($("#Accept_"+i+"_"+m).prop("checked")){
				isRowToBeAdd=true;
				//alert("Accept_"+i+"_"+m)
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

//			if($("#Accept"+i).prop("checked")){
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
				//if($("#Accept"+i).prop("checked")){
				var selectedOption = $('#queSelect'+i).val();
				if('None of the above' == selectedOption){
					//alert('found noa')
					$("#Accept_"+i+"_"+m).prop("checked",false);
					$("#Reject"+i).prop("checked",true);
					isRowToBeRemove=true;
				}
			}
		}
	}
	
	//alert(isRowToBeRemove);
	if(isRowToBeRemove){
		//alert('in remove')
		removeAllSelectedRows();
	}
	if(isRowToBeAdd){
		//alert('in save')
		saveAllToFile();
	}
//	removeAllSelectedRows();
//	saveAllToFile();
}

function removeAllSelectedRows(){
	var rcount = $("#rowcount").val();
	var transIdArray='';
	/*for( var i=1; i< rcount; i++ ){
		if($("#Accept"+i).prop("checked") && $("#Reject"+i).prop("checked") ){
			alert('For row Sr.no = '+ i +' , You cannot select reject and other options at a time. \n Please select either of them')
			$("#Accept"+i).prop("checked",false);
			$("#Reject"+i).prop("checked",false);
			return;
		}
		if($("#Reject"+i).prop("checked") ){
			transIdArray += $("#transId"+i).val() + ":";
		}
	}*/
	
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
	
	if(!acceptFound) return;
	
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
				//alert(userText + ": \n " + appSelectedOption + " :\n " +queSelectedOption)
				
				recWords+=$("#Accept_"+i+"_"+m).val() +",";

				//json += JSON.stringify({"transId": transId,"userText": userText ,"appSelect": appSelectedOption ,"queSelect": queSelectedOption,"recWords":recWords}) + '##';
				
			}
		}
		if(found){
			json += JSON.stringify({"transId": transId,"userText": userText ,"appSelect": appSelectedOption ,"queSelect": queSelectedOption,"recWords":recWords, "fileName":fileName}) + '##';
			//alert(json);
		}
	}
	//alert(json)
	
	$.ajax({
        url: myurl+"writeWordsInOntologyFile/",
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
		  		//alert('Added data successfully')
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
	 $("#dialog").dialog({
			  width: 250		  
	 });
	 $( "#dialog" ).dialog({
			  height: 100
	 });
	 $("#dialog").dialog("option","title",'AssistedLearning');
	 $("#dialog").css("background-color","white");
	 $("#dialog").html( '<font face="verdana" color="#A6A6A6"  size="2">'+ Message + '</font>');
	 $('#dialog').dialog('option', 'position', 'center');
}

function AutoCloseDialogBox(WaitSeconds) {
    //Auto Close Dialog Box after few seconds
    setTimeout(
        function () {
            $("#dialog").dialog("close");
        }, WaitSeconds);
}

