document.writeln("<script type='text/javascript' src='resources/js/loadConfig.js'></script>");
//document.writeln("<script type='text/javascript' src='resources/js/jquery-1.11.3.js'></script>");
//document.writeln("<script type='text/javascript' src='https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js'></script>");

//document.writeln("<script type='text/javascript' src='resources/js/jquery-1.9.0.min.js'></script>");




function callPageloadAjax(){	
	//$(".ui-dialog-titlebar").hide();
	try{
    var errorText = ''; 
    var json = {"errorText" : "hello"};
    var pageload_url=myurl+"pageload";
    localStorage.setItem( 'globalCEUrl', myurl );
    
  	$.ajax({
        url: pageload_url,
        type: 'POST',        
        data: JSON.stringify(json), 
        cache:false,
        beforeSend: function(xhr) {  
            xhr.setRequestHeader("Accept", "application/json");  
            xhr.setRequestHeader("Content-Type", "application/json");  
        },       
        success:function(response){
			//alert(response.docName);
			//url = "resources/docs/" + response.docName;				
			
			$.ajax({
			    url:url,
			    type:'HEAD',
			    error: function()
			    {
			    	  alert('error');
			    },
			    success: function()
			    {
			        alert('success');
			    }
			  
			});
        },
        error : function(xhr, status, error) {
			//alert('----' +xhr.responseText);
			var str =xhr.responseText;
	        var a = str.split(",") // Delimiter is a string
	        var t='0',s='0',u='0',n='0';
	        for (var i = 0; i < a.length; i++)
	        {
	            var b= a[i].split(":");
	            if(b[0] == 'Total'){
	            	$('#totalqueries').append('<font face="verdana" color="#2c2c2c"  size="2">Total Transactions</font> <font face=verdana color=#2c2c2c  size=3><b>'+b[1]+'<b></font>');
	            	t=b[1];
	            }
	            else if(b[0] == 'Yes'){
	            	$('#satisfied').append('<font face="verdana" color="#4E7303"  size="2">Successful</font> <img src="resources/images/Happy.png"><br><font face=verdana color=#23A722  size=3><b>'+b[1]+'</b></font>');
	            	s=b[1];
	            }
	            else if(b[0] == 'No'){
	            	$('#unsatisfied').append('<font face="verdana" color="#CC3333"  size="2">Not Successful</font><img src="resources/images/Sad.png"><br><font face=verdana color=#FC4E46  size=3><b>'+b[1]+'</b></font>');
	            	u=b[1];
	            	
	            }
	            
	        	//alert('*****  '+a[i] + " *** " + b[0] + " **** "+b[1])
	            else if(b[0] == 'STotal'){
	            	//$('#totalsentiments').append('<font face="verdana" color="#2c2c2c"  size="2">Total Sentiments</font> <font face=verdana color=#2c2c2c  size=3><b>'+b[1]+'<b></font>');
	            	st=b[1];
	            }
	            else if(b[0] == 'SYes'){
	            	$('#sensatisfied').append('<font face="verdana" color="#4E7303"  size="2">Satisfied/Neutral</font> <img src="resources/images/Happy.png"><br><font face=verdana color=#23A722  size=3><b>'+b[1]+'</b></font>');
	            	ss=b[1];
	            }
	            else if(b[0] == 'SNo'){
	            	$('#senunsatisfied').append('<font face="verdana" color="#CC3333"  size="2">UnSatisfied </font><img src="resources/images/Sad.png"><br><font face=verdana color=#FC4E46  size=3><b>'+b[1]+'</b></font>');
	            	su=b[1];
	            	
	            }
	            else if(b[0] == 'SNA'){
	            	//$('#senNA').append('<font face="verdana" color="#666D7E"  size="2"> Neutral <br></font><font face=verdana color=#FC4E46  size=3><b>'+b[1]+'</b></font>');
	            	sn=b[1];	            	
	            }
	        }
	        if(s.trim()=='' ) s=0;
	        if(t.trim()=='' ) t=0;
	        if(u.trim()=='' ) u=0;
	        if(n.trim()=='' ) n=0;
	        
	        if(ss.trim()=='' ) ss=0;
	        if(st.trim()=='' ) st=0;
	        if(su.trim()=='' ) su=0;
	        if(sn.trim()=='' ) sn=0;
	        //alert(s.valueOf());
	        //alert(t);
			//alert(n.valueOf());
	        //alert((parseInt(s) + parseInt(n)));
	        var srate= '' + ((100 * (parseInt(s) + parseInt(n))) / t);
	        if(s== 0 || t==0){
		        srate='00.00% ';
		    }
	        else{
		        srate= srate.substring(0,5) + '% ';
	        }
	        //alert(srate)
	        $('#srate').append('<font face="verdana" color="#23A722"  size="2">Success rate </font><font face=verdana color=#23A722  size=3><b>'+srate+'</b></font>');
	        
	        
	        var sensrate= '' + ((100 * (parseInt(ss) )) / (parseInt(ss) + parseInt(su)));
	        if(s== 0 || t==0){
		        sensrate='00.00% ';
		    }
	        else{
		        sensrate= sensrate.substring(0,5) + '% ';
	        }
	        //alert(srate)
	        $('#sensrate').append('<font face="verdana" color="#23A722"  size="2">Satisfaction Ratio </font><font face=verdana color=#23A722  size=3><b>'+sensrate+'</b></font>');

	        var urate= '' ;
	        var nrate= '' ;
	        if(u== 0 || t==0){
		        urate='00.00% ';
	        }
	        else{
	        	urate+=((100 * u) / t);
		    }
	        if(n== 0 || t==0){
		        nrate='00.00% ';
	        }else{
	        	nrate+=((100 * n) / t);
		    }
	       // alert(srate.substring(0,2) + ":"+ urate.substring(0,2)+ ":"+  nrate.substring(0,2))
	        //draw pie chart
	        LoadChart( srate.substring(0,2), urate.substring(0,2), nrate.substring(0,2));
		}
        
    });
	}
	catch(err) {
       alert(err);
    }
    return true;
}

