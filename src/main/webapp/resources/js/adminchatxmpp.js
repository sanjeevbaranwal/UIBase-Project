/*document.writeln("<script type='text/javascript' src='resources/js/jquery-1.12.4.min.js'></script>")*/
document.writeln("<script type='text/javascript' src='resources/js/JsJaclibs/JSJaC.js'></script>");
document.writeln("<script type='text/javascript' src='resources/js/JsJaclibs/JSJaCConsoleLogger.js'></script>");

var adminJid ="";
var agentName='';
var logoutFlag=false;

$(document).ready(function(){
	console.log("Connecting to OP Server");
	adminJid = $('#adminId').val()+opHostName;
	doLogin();
	$("#adminlogoutId").click(function(){
		logoutFlag=true;
	    var p = new JSJaCPresence();
	    p.setType("unavailable");
	    con.send(p);
		if ( typeof con != 'undefined' && con && con.connected()) {
	        // save backend type
	        if (con._hold)// must be binding
	            (new JSJaCCookie('btype', 'binding')).write();
	        else
	            (new JSJaCCookie('btype', 'polling')).write();
	        if (con.suspend) {
	            con.suspend();
	        }
	    }
	    con.disconnect();
	    console.log("Disconnected after clicking logout");
	});
});
function handleIQ(oIQ) {
    con.send(oIQ.errorReply(ERR_FEATURE_NOT_IMPLEMENTED));
}

function handleMessage(oJSJaCPacket) {
    var fromJID=""+oJSJaCPacket.getFromJID().toString();
	var agntName=fromJID.substring(0,fromJID.indexOf("@"));
	$('#'+agntName+'chatDiv').first().append('<div class="msg_a"><label class="msg_label">'+oJSJaCPacket.getBody().toString()+'</label></div>');
	$('.msg_body').scrollTop($('.msg_body')[0].scrollHeight);
	var to =agentName+opHostName;
	var msgFromAgent=oJSJaCPacket.getBody();
	msgFromAgent=msgFromAgent.trim();
	console.log("Received msg from "+to +" messgae is "+msgFromAgent);
	saveLiveOPTransactionHistory(adminJid,to,msgFromAgent,"agent");
	 setTimeout(function(){ 
			$('#userText').focus(); 
	 }, 1000);
}

function handlePresence(oJSJaCPacket) {
	var htmlPres = '<div class="msg">';
    if (!oJSJaCPacket.getType() && !oJSJaCPacket.getShow())
    	htmlPres += '<b>' + oJSJaCPacket.getFromJID() + ' has become available.</b>';
    else {
    	htmlPres += '<b>' + oJSJaCPacket.getFromJID() + ' has set his presence to ';
        if (oJSJaCPacket.getType())
        	htmlPres += oJSJaCPacket.getType() + '.</b>';
        else
        	htmlPres += oJSJaCPacket.getShow() + '.</b>';
        if (oJSJaCPacket.getStatus())
        	htmlPres += ' (' + oJSJaCPacket.getStatus().htmlEnc() + ')';
    }
    htmlPres += '</div>';
	console.log("Presence :"+htmlPres);
    
}

function handleError(e) {
	console.log("error "+e.getAttribute('code'));

    if (con.connected()){
        con.disconnect();
        console.log("disconnected error");
		//doLogin();
    }
	console.log("connecting again on error");
	doLogin();
}

function handleStatusChanged(status) {
    oDbg.log("status changed: " + status);
}

function handleConnected() {
	console.log("connected to OP server");
    con.send(new JSJaCPresence());
}

function handleDisconnected() {
	console.log("disconnected from OP server and logout flag is "+logoutFlag);
	if(!logoutFlag){
		 if(!con.connected()){
			console.log("Connecting again");
			doLogin(); 
		 }
       
	}
}

function handleIqVersion(iq) {
    con.send(iq.reply([iq.buildNode('name', 'genieChat'), iq.buildNode('version', JSJaC.Version), iq.buildNode('os', navigator.userAgent)]));
    return true;
}

