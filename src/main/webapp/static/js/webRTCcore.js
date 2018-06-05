window.showCallConatiner = {};
window.showCallConatiner.outgoing = false;
window.showCallConatiner.incoming = false;
window.showCallConatiner.annotation = false;
window.showCallConatiner.video = false;
window.callStatusText = "";
var socket;
function webRTCcore (engineer,callLogData,config,firebaseRef) {
  let self = this;
  this.callState = "inactive";
  this.callDirection = "";
  this.hideCallContainers = function () {
    let annotationCanvas = document.getElementById('annotation-canvas'),
    context = annotationCanvas.getContext('2d');
    context.clearRect(0, 0, annotationCanvas.width, annotationCanvas.height);
    window.showCallConatiner.outgoing = false;
    window.showCallConatiner.incoming = false;
    window.showCallConatiner.video = false;
    window.showCallConatiner.annotation = false;
  };
  self.hideCallContainers();
  window.callType = "Annotation Call";
  this.config = config;
  this.callLogData = callLogData;
  this.engineer = engineer;
  this.expert = {};
  this.callLogData={};
  this.loginId = this.engineer.EngId;
  this.peerConnection1 = null;
  this.dataChannel = null;
  this.localAudioStream = null;
  this.localVideoStream = null;
  this.desktopStream = null;
  this.candidateQueue = [];
  this.incomingCandidates = [];
  this.incomingCandidates2 = [];
  this.IsAndroidChrome = false;
  this.imageChunks = [];
  this.imageTransmission = false;
  this.imageName = null;
  this.imageSize = 0;
  this.originalImageSize = 0;
  this.imageWidth = 320;
  this.imageHeight = 240;
  this.switchCallType = 0;
  this.imageChunksCurrentSize = 0;
  this.maxConnectingTime = 120;
  this.divCallStatus = $('.call-status-div');
  this.divLoading = $('.loading-div');
  // this.divAnnotationImage = $('.annotation-image');
  this.imgAnnotated = $('#annotation');
  this.currentCallType = $('.call-type')[0];
  this.callerOrCalleeName = $('.caller-callee-name')[0];
  this.currentCallDuration = $('.call-duration')[0];
  this.MediaConstraints = {
    audio : true,
    video : false
  };

  this.servers = {
    iceServers: [
      {
        'url': 'turn:52.200.80.202:3478?transport=udp',
        'credential': 'gaurav',
        'username': 'gaurav'
      }]
    };
    this.options = {
      optional: [{DtlsSrtpKeyAgreement: true}]
    };

    this.startPeerConnection1 = function (audioOut, expert, callDirection, callLogData) {
      console.log('Creating PC1',callDirection);
      this.switchCount = 0;
      this.switchCallType = "";
      self.callLogData = callLogData;
      self.callLogData.activityStatus = "Call Disconnected"
      self.callDirection = callDirection;
      self.expert = expert;
      self.callerOrCalleeName.textContent = 'with ' + self.expert.name + " ";
      self.callExpertRef = firebaseRef.child('callexperts/' + self.expert.expertID + '_expertcallerID');
      // self.callExpertRef.child('userMsg').off();
      self.peerConnection1 = new RTCPeerConnection(this.servers, this.options);
      this.dataChannel = this.peerConnection1.createDataChannel("sendChannel");
      this.dataChannel.binaryType = "arraybuffer";
      this.dataChannel.onmessage = this.handleDataChannelMessage;
      this.candidateQueue = [];
      this.candidateQueue2 = [];
      this.peerConnection1.oniceconnectionstatechange = this.handleICEConnectionStateChange;
      this.peerConnection1.onicecandidate = this.handleICECandidate;
      this.peerConnection1.onaddstream = function (event) {
        $('#incomingAudio').attr('src', URL.createObjectURL(event.stream));
        console.log('ON-ADD-STREAM audioOut.src changed : ' + URL.createObjectURL(event.stream) + ' ' + $('#incomingAudio'));
      };
      navigator.getUserMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
      navigator.getUserMedia(this.MediaConstraints, this.OnMediaSuccess, _callbackDefault);
    };

    this.startPeerConnection2 = function () {
      self.peerConnection2 = new RTCPeerConnection(this.servers, this.options);
      this.candidateQueue2 = [];
      this.peerConnection2.oniceconnectionstatechange = this.handleICEConnectionStateChange2;
      this.peerConnection2.onicecandidate = this.handleICECandidate2;
      getScreenId(function(error, sourceId, screen_constraints) {
        if (self.IsAndroidChrome) {
          screen_constraints = {
            mandatory: {
              chromeMediaSource: 'screen'
            },
            optional: []
          };
          screen_constraints = {
            video: screen_constraints
          };
          error = null;
        }
        if(error == 'not-installed') {
          alert('Please install Chrome extension. See the link below.');
          return;
        }
        if(error == 'installed-disabled') {
          alert('Please install or enable Chrome extension. Please check "chrome://extensions" page.');
          return;
        }
        if(error == 'permission-denied') {
          self.sendMessage("canSwitch");
          alert('Screen cature denied');
          return;
        }
        console.info('getScreenId callback \n(error, sourceId, screen_constraints) =>\n', error, sourceId, screen_constraints);
        navigator.getUserMedia = navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
        navigator.getUserMedia(screen_constraints, function(stream) {
          self.localVideoStream = stream;
          self.peerConnection2.addStream(stream);
          self.call2();
          stream.oninactive = stream.onended = function() {
          };
        }, function(error) {
          console.error('getScreenId error', error);
          alert('Failed to capture your screen. Please check Chrome console logs for further information.');
        });
      });
    };

    this.stopTimer;
    this.startTimer = function () {
      let seconds = 0,minutes = 0,hours = 0,t;
      function start() {
        seconds ++;
        if (seconds >= 60) {
          seconds = 0;
          minutes++;
          if (minutes >= 60) {
            minutes = 0;
            hours++;
          }
        }
        let time = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
        self.currentCallType.textContent = window.callType;
        self.currentCallDuration.textContent = time;
        if (self.callState == "active") {
          timer();
        } else if (self.callState == "inactive") {
          self.currentCallType.textContent = "Video and Annotation Call";
          self.callerOrCalleeName.textContent = "";
          clearTimeout(t);
        }
      }

      function timer() {
        t = setTimeout(start,1000);
      }
      timer();

      self.stopTimer = function () {
        self.callLogData.callDuration = self.currentCallDuration.textContent;
        var serviceUrl = window.parent.updateServiceUrl;
        var a = self.callLogData.callDuration.split(':');
        var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 
        var now = moment(new Date());
        var jsonData = {
      		  "enggId":self.callLogData.loginId,
      		  "expertId":self.callLogData.tologinId,
      		  "callStartDate":self.callLogData.timeStamp,
      		  "callEndDate":moment(now).format("YYYY-MM-DD HH:mm:ss"),
      		  "callDuration":seconds,
      		  "active":0
      		}
        $.ajax({
            "method": "POST",
            "url": serviceUrl,
            "contentType": "application/json",
            "dataType": "json",
            "data": JSON.stringify(jsonData),
            "processData": false
          }).done(function (data) {
            if (data && data.result == "SUCCESS") {
              console.log("INFO: Availability Service Updated Successfully.");
            } else {
              console.log("ERROR: Failed to update availability service.",data);
            }
          }).fail(function (err) {
            console.error(err);
          });
        clearTimeout(t);
      }
    };

    this.handleICEConnectionStateChange = function () {
      let state = self.peerConnection1.iceConnectionState;
      console.log("ice state",state);
      if (state === 'connected') {
        console.log('Client connected! PC1');
      }
      else if (state === 'disconnected') {
        console.log('Client disconnected! Waiting to reconnect. PC1');
        // self.closePC1();
      }
      else if (state === 'failed' && !self.onHold) {
        self.callLogData.terminationType = "Network Disconnected";
        console.log('Client failed! Call closed.PC1');
        self.closePC1();
      }
    };
    this.handleICEConnectionStateChange2 = function () {
      let state = self.peerConnection2.iceConnectionState;
      if (state === 'connected') {
        console.log('PC2 : Connected!');
        window.callType = "Video Call";
        self.hideCallContainers();
        window.showCallConatiner.video = true;
        self.sendMessage("canSwitch");
      }
      else if (state === 'disconnected') {
        console.log('PC2 : Disconnected. Waiting to reconnect.');
        self.closePC2();
      }
      else if (state === 'failed' && !self.onHold) {
        self.callLogData.terminationType = "Network Disconnected";
        console.log('PC2 : Call failed!');
        self.closePC2();
      }
    };
    this.handleICECandidate = function (event) {
      var candidate = event.candidate;
      if (candidate) {
        candidate = candidate.toJSON();
        candidate.type = 'candidate';
        self.candidateQueue.push(JSON.stringify(candidate));
      }
    };
    this.handleICECandidate2 = function (event) {
      var candidate = event.candidate;
      if (candidate) {
        candidate = candidate.toJSON();
        candidate.type = 'candidate';
        self.candidateQueue2.push(JSON.stringify(candidate));
      }
    };
    this.handleDataChannelMessage = function (event) {
      var msg = event.data;
      var msgObj = "";
      if (msg === "EnableVideo") {
        self.switchCount++;
        self.startPeerConnection2();
        var url = "ws://localhost:8007/";
        socket = new WebSocket(url);
         //lf.remoteControl = true;
        socket.onmessage = function (msg) {
        };
              
        socket.onopen = function () {
        var message = {};
        //         message.user = user;
        message.text = "<b>Joined the chat</b>";
        socket.send(JSON.stringify(message));
        };
        socket.onmessage = function(e){
        console.log(e.data);
        };
      } else if (msg === "DisableVideo") {
        self.switchCount++;
        self.closePC2();
      } else if (msg.substr(0,4) == "BEAT" && self.callState == "validateBW") {
        self.callState = "outgoing";
        if (self.callDirection == "incoming") {
          self.divCallStatus.css('display','block');
          window.showCallConatiner.incoming = true;
          window.callStatusText = "Please wait. Connection in progress";
        }
        self.sendMessage(msg);
      } else if (msg == "ExpertRinging" && self.callState == "outgoing") {
        self.callLogData.activityStatus = "Call Un Answered";
        self.callLogData.terminationType = "Expert Un-Answered";
        if (self.callDirection == "incoming") {
          self.divCallStatus.css('display','block');
          window.showCallConatiner.incoming = true;
          window.callStatusText = "Please wait. Connection in progress";
        }
      } else if (msg == "ExpertAnswered") {
        self.hideCallContainers();
        self.startTimer();
        popupNotification({time : 2000,
          primaryText : 'Call Connected',
          popupIcon : '../static/img/call-connected.png'
        });
		console.log("expert answered",self.callDirection);
        if (self.callDirection == "incoming") {
          self.callState = "active";
          let timeNow = new Date();
          self.callLogData.timeStamp = timeNow.getFullYear() + "-" + (timeNow.getMonth()+1) + "-" + timeNow.getDate() + " " + timeNow.getHours() + ":" + timeNow.getMinutes() + ":" + timeNow.getSeconds();
          self.callLogData.activityStatus = "Call Connected";
          window.showCallConatiner.annotation = true;
        } else if (self.callDirection == "outgoing"){
          self.callState = "active";
          self.callLogData.activityStatus = "Call Connected";
		  
          window.showCallConatiner.annotation = true;
        }
        self.divCallStatus.css('display','none');
      } else if (msg == "LowBandwidth") {
        self.callLogData.terminationType = "Expert Not Reachable";
        self.callLogData.callDuration = "0:00";
        self.closePC1();
      } else {
        try {
          msgObj = JSON.parse(msg);
        } catch (err) {
        }
        if (msgObj.typeVideo === "answer") {
          var split = msgObj.sdp.split("b=AS:30");
          if (split.length > 100000000) {
            var newSDP = split[0] + "b=AS:1638400" + split[1];
          } else {
            newSDP = msgObj.sdp;
          }
          self.peerConnection2.setRemoteDescription(new RTCSessionDescription({
            type : msgObj.typeVideo ,
            sdp : newSDP
          }));
        } else if (msgObj.typeVideo === "candidate") {
          self.addCandidate2({
            type : msgObj.typeVideo ,
            candidate : msgObj.candidate,
            sdpMid: msgObj.sdpMid,
            sdpMLineIndex: msgObj.sdpMLineIndex
          });
        }
        
    	else if (msgObj.click )
    	{
    		socket.send(JSON.stringify(msgObj));
    	}
    	else if (msgObj.keyCode )
    	{
    		socket.send(JSON.stringify(msgObj));
    	}
      }
      if (!self.imageTransmission) {
        if ( ($.type(msg) === "string") && msg.substr(0,5) === "Image") {
          let imageData = msg.split(':')[1].split(',');
          self.imageTransmission = true;
          self.imageName = imageData[0];
          self.imageSize = imageData[1];
          self.orignalImageSize = imageData[1];
        } else if (msg.substring(0, 8) === "Annotate") {
          var c = msg.split(':')[1].split(',');
          self.annotateCanvas(c);
        } else if (msg.substring(0, 8) === 'FreeFlow') {
          let annotationCoordinatesArray = self.extractCoordinates(msg.split('Flow:')[1] + '');
          self.freeFlowAnnotateCanvas(annotationCoordinatesArray);
        }
      } else if (self.imageTransmission && self.imageSize >0) {
        var percentReceived = Math.round(((self.orignalImageSize - self.imageSize) / self.orignalImageSize) * 100);
        self.divLoading.css('display','block');
        self.divLoading.html('<p>' + percentReceived + '%</p>');
        self.imageChunks.push(msg);
        self.imageSize -= msg.byteLength;
        if (self.imageSize <= 0) {
          self.imageTransmission = false;
          self.divLoading.css('display','none');
          // self.divAnnotationImage.css('display','block');
          var blob = URL.createObjectURL(new Blob(self.imageChunks));
          self.imgAnnotated.attr('src', blob);
          self.imgAnnotated.onload = function () {
            annotationImage.originalWidth = annotationImage.width;
            self.imgAnnotated.attr('currentZoom',0);
            self.imgAnnotated.zoomImage();
          }
          self.imageChunks = [];
        }
      }
    };
    this.sendMessage = function (message) {
      if (self.dataChannel && self.dataChannel.readyState === "open") {
        self.dataChannel.send(message);
      }
    };
    this.writeUserMsg = function (userMsg) {
      self.callExpertRef.child('userMsg').set(userMsg);
    };
    this.readExpertMsgs = function () {
      // self.callExpertRef.child('expertMsgs').off();
      self.callExpertRef.child('expertMsgs').on('value', function (snap) {
        self.handleExpertMsgs(snap.val());
        self.callExpertRef.child('expertMsgs').set("");
      });
    };

    this.sendImage = function (rawData,file) {
      self.switchCount++;
      self.dataChannel.send("Image:" + file.name + "," + file.size);
      // var sendProgress = file.size;
      // var receiveProgress = file.size;
      var chunkSize = 64 * 1024;
      var sliceFile = function(offset) {
        var reader = new window.FileReader();
        reader.onload = (function() {
          return function(e) {
            if (e.target.result.byteLength > 0) {
            }
            self.dataChannel.send(e.target.result);
            if (file.size >= offset + e.target.result.byteLength) {
              window.setTimeout(sliceFile, 0, offset + chunkSize);
            } else {
              return false;
            }
            // sendProgress = offset + e.target.result.byteLength;
          };
        })(file);
        var slice = file.slice(offset, offset + chunkSize);
        // reader.readAsDataURL(slice);
        reader.readAsArrayBuffer(slice);
      };
      sliceFile(0);
    }

    this.handleExpertMsgs = function (expertMsgs) {
      if (self.peerConnection1.iceConnectionState != closed) {
        let remoteSDP = expertMsgs;
        if (remoteSDP != "" && remoteSDP != "Endcall" && remoteSDP != "Rejectcall") {
          remoteSDP = JSON.parse(remoteSDP);
          if (remoteSDP.type === "answer") {
            self.callState = "validateBW";
            self.peerConnection1.setRemoteDescription(new RTCSessionDescription(remoteSDP));
          }
          else if (remoteSDP.type === "candidate") {
            self.addCandidate(remoteSDP);
          }
        } else if (remoteSDP === "Endcall" || remoteSDP === "Rejectcall" || remoteSDP == "LowBandwidth") {
          if (remoteSDP == "Endcall") {
            self.callLogData.terminationType = "Expert Hang Up";
          } else if (remoteSDP == "Rejectcall") {
            self.callLogData.terminationType = "Expert Rejected";
            self.callLogData.activityStatus = "Call Disconnected";
          } else if (remoteSDP == "LowBandwidth") {
            console.log(self.callState);
          }
          self.closePC1();
        }
      }
    };

    this.addCandidate = function (remoteSDP) {
      this.incomingCandidates.push(remoteSDP);
      while(this.incomingCandidates.length > 0) {
        var incomingCandidate = this.incomingCandidates.shift();
        this.peerConnection1.addIceCandidate(new RTCIceCandidate({
          sdpMid: incomingCandidate.sdpMid,
          sdpMLineIndex: incomingCandidate.sdpMLineIndex,
          candidate: incomingCandidate.candidate
        }));
      }
    };
    this.addCandidate2 = function (remoteSDP) {
      this.incomingCandidates2.push(remoteSDP);
      while(this.incomingCandidates2.length > 0) {
        var incomingCandidate = this.incomingCandidates2.shift();
        this.peerConnection2.addIceCandidate(new RTCIceCandidate({
          sdpMid: incomingCandidate.sdpMid,
          sdpMLineIndex: incomingCandidate.sdpMLineIndex,
          candidate: incomingCandidate.candidate
        }));
      }
    };
    this.receiveCall = function () { // to handle incoming call from expert
      self.callExpertRef.child('callerID').set(JSON.stringify(self.engineer));
      window.callStatusText = "Connection in progress...";
      self.peerConnection1.createOffer ( function (offer) {
        self.peerConnection1.setLocalDescription (new RTCSessionDescription (offer), function () {
          self.writeUserMsg(JSON.stringify ({
            type: self.peerConnection1.localDescription.type,
            sdp: self.peerConnection1.localDescription.sdp
          }));
        });
        self.readExpertMsgs();
        // self.callExpertRef.child('userMsg').off();
        self.callExpertRef.child('userMsg').on("value", function (snapshot) {
          if(snapshot.val() === "" && self.candidateQueue.length > 0 ) {
            self.writeUserMsg(self.candidateQueue.shift());
          }
        });
        self.startCallTimer();
        self.switchCallType = "Incoming";
      }, _callbackDefault);
    };

    this.call = function () { // assuming that making call is allowed
      window.callStatusText = "Dialing...";
      self.divCallStatus.css('display','block');
      window.showCallConatiner.outgoing = true;
      self.callExpertRef.child('callerID').transaction( function (currentCaller) {
        if (!currentCaller) {
          self.engineer.ticketNumber = self.callLogData.ticketNumber;
          self.engineer.transactionId = self.callLogData.transactionId;
          var engineer = JSON.stringify(self.engineer);
          // var caller = self.engineer.engineerName + "," + self.engineer.loginId + ", Ticket No :" + self.engineer.ticketNo + ",\n" + self.engineer.address + "Partner : " + self.engineer.partnerName + "\n" + "Location : " + self.engineer.location;
          return engineer;
        } else {
          return;
        }
      }, function (err,transactionComplete,currentCaller) {
        if (err) {
          console.log('TRANSACTION ERR : ' + err);
          popupNotification({time : 2000,
            primaryText : 'No Network',
            secondaryText : 'Please check the internet connection and try again.',
            popupIcon : '../static/img/call-disconnected.png'
          });
          window.showCallConatiner.outgoing = false;
        } else if (!transactionComplete) {
          console.log('Not able to complete transaction right now.');
          window.showCallConatiner.outgoing = false;
        } else if (transactionComplete) {
          self.callState = "offer";
          // window.callStatusText = "Connection in progress...";
          self.peerConnection1.createOffer ( function (offer) {
            self.peerConnection1.setLocalDescription (new RTCSessionDescription (offer), function () {
              console.log('type : ' + self.peerConnection1.localDescription.type);
              self.writeUserMsg(JSON.stringify ({
                type: self.peerConnection1.localDescription.type,
                sdp: self.peerConnection1.localDescription.sdp
              }));
            });
            self.readExpertMsgs();
            self.callExpertRef.child('userMsg').on("value", function (snapshot) {
              if(snapshot.val() === "" && self.candidateQueue.length > 0 ) {
                self.writeUserMsg(self.candidateQueue.shift());
              }
            });
            self.startCallTimer();
            self.switchCallType = "Outgoing"
          }, _callbackDefault);
        }
      });
    };
    this.call2 = function () {
      self.peerConnection2.createOffer(function (offer) {
        self.peerConnection2.setLocalDescription(new RTCSessionDescription(offer), function () {
          self.sendMessage(JSON.stringify({
            typeVideo: self.peerConnection2.localDescription.type,
            sdp: self.peerConnection2.localDescription.sdp
          }));
        }, _callbackDefault);
      },function (err) {
        console.log('ERR : ' + err);
      });
    };

    this.OnMediaSuccess = function (audioStream) {
      self.localAudioStream = audioStream;
      self.peerConnection1.addStream(self.localAudioStream);
      if (self.callDirection == 'incoming') {
        self.receiveCall();
      } else {
        self.call();
      }
    };

    this.sendCallLogs = function (callLogData) {
      $.ajax({
        "method": "POST",
        "url": "http://" + config.server.ip + ":" + config.server.port + "/" + config.servicesRoot + "/service/loginDetails/logUserActivityDetails",
        "contentType": "application/json",
        "dataType": "json",
        "data": JSON.stringify(callLogData),
        "processData": false
      }).done(function (data) {
        if (data && data.result == "SUCCESS") {
          console.log("INFO: User activity logged successfully.");
        } else {
          console.log("ERROR: Failed to log user activity.",data);
        }
      }).fail(function (err) {
        console.error(err);
      });
    };

    this.closePC1 = function (engMsg) {
      if (engMsg == "Rejectcall" || engMsg == "Endcall") {
        if (engMsg == "Rejectcall") {
          self.callLogData.terminationType = "Engineer Rejected";
          // self.writeUserMsg("Rejectcall");
        } else if (engMsg == "Endcall") {
          if (self.callState == "outgoing") {
            self.callLogData.terminationType = "Expert Un Answered";
            self.callLogData.callDuration = "0:00";
          } else {
            self.callLogData.terminationType = "Engineer Hang Up";
          }
          // self.writeUserMsg("Endcall");
        }
        self.callExpertRef.child('userMsg').set(engMsg).then(function () {
          console.log("expert msg sent");
        }).catch(function (error) {
          console.log('erroe in setting data',error);
        })
      }
      self.callLogData.callType = self.switchCallType + " Remote Call ( Call Switch Count : " + self.switchCount + ")";
      self.closePC2();
      self.callExpertRef.child('callerID').set('');
      if (this.peerConnection1 && this.peerConnection1.signalingState != "closed") {
        if (self.localAudioStream != null) {
          this.peerConnection1.removeStream(self.localAudioStream);
        }
        this.peerConnection1.close();
        self.localAudioStream = null;
        if (self.callState == "active") {
          self.stopTimer();
          let timeNow = new Date();
          let timeStamp = timeNow.getFullYear() + "-" + (timeNow.getMonth()+1) + "-" + timeNow.getDate() + " " + timeNow.getHours() + ":" + timeNow.getMinutes() + ":" + timeNow.getSeconds();
          self.callLogData.transactionEndDate = timeStamp;
          self.currentCallType.textContent = "Video and Annotation Call";
          self.callerOrCalleeName.textContent = "";
          self.currentCallDuration.textContent = "";
        }
        window.openFeedbackFormWindow = {
          "value" : true,
          "logs" : self.callLogData
        }
      }
      // self.callExpertRef.off();
      self.callLogData = {};
      self.callState = "inactive";
      clearInterval(window.callTimer);
      // popupNotification({time : 2000,
      //   primaryText : 'Call Disonnected',
      //   popupIcon : '../static/img/call-disconnected.png'
      // });
      window.setTimeout(function(){
        self.hideCallContainers();
        // self.callExpertRef.off();
      }, 2000);
      self.detachFirebaseListeners();
    };
    this.closePC2 = function () {
      self.sendMessage("canSwitch");
      if (this.peerConnection2 && this.peerConnection2.signalingState != "closed") {
        if (self.localVideoStream) {
          this.peerConnection2.removeStream(self.localVideoStream);
        }
        this.peerConnection2.close();
        self.localVideoStream = null;
        console.log('PC2 : closed!');
      }
      window.callType = "Annotation Call";
      self.callExpertRef.off();
      self.hideCallContainers();
      window.showCallConatiner.annotation = true;
    };
    this.mute = function () {
      self.localAudioStream.getTracks().forEach(function (t) {t.enabled = false});
    };
    this.unmute = function () {
      self.localAudioStream.getTracks().forEach(function (t) {t.enabled = true});
    };
    this.startCallTimer = function () {
      var connectingTime = 0;
      window.callTimer = setInterval(function(){
        connectingTime++;
        if (connectingTime <= self.maxConnectingTime) {
          console.log(connectingTime, self.callState);
          if (self.callState == "active") {
            clearInterval(window.callTimer);
          } else if (self.callState == "validateBW" || self.callState == "outgoing") {
            self.divCallStatus.css('display','block');
          } else if (self.callState == "inactive") {
            clearInterval(window.callTimer);
            self.closePC1();
          }
        } else if (self.callState != "active") {
          self.closePC1("Endcall");
          clearInterval(window.callTimer)
        }
      }, 1000);
    };
    this.annotateCanvas = function (coordinates) {
      let xCoordinate = coordinates[0],
      yCoordinate = coordinates[1],
      annotationCanvas = document.getElementById('annotation-canvas'),
      context = annotationCanvas.getContext('2d'),
      annotationImage = document.getElementById('background');
      context.drawImage(annotationImage,0,0,annotationImage.width, annotationImage.height, 0, 0, annotationCanvas.width, annotationCanvas.height)
      context.beginPath();
      context.arc(xCoordinate, yCoordinate, 8, 0, 2 * Math.PI);
      context.strokeStyle="#00ff33";
      context.lineWidth = 2;
      context.stroke();
    };

    this.extractCoordinates = function(str) {
      let patternForX = /"X":[0-9]+/g,
      patternForY = /"Y":[0-9]+/g,
      patternForPosInt = /[0-9]+/,
      annotationCoordinates = [],
      matchesForX = patternForX.exec(str);
      matchesForY = patternForY.exec(str);
      while(matchesForX) { // do not change the order of the code inside.
        annotationCoordinates.push(patternForPosInt.exec(matchesForX[0]) + ',' + patternForPosInt.exec(matchesForY[0]));
        matchesForY = patternForY.exec(str);
        matchesForX = patternForX.exec(str);
      }
      return annotationCoordinates;
    };

    this.freeFlowAnnotateCanvas = function (annotationCoordinates) {
      let annotationCanvas = document.getElementById('annotation-canvas'),
      context = annotationCanvas.getContext('2d'),
      annotationImage = document.getElementById('background'),
      i = 0;
      context.drawImage(annotationImage,0,0,annotationImage.width, annotationImage.height, 0, 0, annotationCanvas.width, annotationCanvas.height)
      context.beginPath();
      context.strokeStyle="#00ff33";
      context.lineWidth = 1;
      context.moveTo(annotationCoordinates[0].split(',')[0], annotationCoordinates[0].split(',')[1]);
      while (i < annotationCoordinates.length - 3) {
        i++;
        let endX = annotationCoordinates[i+1].split(',')[0];
        let endY = annotationCoordinates[i+1].split(',')[1];
        let nextX = annotationCoordinates[i].split(',')[0];
        let nextY = annotationCoordinates[i].split(',')[1];
        context.quadraticCurveTo(nextX, nextY, endX, endY);
        context.stroke();
        context.moveTo(endX, endY);
        i++;
      }
    };

    this.detachFirebaseListeners = function () {
      self.callExpertRef.child('userMsg').off();
      self.callExpertRef.child('expertMsgs').off();
      self.callExpertRef.off();
    };
  };
  function _callbackDefault (msg) {
  };
  function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
  }
