document.writeln("<script type='text/javascript' src='resources/js/loadConfig.js'></script>");
document.writeln("<script type='text/javascript' src='resources/js/jquery-1.11.3.js'></script>");
document.writeln("<script type='text/javascript' src='https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js'></script>");

function pageOnLoad(){
	loadConfig();
	var h=window.innerHeight-115;
	$("#kbtbl").height( (h/10)*9.5);
	var question = getURLParameter('param1');
	var fileurl = getURLParameter('param2');
	var category = getURLParameter('param3');
	setTimeout(function(){
		doSearch(question, fileurl, category);
	}, 1000);
}

function doSearch(question, fileurl, category){
	$('#divLoading').show();
	if(question === undefined){
		question = ' ';
	}
	if(fileurl === undefined) {
		fileurl = ' ';
	}
	if(category === undefined){
		category = ' ';
	}
	$("#kbtbl").empty();
	var appURL = myurl+'kbFindResult';
	$.ajax({
        url: appURL,
        type: 'POST',        
        data: question+'@-:-@'+decodeURIComponent(fileurl)+'@-:-@'+category, 
        cache:false,
        beforeSend: function(xhr) {  
            xhr.setRequestHeader("Accept", "application/json");  
            xhr.setRequestHeader("Content-Type", "application/json");  
        },       
        success:function(response){  	
        	$('#divLoading').hide();
		  	var resVal = JSON.stringify(response);
		  	var htmlText=''; var count=1;
		  	htmlText += '<centre><table border="0" width="100%" cellspacing="4" cellpadding="4" >';
		  	htmlText += '<tr bgcolor="#F1F1F1">';
		  	htmlText += '<td style="padding: 5px;"><font face="arial" size="2" colo="#2c2c2c"><b>Sr.no</font></td>';
		  	htmlText += '<td style="padding: 5px;"><font face="arial" size="2" color="#2c2c2c" ><b>Category</font></td>';
		  	htmlText += '<td style="padding: 5px;"><font face="arial" size="2" color="#2c2c2c" ><b>Question</font></td>';
		  	htmlText += '<td style="padding: 5px;"><font face="arial" size="2" color="#2c2c2c" ><b>Answer</font></td>';
		  	//htmlText += '<td><font face="arial" size="2" color="#2c2c2c" ><b>Status</font></td>';
		  	htmlText += '<td style="padding: 5px;"><font face="arial" size="2" color="#2c2c2c" ><b>Action</font></td>';
		  	htmlText += '</tr>';
			//alert(response.length);
			$.each(JSON.parse(resVal), function(idx, obj) {
				//var resultObject = response.issues;
				//alert(resVal.length);
				if(resVal.length > 14){
				//for (i = 0; i < resultObject.length; i++) {
					htmlText += '<tr bgcolor="#FFFFFF">';
					htmlText += '<td><font face="arial" size="2">' + count + '</font></td>';
					htmlText += '<td style="word-wrap: break-word; padding: 5px;"><font face="arial" size="2">'+ obj.deviceType +'</font></td>';
					htmlText += '<td style="word-wrap: break-word;padding: 5px;"><font face="arial" size="2">'+ obj.questionString +'</font></td>';
					//htmlText += '<td style="word-wrap: break-word;"><font face="arial" size="2">'+ dateStr.replace("T"," ") +'</font></td>';
					htmlText += '<td style="word-wrap: break-word;padding: 5px;"><font face="arial" size="2">'+ obj.resolutionDetailed +'</font></td>';
					//if(obj.status=='Processed'){
						htmlText += '<input type="hidden" id="fileid' + count +'" value="'+ obj.docID +'">';
						//htmlText += '<td style="word-wrap: break-word;"><input type=button value="Add KB"  onclick=""></td>';
						htmlText += '<td style="word-wrap: break-word; padding: 5px;"><input type=button value="Add KB"  onclick="disp(' + count   + ')"></td>';
					//}
					//else{
					//	htmlText += '<td style="word-wrap: break-word;"><font face="arial" size="2">--</font></td>';
					//}
					htmlText += '</tr>';
					count++;
				//}
				}else {
					htmlText += '<b>No data found for search.</b>';
				}
			});
		  	$("#kbtbl").html(htmlText);
        },
		error : function(xhr, status, error) {
			alert(xhr.responseText);
		}
	 });
}

function disp(count){
	var fileid =$("#fileid"+count).val(); 
	parent.location='KBSearchResultDetails?param='+fileid;
	return;
}

