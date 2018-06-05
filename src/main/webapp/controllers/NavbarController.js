angular.module('ImagineApp')
.controller('NavbarController', function ($rootScope,$filter, $scope, $firebaseObject, $uibModal, $localStorage, $state, $interval, main) {
  if ($state.current.name = "" && $rootScope.user == undefined) {
    $rootScope.user = $localStorage.engineerDetail;
    $rootScope.fbAppDBRef = $rootScope.firebaseApp.database().ref($rootScope.user.groupName);
    $rootScope.fbAppStorageRef = $rootScope.firebaseApp.storage().ref($rootScope.user.groupName);
  }
  if (!$rootScope.user) {
    $rootScope.goToState('login');
  } else {
    $scope.state = $state;
    $scope.currentState = $scope.state.current.name;
    if ($scope.currentState == "home") {
      $scope.navbarItems = false;
    }
    $scope.isActive = function (viewLocation) {
      return viewLocation === $scope.currentState;
    };
    $scope.appContainer = document.querySelector('.content-container');
    $rootScope.fbAppDBRef.child("/devices/" + $rootScope.user.loginId).child("uid").on('value',function (snap) {
      $scope.localDeviceData = $localStorage.localDeviceUID;
      var data = snap.val();
      $scope.uid = data;
      if ($scope.localDeviceData.uid == $scope.uid || $scope.localDeviceData.uid == undefined) {
      } else if($scope.localDeviceData.uid != $scope.uid && $scope.localDeviceData.uid != undefined){
        console.log("force logout");
        $scope.localDeviceData = "";
        delete $localStorage.localDeviceUID;
        delete $localStorage.engineerDetail;
        $state.go('login');
        $rootScope.fbAppDBRef.off();
        var modalInstance = $uibModal.open({
          templateUrl: 'logoutPopUP.html',
          controller: 'logoutPopUPController',
        })
      }
    })
  }

  $scope.sendLogoutLogs = function () {
    var d = new Date();
    var time = ($filter('date')(d, "yyyy-MM-dd HH:mm:ss"));
    var loginID = loginID+"";
    var reqData = {
      "timeStamp" : time,
      "logLevel" : "Info",
      "userActivity" : "Log out",
      "activityStatus" : "Log out",
      "role" : "Engineer",
      "name" : $rootScope.user.engineerName,
      "loginId" : $rootScope.user.loginId,
      "programName" : "",
      "partnerName" : $rootScope.user.partnerName,
      "groupName" : $rootScope.user.groupName,
      "location" : $rootScope.user.location,
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
  };

  $scope.logout = function () {
    console.log("logout");
    var firebaseRef =   $rootScope.fbAppDBRef.child("devices").child($rootScope.user.loginId);
    firebaseRef.once('value', function (snap) {
      let user = snap.val();
      firebaseRef.update({'status' : '0'})
      .then(function () {
        $rootScope.fbAppDBRef.child('messages/' + $rootScope.user.loginId + "_chatID").off();
        $scope.sendLogoutLogs();
        $scope.localDeviceData="";
        delete $localStorage.engineerDetail;
        delete $localStorage.localDeviceUID;
        delete $rootScope.user;
        var stop = $interval(function () {
          if ($localStorage.localDeviceUID != undefined) {
          } else {
            $interval.cancel(stop);
            $state.go("login")
          }
        }, 10);

      })
      .catch(function (err) {
        console.log("cannot logout");
      })
    });
  }
});

angular.module('ImagineApp').controller('logoutPopUPController',function ($state, $scope, $uibModal, $uibModalInstance) {
  $scope.forceLogout = function () {
    $uibModalInstance.dismiss('cancel');
    $state.go('login');
  }
});
