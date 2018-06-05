angular.module('ImagineApp')
.controller('CallController',function ($rootScope, $scope, $state, $firebaseObject,$uibModal, $window, $interval, $localStorage,$filter,$http, $timeout, main) {
  $interval(function () {
    $scope.$digest;
  },100);

  if ($rootScope.user == undefined) {
    $rootScope.user = $localStorage.engineerDetail;
    $rootScope.fbAppDBRef = $rootScope.firebaseApp.database().ref("RSME");
    $rootScope.fbAppStorageRef = $rootScope.firebaseApp.storage().ref("RSME");
  }
  $scope.$watch(angular.bind($scope.showCallConatiner, function (window) {
    return $window.showCallConatiner;
  }), function (newValue, oldValue) {
    $scope.showCallConatiner = newValue;
  });
  $scope.$watch(function (window) {
    return $window.callStatusText;
  }, function (newValue, oldValue) {
    $scope.callStatusText = newValue;
  });
  $scope.$watch(angular.bind($scope.callType, function (window) {
    return $window.callType;
  }), function (newValue, oldValue) {
    $scope.callType = newValue;
    if ($scope.callType === 'Annotation Call') {
      console.log('CALL SWITCH Video Call!');
      $scope.clearAnnotationContainer();
      $scope.showPasteImageContainer = true;
    } else if ($scope.callType === 'Video Call') {
      $scope.clearAnnotationContainer();
    }
  });
  $scope.$watch(angular.bind($scope.openFeedbackFormWindow,function (window) {
    return $window.openFeedbackFormWindow;
  }),function (data) {
    if (data != undefined && data.value == true) {
      $scope.openFeedbackForm(data.logs);
    }
  });

  $scope.checkForAvaiableExpert = function () {
    console.log($scope.connectDirectly);
    // main.availableExpert().success(function (response) {
    //   console.log(response);
    // }).error(function (err) {
    //   console.log(err);
    // })
  }

  $scope.annotationCanvas = document.getElementById('annotation-canvas');
  $scope.annotationImage = document.getElementById('background');
  $scope.context = $scope.annotationCanvas.getContext("2d");
  $scope.iconPasteImage = document.querySelector('.icon-paste-image');
  $scope.callerDetails = {};
  $scope.ringtone = "";
  $scope.incomingCallStatusText = "";
  $scope.muteFlag = false;
  $scope.micText = 'Mic On';
  $scope.callDirection = '';
  $scope.speakerOnFlag = true;
  $scope.speakerText = 'Speaker On';
  $scope.$audioOut = $('#incomingAudio');
  $scope.$annotationOut = $('#annotation');
  $scope.annotationImage.onload = function() {
    $scope.context.drawImage($scope.annotationImage, 0, 0, $scope.annotationImage.width, $scope.annotationImage.height, 0, 0, $scope.annotationCanvas.width, $scope.annotationCanvas.height);
    $scope.annotationCanvas.toBlob( function (blob) {
      $scope.file = new File( [blob], 'screenshot.png', {'type': 'image/png'});
    });
  };

  $scope.callLogData = {
    "timeStamp" : "",
    "logLevel" : "Info",
    "userActivity" : "Remote Call",
    "activityStatus" : "Call Disconnected",
    "role" : "Engineer",
    "name" : $rootScope.user.engineerName,
    "loginId" : $rootScope.user.loginId + "",
    "programName" : "",
    "groupName" : $rootScope.user.groupName,
    "partnerName" : $rootScope.user.partnerName,
    "location" : $rootScope.user.location,
    "toRole" : "Expert",
    "toName" : "",
    "toProgramName" : "",
    "toPartnerName" : "",
    "toLocation" : "",
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
    "callDuration" : "0:00",
    "ticketNumber" : "",
    "transactionId" : "",
    "applicationId" : "HDFC",
    "applicationDescription" : "HDFC pvt ltd",
    "componentId" : "102",
    "featureId" : "204",
    "transactionStartDate" : "",
    "transactionEndDate" : "",
    "transactionState" : "Call Initiated",
    "callFeedBack" : ""
  }

  $scope.$on('eventIncomingCall', function(event, callerDetails) {
    $('.accept-call').removeClass("disabled");
    $scope.callerDetails = callerDetails;
    if ($scope.callerDetails.expertID) {
      $scope.callLogData.toName = $scope.callerDetails.name;
      $scope.callLogData.tologinId = $scope.callerDetails.expertID;
      $scope.callLogData.toLocation = $scope.callerDetails.location;
      $scope.callLogData.toPartnerName = $rootScope.user.partnerName;
      console.log('incoming call, making call');
      $scope.callDirection = "incoming";
      $scope.incomingCallStatusText = "Incoming Call...";
      $scope.ringtone = "/static/media/notification.mp3";
      $rootScope.engineerCalling = {
        "EngName" : $rootScope.user.engineerName,
        "PartnerLocation" : $rootScope.user.location,
        "EngId" : $rootScope.user.loginId,
        "PartnerName" : $rootScope.user.partnerName,
        "Address" : "",
        "ticketNumber" : ""
      }
      $scope.$emit('eventCallAccepted', function (event) {
      });

      $scope.showCallConatiner.incoming = true;
    } else {
      console.log('Caller loginId not found!');
    }
  });
  $scope.$on('eventMissedCall', function (event, callerDetails) {
    console.log('eventMissedCall registered!');
    var d = new Date();
    var time = ($filter('date')(d, "yyyy-MM-dd HH:mm:ss"));
    $scope.callLogData.timeStamp = time;
    $scope.callLogData.terminationType = "Engineer Un Answered"
    $scope.callLogData.activityStatus = "Call Un Answered"
    $scope.callLogData.callType = "Incoming Remote Call ( Call Switch count : 0)";
    $scope.callLogData.callDuration = "0:00";
    $scope.showCallConatiner.incoming = false;
    $scope.ringtone = "";
    main.sendLogs($scope.callLogData,$rootScope.config).success(function (response) {
      console.log(response);
    }).error(function (err) {
      console.log(err);
    })
  });
  $rootScope.enterTicketNo = function () {
    var modalInstance = $uibModal.open({
      templateUrl: 'ticketNo.html',
      controller: 'ticketNoController',
      resolve: {
        value : function () {
          return $scope.value;
        },
        data : function () {
          return $scope.data;
        },
        browser : function () {
          return $scope.location;
        }
      }
    })
    modalInstance.result.then(function (ticketNo) {
      $scope.callDirection = "outgoing";
      $rootScope.makeCall(ticketNo);
    });
  };

  $scope.ctrlFn = function(image) {
    $scope.imageArray = image;
    $scope.image = $scope.imageArray[0];
    $scope.image.preview = {};
    $scope.image.preview = URL.createObjectURL(new Blob([$scope.image.text]));
    $scope.clearAnnotationContainer();
    $scope.showSendImageContainer = true;
  };
  $scope.sendNewImage = function () {
    $scope.clearAnnotationContainer();
    $scope.showPasteImageContainer = true;
  };
  $scope.acceptCall = function () {
    $('.accept-call').addClass("disabled");
    $timeout(function () {
      $scope.ringtone = ""; console.log('ringtone', $scope.ringtone);
      document.getElementById('ringtone').pause();
    }, 100);
    // $scope.showCallConatiner.incoming = false;
    $scope.incomingCallStatusText = "Please wait. Connection in progress";
    $scope.showCallConatiner.annotation = true;
    $scope.showPasteImageContainer = true;
    $scope.muteFlag = false;
    $scope.micText = 'Mic On';
    $scope.speakerOnFlag = true;
    $scope.speakerText = 'Speaker On';
    if (!$scope.firebaseSignalling) {
      $scope.firebaseSignalling = new firebaseSignalling ($rootScope.engineerCalling, $scope.$audioOut, $rootScope.config, $rootScope.fbAppDBRef);
    }
    $scope.firebaseSignalling.initiateWebRTC($scope.callerDetails, $scope.callDirection, $scope.callLogData);
    $('.fa-microphone-slash').toggleClass('fa-microphone-slash fa-microphone');
    $('.fa-volume-off').toggleClass('fa-volume-off fa-volume-up');
  };
  $rootScope.makeCall = function (ticketNo) {
	$scope.callDirection = "outgoing";
    $scope.showPasteImageContainer = true;
    $scope.muteFlag = false;
    $scope.micText = 'Mic On';
    $scope.speakerOnFlag = true;
    $scope.speakerText = 'Speaker On';
	$scope.expert = {
                  "name": $rootScope.reqexpertName,
                  "expertID": $rootScope.reqexpertId,
                  "location": "Mysore",
                  "team" : "CIM Team",
                  "status" : 1,
                  "program" : "abcprog",
                  "skill" : "abcskill"
                } ;
    $('.fa-microphone-slash').toggleClass('fa-microphone-slash fa-microphone');
    $('.fa-volume-off').toggleClass('fa-volume-off fa-volume-up');
    var d = new Date();
    var time = ($filter('date')(d, "yyyy-MM-dd HH:mm:ss"));
    $scope.callLogData.timeStamp = time;
    $scope.callLogData.ticketNumber = ticketNo;
    if ($state.current.name == "messages") {
      $scope.callLogData.transactionId = $scope.transactionId;
    } else {
      $scope.callLogData.transactionId = $rootScope.reqcetransactionId;
    }
    $scope.callLogData.transactionStartDate = time;
    $scope.engineerCalling = {
      "EngName" : $rootScope.user.engineerName,
      "EngId" : $rootScope.user.loginId,
      "Address" : "",
      "PartnerName" : $rootScope.user.partnerName,
      "PartnerLocation" : $rootScope.user.location,
      "ticketNumber" : ticketNo,
      "transactionId" : $scope.callLogData.transactionId
    };
    $scope.callLogData.toName = $scope.expert.name;
    $scope.callLogData.tologinId = $scope.expert.expertID;
    $scope.callLogData.toLocation = $scope.expert.location;
    $scope.callLogData.toPartnerName = $rootScope.user.partnerName;

    if ($scope.expert && $scope.expert.status == 1) {
      if (!$scope.firebaseSignalling) {
        $scope.firebaseSignalling = new firebaseSignalling ($scope.engineerCalling, $scope.$audioOut, $rootScope.config, $rootScope.fbAppDBRef);
      }
      $scope.firebaseSignalling.initiateWebRTC($scope.expert, $scope.callDirection, $scope.callLogData);
    } else {
      console.log('Expert is currently away or busy. Please contact after some time.');
    }
  };
  $scope.muteUnmute = function () {
    if ($scope.muteFlag == false) {
      $scope.firebaseSignalling.webRTC.mute();
      $('.fa-microphone').toggleClass('fa-microphone-slash fa-microphone');
      $scope.micText = 'Mic Off';
      $scope.muteFlag = true;
    } else {
      $scope.firebaseSignalling.webRTC.unmute();
      $('.fa-microphone-slash').toggleClass('fa-microphone-slash fa-microphone');
      $scope.micText = 'Mic On';
      $scope.muteFlag = false;
    }
  };
  $scope.speaker = function () {
    if ($scope.speakerOnFlag == true) {
      document.getElementById('incomingAudio').pause();
      $('.fa-volume-up').toggleClass('fa-volume-off fa-volume-up');
      $scope.speakerText = 'Speaker Off';
      $scope.speakerOnFlag = false;
    } else {
      document.getElementById('incomingAudio').play();
      $('.fa-volume-off').toggleClass('fa-volume-off fa-volume-up');
      $scope.speakerText = 'Speaker On';
      $scope.speakerOnFlag = true;
    }
  };
  $scope.endCall = function () {
    console.log("call ended");
    $scope.imageSources = [];
    $scope.file={};
    $scope.image = {};
    let engMsg = "Endcall";
    $scope.firebaseSignalling.webRTC.closePC1(engMsg);
  };
  $scope.sendScreenShot = function () {
    if ($scope.firebaseSignalling) {
      console.log("sending raw image");
      $scope.clearAnnotationContainer();
      $scope.showProgressContainer = true;
      $scope.showProgressContainer = $scope.firebaseSignalling.webRTC.sendImage($scope.image.text,$scope.file);
    }
  };
  $scope.clearAnnotationContainer = function () {
    $scope.showSendImageContainer = false;
    $scope.showProgressContainer = false;
    $scope.showPasteImageContainer = false;
  };
  $scope.openFeedbackForm = function (logs) {
    var modalInstance = $uibModal.open({
      templateUrl: 'feedbackForm.html',
      controller: 'feedbackController',
      backdrop : false,
      keyboard : false
    });
    modalInstance.result.then(function (feedback) {
      logs.callFeedBack = "Feedback - " + feedback.selectedValue + " Comments - " + feedback.remarks;
      main.sendLogs(logs,$rootScope.config).success(function (response) {
        console.log(response);
      }).error(function (err) {
        console.log(err);
      })
      feedback = {};
    });
  };
})

