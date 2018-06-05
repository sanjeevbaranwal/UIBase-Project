angular.module('ImagineApp')
.controller('LoginController', function($rootScope, $scope,$timeout,$filter, $http, $state, $uibModal, $firebaseObject, $localStorage, main) {
  $rootScope.pageTitle = 'Login | ' + $rootScope.appTitle;
  let loggedInUserStr = window.localStorage.getItem('user');
  var localStoredUser = $localStorage.engineerDetail;
  $scope.showNavBar = false;
  if (localStoredUser) {
    $scope.user = localStoredUser;
    $state.go('home');
  } else {
    $('.navbar').css('display','none');
    if ($localStorage.userIdToRemember == undefined) {
      $scope.loginId = '';
    } else {
      $scope.loginId = $localStorage.userIdToRemember;
    }

    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var browserName  = navigator.appName;
    var fullVersion  = ''+parseFloat(navigator.appVersion);
    var majorVersion = parseInt(navigator.appVersion,10);
    var nameOffset,verOffset,ix;

    // In Opera, the true version is after "Opera" or after "Version"
    if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
      browserName = "Opera";
      fullVersion = nAgt.substring(verOffset+6);
      if ((verOffset=nAgt.indexOf("Version"))!=-1)
      fullVersion = nAgt.substring(verOffset+8);
    }
    // In MSIE, the true version is after "MSIE" in userAgent
    else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
      browserName = "Microsoft Internet Explorer";
      fullVersion = nAgt.substring(verOffset+5);
    }
    // In Chrome, the true version is after "Chrome"
    else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
      browserName = "Chrome";
      fullVersion = nAgt.substring(verOffset+7);
    }
    // In Safari, the true version is after "Safari" or after "Version"
    else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
      browserName = "Safari";
      fullVersion = nAgt.substring(verOffset+7);
      if ((verOffset=nAgt.indexOf("Version"))!=-1)
      fullVersion = nAgt.substring(verOffset+8);
    }
    // In Firefox, the true version is after "Firefox"
    else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
      browserName = "Firefox";
      fullVersion = nAgt.substring(verOffset+8);
    }
    // In most other browsers, "name/version" is at the end of userAgent
    else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) <
    (verOffset=nAgt.lastIndexOf('/')) )
    {
      browserName = nAgt.substring(nameOffset,verOffset);
      fullVersion = nAgt.substring(verOffset+1);
      if (browserName.toLowerCase()==browserName.toUpperCase()) {
        browserName = navigator.appName;
      }
    }
    // trim the fullVersion string at semicolon/space if present
    if ((ix=fullVersion.indexOf(";"))!=-1)
    fullVersion=fullVersion.substring(0,ix);
    if ((ix=fullVersion.indexOf(" "))!=-1)
    fullVersion=fullVersion.substring(0,ix);

    majorVersion = parseInt(''+fullVersion,10);
    if (isNaN(majorVersion)) {
      fullVersion  = ''+parseFloat(navigator.appVersion);
      majorVersion = parseInt(navigator.appVersion,10);
    }

    $scope.location = browserName + "-" + fullVersion;

    $scope.password = '';
    $scope.login=true;
    $scope.showForgotPasswordPanel = function () {
      if(!$scope.loginId){
        var text = "Enter the login ID";
        var msgStatus = "failure";
        $scope.customMessage(text,msgStatus);
      } else if($scope.login == true){
        var modalInstance = $uibModal.open({
          templateUrl: 'forgotPwdTemplate.html',
          controller: 'forgotPwdController',
        })
        modalInstance.result.then(function (data) {
          $http({
            "method": "POST",
            "url": "http://" + $rootScope.config.server.ip + ":" + $rootScope.config.server.port + "/" + $rootScope.config.servicesRoot + "/service/loginDetails/forgetPassword",
            "data": JSON.stringify({
              "loginId": $scope.loginId,
              "emailAddress" :data.email,
              "mobileNumber" : data.phnNum
            })
          }).then(function (data) {
            if (data.data.result == "FAILURE") {
              var text = data.data.responseMessage;
              var msgStatus = "failure";
              $scope.customMessage(data.data.responseMessage,msgStatus);

            } else {
              $scope.login = false;
              $scope.forgotPassword = true;
            }
          }).catch(function (err) {
            var text = "Enter valid login ID";
            var msgStatus = "failure";
            $scope.customMessage(data.data.responseMessage,msgStatus);
          })
        });

      }
    }
    $scope.showLoginPanel = function () {
      $scope.forgotPassword = false;
      $scope.login = true;
    }

    var messageTimer = false; // milliseconds (5000 ==> 5 seconds)

    $scope.showSuccessMessage = false;
    $scope.showFailureMessage = false;

    $scope.customMessage = function (text,msgStatus) {
      if (messageTimer) {
        $timeout.cancel(messageTimer);
      }
      if(msgStatus == "failure") {
        $scope.showFailureMessage = true;
        $scope.showSuccessMessage = false;
      } else if (msgStatus == "success") {
        $scope.showFailureMessage = false;
        $scope.showSuccessMessage = true;
      }
      $scope.message = text;
      messageTimer = $timeout(function () {
        $scope.showFailureMessage = false;
        $scope.showSuccessMessage = false;
      }, 10000);
    };

    $scope.sendLoginLogs = function (Engineer) {
      var d = new Date();
      var time = ($filter('date')(d, "yyyy-MM-dd HH:mm:ss"));
      var loginID = loginID+"";
      var reqData = {
        "timeStamp" : time,
        "logLevel" : "Info",
        "userActivity" : "Log in",
        "activityStatus" : "Log in",
        "role" : "Engineer",
        "name" : Engineer.engineerName,
        "loginId" : Engineer.loginId,
        "programName" : "",
        "partnerName" : Engineer.partnerName,
        "location" : Engineer.location,
        "toRole" : "",
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
        "callDuration" : ""
      };

      main.sendLogs(reqData,$rootScope.config).success(function (response) {
        console.log(response);
      }).error(function (err) {
        console.log(err);
      })
    }

    $scope.updateFirebase = function () {
      // check for call engineer -------------------------------------------------------------------
      $rootScope.fbAppDBRef.child("callengineer").child($scope.data.loginId + "_expertcallerID").once('value',function (snap) {
        if (snap.val() == null) {
          $rootScope.fbAppDBRef.child("callengineer").child($scope.data.loginId + "_expertcallerID").set({"expertMsg" : ""});
        }
      });
      $rootScope.fbAppDBRef.child("fe_engineers").child($scope.data.engineerDetail.engineerName).once('value',function (snap) {
        if (snap.val() == null) {
          $rootScope.fbAppDBRef.child("fe_engineers").child($scope.data.engineerDetail.engineerName).set({"id" : $scope.data.loginId,"skills" : "", "status" : 1});
        }
      });
    };

    $scope.signIn = function () {
      if ($scope.loginId && $scope.password) {
        $scope.disableBtn = true;
        $http({
          "method": "POST",
          "url": "http://" + $rootScope.config.server.ip + ":" + $rootScope.config.server.port + "/" + $rootScope.config.servicesRoot + "/service/loginDetails/authenticateUser",
          "data": JSON.stringify({
            "appVersion": "2.0",
            "loginId": $scope.loginId,
            "password": $scope.password,
            "role": "ENGINEER",
            "osType" : "Browser"
          })
        }).then(function(resp) {
          console.log(resp.data);
          $scope.disableBtn = true;
          if (resp.data && resp.data.result == "SUCCESS") {
            $rootScope.fbAppDBRef = $rootScope.firebaseApp.database().ref(resp.data.engineerDetail.groupName);
            $rootScope.fbAppStorageRef = $rootScope.firebaseApp.storage().ref(resp.data.engineerDetail.groupName);
            $('.navbar').css('display','block');
            $scope.data = resp.data;
            // $localStorage.engineerDetail = $scope.data.engineerDetail;
            // $scope.user = $localStorage.engineerDetail;
            var ref = $rootScope.fbAppDBRef.child("devices/"+$scope.data.loginId);
            ref.once('value',function (snap) {
              $scope.deviceData = snap.val();
              // var location = navigator.platform;
              var date = new Date();
              var time = date.getTime();
              if ($scope.deviceData == null) {
                var deviceData = {
                  'name' : $scope.location,
                  'status' : '1',
                  'uid' : time
                }
                let deviceDataref = $rootScope.fbAppDBRef.child("devices").child($scope.data.loginId).push(deviceData,function () {
                  var ref = $rootScope.fbAppDBRef.child('devices/'+$scope.data.loginId);
                  ref.once('value',function (snap) {
                    ref.set({'name' : $scope.location , 'status' : '1', 'uid' : time})
                    .then(function () {
                      var localData = {
                        "loginId" : $scope.data.loginId,
                        "uid" : time
                      }
                      $localStorage.localDeviceUID = localData;
                      $localStorage.engineerDetail = $scope.data.engineerDetail;
                      $rootScope.user =  $localStorage.engineerDetail;
                      $scope.sendLoginLogs($rootScope.user);
                      var text = "Successfully logged In";
                      var msgStatus = "success";
                      $scope.customMessage(text,msgStatus);
                      $scope.updateFirebase();
                      $state.go('home');
                    })
                  })
                });
              } else {
                if ($scope.deviceData.status == 0) {
                  ref.update({'name' : $scope.location , 'status' : '1', 'uid' : time})
                  .then(function () {
                    if ($scope.value == undefined || $scope.value == false) {
                    } else {
                      $localStorage.userIdToRemember = $scope.data.loginId;
                    }
                    var text = "Successfully logged In";
                    var msgStatus = "success";
                    $scope.customMessage(text,msgStatus);
                    $localStorage.engineerDetail = $scope.data.engineerDetail;
                    $rootScope.user =  $localStorage.engineerDetail;
                    $scope.sendLoginLogs($rootScope.user);
                    var localData = {
                      "loginId" : $scope.data.loginId,
                      "uid" : time
                    }
                    $localStorage.localDeviceUID = localData;
                    $scope.updateFirebase();
                    $state.go('home');
                  })
                } else if ($scope.deviceData.status == 1) {
                  var modalInstance = $uibModal.open({
                    templateUrl: 'confirmationPopUP.html',
                    controller: 'confirmationPopUPController',
                    backdrop : false,
                    keyboard : false
                  })
                  modalInstance.result.then(function (forceLogin) {
                    // $scope.sendLoginLogs(obj);
                    if (forceLogin == false) {
                      $state.reload();
                    } else {
                      if ($scope.value == undefined || $scope.value == false) {
                       } else {
                         $localStorage.userIdToRemember = $scope.data.loginId;
                       }
                       var location = navigator.platform;
                       var date = new Date();
                       var time = date.getTime();
                       var ref = $rootScope.fbAppDBRef.child('devices/'+$scope.data.loginId);
                       var localData = {
                         "loginId" : $scope.data.loginId,
                         "uid" : time
                       }
                       $localStorage.localDeviceUID = localData;
                       $localStorage.engineerDetail = $scope.data.engineerDetail;
                       $rootScope.user =  $localStorage.engineerDetail;
                       ref.once('value',function (snap) {
                         $scope.deviceData = snap.val();
                         ref.update({'name' : $scope.location , 'status' : '1', 'uid' : time})
                         .then(function () {
                           $scope.updateFirebase();
                           $state.go('home');
                         })
                       })
                    }
                  });
                }
              }
            })
          } else {
            $scope.password = ''
            var text = resp.data.responseMessage;
            $scope.disableBtn = false;
            var msgStatus = "failure";
            $scope.customMessage(text,msgStatus);
            // $scope.showMsg("Invalid login id or password. Kindly Retry.");
          }
        }).catch(function (err) {
          $scope.disableBtn = false;
          console.error('Login request failed.', err);
          var text = "Login request Failed";
          var msgStatus = "failure"
          $scope.customMessage(text,msgStatus);
        });
      } else {
        var text = "Kindly fill all the fields";
        var msgStatus = "failure";
        $scope.customMessage(text,msgStatus);
        $scope.disableBtn = false;
        // $scope.showMsg("Kindly enter login id and password.");
      }
    };

    $scope.resetPassword = function () {
      if ($scope.defaultPwd == undefined || $scope.newPwd == undefined || $scope.confirmNewPwd == undefined) {
        var text = "Kindly fill all the fields";
        var msgStatus = "failure";
        $scope.customMessage(text,msgStatus);
      } else {
        if ($scope.newPwd != $scope.confirmNewPwd){
          var text = "Password doesn't match";
          var msgStatus = "failure";
          $scope.customMessage(text,msgStatus);
        } else {
          $http({
            "method": "POST",
            "url": "http://" + $rootScope.config.server.ip + ":" + $rootScope.config.server.port + "/" + $rootScope.config.servicesRoot + "/service/loginDetails/changePassword",
            "data": JSON.stringify({
              "loginId": $scope.loginId,
              "password": $scope.defaultPwd,
              "newPassword": $scope.newPwd
            })
          }).then(function (data) {
            console.log(data);
            if (data.data.result == "FAILURE") {
              $scope.value = data.data.responseMessage;
              var modalInstance = $uibModal.open({
                templateUrl: 'pwdPolicy.html',
                controller: 'pwdPolicyController',
                resolve : {
                  value : function () {
                    return $scope.value;
                  },
                }
              })
              $scope.login = false;
              $scope.forgotPassword = true;
            } else {
              var text = data.data.responseMessage;
              var msgStatus = "success";
              $scope.customMessage(text,msgStatus);
              $scope.login = true;
              $scope.forgotPassword = false;
            }
          }).catch(function (err) {
            console.error(err);
          })
        }
      }
    }
  }
})


.controller('confirmationPopUPController',function ($uibModal, $uibModalInstance, $scope) {

  $scope.forceLogin = function () {
    $uibModalInstance.close(true);
  }

  $scope.cancel = function () {
    $uibModalInstance.close(false);
  }
})

.controller('forgotPwdController',function ($uibModal, $uibModalInstance, $scope) {
  $scope.submitRequest = function () {
    $uibModalInstance.close($scope.data);
  }

  $scope.cancel = function () {
    $uibModalInstance.dismiss();
  }
})

.controller('pwdPolicyController',function ($scope, $uibModal, $uibModalInstance, value) {
  console.log(value);
  $scope.pwdPolicy = value;
  $scope.cancel = function () {
    $uibModalInstance.dismiss();
  }
})