function loadLatestQueries(){	

	try{
    var errorText = ''; 
    var json = $("#quantity").val(); 
    if($("#quantity").val() == ''){
    	$("#quantity").val(10) 
    }
    if( isNaN($("#quantity").val())){
	    alert('Enter Numeric Value');
	    $("#quantity").focus();
	    return;
    }
//    alert(json)
    $("#latestTable").empty();
  	$.ajax({
        url: myurl+"latestload",
        type: 'POST',        
        data: JSON.stringify(json), 
        cache:false,
        beforeSend: function(xhr) {  
            xhr.setRequestHeader("Accept", "application/json");  
            xhr.setRequestHeader("Content-Type", "application/json");  
        },       
        success:function(response){
			//alert(response.docName);
			//url = "resources/docs/" + response.docName;				
			
			$.ajax({
			    url:url,
			    type:'HEAD',
			    error: function()
			    {
			    	  alert('error');
			    },
			    success: function()
			    {
			        alert('success');
			    }
			  
			});
        },
        error : function(xhr, status, error) {
			//alert('----' +xhr.responseText);
			var str =xhr.responseText;
	        var a = str.split(",$") // Delimiter is a string
	        var t='0',s='0';
			var  html = '<center><table border="0" width="97%" cellspacing="0" cellpadding="4" >';
			html += '<tr bgcolor="#F1F1F1">';
			html += '<td width="15%"><font face="verdana" color="#2c2c2c"  size="2"><b>Date</font></td>';
    		html += '<td width="15%"><font face="verdana" color="#2c2c2c"  size="2"><b>--</font></td>';
    		html += '<td width="15%"><font face="verdana" color="#2c2c2c"  size="2"><b>Description</font></td>';
    		html += '<td width="50%"><font face="verdana" color="#2c2c2c"  size="2"><b>Solution Given</font></td>';
    		html += '<td width="5%"><font face="verdana" color="#2c2c2c"  size="2"><b>Status</font></td></tr>';
    		html += '</table>';
    		//html+='<div class="ScrollStyle">';
    		html += '<center><table border="0" width="97%" cellspacing="0" cellpadding="4" >';
	        for (var i = 0; i < a.length; i++)
	        {
        		var b= a[i].split("~");//b[0] = text b[1]=total count
//	        	alert( b[0] + " **** "+b[1])
	        	if(b[0] != ''){
	        		html += '<tr bgcolor="#FFFFFF"><td  width="15%" style="word-wrap: break-word;"><font face="verdana" color="#2c2c2c"  size="2">' + b[0] + '</font></td>';
	        		html += '<td  width="15%" style="word-wrap: break-word;"><font face="verdana" color="#2c2c2c"  size="2"><a onclick="chatDetails(\''+b[5]+'\'); return false;" href="javascript:void(0);" >' +b[1] + '</a></font></td>';
	        		html += '<td  width="15%" style="word-wrap: break-word;"><font face="verdana" color="#2c2c2c"  size="2">' +b[2] + '</font></td>';
	        		html += '<td   width="50%" style="word-wrap: break-word;"><font face="verdana" color="#2c2c2c"  size="2">' +b[3].replace('@MORE_NODE@', 'Genie found more than one resolution to your query. Here is the first resolution.<br><br>')  + '</font></td>';
					if(b[4].toUpperCase() == 'NO'){
						html += '<td width="5%"><img src="resources/images/Sad.png"></td></tr>';
					}
					else if(b[4].toUpperCase() == 'YES'){ 
						html += '<td width="5%"><img src="resources/images/Happy.png"></td></tr>';
					}
					else{
		        		html += '<td width="5%"><font face="verdana" color="#2c2c2c"  size="2">' +b[4] + '</font></td></tr>';
					}	
	        		

	        		html += '<tr  bgcolor="#FFFFFF"><td colspan=5><div class="grayLine"></td></tr>';
	        		
			     }
		    }
	        html +='</table></center>';
	        $("#latestTable").append($(html)); 
	        $("#quantity").val('') 
		}
        
    });
	}
	catch(err) {
       alert(err);
    }
    return true;
}
function loadFAQTable(){
	
	
	try{
    var errorText = ''; 
    var json = {"errorText" : "hello"};
    var loadurl = myurl+"faqload"; 
  	$.ajax({
        url: loadurl,
        type: 'POST',        
        data: JSON.stringify(json), 
        cache:false,
        beforeSend: function(xhr) {  
            xhr.setRequestHeader("Accept", "application/json");  
            xhr.setRequestHeader("Content-Type", "application/json");  
        },       
        success:function(response){
			//alert(response.docName);
			//url = "resources/docs/" + response.docName;				
			
			$.ajax({
			    url:url,
			    type:'HEAD',
			    error: function()
			    {
			    	  alert('error');
			    },
			    success: function()
			    {
			        alert('success');
			    }
			  
			});
        },
        error : function(xhr, status, error) {
			//alert('----' +xhr.responseText);
			var str =xhr.responseText;
	        var a = str.split(",") // Delimiter is a string
	        var t='0',s='0';
			var  html = '<center><table border="0"  cellspacing="7" cellpadding="0" width="90%">';
			html += '<tr  bgcolor="#F1F1F1"> <td><center><b> <font face="verdana" color="#000000"  size="2">Query Description</td>   <td><center><b><font face="verdana" color="#000000"  size="2">Frequency Count</td>  </tr> </tr>';
	        for (var i = 0; i < 20; i++)
	        {
        		var b= a[i].split(":~");//b[0] = text b[1]=total count
//	        	alert( b[0] + " **** "+b[1])
	        	if(b[0] != ''){
	        		html += '<tr><td><font face="verdana" color="#2c2c2c"  size="2">' + b[0] + '</font></td>';
	        		html += '<td><font face="verdana" color="#2c2c2c"  size="2"><center>' +b[1] + '</font></td></tr>';
	        		html += '<tr><td colspan=3><div class="grayLine"></td></tr>';
	        		
			     }
		    }
	        html +='</table></center>';

	        $("#faqtable").append($(html)); 
		}
        
    });
	}
	catch(err) {
       alert(err);
    }
    return true;
}