function handleIqTime(iq) {
    var now = new Date();
    con.send(iq.reply([iq.buildNode('display', now.toLocaleString()), iq.buildNode('utc', now.jabberDate()), iq.buildNode('tz', now.toLocaleString().substring(now.toLocaleString().lastIndexOf(' ') + 1))]));
    return true;
}

function doLogin() {
    // reset
    try {
		oDbg = new JSJaCConsoleLogger(4);
            con = new JSJaCHttpBindingConnection({
                httpbase : opURL,//oForm.http_base.value,
                'oDbg' : oDbg
            });
        setupCon(con);

        // setup args for connect method
        oArgs = new Object();
        oArgs.domain = hostDomain;
        oArgs.username = $('#adminId').val();
        oArgs.resource = 'genieChat';
        oArgs.pass = password;
        oArgs.register = false;
        con.connect(oArgs);
    } catch (e) {
        console.log("error "+e.toString());
    } finally {
        return false;
    }
}

function setupCon(oCon) {
    oCon.registerHandler('message', handleMessage);
    oCon.registerHandler('presence', handlePresence);
    oCon.registerHandler('iq', handleIQ);
    oCon.registerHandler('onconnect', handleConnected);
    oCon.registerHandler('onerror', handleError);
    oCon.registerHandler('status_changed', handleStatusChanged);
    oCon.registerHandler('ondisconnect', handleDisconnected);
    oCon.registerIQGet('query', NS_VERSION, handleIqVersion);
    oCon.registerIQGet('query', NS_TIME, handleIqTime);
}

function openAdminOpChat(){
	
	
	if(!endChatWithAgent){
		agentName=$('#agentId').val();
		var to =agentName+opHostName;
		
		var mapValueObj=myMap.get(agentName);
		try {
				var oMsg = new JSJaCMessage();
				oMsg.setTo(new JSJaCJID(to));
				oMsg.setBody($('#userText').val());
				var textValue=$('#userText').val().trim();
				
				if(mapValueObj.initialMsgSent){
					$('#'+agentName+'chatDiv').first().append('<div class="msg_b"><label class="msg_label">'+textValue+'</label></div>');
					$('.msg_body').scrollTop($('.msg_body')[0].scrollHeight);
					
				}
				
				$('#userText').val('');
				
				/* setTimeout(function(){ 
				$('#userText').focus(); 
			}, 1000); */
				
				con.send(oMsg);
				saveLiveOPTransactionHistory(to,adminJid,textValue,"sme");
				 //$("#userText").val('').focus();
				return false;
			} catch (e) {
				console.log("error while sending message "+e.message);
				return false;
			}
	}
	else{
		agentName=$('#agentId').val();
		var to =agentName+opHostName;
		try {
				var oMsg = new JSJaCMessage();
				oMsg.setTo(new JSJaCJID(to));
				oMsg.setBody('#sme_end_@chat##');
				$('#userText').val('');
				setTimeout(function(){ 
				$('#userText').focus(); 
			}, 1000);
				
				con.send(oMsg);
				saveLiveOPTransactionHistory(to,adminJid,textValue,"sme");
				return false;
			} catch (e) {
				console.log("error while sending message "+e.message);
				return false;
			}
		
	}
	
}
function saveLiveOPTransactionHistory(toUserId,fromUserId,textValue,senderType){
	var obj=myMap.get(agentName);
	var transactionId=obj.transactionId;
	var json = {"transactionId" : transactionId,"toUserId":toUserId,"fromUserId":fromUserId,"liveChatResponse":textValue,"senderType":senderType};
	
	$.ajax({
			url : myurl + "saveOpChatHistory",
			type : 'POST',
			data : JSON.stringify(json),
			cache : false,
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			},
			success : function(response) {
				console.log("op chat saved to db");
			},
			error:function(response){
				console.log("Error while saving OP chat");
			}
		});
}


