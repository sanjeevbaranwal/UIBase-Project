angular.module('ImagineApp')
.controller('MessagesController', function ($rootScope,$filter,$http, $scope, $firebaseObject, $state, util, $localStorage, main) {
  $rootScope.pageTitle = 'Messages | ' + $rootScope.appTitle;
  $rootScope.showNavbarIcons = true;
  
  $rootScope.reqexpertName = getVarValue("expertName") == null ? window.parent.expertName : getVarValue("expertName");
  $rootScope.reqexpertId = getVarValue("expertId") == null ? window.parent.expertId : getVarValue("expertId");
  $rootScope.reqexpertUserId = getVarValue("expertUserId") == null ? window.parent.expertUserId : getVarValue("expertUserId");
  $rootScope.reqexpertUserName = getVarValue("expertUserName") == null ? window.parent.expertUserName : getVarValue("expertUserName");
  $rootScope.reqcetransactionId = getVarValue("cetransactionId") == null ? window.parent.cetransactionId : getVarValue("cetransactionId");
  
  if ($rootScope.user == undefined) {
	    $rootScope.user = {"loginId":$rootScope.reqexpertUserId,
		"engineerName":$rootScope.reqexpertUserName,
		"partnerName":"HMIPlatform-Demo1",
		"location":"CHANDIGARH"};
		
		$rootScope.fbAppDBRef = $rootScope.firebaseApp.database().ref("RSME");
        $rootScope.fbAppStorageRef = $rootScope.firebaseApp.storage().ref("RSME");
        $scope.transactionId = $rootScope.reqcetransactionId;
	  }
  if (!$rootScope.user) {
    $state.go('login');
  } else {
   // $scope.transactionId = Math.floor(Math.random()*89999+10000);
    $scope.existingThread=[];
    $scope.init = function () {
      $scope.chatThreadsPanel = true;
      $scope.setupExpertDiscovery();
      $scope.getExistingThreads();
    }
    if ($state.current.name == "messages") {
      $scope.expertDis = true;
      $scope.autoExpertDis = false;
    } else if ($state.current.name == "remoteHelp") {
      $scope.expertDis = false;
      $scope.autoExpertDis = true;
    }
    $scope.showExpertDis = function () {
      $scope.autoExpertDiscovery = false;
      $scope.chatThreadsPanel = false;
      $scope.expertDiscovery = true;
    }

    $scope.showAutoExpertDis = function () {
      $scope.autoExpertDiscovery = true;
      $scope.chatThreadsPanel = false;
      $scope.expertDiscovery = true;
    }

    $scope.showChatThreads = function () {
      $scope.setupExpertDiscovery();
      $scope.expertListInDB = [];
      $scope.connectBtn = false;
      $scope.chatThreadsPanel = true;
      $scope.expertDiscovery = false;
    }

    $scope.setupExpertDiscovery = function () {
      $scope.chatThreads=[];
      $scope.messagesContainer = document.querySelector('.messages-container');
      $scope.indexPrograms = [{"name":'Select Program'}];
      $scope.indexSkills = [{"name":'Select Skill'}];
      $scope.indexExperts = [{"name":'Select Experts'}];
      $scope.selectedProgram = $scope.indexPrograms[0];
      $scope.selectedSkill = $scope.indexSkills[0];
      $scope.selectedExpert = $scope.indexExperts[0];
      $scope.numUnreadMsgs = {};

      util.displayLoading($scope.messagesContainer);
      let expertsIndexRef = $rootScope.fbAppDBRef.child('experts/');
      $scope.expertsIndexObj = $firebaseObject(expertsIndexRef);
      $scope.expertsIndexObj.$loaded(function (data) {
        util.doneLoading($scope.messagesContainer);
        $scope.expertsIndex = data
        if($scope.expertsIndex) {
         /* let indexProgramsTemp = [{"name":'Select Program'}];
          // To iterate the key/value pairs of the object, use angular.forEach()
          angular.forEach(data, function(value, key) {
            for (var i = 0; i < $rootScope.user.programNames.length; i++) {
              if (key == $rootScope.user.programNames[i]) {
                indexProgramsTemp.push({
                  "name": key,
                  "value": key
                });
              }
            }
          });
          $scope.indexPrograms = indexProgramsTemp;
          $scope.selectedProgram = $scope.indexPrograms[0]; */
        }
      });

      $scope.elmSelectProgram = angular.element('.indexes select.program');
      $scope.elmSelectSkill = angular.element('.indexes select.skill');
      $scope.elmSelectExpert = angular.element('.indexes select.expert');
      $scope.selectIndexChange = function (which) {
        switch (which) {
          case "program":
          $scope.indexSkills = [{"name":'Select Skill'}];
          $scope.selectedSkill = $scope.indexSkills[0];
          $scope.indexExperts = [{"name":'Select Expert'}];
          $scope.selectedExpert = $scope.indexExperts[0];
          if ($scope.selectedProgram.value) {
            if($scope.expertsIndex) {
              let skillsObj = $scope.expertsIndex[$scope.selectedProgram.value];
              let indexSkillsTemp = [{"name":'Select Skill'}];
              // To iterate the key/value pairs of the object, use angular.forEach()
              angular.forEach(skillsObj, function(value, key) {
                indexSkillsTemp.push({
                  "name": key,
                  "value": key
                });
              });
              $scope.indexSkills = indexSkillsTemp;
              $scope.selectedSkill = $scope.indexSkills[0];
            }
          }
          break;
          case "skill":
          $scope.indexExperts = [{"name":'Select Expert'}];
          $scope.selectedExpert = $scope.indexExperts[0];
          if ($scope.selectedSkill.value) {
            if ($scope.autoExpertDiscovery == true) {
              $scope.connectDirectly = {
                "enggId" : $rootScope.user.loginId.toString(),
                "groupName" : $rootScope.user.groupName,
                "expertProgramName" : $scope.selectedSkill.value,
                "expertSkillName" : $scope.selectedProgram.value
              };
              $scope.connectBtn = true;
            } else if ($scope.autoExpertDiscovery == false) {
              $scope.connectBtn = false;
              if($scope.expertsIndex) {
                let expertsObj = $scope.expertsIndex[$scope.selectedProgram.value][$scope.selectedSkill.value];
                let indexExpertsTemp = [{"name":'Select Expert'}];
                // To iterate the key/value pairs of the object, use angular.forEach()
                angular.forEach(expertsObj, function(value, key) {
                  indexExpertsTemp.push({
                    "name": value.name,
                    "expertID": key,
                    "location": value.loc,
                    "team" : value.team,
                    "status" : value.status,
                    "program" : $scope.selectedProgram.value,
                    "skill" : $scope.selectedSkill.name
                  });
                });
                $scope.indexExperts = indexExpertsTemp;
                $scope.selectedExpert = $scope.indexExperts[0];
              }
              $scope.expertListInDB = [];
              for (var i = 1; i < $scope.indexExperts.length; i++) {
                $scope.expertsInDB($scope.indexExperts[i]);
              }
            }
          }
          break;
          case "expert":
          break;
        }
      };
    } // ./setupExpertDiscovery()

    $scope.expertsInDB = function (expert) {
      $scope.tempExpertInDB = expert;
      let expertStatusRef = $rootScope.fbAppDBRef.child("expert_status/").child(expert.expertID).on('value',function (snap) {
        $scope.tempExpertInDB.status = snap.val().status;
      })
      $scope.expertListInDB.push($scope.tempExpertInDB);
    };

    $scope.checkForAvaiableExpert = function () {
      console.log("Calling availability service");
      main.availableExpert($scope.connectDirectly,$rootScope.config).success(function (response) {
        console.log(response);
        if (response.result == "WAITING") {

        }
      }).error(function (err) {
        console.log(err);
      })
    };

    $scope.createOrActivateThread = function (expert) {
      $scope.chatThreadsPanel = true;
      $scope.expertDiscovery = false;
      if (expert) {
        if($scope.existingThread.length == 0){
          $scope.tempExpert = expert;
          $scope.sendMsgToExpert($scope.tempExpert)
        } else {
          let flag = false;
          for (var i = 0; i < $scope.existingThread.length; i++) {
            if ($scope.existingThread[i].expertID == expert.expertID) {
              flag = true;
            } else {
            }
          }
          if (flag == false) {
            $scope.tempExpert = expert;
            $scope.sendMsgToExpert($scope.tempExpert)
          }
        }
      } else {
        console.log("ERROR: Cannot create thread. Expert is ", expert);
      }
    }

    $scope.sendMessageLogs = function (expert) {
      var d = new Date();
      var time = ($filter('date')(d, "yyyy-MM-dd HH:mm:ss"));
      var loginID = loginID+"";
      var reqData = {
        "timeStamp" : time,
        "logLevel" : "Info",
        "userActivity" : "Message",
        "activityStatus" : "Message Sent",
        "role" : "Engineer",
        "name" : $rootScope.user.engineerName,
        "loginId" : $rootScope.user.loginId,
        "programName" : "",
        "partnerName" : $rootScope.user.partnerName,
        "location" : $rootScope.user.location,
        "toRole" : "Expert",
        "toName" : expert.name,
        "toProgramName" : "",
        "toPartnerName" : "",
        "toLocation" : expert.loc,
        "downloadedFileName" : "",
        "osVersion" : "",
        "deviceModel" : "Browser",
        "tologinId" : "",
        "txferRole" : "",
        "txferName" : "",
        "txferLoginId" : "",
        "txferProgramName" : "",
        "txferPartnerName" : "",
        "txferLocation" : "",
        "gpsLocation" : "",
        "connectionType" : "",
        "signalStrength" : "",
        "bandwidthValue" : "",
        "callType" : "",
        "terminationType" : "",
        "callDuration" : "",
        "transactionId" : $scope.transactionId,
        "applicationId" : "HDFC",
        "applicationDescription" : "HDFC pvt ltd",
        "componentId" : "100",
        "featureId" : "201",
        "transactionStartDate" : time,
        "transactionEndDate" : "NA",
        "transactionState" : "NA"
      }
      main.sendLogs(reqData,$rootScope.config).success(function (response) {
        console.log(response);
      }).error(function (err) {
        console.log(err);
      })
    } //sending message logs

    $scope.appendToChatSheet = function (msgObj) {
      var chatList = angular.element( document.querySelector('.chat'));
      let msg = `<li>Unknown message type</li>`;
      if (msgObj.atms) {
        if (msgObj.type == "own") {
          if (msgObj.atms[0].fileType == "jpg" || msgObj.atms[0].fileType == "jpeg" || msgObj.atms[0].fileType == "png" || msgObj.atms[0].fileType == "mp4") {
            msg = angular.element(`<li class="msg own"><object width="auto" height="auto" style="margin:auto;max-width:100%;max-height:186px" data= "${msgObj.atms[0].url}" alt="File downloaded."></object><br><a style="float:right;color:white;" href="${msgObj.atms[0].url}" download><span class="glyphicon glyphicon-download"></span></a><br>${msgObj.text}<span class="time">${msgObj.time}</span></li>`);
          } else {
            msg = angular.element(`<li class="msg own"><img src = "static/img/DOC-96X96White.png" ><a style="float:right" href="${msgObj.atms[0].url}" download><span style="color:white;" class="glyphicon glyphicon-download"></span></a><br>${msgObj.text}<span class="time">${msgObj.time}</span></li>`);
          }
        } else {
          if (msgObj.atms[0].fileType == "jpg" || msgObj.atms[0].fileType == "jpeg" || msgObj.atms[0].fileType == "png" || msgObj.atms[0].fileType == "png") {
            msg = angular.element(`<li class="msg other"><object width="auto" height="auto" style="margin:auto;max-width:100%;max-height:186px" data= "${msgObj.atms[0].url}" alt="File downloaded."></object><br><a style="float:right;color:black;" href="${msgObj.atms[0].url}" download><span class="glyphicon glyphicon-download"></span></a><br>${msgObj.text}<span class="time">${msgObj.time}</span></li>`);
          } else {
            msg = angular.element(`<li class="msg other"><img src = "static/img/DOC-96X96White.png" ><a style="float:right" href="${msgObj.atms[0].url}" download><span style="color:black;" class="glyphicon glyphicon-download"></span></a><br>${msgObj.text}<span class="time">${msgObj.time}</span></li>`);
          }
        }
      } else {
        if (msgObj.type == "own") {
          msg = angular.element(`<li class="msg own">${msgObj.text}<span class="time">${msgObj.time}</span></li>`);
        } else {
          msg = angular.element(`<li class="msg other">${msgObj.text}<span class="time">${msgObj.time}</span></li>`);
        }
      }
      chatList.append(msg);
      chatList.scrollTop(1000000000000);
    }

    $scope.getSelectedExpertFromDB = function (expert) {
      $scope.expert = expert;
      let chatMsgref = $rootScope.fbAppDBRef.child("expert_status/").child(expert.expertID).on('value',function (snap) {
        var a = snap.val();
        $scope.expert.status = a.status;
      })
    }

    if ($scope.expert == undefined) {
      $scope.noExpert = false;
    }

    $scope.sendMsgToExpert = function (expert) {
      $scope.noExpert = true;
      $scope.myEl = angular.element( document.querySelector('.chat'));
      $scope.myEl.empty();
      $scope.existingChat = JSON.parse(localStorage.getItem('localChatThreads'));
      if($scope.existingChat){
        var flag = false;
        var index;
        for (var i = 0; i < $scope.existingChat.length; i++) {
          if ($scope.existingChat[i].expertID == expert.expertID) {
            if ($scope.existingChat[i].engineerID == $rootScope.user.loginId) {
              flag = true;
              index = i;
            }
          } else {
          }
        }
        if(flag == true){
          $scope.getSelectedExpertFromDB($scope.existingChat[index]);
          var localThreads = JSON.parse(localStorage.getItem('localChatThreads'));
          for (var i = 0; i < localThreads.length; i++) {
            if(localThreads[i].expertID == $scope.existingChat[index].expertID && localThreads[i].engineerID == $scope.existingChat[index].engineerID){
              if (localThreads[i].chat.unreadMsgs.length > 0 ) {
                let count = localThreads[i].chat.unreadMsgs.length;
                for (var j = 0; j < count; j++) {
                  localThreads[i].chat.readMsgs.push(localThreads[i].chat.unreadMsgs[0]);
                  localThreads[i].chat.unreadMsgs.splice(0,1);
                }
                $scope.numUnreadMsgs[localThreads[i].name] = localThreads[i].chat.unreadMsgs.length;
                localStorage.setItem('localChatThreads', JSON.stringify(localThreads));
                for (var j = 0; j < localThreads[i].chat.readMsgs.length; j++) {
                  $scope.appendToChatSheet(localThreads[i].chat.readMsgs[j]);
                }
              } else {
                for (var j = 0; j < localThreads[i].chat.readMsgs.length; j++) {
                  $scope.appendToChatSheet(localThreads[i].chat.readMsgs[j]);
                }
              }
            }
          }
        } else {
          $scope.getSelectedExpertFromDB(expert);
        }
      } else {
        $scope.getSelectedExpertFromDB(expert);
      }
      $scope.sendAttachment = function (file) {
        $scope.attachedfile = file;
        $scope.uploadedFileName = true;
      }

      $scope.checkForEmpty = function (text) {
        if (text == undefined || text == "") {
          document.getElementById("fName").className = document.getElementById("fName").className + " error";
        } else {
          document.getElementById("fName").className = document.getElementById("fName").className.replace(" error", "");
        }
      }
      $scope.sendMsg = function (ownMsg) {
        if ($scope.attachedfile && ownMsg || $scope.attachedfile) {
          var d = new Date();
          var teamName = $scope.expert.team.replace(/ /g,"_");
          $scope.fileType = $scope.attachedfile[0].name.split(".").pop();
          $scope.fileName = d.getDate()+"-"+d.getMonth()+"-"+d.getFullYear()+"_"+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+"."+$scope.fileType;
          var storageRef = $rootScope.fbAppStorageRef.child("attachments/").child(teamName +"/"+$scope.fileName).put($scope.attachedfile[0]);
          storageRef.on('state_changed', function(snapshot){
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
            }
          }, function(error) {
            switch (error.code) {
              case 'storage/object_not_found':
              // File doesn't exist
              break;
              case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
              case 'storage/canceled':
              // User canceled the upload
              break;
              case 'storage/unknown':
              // Unknown error occurred, inspect the server response
              break;
            }
          }, function() {
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            var downloadURL = storageRef.snapshot.downloadURL;
            if (ownMsg == undefined) {
              ownMsg = "";
            }
            var atmObj = {
              "txt": ownMsg,
              "atms": [
                {
                  "title": "",
                  "url": $rootScope.config.databaseName + "/attachments/" + teamName + "/" + $scope.fileName
                }
              ]
            }

            var atmObjForLocal = {
              "title" : "",
              "url" : downloadURL,
              "fileType" : $scope.fileType
            }

            $scope.msgObjForFirebase = {
              "loc" : $scope.expert.location,
              "loginID" : $rootScope.user.loginId,
              "name" :  $rootScope.user.engineerName,
              "team" : $scope.expert.team,
              "text" : "",
              "type" : 2
            }
            var s="";
            s = JSON.stringify(atmObj);
            // s = JSON.stringify(s);
            $scope.msgObjForFirebase.text = s;
            $scope.expertChatId = expert.expertID+"_chatID";
            $scope.ownMsg = ownMsg;
            var date = new Date();
            $scope.time = date.toLocaleDateString() + " " + date.toLocaleTimeString();
            $scope.msgObj = {
              "type" : "own",
              "text" : $scope.ownMsg,
              "time" : $scope.time,
              "atms": []
            }
            $scope.msgObj.atms.push(atmObjForLocal);
            $scope.msgObjForLocalStorage = {
              "engineerID" : $rootScope.user.loginId,
              "expertID" : $scope.expert.expertID,
              "location" : $scope.expert.location,
              "name" : $scope.expert.name,
              "team" : $scope.expert.team,
              "chat" : {
                "readMsgs" : [],
                "unreadMsgs" : []
              }
            }

            $scope.msgObjForLocalStorage.chat.readMsgs.push($scope.msgObj);
            $scope.SendAndAppend();
          });
        } else if(undefined !== ownMsg && ownMsg.length){
          $scope.msgObjForFirebase = {
            "loc" : $scope.expert.location,
            "loginID" : $rootScope.user.loginId,
            "name" :  $rootScope.user.engineerName,
            "team" : $scope.expert.team,
            "text" : "",
            "type" : 1
          }

          $scope.msgObjForFirebase.text = ownMsg;
          $scope.expertChatId = expert.expertID+"_chatID";
          $scope.ownMsg = ownMsg;
          var date = new Date();
          $scope.time = date.toLocaleDateString() + " " + date.toLocaleTimeString();
          $scope.msgObj = {
            "type" : "own",
            "text" : $scope.ownMsg,
            "time" : $scope.time
          }
          $scope.msgObjForLocalStorage = {
            "engineerID" : $rootScope.user.loginId,
            "expertID" : $scope.expert.expertID,
            "location" : $scope.expert.location,
            "name" : $scope.expert.name,
            "team" : $scope.expert.team,
            "chat" : {
              "readMsgs" : [],
              "unreadMsgs" : []
            }
          }
          $scope.msgObjForLocalStorage.chat.readMsgs.push($scope.msgObj);
          $scope.SendAndAppend();
        } else {
          document.getElementById("fName").className = document.getElementById("fName").className + " error";
        }
      }
    }

    $scope.SendAndAppend = function () { // Send message and save them in localStorage.
      $scope.sendMessageLogs($scope.expert);
      var a = JSON.parse(localStorage.getItem('localChatThreads'));
      if (a == null) {
        a = [];
        a.push($scope.msgObjForLocalStorage);
        localStorage.setItem('localChatThreads', JSON.stringify(a));
      } else {
        var boolean=false;
        var index;
        for (var i = 0; i < a.length; i++) {
          if (a[i].engineerID == $rootScope.user.loginId) {
            if (a[i].expertID == $scope.expert.expertID) {
              index = i;
              boolean = true;
            } else {
            }
          }
        }
        if(boolean==true){
          a[index].chat.readMsgs.push($scope.msgObj);
        }
        if(boolean==false){
          a.push($scope.msgObjForLocalStorage);
        }
        localStorage.setItem('localChatThreads', JSON.stringify(a));
      }
      let chatMsgref = $rootScope.fbAppDBRef.child("messages").child($scope.expertChatId).push($scope.msgObjForFirebase);
      $scope.appendToChatSheet($scope.msgObj)
      $scope.ownMsg = "";
      $scope.time = "";
      $scope.attachedfile = "";
      $scope.uploadedFileName = false;
    }

    $scope.receieveAndAppend = function () { // Receive message and save in localStorage.
      var refForRemoving = $rootScope.fbAppDBRef.child('messages/' + $rootScope.user.loginId + '_chatID');
      var a = JSON.parse(localStorage.getItem('localChatThreads'));
      if (a == null) {
        a = [];
        $scope.msgObjForLocalStorage.chat.unreadMsgs.push($scope.msgObj)
        a.push($scope.msgObjForLocalStorage);
        localStorage.setItem('localChatThreads', JSON.stringify(a));
        $scope.getExistingThreads();
        refForRemoving.child($scope.removalKey).remove();
      } else {
        let index , flag = true;
        for (var i = 0; i < a.length; i++) {
          if (a[i].engineerID == $rootScope.user.loginId) {
            if (a[i].expertID == $scope.msg.loginID) {
              flag = true;
              index = i;
              break;
            } else {
              flag = false;
              index = i;
            }
          }
        }
        if (flag == true) {
          if ($scope.expert != undefined) { // If there is a selected expert .
            if($scope.expert.expertID == $scope.msg.loginID){ // If the received messgae is from the same expert which is currently selected, then append to chat sheet.
              a[index].chat.readMsgs.push($scope.msgObj);
              localStorage.setItem('localChatThreads', JSON.stringify(a));
              $scope.appendToChatSheet($scope.msgObj);
              refForRemoving.child($scope.removalKey).remove();
            } else { // If the selected expert is different from the sender.
              a[index].chat.unreadMsgs.push($scope.msgObj);
              $scope.numUnreadMsgs[$scope.msg.name] = a[index].chat.unreadMsgs.length;
              localStorage.setItem('localChatThreads', JSON.stringify(a));
              refForRemoving.child($scope.removalKey).remove();
            }
          } else { // If there is no selected expert then just push the message to local storage.
            a[index].chat.unreadMsgs.push($scope.msgObj);
            $scope.numUnreadMsgs[$scope.msg.name] = a[index].chat.unreadMsgs.length;
            localStorage.setItem('localChatThreads', JSON.stringify(a));
            refForRemoving.child($scope.removalKey).remove();
          }
        } else {
          $scope.msgObjForLocalStorage.chat.unreadMsgs.push($scope.msgObj)
          a.push($scope.msgObjForLocalStorage);
          $scope.numUnreadMsgs[$scope.msg.name] = $scope.msgObjForLocalStorage.chat.unreadMsgs.length;
          localStorage.setItem('localChatThreads', JSON.stringify(a));
          $scope.existingThread.push($scope.msgObjForLocalStorage)
          refForRemoving.child($scope.removalKey).remove();
        }
      }
    }

    $scope.chatRef = $rootScope.fbAppDBRef.child('messages/' + $rootScope.user.loginId + '_chatID');
    $scope.chatRef.off();
    $scope.chatRef.on('child_added',function (snap) {
      $scope.msg = snap.val();
      $scope.removalKey = snap.key;
      var date = new Date();
      // console.log("getting msg");
      var time = date.toLocaleDateString() + " " + date.toLocaleTimeString();
      if ($scope.msg.type == 1) {
        $scope.msgObj = {
          "type" : "other",
          "text" : $scope.msg.text,
          "time" : time
        }
        $scope.msgObjForLocalStorage = {
          "engineerID" : $rootScope.user.loginId,
          "expertID" : $scope.msg.loginID,
          "location" : $scope.msg.loc,
          "name" : $scope.msg.name,
          "team" : $scope.msg.team,
          "chat" : {
            "readMsgs" : [],
            "unreadMsgs" : []
          }
        }
        $scope.receieveAndAppend();
      } else if ($scope.msg.type == 2) {
        var a = $scope.msg.text.replace(/\\/g, "").replace('"[',"[").replace(']"',"]");
        var atmObj = JSON.parse(a);
        var storageRef = $rootScope.firebaseApp.storage().ref(atmObj.atms[0].url);
        storageRef.getDownloadURL().then(function(url) {
          var fileType = atmObj.atms[0].url.split(".").pop();
          var atmObjForLocal = {
            "title" : "",
            "url" : url,
            "fileType" : fileType
          }
          if (atmObj.atms[0].txt == undefined) {
            atmObj.atms[0].txt = "";
          }
          $scope.msgObj = {
            "type" : "other",
            "text" : atmObj.atms[0].txt,
            "time" : time,
            "atms" : []
          }
          $scope.msgObj.atms.push(atmObjForLocal);
          $scope.msgObjForLocalStorage = {
            "engineerID" : $rootScope.user.loginId,
            "expertID" : $scope.msg.loginID,
            "location" : $scope.msg.loc,
            "name" : $scope.msg.name,
            "team" : $scope.msg.team,
            "chat" : {
              "readMsgs" : [],
              "unreadMsgs" : []
            }
          }
          $scope.msgObjForLocalStorage.chat.readMsgs.push($scope.msgObj);
          $scope.receieveAndAppend();
        }).catch(function(error) {
          switch (error.code) {
            case 'storage/object_not_found':
            // File doesn't exist
            break;
            case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
            case 'storage/canceled':
            // User canceled the upload
            break;
            case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            break;
          }
        });
      } else if ($scope.msg.type == 3) {
        $scope.callMsgKey = snap.key;
        if ($scope.msg.text === 'CallReq') {
          // $scope.expert = {};
          // $scope.expert.expertID = $scope.msg.loginID;
          // $scope.expert.name = $scope.msg.name;
          console.log('Incoming call!');
          $scope.ReceiveCall($scope.msg);
        } else if ($scope.msg.text === 'MissedCall') {
          console.log('missed call !');
          let refForRemoving = $rootScope.fbAppDBRef.child('messages/' + $rootScope.user.loginId + '_chatID');
          refForRemoving.child($scope.callMsgKey).remove();
          $scope.$broadcast ('eventMissedCall', {
            "name": $scope.msg.name,
            "expertID": $scope.msg.loginID,
            "location": $scope.msg.loc,
            "team" : $scope.msg.team
          });
        }
      }
    });

    let missedCallRef = $rootScope.fbAppDBRef.child('messages/' + $rootScope.user.loginId + '_chatID').on('child_changed', function (snap) {
      $scope.msg = snap.val();
      if ($scope.msg.type == 3 && $scope.msg.text === 'MissedCall') {
        $scope.callMsgKey = snap.key;
        console.log('missed call !!!');
        let refForRemoving = $rootScope.fbAppDBRef.child('messages/' + $rootScope.user.loginId + '_chatID');
        refForRemoving.child($scope.callMsgKey).remove();
        $scope.$broadcast ('eventMissedCall', {
          "name": $scope.msg.name,
          "expertID": $scope.msg.loginID,
          "location": $scope.msg.loc,
          "team" : $scope.msg.team
        });
      }
    });
    $scope.ReceiveCall = function (msg) {
      $scope.$broadcast ('eventIncomingCall', {
        "name": msg.name,
        "expertID": msg.loginID,
        "location": msg.loc,
        "team" : msg.team
      });

      // return  $scope.msg;
    }
    $scope.$on('eventCallAccepted', function () {
      let refForRemoving = $rootScope.fbAppDBRef.child('messages/' + $rootScope.user.loginId + '_chatID');
      refForRemoving.child($scope.callMsgKey).remove();
    });


    $scope.getExistingThreads = function () {
      $scope.AllExistingThread = JSON.parse(localStorage.getItem('localChatThreads'));
      if($scope.AllExistingThread == undefined){
      } else {
        for (var i = 0; i < $scope.AllExistingThread.length; i++) {
          if($scope.AllExistingThread[i].engineerID == $rootScope.user.loginId){
            $scope.existingThread.push($scope.AllExistingThread[i]);
          }
        }
      }
    }

    $scope.deleteExistingChat = function (index) {
      $scope.existingThread.splice(index,1);
      localStorage.setItem('localChatThreads', JSON.stringify($scope.existingThread));
    }
    $scope.init();
  }
});

function getVarValue( field, url ) {
    var href = url ? url : window.location.href;
    var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
    var string = reg.exec(href);
    return string ? string[1] : null;
}