function chatDetails(tid){
//	alert('Hello ' +tid);
	
	var  html='';
	 try{
      var errorText = ''; 
      
    	$.ajax({
          url: myurl+"loadChatHistory",
          type: 'POST',        
          data: JSON.stringify(tid), 
          cache:false,
          beforeSend: function(xhr) {  
              xhr.setRequestHeader("Accept", "application/json");  
              xhr.setRequestHeader("Content-Type", "application/json");  
          },       
          success:function(response){
  			
  			$.ajax({
  			    url:url,
  			    type:'HEAD',
  			    error: function()
  			    {
  			    	  alert('error');
  			    },
  			    success: function()
  			    {
  			        alert('success');
  			    }
  			  
  			});
          },
          error : function(xhr, status, error) {
  			//alert('----' +xhr.responseText);
	   		   var str =xhr.responseText;
	   		
	   		   $("#chatdialog").dialog({
	   			  width: 500		  
	   		   });
	   		   $( "#chatdialog" ).dialog({
	   				  height: 600
	   		   });
	   		   $("#chatdialog").css("background-color","white");
		   	   $("#chatdialog").siblings('div.ui-dialog-titlebar').remove();
		   	// one liner
		   	   //$("#chatdialog").dialog(dialogOpts).siblings('.ui-dialog-titlebar').remove();
	    	   var n = str.length;
		   	   var html='';  
		   	   for(var i=0;i<n;i++){
	   		   		if(str[i] =='$'){
		   		   		 html+='<br>'+str[i]
			   	    }
	   				else{
			   	        html+=str[i]
	   	            }
		   	   }
	   		  // alert(html);	
	   		html=html.replace(/&amp;rsquo;/g, "'");
	   		html=html.replace(/&amp;rdquo;/g, "\"");
	   		html=html.replace(/&amp;ldquo;/g, "\"");
	   		html=html.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;nbsp;/g, " "); 
	   		html=html.replace(/&rsquo;/g, '\"');
	   		html=html.replace('@MORE_NODE@', 'Genie found more than one resolution to your query. Here is the first resolution.<br><br>');
	   		
	   		html = "<table width=100%  height=100% border=0><tr><td height=5% align=right bgcolor=yellow><a href=# onclick='closeChat()'><b><font color=green size=2 > Close</a></td></tr>" +
	   				"<tr><td height=95%  valign=top>"+ html+"</td></tr>"+
	   				"</table>";
	   			
	   		
	   		
	   		   $("#chatdialog").html( '<font face="verdana" color="#A6A6A6"  size="2">'+ html + '</font>'); 
	         //  $("#chatdialog" ).dialog( "open" );	
	   	/*	$('#chatdialog').dialog({
        
        open: function(){
            alert('open')
            var closeBtn = $('.ui-dialog-titlebar-close');
            closeBtn.append('<span class="ui-button-icon-primary ui-icon ui-icon-closethick"></span><span class="ui-button-text">close</span>');
        }
   		 });*/
  		   
	   		}
          
      });
  	}
  	catch(err) {
         alert(err);
      }
}
function closeChat(){
	//alert('close')
	//$("#chatdialog").hide();
	$("#chatdialog").dialog("close");
}
/*
function  viewReport(){
	//alert('fromdatepicker ' + $("#fromdatepicker").val());
	//alert('todatepicker ' + $("#todatepicker").val());
	if($("#fromdatepicker").val() == ''){
		alert('Please enter FROM date')
		$("#fromdatepicker").focus();
		return;
	}
	if($("#todatepicker").val() == ''){
		alert('Please enter TO date')
		$("#todatepicker").focus();
		return;
	}
	var startDate = new Date($('#fromdatepicker').val());
	var endDate = new Date($('#todatepicker').val());

	if (startDate > endDate){
		alert("Enter valid date range");
		return;
	}

	// setting header
	   var fromDateStr =  $("#fromdatepicker").val();
	   var toDateStr = $("#todatepicker").val();
	   var comboVal = $("#combo").val();
	   var dateRangeStr = 'Date  range from ' + fromDateStr + ' To ' + toDateStr;
//	   $( "#dialog" ).attr('title', dateRangeStr);


 	   $("#dialog").dialog({
		  width: 1200,
		  		  
	   });
	   $( "#dialog" ).dialog({
			  height: 500,
	   });

	   
		
		$("#dialog").css({
		    "minWidth": 1165
		});
		    

		
	   
	   $("#dialog").css("background-color","white");
	 //  $('#dialog').css('overflow', 'hidden');
	    $('#dialog').css('overflow', 'scroll'); 
	   $("#dialog").dialog("option","title",dateRangeStr);
	   $("#dialog").dialog("option","dialogClass",'myTitleClass');

	   
	   var  htmlheader = '<table border="0" width="100%" cellspacing="0" cellpadding="0" bgcolor="white" ><tr>' +
				'<td style="font-size:15px; face="verdana" id="alId" bgcolor="#10528F"><a id="a1" onclick="a1();" href="#">&nbsp; All </a></td>'+
				'<td style="font-size:15px; face="verdana" id="sfId"><center><a id="s1" onclick="s1();" href="#"> Satisfied <a></td>'+
				'<td style="font-size:15px; face="verdana" id="usId"><center><a id="u1" onclick="u1();" href="#"> Unsatisfied <a></td>'+
				'<td style="font-size:15px; face="verdana" id="icId"><center><a id="i1" onclick="i1();" href="#"> Incomplete <a></td>'+
				 '</tr>'+
				'<tr bgcolor="#FFFFFF"><td colspan=4><div class="grayLine"></td></tr>'+
	   			'</table>';
	// --------------------------------------------------------------
	var  html='';
	 try{
       var errorText = ''; 
       var json = fromDateStr + ":" +toDateStr + ":"+comboVal;
     	$.ajax({
           url: "dateRangeload",
           type: 'POST',        
           data: JSON.stringify(json), 
           cache:false,
           beforeSend: function(xhr) {  
               xhr.setRequestHeader("Accept", "application/json");  
               xhr.setRequestHeader("Content-Type", "application/json");  
           },       
           success:function(response){
   			//alert(response.docName);
   			//url = "resources/docs/" + response.docName;				
   			
   			$.ajax({
   			    url:url,
   			    type:'HEAD',
   			    error: function()
   			    {
   			    	  alert('error');
   			    },
   			    success: function()
   			    {
   			        alert('success');
   			    }
   			  
   			});
           },
           error : function(xhr, status, error) {
   			//alert('----' +xhr.responseText);
   			var str =xhr.responseText;
   	        var a = str.split(",$") // Delimiter is a string
   	        var t='0',s='0';
   	        //<div id="tbl" class="myscroll"  >
   			html += '<table border="0" width="100%" cellspacing="0" cellpadding="0" >';
   			html += '<tr bgcolor="#E9E9E9">';
   			//html += '<td><font face="verdana" color="#FFFFFF"  size="2"><b>Sr.No</font></td>';
   			html += '<td width="15%"><font face="verdana" color="#000000"  size="2"><b>Date</font></td>';
       		html += '<td width="15%"><font face="verdana" color="#000000"  size="2"><b>Name</font></td>';
       		html += '<td width="15%"><font face="verdana" color="#000000"  size="2"><b>Description</font></td>';
       		html += '<td  width="50%"><font face="verdana" color="#000000"  size="2"><b>Solution Given</font></td>';
       		html += '<td  width="5%"><font face="verdana" color="#000000"  size="2"><b>Status</font></td></tr>';

   	        for (var i = 0; i < a.length; i++)
   	        {
           		var b= a[i].split("~");//b[0] = text b[1]=total count
//   	        	alert( b[0] + " **** "+b[1])
					var rid='';
   	        	if(b[0] != ''){
       	        	if(b[4].toUpperCase() == 'YES') rid='yy'
       	        	else if(b[4].toUpperCase() == 'NO') rid='nn'
       	        	else if(b[4] == '-') rid='ii'

   	        		html += '<tr bgcolor="white" id="' +rid+ '">';
   	        		//html += '<td><font face="verdana" color="#7F7F7F"  size="2">' + (i+1) + '</font></td>';
   	        		html += '<td><font face="verdana" color="#7F7F7F"  size="2">' + b[0] + '</font></td>';
   	        		html += '<td><font face="verdana" color="#7F7F7F"  size="2"><a onclick="chatDetails(\''+b[5]+'\'); return false;" href="javascript:void(0);" >' +b[1] + '</a></font></td>';
   	        		html += '<td><font face="verdana" color="#7F7F7F"  size="2">' +b[2] + '</font></td>';
   	        		html += '<td><font face="verdana" color="#7F7F7F"  size="2">' +b[3].replace('@MORE_NODE@', 'Genie found more than one resolution to your query. Here is the first resolution.<br><br>') + '</font></td>';
   	        		if(b[4].toUpperCase() == 'NO'){
   						html += '<td><img src="resources/images/Sad.png"></td></tr>';
   					}
   					else if(b[4].toUpperCase() == 'YES'){ 
   						html += '<td><img src="resources/images/Happy.png"></td></tr>';
   					}
   					else{
   		        		html += '<td><font face="verdana" color="#2c2c2c"  size="2">' +b[4] + '</font></td></tr>';
   					}	

   	        		html += '<tr  bgcolor="#FFFFFF" id="' + rid + '"><td colspan=5><div class="grayLine"></td></tr>';
   	        		
   			     }
   		    }

   	        html +='</table></div>';
   	       //alert( ' html ***** ' +html)
			 $("#dialog").html(htmlheader + '<br>'+html); 
			
			 	
   		}
           
       });
   	}
   	catch(err) {
          alert(err);
       }
	
        $( "#dialog" ).dialog( "open" );
 
}*/

