/*document.writeln("<script type='text/javascript' src='resources/js/jquery-1.12.4.min.js'></script>")*/
document.writeln("<script type='text/javascript' src='resources/js/JsJaclibs/JSJaC.js'></script>");
document.writeln("<script type='text/javascript' src='resources/js/JsJaclibs/JSJaCConsoleLogger.js'></script>");

var smeJid="";
var queryPicked=false;
var logoutFlag=false;

$(document).ready(function(){
	console.log("Connecting to OP Server");
	doLogin();
	$("#userlogoutId").click(function(){
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
/*logic for if query is not picked by SME within a minute*/
function queryPickedorNot(){
	
	 $(".yesNoBtn").attr('disabled','disabled');
	 $("#waitBtn1").removeAttr('id');
	 $("#proceedBtn1").removeAttr('id');
	if(triggerOpChat){
					if(!queryPicked){	
						$("#queryArea *").attr('disabled', 'disabled');
						$("#conversationSection").append("<Div><div id='genieText'  class='bubble'>Query is not yet picked. Do you want to wait for SME's response or Proceed further?<br><input class='yesNoBtn' type='button' id='waitBtn1' style='border-radius: 6px; width: 40%;' value='Wait' onclick='waitOrProceed1(event);'/>&nbsp;&nbsp;<input class='yesNoBtn' type='button' id='proceedBtn1' style='border-radius: 6px;width: 40%;' value='Proceed' onclick='waitOrProceed1(event);'/></div></Div>");
						fixScroll();
						queryPicked=false;
					}
			}
}
function waitOrProceed1(e){
	$("#queryArea *").removeAttr("disabled");
	var waitOrProceedId=event.target.id;
		//alert(yesNo);
		var res=$('#'+waitOrProceedId).val();
		
		if(res=='Wait'){
			//genie bubble=Query posted to SME, he will get back to you in a while
			$("#conversationSection").append("<Div><div id='genieText'  class='bubble'>SME has been notified please wait untill he responds</div></Div>");
			$("#waitBtn1").css('background-color','#72a9df');
			$("#proceedBtn1").css('background-color','#3773af');
			triggerOpChat=true;
			//clearInterval(queryPickedInterval);
			setTimeout(function(){ 
					queryPickedorNot();
				}, 60000);
			$('#endAdminChatId').show();
			endAdminChatFlag=false;
		}
		else{
			$("#conversationSection").append("<div><div id='userText' class='bubble bubble--alt'>I want to proceed with next query</div></div>");
			$("#proceedBtn1").css('background-color','#72a9df');
			$("#waitBtn1").css('background-color','#3773af');
			triggerOpChat=false;
			$('#endAdminChatId').hide();
			//clearInterval(queryPickedInterval);
		}
		fixScroll();
		//var userInputText = $('#userInputText').val(res);
		$(".yesNoBtn").attr('disabled','disabled');
		$("#waitBtn1").removeAttr('id');
		$("#proceedBtn1").removeAttr('id');
		 $("#queryArea *").removeAttr("disabled");
		$('#userInputText').focus();
}
function handleIQ(oIQ) {
    con.send(oIQ.errorReply(ERR_FEATURE_NOT_IMPLEMENTED));
}

function handleMessage(oJSJaCPacket) {
	queryPicked=true;
	//alert(triggerOpChat);
	if(triggerOpChat){
		if(oJSJaCPacket.getBody().toString()=='#sme_end_@chat##'){
			triggerOpChat=false;
			$('#endAdminChatId').hide();
			$("#conversationSection").append(
            "<Div><div id='genieText'  class='bubble'>SME has ended the conversation</div></Div>");
			
			console.log("Received msg from "+fromJID +" messgae is "+oJSJaCPacket.getBody());
			setTimeout(function(){ 
				fixScroll();
				$('#userText').focus(); 
			}, 1000);
		}
		else{
			var fromJID=""+oJSJaCPacket.getFromJID().toString();
			smeJid=fromJID.substring(0,fromJID.indexOf("@"));
			$("#conversationSection").append(
				"<Div><div id='genieText'  class='bubble'>" +
				oJSJaCPacket.getBody().toString() + "</div></Div>");
				
				console.log("Received msg from "+fromJID +" messgae is "+oJSJaCPacket.getBody());
				setTimeout(function(){ 
					fixScroll();
					$('#userText').focus(); 
				}, 1000);
		}
	}
    
}

function handlePresence(oJSJaCPacket) {
    var html = '<div class="msg">';
    if (!oJSJaCPacket.getType() && !oJSJaCPacket.getShow())
        html += '<b>' + oJSJaCPacket.getFromJID() + ' has become available.</b>';
    else {
        html += '<b>' + oJSJaCPacket.getFromJID() + ' has set his presence to ';
        if (oJSJaCPacket.getType())
            html += oJSJaCPacket.getType() + '.</b>';
        else
            html += oJSJaCPacket.getShow() + '.</b>';
        if (oJSJaCPacket.getStatus())
            html += ' (' + oJSJaCPacket.getStatus().htmlEnc() + ')';
    }
    html += '</div>';
   console.log("Presence :"+html);
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
                httpbase : opURL,
               'oDbg' : oDbg
            });
        setupCon(con);

        // setup args for connect method
        oArgs = new Object();
        oArgs.domain = hostDomain;
        oArgs.username = loginUser;
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

function openOpChat(){	
	var to =smeJid+opHostName;
	try {
	        var oMsg = new JSJaCMessage();
	        oMsg.setTo(new JSJaCJID(to));
	        oMsg.setBody($('#userInputText').val());
			if(!endAdminChatFlag){
				$("#conversationSection").append(
				"<Div><div id='genieText'  class='bubble bubble--alt'>" +
				$('#userInputText').val() + "</div></Div>");
			}
			fixScroll();
			$('#userInputText').val('');
			con.send(oMsg);
	        return false;
	    } catch (e) {
	    	console.log("error while sending message "+e.message);
	        return false;
	    }
	
}


/*document.writeln("<script type='text/javascript' src='resources/js/jquery-1.12.4.min.js'></script>");
document.writeln("<script type='text/javascript' src='resources/js/jquery.xmpp.js'></script>");

var opHostName="@d-113023311.wipro.com";
var opURL="http://d-113023311.wipro.com:7070/http-bind/";
var password ="wipro@123" ;
var smeJid="sme1";
var jid ="";
var sid =null;

$(document).ready(function(){
	jid = loginUser+opHostName;
	alert("http://d-113023311.wipro.com:9090/plugins/presence/status?jid="+jid+"&type=text");
		if(localStorage.getItem('sid')==null || localStorage.getItem('sid')==='null'){
			$.xmpp.connect({url:opURL, jid: jid, password: password,
				onConnect: function(){
					sid=$.xmpp.sid;
					localStorage.setItem( 'sid', sid );
					localStorage.setItem( 'rid', $.xmpp.rid );
					console.log("Connected");
					$.xmpp.setPresence(null);
				},
				onDisconnect: function(){
					localStorage.setItem( 'sid', null );
					console.log("Disconnected");
				},
				onPresence: function(){
					alert("present");
					console.log("Disconnected");
				},
				onMessage: function(message){
					$("#conversationSection").append(
	                        "<Div><div id='genieText'  class='bubble'>" +
	                        message.body + "</div></Div>");
							fixScroll();
				}, onNotification: function(notification){
			       console.log("My custom command received!");
			       console.log(notification);
				   alert("Message from server "+notification);
			   },
				onError:function(error){
					localStorage.setItem( 'sid', null );
					alert("disconnected");
					console.log(error.error);
				}
			});	
		}else{
			var sid=localStorage.getItem('sid' );
			var rid=localStorage.getItem('rid' );
			alert("presence "+$.xmpp.getPresence(sid));
			$.xmpp.attach({jid:jid,sid:sid,rid:rid,
			onConnect: function(){
				console.log("Attached");
				$.xmpp.setPresence(null);
			},
			onDisconnect: function(){
				localStorage.setItem( 'sid', null );
				console.log("Detached");
			},
			 onNotification: function(notification){
			       console.log("My custom command received!");
			       console.log(notification);
				   alert("Message from server "+notification);
			   },
			onMessage: function(message){
				$("#conversationSection").append(
                        "<Div><div id='genieText'  class='bubble'>" +
                        message.body + "</div></Div>");
						fixScroll();
			},onError:function(error){
				localStorage.setItem( 'sid', null );
				console.log(error.error);
			}
		});	
	  }
			$("#userlogoutId").click(function(){
				localStorage.setItem( 'sid', null );
				$.xmpp.disconnect();
			});
			
});


function openOpChat(){
	var to =smeJid+opHostName;
	$.xmpp.sendMessage({to:to, body:  $('#userInputText').val()});
	$("#conversationSection").append(
            "<Div><div id='genieText'  class='bubble bubble--alt'>" +
            $('#userInputText').val() + "</div></Div>");
			fixScroll();
	$('#userInputText').val('');
	
}
*/

/*document.writeln("<script type='text/javascript' src='resources/js/jquery-1.12.4.min.js'></script>");
document.writeln("<script type='text/javascript' src='resources/js/jquery.xmpp.js'></script>");



var opHostName="@d-113023311.wipro.com";
var opURL="http://d-113023311.wipro.com:7070/http-bind/";
var password ="wipro@123" ;
var smeJid="";
var jid ="";
var sid =null;

$(document).ready(function(){
	jid = loginUser+opHostName;
		if(localStorage.getItem('sid')==null || localStorage.getItem('sid')=='null'){
			$.xmpp.connect({url:opURL, jid: jid, password: password,
				onConnect: function(){
					sid=$.xmpp.sid;
					localStorage.setItem( 'sid', sid );
					console.log("Connected");
					$.xmpp.setPresence(null);
				},
				onDisconnect: function(){
					localStorage.setItem( 'sid', null );
					console.log("Disconnected");
				},
				onMessage: function(message){
					var jid = message.from.split("/");
					$("#conversationSection").append(
	                        "<Div><div id='genieText'  class='bubble'>" +
	                        message.body + "</div></Div>");
							fixScroll();
				smeJid=message.from;
				smeJid=jid[0].substring(0,jid[0].indexOf("@"));
				},
				onError:function(error){
					localStorage.setItem( 'sid', null );
					console.log(error.error);
				}
			});	
		}else{
			$.xmpp.attach({jid:jid,sid:$.xmpp.sid,rid:$.xmpp.rid,
			onConnect: function(){
				console.log("Attached");
				$.xmpp.setPresence(null);
			},
			onDisconnect: function(){
				localStorage.setItem( 'sid', null );
				console.log("Detached");
			},
			 onNotification: function(notification){
			       console.log("My custom command received!");
			       console.log(notification);
			   },
			onMessage: function(message){
				var jid = message.from.split("/");
				$("#conversationSection").append(
                        "<Div><div id='genieText'  class='bubble'>" +
                        message.body + "</div></Div>");
						fixScroll();
				smeJid=message.from;
				smeJid=jid[0].substring(0,jid[0].indexOf("@"));
			},onError:function(error){
				localStorage.setItem( 'sid', null );
				console.log(error.error);
			}
		});	
	  }
			$("#userlogoutId").click(function(){
				localStorage.setItem( 'sid', null );
				$.xmpp.disconnect();
			});
			
});


function openOpChat(){
	var to =smeJid+opHostName;
	$.xmpp.sendMessage({to:to, body:  $('#userInputText').val()});
	$("#conversationSection").append(
            "<Div><div id='genieText'  class='bubble bubble--alt'>" +
            $('#userInputText').val() + "</div></Div>");
			fixScroll();
	$('#userInputText').val('');
	
}*/