/*document.writeln("<script type='text/javascript' src='resources/js/jquery-1.12.4.min.js'></script>");
document.writeln("<script type='text/javascript' src='resources/js/jquery.xmpp.js'></script>");



var opHostName="@d-113023311.wipro.com";
var opURL="http://d-113023311.wipro.com:7070/http-bind/";
var password ="wipro@123" ;
var agentJid="";
var adminJid ="";
var agentName='';
var sid =null;
var rid=null;

$(document).ready(function(){
	adminJid = $('#adminId').val()+opHostName;
	var textValue=$('#userText').val();
		if(localStorage.getItem('adminsid')==null || localStorage.getItem('adminsid')=='null'){
			$.xmpp.connect({url:opURL, jid: adminJid, password: password,
				onConnect: function(){
					sid=$.xmpp.sid;
					localStorage.setItem( 'adminsid', sid );
					console.log("Connected");
					$.xmpp.setPresence(null);
				},
				onDisconnect: function(){
					localStorage.setItem( 'adminsid', null );
					console.log("Disconnected");
				},
				onMessage: function(message){
					var jid = message.from.split("/");
					var id = MD5.hexdigest(message.from);
					var conversation = $("#"+id);
					/*if(conversation.length == 0){
						openChat({to:message.from});
					}
					var agntName=jid[0].substring(0,jid[0].indexOf("@"));
					$('#'+agntName+'chatDiv').first().append('<div class="msg_a">'+message.body+'</div>');
					$('.msg_body').scrollTop($('.msg_body')[0].scrollHeight);
					var to =agentName+opHostName;
					//alert(to);
				saveLiveOPTransactionHistory(adminJid,to,message.body,"agent");
					 
				},
				onError:function(error){
					localStorage.setItem( 'adminsid', null );
					console.log(error.error);
				}
			});	
		}else{
			$.xmpp.attach({jid:adminJid,sid:$.xmpp.sid,rid:$.xmpp.rid,
			onConnect: function(){
				console.log("Attached");
				$.xmpp.setPresence(null);
			},
			onDisconnect: function(){
				localStorage.setItem( 'adminsid', null );
				console.log("Detached");
			},
			 onNotification: function(notification){
			       console.log("My custom command received!");
			       console.log(notification);
			   },
			onMessage: function(message){
				var jid = message.from.split("/");
				var id = MD5.hexdigest(message.from);
				
				var agntName=jid[0].substring(0,jid[0].indexOf("@"));
				$('#'+agntName+'chatDiv').first().append('<div class="msg_a">'+message.body+'</div>');
				$('.msg_body').scrollTop($('.msg_body')[0].scrollHeight);
				
				//alert(to+"in else block");
				var to =agentName+opHostName;
				saveLiveOPTransactionHistory(adminJid,to,message.body,"agent");
			},onError:function(error){
				localStorage.setItem( 'adminsid', null );
				alert(error.error);
			}
		});	
	  }
			$("#adminlogoutId").click(function(){
				localStorage.setItem( 'adminsid', null );
				$.xmpp.disconnect();
			});
			$("#backToAdmin").click(function(){
				localStorage.setItem( 'adminsid', null );
				$.xmpp.disconnect();
			});
			
});


function openAdminOpChat(){
	agentName=$('#agentId').val()
	var to =agentName+opHostName;
	$.xmpp.sendMessage({to:to, body:  $('#userText').val()});
	 var textValue=$('#userText').val();
	saveLiveOPTransactionHistory(to,adminJid,textValue,"sme");
	
	$('#'+agentName+'chatDiv').first().append('<div class="msg_b">'+textValue+'</div>');
	$('.msg_body').scrollTop($('.msg_body')[0].scrollHeight);
	$('#userText').val('');
	
}
function saveLiveOPTransactionHistory(toUserId,fromUserId,textValue,senderType){
	
	$('#userText').val('');
	$('#userText').focus();
	var transactionId=myMap.get(agentName);
	
	var json = {"transactionId" : transactionId,"toUserId":toUserId,"fromUserId":fromUserId,"liveChatResponse":textValue,"senderType":senderType};
	$.ajax({
			url : myurl + "saveOpChatHistory",
			type : 'POST',
			data : JSON.stringify(json),
			cache : false,
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Accept", "application/json");
				xhr.setRequestHeader("Content-Type", "application/json");
			},
			success : function(response) {
				//alert(response);
			},
			error:function(response){
				//alert('error');
			}
		});
}*/