function LoadChart( s, u, n) {
	//alert("load chart" + s + '-'+u+'-'+n)
    $("#dvChart").html("");
    $("#dvLegend").html("");

    //Populate data for the chart
    var fruits = new Array();

    var mango = {};
    mango.text = "Satisfied";
    mango.value = parseInt(s);
    mango.color = "#7FFF55";
    fruits.push(mango);

    var orange = {};
    orange.text = "Unsatisfied";
    orange.value = parseInt(u);
    orange.color = "#B4B4B4";
    fruits.push(orange);

    var peach = {};
    peach.text = "Not Answered";
    peach.value = parseInt(n);
    peach.color = "#FFFFAA";
    fruits.push(peach);

    var el = document.createElement('canvas');
    $("#dvChart")[0].appendChild(el);

    //Fix for IE 8
   // if ($.browser.msie && $.browser.version == "8.0") {
     //   G_vmlCanvasManager.initElement(el);
   // }
    var ctx = el.getContext('2d');
    var chart = new Chart(ctx).Pie(fruits);

    for (var i = 0; i < fruits.length; i++) {
        var div = $("<div />");
        div.css("margin-bottom", "10px");
        div.html("<span style = 'display:inline-block;height:10px;width:10px;background-color:" + fruits[i].color + "'></span> " + fruits[i].text);
        $("#dvLegend").append(div);
    }
    
}

