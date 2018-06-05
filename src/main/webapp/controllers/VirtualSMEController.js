angular.module('ImagineApp')
.controller('VirtualSMEController', function ($rootScope, $scope, $localStorage,main,$http, $state) {
  $rootScope.pageTitle = 'V-SME | ' + $rootScope.appTitle;
  $rootScope.showNavbarIcons = true;
  if ($rootScope.user == undefined) {
    $rootScope.user = $localStorage.engineerDetail;
    $rootScope.fbAppDBRef = $rootScope.firebaseApp.database().ref($rootScope.user.groupName);
    $rootScope.fbAppStorageRef = $rootScope.firebaseApp.storage().ref($rootScope.user.groupName);
  }
  if(!$rootScope.user){
    $rootScope.goToState("login");
  } else {
    $scope.init = function () {
      $scope.refImgUrl = '';
      $scope.transactionId = '';
      document.querySelector('.chat-box .chat').addEventListener('click', function (evt) {
        console.log('target', evt.target);
        if (evt.target.classList.contains('selectOptionLabels')) {
          evt.stopPropagation();
          $scope.sendMsg(evt.target.innerHTML);
        } else if (evt.target.hasAttribute('href')) {
          $scope.refImgUrl = evt.target.getAttribute('href');
          $scope.$apply();
        }
      });
    };
    $scope.init();
    $scope.sendMsg = function (msg) {
      if (msg) {
        $scope.appendMsg(msg, 'own');
        $scope.ownMsg = '';
        $http({
          'url' : 'http://13.126.78.167:6060/HMIPlatformCEHDFC/chatCE',
          'method': 'POST',
          'data': JSON.stringify({
            "dataToCollect" : "",
            "userId" : $rootScope.user.engineerName,
            "id" : "",
            "typeOfMessage" : "text",
            "answerType" : "",
            "accountKey" : "",
            "transactionId" : $scope.transactionId,
            "currentLanguage" : "en",
            "errorText" : "",
            "userInputText" : msg,
            "errorCode" : ""
          })
        }).then(function(data) {
          if(data.data.errorText)
          $scope.appendMsg(data.data.errorText, 'other');
          $scope.transactionId = data.data.transactionId;
        }).catch(function(err) {
          console.log('ERR', err);
        });
      }
    };
    $scope.appendMsg = function (msg, type) {
      let chatSheet = document.querySelector('.chat-box .chat');
      let $chatSheet = angular.element(chatSheet);
      let msgClass = 'msg ' + type;
      $chatSheet.append(`<li class='` + msgClass + `'>` + msg + `</li>`);
      chatSheet.lastChild.querySelectorAll('a').forEach(function (anchor) {
        if (anchor.getAttribute('href')[0] == '/') {
          anchor.setAttribute('href', 'http://13.126.78.167:6060' + anchor.getAttribute('href'));
          anchor.setAttribute('target','ref_img');
          anchor.setAttribute('rel','noopener noreferrer');
        } else if (anchor.getAttribute('href').includes('firebaseapp')) {
          anchor.setAttribute('href', window.location.origin + window.location.pathname + '#/remoteHelp/');
          anchor.setAttribute('target', '_self');
        }
      });
      $chatSheet.scrollTop($chatSheet[0].scrollHeight);
    };
  }
});
