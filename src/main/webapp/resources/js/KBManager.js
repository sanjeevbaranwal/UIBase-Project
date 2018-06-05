document.writeln("<script type='text/javascript' src='resources/js/loadConfig.js'></script>");
document.writeln("<script type='text/javascript' src='resources/jquery-1.11.3.js'></script>");
document.writeln("<script type='text/javascript' src='https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js'></script>");
//document.writeln("<script type='text/javascript' src='resources/jquery-ui.js'></script>");
//document.writeln("<script type='text/javascript' language='Javascript' src='https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.21/jquery-ui.min.js'></script>");

function setScreenValues(){
	loadConfig();
	var h=window.innerHeight-115;
	var w=window.innerWidth-1000;//((window.innerWidth/10 )*2)-100;
	
	$("#headerRow").height(85);		
	$("#headerRow").width(w);
	$("#menuheader").height(25);
	$("#headerRow").width(w);
	$("#tabRow").height( (h/10)*8);
	$("#tabRow").width(w);
	$("#tabRow1").height( $("#tabRow").height()+30);
	$("#tabRow1").width($("#tabRow").width()-10);
	$("#sltbl").height( $("#tabRow1").height());
	//$("#sltbl").width($("#tabRow").width()-10);
	$("#imgLogo").attr("src", "resources/images/ngGenieLogo.png");
	$("#imgLogo").css("width", 100);
	
	/*$("#dialog").dialog({ 
		autoOpen: false ,
		dialogClass: 'myTitleClass'
	});*/
	setTimeout(function(){
		loadAllKB();
		
	}, 1000);
}



function loadAllKB(){
	
	loadAppNames();
	loadAllStatus();
	displayInTable("none:none");
	return true;
}


function displayInTable(textdata){
	
	$("#sltbl").empty();
	var tempURL =myurl+'getAllKBData';
	
	//alert(tempURL)
	$.ajax({
        url: tempURL,
        type: 'POST',        
        data: textdata, 
        cache:false,
        beforeSend: function(xhr) {  
            xhr.setRequestHeader("Accept", "application/json");  
            xhr.setRequestHeader("Content-Type", "application/json");  
        },       
        success:function(response){  	
		  	var resVal = JSON.stringify(response);
		  	//alert('success -- ' +JSON.parse(resVal));
		  	var htmlText=''; var count=1;
		  	htmlText += '<centre><table border="0" width="100%" cellspacing="4" cellpadding="4" >';
		  	htmlText += '<tr bgcolor="#F1F1F1">';
		  	htmlText += '<td><font face="arial" size="2" colo="#2c2c2c"><b>Sr.no</font></td>';
		  	htmlText += '<td><font face="arial" size="2" color="#2c2c2c" ><b>KB File  Name</font></td>';
		  	htmlText += '<td><font face="arial" size="2" color="#2c2c2c" ><b>Problem type</font></td>';
		  	htmlText += '<td><font face="arial" size="2" color="#2c2c2c" ><b>Created Date</font></td>';
		  	htmlText += '<td><font face="arial" size="2" color="#2c2c2c" ><b>Status</font></td>';
		  	htmlText += '<td><font face="arial" size="2" color="#2c2c2c" ><b>Action</font></td>';
		  	htmlText += '</tr>';
		  	$.each(JSON.parse(resVal), function(idx, obj) {
		  		var dateStr= "" + obj.createdDate;
		  		htmlText += '<tr bgcolor="#FFFFFF">';
		  		htmlText += '<td><font face="arial" size="2">' + count + '</font></td>';
		  		htmlText += '<td style="word-wrap: break-word;"><font face="arial" size="2">'+ obj.fileName +'</font></td>';
		  		htmlText += '<td style="word-wrap: break-word;"><font face="arial" size="2">'+ obj.isOfApplication +'</font></td>';
		  		htmlText += '<td style="word-wrap: break-word;"><font face="arial" size="2">'+ dateStr.replace("T"," ") +'</font></td>';
		  		htmlText += '<td style="word-wrap: break-word;"><font face="arial" size="2">'+ obj.status +'</font></td>';
		  		if(obj.status=='Processed'){
		  			htmlText += '<input type="hidden" id="fileid' + count +'" value="'+ obj.fileId +'">';
		  			//htmlText += '<td style="word-wrap: break-word;"><input type=button value="Add KB"  onclick=""></td>';
		  			htmlText += '<td style="word-wrap: break-word;"><input type=button value="Add KB"  onclick="disp(' + count   + ')"></td>';

		  			
		  		}
		  		else{
		  			htmlText += '<td style="word-wrap: break-word;"><font face="arial" size="2">--</font></td>';
		  		}
		  		
		  		htmlText += '</tr>';
		  		count++;
			});
		  	$("#sltbl").html(htmlText);
        },
		error : function(xhr, status, error) {
			alert(xhr.responseText);
		}
	 });

}



function loadAppNames(){
	
	$('#appSelect').empty();
	 //alert('in load app names ' + selOpt)
	$('#appSelect').append($(document.createElement("option")).
                attr("value","-1").text('--- Please select ---'));
	
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
		  	var found=false;
		  	for(var count=0; count < appNames.length ; count++ ){
		  		if(appNames[count].trim().length > 0  ){
		  				$('#appSelect').append($(document.createElement("option")).
		                        attr("value",appNames[count]).text(appNames[count]));
	  			}
		  	}	
                   
       },
		error : function(xhr, status, error) {
			alert(xhr.responseText);
		}
	 });

}

function loadAllStatus(){
	
	$('#statselect').empty();
	 //alert('in load app names ' + selOpt)
	$('#statselect').append($(document.createElement("option")).
                attr("value","-1").text('--- Please select ---'));

	$.ajax({
       url: myurl+"getAllKBStatus",
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
		  	var statusNames = resVal.split(",");
		  	var tempText='';
		  	for(var count=0; count < statusNames.length ; count++ ){
		  		if(statusNames[count].trim().length > 0  ){
		  			tempText =statusNames[count].replace(/[^a-zA-Z0-9 ]/g, '');
		  				$('#statselect').append($(document.createElement("option")).
		                        attr("value",tempText).text(tempText));
	  			}
		  	}	
                   
       },
		error : function(xhr, status, error) {
			alert(xhr.responseText);
		}
	 });

}

function applyFilter(){
	
	var appName=$('#appSelect').val();
	var status=$('#statselect').val();
	if(appName == '-1') appName='none';
	if(status == '-1') status='none';
	var reqData='';
	if(appName == '' && status == ''){
		reqData='';
	}
	else{
		reqData=appName.trim() + ":" + status.trim();
	}
	displayInTable(reqData);
}

function disp(count){
	
	//alert(count)
	var fileid =$("#fileid"+count).val(); 
	//alert(fileid );
	parent.location='KBManagerAddKB?param='+fileid;
	return;
	/*$.ajax({
	       url: "KBManager/addNodeInOntology",
	       type: 'POST',        
	       data: fileid, 
	       cache:false,
	       beforeSend: function(xhr) {  
	           //xhr.setRequestHeader("Accept", "application/json");  
	          // xhr.setRequestHeader("Content-Type", "application/json");  
	       },       
	       success:function(response){  	
			  	var resVal = JSON.stringify(response).replace(/["']/g, "");
			  	alert('success app -- ' +resVal);
			  	displayInTable('');	                   
	       },
			error : function(xhr, status, error) {
				alert(xhr.responseText);
			}
	});*/
}