function a1(){
	 $('#alId').css('background', '#10528F')
	 $('#sfId').css('background', '#fff')
	 $('#usId').css('background', '#fff')
	 $('#icId').css('background', '#fff')
	 
	 $('#a1').css('color', '#FFFFFF') 
     $('#s1').css('color', '#A6A6A6') 
	 $('#u1').css('color', '#A6A6A6')
	 $('#i1').css('color', '#A6A6A6')
	 
	
	  
	 $('tr[id^=nn]').show(1000);
	 $('tr[id^=yy]').show(1000);
	 $('tr[id^=ii]').show(1000);
	 
}
function s1(){
	 $('#alId').css('background', '#FFFFFF')
	 $('#sfId').css('background', '#10528F')
	 $('#usId').css('background', '#FFFFFF')
	 $('#icId').css('background', '#FFFFFF')
	 
	 $('#a1').css('color', '#A6A6A6') 
    $('#s1').css('color', '#FFFFFF') 
	 $('#u1').css('color', '#A6A6A6') 
	 $('#i1').css('color', '#A6A6A6')
	 
	  	 
	 $('tr[id^=nn]').hide(1000);
	 $('tr[id^=yy]').show(1000);
	 $('tr[id^=ii]').hide(1000);
 	 
}

function u1(){

	 $('#alId').css('background', '#FFFFFF')
	 $('#sfId').css('background', '#FFFFFF')
	 $('#usId').css('background', '#10528F')
	 $('#icId').css('background', '#FFFFFF')
	 
	 $('#a1').css('color', '#A6A6A6') 
    $('#s1').css('color', '#A6A6A6') 
 	 $('#u1').css('color', '#FFFFFF')
 	 $('#i1').css('color', '#A6A6A6')
 	 
 	 
	 
	 $('tr[id^=yy]').hide(1000);
	 $('tr[id^=nn]').show(1000);
	 $('tr[id^=ii]').hide(1000);
}
function i1(){
	 $('#alId').css('background', '#FFFFFF')
	 $('#sfId').css('background', '#FFFFFF')
	 $('#usId').css('background', '#FFFFFF')
	 $('#icId').css('background', '#10528F')
	 
	 $('#a1').css('color', '#A6A6A6') 
    $('#s1').css('color', '#A6A6A6') 
 	 $('#u1').css('color', '#A6A6A6')
 	 $('#i1').css('color', '#FFFFFF')
	 
	  
	 
	 $('tr[id^=yy]').hide(1000);
	 $('tr[id^=nn]').hide(1000);
	 $('tr[id^=ii]').show(1000);
 	 
}