.controller('ticketNoController',function ($scope,$uibModal, $uibModalInstance) {
  $scope.submitRequest = function () {
    $uibModalInstance.close($scope.data.ticketNo);
  }
})

.controller('feedbackController',function ($scope,$uibModal, $uibModalInstance) {
  $scope.submitFeedback = function () {
    $uibModalInstance.close($scope.feedback);
  }
})

.directive('screenshot', function() {
  return {
    scope: { someCtrlFn: '&callbackFn' },
    link: function(scope, elem, attrs) {
      elem[0].addEventListener('paste', function(event) {
        var clipboardItems = (event.clipboardData || event.originalEvent.clipboardData).items;
        var blob;
        for(var i=0; i<clipboardItems.length; i++) {
          if (clipboardItems[i].type.indexOf("image") === 0) {
            blob = clipboardItems[i].getAsFile();
          }
        }
        scope.imageSources=[];
        if (blob !== null) {
          var reader = new FileReader();
          reader.onload = function(event) {
            scope.$apply(function() {
              console.log('image read');
              scope.imageSources.push({'text': event.target.result});
              scope.someCtrlFn({arg1: scope.imageSources});
            });
          };
          reader.readAsArrayBuffer(blob);
          console.log('blob from directive:  ' , blob);
        }
      });
    }
  };
});
