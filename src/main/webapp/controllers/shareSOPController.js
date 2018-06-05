angular.module('ImagineApp')
.controller('shareSOPController', function ($rootScope, $scope, $localStorage, util, $firebaseObject, $firebaseArray, $interval, $uibModal, main) {
  $rootScope.pageTitle = 'Share SOP | ' + $rootScope.appTitle;
  $rootScope.showNavbarIcons = true;
  if ($rootScope.user == undefined) {
    $rootScope.user = $localStorage.engineerDetail;
    $rootScope.fbAppDBRef = $rootScope.firebaseApp.database().ref($rootScope.user.groupName);
    $rootScope.fbAppStorageRef = $rootScope.firebaseApp.storage().ref($rootScope.user.groupName);
  }
  if(!$rootScope.user){
    $rootScope.goToState("login");
  } else {
    main.checkforCall($rootScope.user.loginId,$rootScope.fbAppDBRef);
    $scope.sopContainer = document.querySelector('.sop-container');
    $scope.program = [{"name":'Select Program'}];
    $scope.selectedProgram = $scope.program[0];
    $scope.disableUploadBtn = true;
    $scope.showProgressBar = false;
    $scope.resources = [];
    $scope.initializeFirebase = function () {
      util.displayLoading($scope.sopContainer);
      let isInitializing = true;// to show loading only once while initializing
      $scope.ngFireDBProgramRef = $rootScope.fbAppDBRef.child('videos/DNA');
      $scope.ngFireStorageRef = $rootScope.fbAppStorageRef.child('signedSOP');
      $scope.programs = $firebaseObject($scope.ngFireDBProgramRef);
      $scope.programs.$loaded(function (data) {
        util.doneLoading($scope.sopContainer);
        $scope.availableDevicesTree = data
        if($scope.availableDevicesTree) {
          let programTemp = [{"name":'Select Program'}];
          // To iterate the key/value pairs of the object, use angular.forEach()
          angular.forEach(data, function(value, key) {
            programTemp.push({
              "name": key,
              "value": key
            });
          });
          $scope.program = programTemp;
          $scope.selectedProgram = $scope.program[0];
        }
      });
    };
    $scope.initializeFirebase();
    $scope.uploadFiles = function(file) {
        $scope.inputSOP = file;
        $scope.showProgressBar = false;
        if (file) {
          $scope.disableUploadBtn = false;
        } else {
          $scope.disableUploadBtn = true;
        }
    }
    $scope.uploadSOPToStrorage = function () {
      if ($scope.selectedProgram.name !== "Select Program" && $scope.inputSOP) {
        if ($scope.inputSOP.size) {
          $scope.disableUploadBtn = true;
          $scope.showProgressBar = true;
          $scope.uploadPercentage = 0;
          let selectedSOP = $scope.inputSOP;
          let uploadedFileURL = $scope.selectedProgram.name;
          let fileName = selectedSOP.name;
          let progressBar = $('#progressBar');
          uploadTask = $scope.ngFireStorageRef.child(uploadedFileURL + '/' + $rootScope.user.loginId + '/' + fileName).put(selectedSOP);
          uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function (snapshot) {
             $scope.uploadPercentage = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
             progressBar.css('width', $scope.uploadPercentage + '%');
             progressBar.html($scope.uploadPercentage + '%');
             if ($scope.uploadPercentage == 100) {
               progressBar.removeClass('active').addClass('progress-bar-success');
             } else {
               progressBar.addClass('active').removeClass('progress-bar-danger progress-bar-success');
             }
          }, function (error) {
            switch (error.code) {
              case 'storage/unauthorized':
              break;
              case 'storage/canceled':
              console.log('Upload canceled by the user.');
              break;
              case 'storage/unknown':
              break;
            }
            progressBar.removeClass('active').addClass('progress-bar-danger');
          }, function () {
            var downloadURL = uploadTask.snapshot.downloadURL;
            console.log('Uplaod complete', downloadURL);
            let fileSize = uploadTask.snapshot.metadata.size;
            let fileLastModified = uploadTask.snapshot.metadata.timeCreated; console.log('fileLastModified', uploadTask.snapshot.metadata);
            let fileDownloadURL = uploadTask.snapshot.downloadURL;
            $scope.updateFirebase(fileName, fileSize, fileLastModified, fileDownloadURL);
          });
        } else {
          console.log('Selected file size is 0');
        }
      } else {
        console.log('Please select program and SOP to upload.');
      }
    };

    $scope.updateFirebase = function (fileName, fileSize, fileLastModified, fileDownloadURL) {
      console.log('fileSize, fileLastModified : ' + fileSize + ' ' + fileLastModified);
      $scope.ngFireDBSOPRef = $rootScope.fbAppDBRef;
      $scope.ngFireDBSOPRef.child("signedSOP" + "/" + $scope.selectedProgram.name + "/" + $rootScope.user.loginId).push({
        name : fileName,
        size : fileSize,
        lastModified : fileLastModified,
        downloadURL : fileDownloadURL
      });
    };
    $scope.showChecklist = function (program) {
      if (program.name != "Select Program") {
        $scope.ngFireDBSOPRef = $rootScope.fbAppDBRef;
        $scope.ngFireDBSOPRef.child("signedSOP/" + program.name + '/' + $rootScope.user.loginId).on('value', function (snapshot) {
          $scope.resources = [];
          snapshot.forEach(function (childsnap) {
            $scope.resources.push ({
              'name' : childsnap.child('name').val(),
              'size' : childsnap.child('size').val(),
              'lastModified' : childsnap.child('lastModified').val(),
              'downloadURL' : childsnap.child('downloadURL').val()
            });
          });
        });
      }
    }
    $scope.getPercentage = function () {
      return $scope.uploadPercentage;
    };
    $scope.showSignedSOP = function (downloadURL,fileName) {
      // alert(downloadURL);
      $scope.downloadURL = downloadURL;
      $scope.selectedCheckListName = fileName;
      var modalInstance = $uibModal.open({
        templateUrl: 'viewSOP.html',
        controller: 'closeCheckListController',
        resolve : {
          downloadURL : function () {
            return {
              downloadURL : $scope.downloadURL,
              fileName : $scope.selectedCheckListName
            }
          }
        }
      })
    };
  }
})

.controller('closeCheckListController',function ($state, $scope, $uibModal, $uibModalInstance, downloadURL) {
  $scope.downloadURL = downloadURL.downloadURL;
  $scope.selectedCheckListName = downloadURL.fileName;
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