/*$(document).ready(function() {
	// Datepicker Popups calender to Choose date.
		$(function() {
			
		//$("#fromdatepicker").datepicker({ dateFormat: 'yy-mm-dd' });
		//$("#todatepicker").datepicker({ dateFormat: 'yy-mm-dd' });
		
		$("#quantity").keypress(function (e) {
		     //if the letter is not digit then display error and don't type anything
		     if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
		        //display error message
		        //$("#errmsg").html("<font color=red>Digits Only</font>").show().fadeOut("slow");
		        $("#errmsg").html("<font color=red>Digits Only</font>").show();
		               return false;
		     }
		     else{
		    	 $("#errmsg").html("<font color=red>Digits Only</font>").hide();
		    	 return true;
		    	 }
		   });
		
		});
	});
*/
function setScreenValues(){
	loadConfig();
	
	var ceurl =$("#myurl").val();
	//alert(" setScreenValues  " + ceurl)
	//alert('start')
	var h=window.innerHeight-160;//120;
	var w=(window.innerWidth/10 )*8;
	//alert(w)		
	//$("#headerRow").height( (h/10));			
	//$("#headerRow").width(w);
	$("#headerRow").height(85);		
	
	$("#chartRow").height( (h/10)*4);
	$("#chartRow").width(w+20);
	
	$("#chartRowInnerTable").height( (h/10)*4);
	$("#chartRowInnerTable").width(w+220);
	$("#chart1").width( (($("#chartRow").width()/10)*6));
	$("#chart2").width( (($("#chartRow").width()/10)*4));
//	$("#chartHeader1").width( ($("#chartRow").width()/2)-20);
//	$("#chartHeader2").width( ($("#chartRow").width()/2)-70);
	$("#chartHeader1").width(  (($("#chartRow").width()/10)*6));
	$("#chartHeader2").width( (($("#chartRow").width()/10)*4));


	$("#faqtable").height($("#chartRow").height()-5);
	
	$("#tabRow").height( (h/10)*4-5);
	$("#tabRow").width(w-20);

	$("#menuheader").height(25);
	
	$("#tabRow1").height( $("#tabRow").height());
	$("#tabRow1").width(w-20);
	
	$("#latestTable").height( $("#tabRow").height());
	$("#latestTable").width( $("#tabRow").width());
	//alert($("#tabRow").width())
	
	$("#imgLogo").attr("src", "resources/images/ngGenieLogo.png");
	$("#imgLogo").css("width", 100);
	setTimeout(function(){
		//alert('in setScreenValues ' + ceurl);
		//alert('in setScreenValues ' + myurl);
		callPageloadAjax();
		loadFAQTable();
		loadLatestQueries();
		loadLineChart();
		}, 1000);

}

function loadLineChart()
{
	
	var  html='';
	    var json = {"errorText" : "hello"};
	 try{
     var errorText = ''; 
	 var successres;
	 var errorres;
	 var totalres;
     
   	$.ajax({
         url: myurl+"getLineChartData",
         type: 'POST',        
         data: JSON.stringify(json), 
         cache:false,
         beforeSend: function(xhr) {  
             xhr.setRequestHeader("Accept", "application/json");  
             xhr.setRequestHeader("Content-Type", "application/json");  
         },       
         success:function(response){
			 successres = response.successList;
 			errorres = response.failedList;
			totalres=response.totalList;
			 var successArray = successres.split(",");
	 var failedArray = errorres.split(",");
	 var totalArray = totalres.split(",");
	
			line = new RGraph.Line({
        id:'cvs',
        data: [
            failedArray,
            successArray
        ],
        options: {
            labels: [moment().subtract(77, 'days').calendar().substring(0,5),moment().subtract(70, 'days').calendar().substring(0,5),moment().subtract(63, 'days').calendar().substring(0,5),moment().subtract(56, 'days').calendar().substring(0,5),moment().subtract(49, 'days').calendar().substring(0,5),moment().subtract(42, 'days').calendar().substring(0,5),moment().subtract(35, 'days').calendar().substring(0,5),moment().subtract(28, 'days').calendar().substring(0,5),moment().subtract(21, 'days').calendar().substring(0,5),moment().subtract(14, 'days').calendar().substring(0,5),moment().subtract(7, 'days').calendar().substring(0,5),moment().subtract(0, 'days').calendar().substring(0,5)],
            gutterBottom: 35,
            linewidth: 2,
            shadow: true,
            adjustable: true,
            adjustableOnly: [,,true],
            title: 'Successful Vs Not Successful (Last 2 Months)',
            titleVpos: 0.5,
            spline: true,
            tickmarks: 'circle',
            ticksize: 2
        }
    }).draw();
         },
         error : function(xhr, status, error) {
 			//alert('----' +xhr.responseText);
	   		   var str =xhr.responseText;
			   alert(str);
 		   
	   		}
         
     });
 	}
 	catch(err) {
        alert(err);
     }
	 
}
	
function showTotal(inputStr){
//	alert(inputStr)
	$("#totaldialog").empty();
	var str='', titleStr='';
	if(inputStr.toUpperCase() == 'YES'){
		str='YES'; titleStr='Success Transaction Details';
	}
	else if(inputStr.toUpperCase() == 'NO'){
		str='NO'; titleStr='Failed Transaction Details';
	}
	else if(inputStr.toUpperCase() == 'NA'){
		str='NA'; titleStr='Not answered Request Details';
	}
	else if(inputStr.toUpperCase() == 'SYES'){
		str='SYES'; titleStr='Satisfied Request Details';
	}
	else if(inputStr.toUpperCase() == 'SNO'){
		str='SNO'; titleStr='Unsatisfied Request Details';
	}
	else if(inputStr.toUpperCase() == 'SNA'){
		str='SNA'; titleStr='Not answered Request Details';
	}
	// setting header
	   //$( "#totaldialog" ).attr('title', titleStr);
	   $('#totaldialog').css('overflow', 'hidden'); 
 	  /* $("#totaldialog").dialog({
		  width :1000,	
		  maxwidth : 1200	  
	   });*/
	   $( "#totaldialog" ).dialog({
	       autoOpen: false,
	        modal : true,
	        width: 1200,
	        height : 500,
	        maxwidth : 1200,
	        maxheight : 500
	   });
	   $("#totaldialog").css("background-color","white");
	   $("#totaldialog").dialog("option","title",titleStr);

//	   $( "#totaldialog" ).dialog( "option", "dialogClass", "myfont" );
	// --------------------------------------------------------------
	var  html='';
	 try{
       var errorText = ''; 
       var json = str;
     	$.ajax({
           url: myurl+"totalLoad",
           type: 'POST',        
           data: JSON.stringify(json), 
           cache:false,
           beforeSend: function(xhr) {  
               xhr.setRequestHeader("Accept", "application/json");  
               xhr.setRequestHeader("Content-Type", "application/json");  
           },       
           success:function(response){
   			//alert(response.docName);
   			//url = "resources/docs/" + response.docName;				
   			
   			$.ajax({
   			    url:url,
   			    type:'HEAD',
   			    error: function()
   			    {
   			    	  alert('error');
   			    },
   			    success: function()
   			    {
   			        alert('success');
   			    }
   			  
   			});
           },
           error : function(xhr, status, error) {
   			//alert('----' +xhr.responseText);
   			var str =xhr.responseText;
   	        var a = str.split(",$") // Delimiter is a string
   	        var t='0',s='0';
   			//html += '<div id="tbl1" class="myscroll" > <center><table border="0" width="100%" cellspacing="0" cellpadding="0" >';
   			
			html+='<table border="0" width="100%" cellspacing="0" cellpadding="5" >';
   			html += '<tr bgcolor="#000066">';
   			//html += '<td><font face="verdana" color="#FFFFFF"  size="2"><b>Sr.No</font></td>';
   			html += '<td width="15%"><font face="Arial" color="#FFFFFF"  size="2"><b>Date</font></td>';
       		html += '<td width="10%"><font face="Arial" color="#FFFFFF"  size="2"><b>Name</font></td>';
       		html += '<td width="50%"><font face="Arial" color="#FFFFFF"  size="2"><b>Description</font></td>';
       		html += '<td width="15%"><font face="Arial" color="#FFFFFF"  size="2"><b>Solution Given</font></td>';
       		html += '<td width="10%"><font face="Arial" color="#FFFFFF"  size="2"><b>Status</font></td></tr>';
       		html+='</table>';
       		html+='<div class="ScrollStyle">';
       		html+='<table border="0" width="100%" cellspacing="0" cellpadding="5" >';
   	        for (var i = 0; i < a.length; i++)
   	        {
           		var b= a[i].split("~");//b[0] = text b[1]=total count
//   	        	alert( b[0] + " **** "+b[1])
					var rid='';
   	        	if(b[0] != ''){
       	        	if(b[4].toUpperCase() == 'YES') rid='yy'
       	        	else if(b[4].toUpperCase() == 'NO') rid='nn'
       	        	else if(b[4].toUpperCase() == '-') rid='ii'
		
   	        		html += '<tr bgcolor="#FFFFFF" id="' +rid+ '">';
   	        		//html += '<td><font face="verdana" color="#7F7F7F"  size="2">' + (i+1) + '</font></td>';
   	        		html += '<td width="15%"><font face="Arial" color="#000000"  size="2">' + b[0] + '</font></td>';
   	        		html += '<td width="10%"><font face="Arial" color="#000000"  size="2"><a onclick="chatDetails(\''+b[5]+'\'); return false;" href="javascript:void(0);" >' +b[1] + '</a></font></td>';
   	        		html += '<td width="50%"><font face="Arial" color="#000000"  size="2">' +b[2] + '</font></td>';
   	        		html += '<td width="15%">--</td>';//'<td><font face="verdana" color="#7F7F7F"  size="2">' +b[3] + '</font></td>';
   	        		if(b[4].toUpperCase() == 'NO'){
   						html += '<td  width="10%"><img src="resources/images/Sad.png"></td></tr>';
   					}
   					else if(b[4].toUpperCase() == 'YES'){ 
   						html += '<td width="10%"><img src="resources/images/Happy.png"></td></tr>';
   					}
   					else{
   		        		html += '<td width="10%"><font face="Arial" color="#000000"  size="2">' +b[4] + '</font></td></tr>';
   					}	

   	        		//html += '<tr  bgcolor="#FFFFFF" id="' + rid + '"><td colspan=5><div class="grayLine"></td></tr>';
   	        		
   			     }
   		    }

   	        html +='</table></center> </div>';
   	       //alert( ' html ***** ' +html)
			 $("#totaldialog").html(html); 
			
			 	
   		}
           
       });
   	}
   	catch(err) {
          alert(err);
       }
   	
        $( "#totaldialog" ).dialog( "open" );
}
/*
function getUserDetails(){
	//alert('Hello ' +tid);

	var  html='';
	 try{
      var errorText = ''; 
      
    	$.ajax({
          url: "userList",
          type: 'POST',        
          data: JSON.stringify(html), 
          cache:false,
          beforeSend: function(xhr) {  
              xhr.setRequestHeader("Accept", "application/json");  
              xhr.setRequestHeader("Content-Type", "application/json");  
          },       
          success:function(response){
  			
  			$.ajax({
  			    url:url,
  			    type:'HEAD',
  			    error: function()
  			    {
  			    	  alert('error');
  			    },
  			    success: function()
  			    {
  			        alert('success');
  			    }
  			  
  			});
          },
          error : function(xhr, status, error) {
  			//alert('----' +xhr.responseText);
	   		   var str =xhr.responseText;	   			
	   		   //alert(xhr.responseText); 
	   		    
		   	   var combo = document.getElementById("combo");
	           var option = document.createElement("option");
	   	       option.text =  'All';
	   	   	   option.value = 'All';
		   	   try {
		   	        combo.add(option, null); //Standard
		   	   }catch(error) {
		   	       combo.add(option); // IE only
		   	   }
		   	   
   		   	   var a = str.split(":~") 
   		   	   //alert(a.length)
	           for (var i = 0; i < a.length; i++)
   	           {
	        	   option = document.createElement("option");
		   	       option.text =  a[i];
		   	   	   option.value = a[i];
			   	   try {
			   	        combo.add(option, null); //Standard
			   	   }catch(error) {
			   	       combo.add(option); // IE only
			   	   }
   	           } 	
	   		}          
      });
  	}
  	catch(err) {
         alert(err);
      }
}
*/


