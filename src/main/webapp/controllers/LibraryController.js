angular.module('ImagineApp')
.controller('LibraryController', function ($rootScope,$scope,$http,$filter,$firebaseObject,$firebaseArray,util,$uibModal,$state,$localStorage,main) {
  $rootScope.pageTitle = 'Library | ' + $rootScope.appTitle;
  $rootScope.showNavbarIcons = true;
  if ($rootScope.user == undefined) {
    $rootScope.user = $localStorage.engineerDetail;
    $rootScope.fbAppDBRef = $rootScope.firebaseApp.database().ref($rootScope.user.groupName);
    $rootScope.fbAppStorageRef = $rootScope.firebaseApp.storage().ref($rootScope.user.groupName);
  }
  if(!$rootScope.user){
    $state.go("login")
  } else {
    main.checkforCall($rootScope.user.loginId,$rootScope.fbAppDBRef);

    $scope.libraryContainer = document.querySelector('.library-container');
    $scope.$resultsRow = angular.element('.results-row');

    // variable declarations
    $scope.deviceTypes = [{"name":'Select Type'}];
    $scope.deviceBrands = [{"name":'Select Brand'}];
    $scope.deviceModels = [{"name":'Select Model'}];
    $scope.selectedType = $scope.deviceTypes[0];
    $scope.selectedBrand = $scope.deviceBrands[0];
    $scope.selectedModel = $scope.deviceModels[0];
    $scope.resources = [];

    $scope.setTableOrderBy = function (evt) {
      let $target = angular.element(evt.target),
          $parentTh = $target;
      if (evt.target.className.includes('caret'))
        $parentTh = angular.element(evt.target).parents('th');
      let orderBy = $parentTh.attr('data-orderby');
      $scope.orderRowsBy = orderBy;
      $parentTh.parent().find('.caret').removeClass('up');
      $parentTh.find('.caret')[0].className = 'caret up';
    }
    $scope.performSearchByQuery = function () {
      let q = $scope.getSearchQuery();
      if (q.q) {
        let resourceData = $scope.availableDevicesTree;
        util.displayLoading($scope.libraryContainer);
        $scope.resources = []; //reset the resources array
        $scope.$resultsRow.slideUp();
        $scope.selectedType = $scope.deviceTypes[0];
        $scope.selectSearchChange('type');
        let tempArr = [],
            counter = 0;
        angular.forEach(resourceData, function (value, type) {
          angular.forEach(resourceData[type], function (value2, brand) {
            angular.forEach(resourceData[type][brand], function (value3, model) {
              angular.forEach(resourceData[type][brand][model], function (value4, file) {
                console.log(value4);
                console.log(file);
                if ( value4.toLowerCase().indexOf(q.q.toLowerCase()) != -1) {
                  tempArr.push(value4);
                }
              });
            });
          });
        });
        if (tempArr.length) {
          let tempResources = [];
          for (let i = 0; i < tempArr.length; i++) {
            $scope.ngFireStorageRef.child(tempArr[i]).getMetadata().then(function(metadata) {
              tempResources.push(metadata);
              counter++;
              if (counter == tempArr.length) {
                $scope.resources = tempResources;
                $scope.$resultsRow.slideDown();
                $scope.$resultsRow.find('thead th:first-child')[0].click();
              }
              util.doneLoading($scope.libraryContainer);
            }).catch(function (err) {
              counter++;
              if (counter == tempArr.length) {
                $scope.resources = tempResources;
                $scope.$resultsRow.slideDown();
                $scope.$resultsRow.find('thead th:first-child')[0].click();
              }
              util.doneLoading($scope.libraryContainer);
            });
          }
        } else {
          util.doneLoading($scope.libraryContainer);
          $scope.resources = tempArr;
        }
      } else {
        alert("Kindly enter Resource description.");
      }
    };
    $scope.performSearchByIndex = function () {
      let q = $scope.getSearchQuery();
      if (q.model) {
        $scope.resourceDesc = "";
        let resourceData = $scope.availableDevicesTree[q.type][q.brand][q.model];
        util.displayLoading($scope.libraryContainer);
        $scope.resources = []; //reset the resources array
        $scope.$resultsRow.slideUp();
        let tempArr = [],
            counter = 0;
        angular.forEach(resourceData, function (value, key) {
          tempArr.push(value)
        });
        if (tempArr.length) {
          let tempResources = [];
          for (let i = 0; i < tempArr.length; i++) {
            $scope.ngFireStorageRef.child(tempArr[i]).getMetadata().then(function(metadata) {
              tempResources.push(metadata);
              counter++;
              if (counter == tempArr.length) {
                $scope.resources = tempResources;
                $scope.$resultsRow.slideDown();
                $scope.$resultsRow.find('thead th:first-child')[0].click();
              }
              util.doneLoading($scope.libraryContainer);
            }).catch(function (err) {
              counter++;
              if (counter == tempArr.length) {
                $scope.resources = tempResources;
                $scope.$resultsRow.slideDown();
                $scope.$resultsRow.find('thead th:first-child')[0].click();
              }
              util.doneLoading($scope.libraryContainer)
            });
          }
        } else {
          util.doneLoading($scope.libraryContainer);
          $scope.resources = tempArr;
        }
      } else {
        alert("Kindly select the search index till Model.");
      }

    }
    $scope.getSearchQuery = function () {
      return {
        "type": $scope.selectedType.value,
        "brand": $scope.selectedBrand.value,
        "model": $scope.selectedModel.value,
        "q": $scope.resourceDesc
      }
    }

    $scope.sendDownloadFileLogs = function (filename) {
      for (var i = 0; i < $scope.resources.length; i++) {
        if ($scope.resources[i].name == filename) {
          var file = $scope.resources[i];
        }
      }
      var d = new Date();
      var time = ($filter('date')(d, "yyyy-MM-dd HH:mm:ss"));
      var loginID = loginID+"";
      var reqData = {
        "timeStamp" : time,
        "logLevel" : "Info",
        "userActivity" : "File Download",
        "activityStatus" : "File Downloaded",
        "role" : "Engineer",
        "name" : $rootScope.user.engineerName,
        "loginId" : $rootScope.user.loginId,
        "programName" : "",
        "groupName"  : $rootScope.user.groupName,
        "partnerName" : $rootScope.user.partnerName,
        "location" : $rootScope.user.location,
        "toRole" : "",
        "toName" : "",
        "toProgramName" : "",
        "toPartnerName" : "",
        "toLocation" : "",
        "downloadedFileName" : file.fullPath,
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
        "transactionId" : window.parent.cetransactionId,
        "applicationId" : "HDFC",
        "applicationDescription" : "HDFC pvt ltd",
        "componentId" : "104",
        "featureId" : "NA",
        "transactionStartDate" : time,
        "transactionEndDate" : "NA",
        "transactionState" : "Download Successful"
      }
      console.log(reqData);
      main.sendLogs(reqData,$rootScope.config).success(function (response) {
        console.log(response);
      }).error(function (err) {
        console.log(err);
      })
    } //sending Download File logs

    $scope.initializeFirebase = function () {
      util.displayLoading($scope.libraryContainer);
      let isInitializing = true;// to show loading only once while initializing
      // $scope.ngFireDBVideosRef = $rootScope.firebaseApp.database().ref('videos');
      $scope.ngFireDBVideosRef = $rootScope.fbAppDBRef.child('videos');
      $scope.ngFireStorageRef = $rootScope.firebaseApp.storage().ref();
      $scope.devices = $firebaseObject($scope.ngFireDBVideosRef);
      $scope.devices.$loaded(function (data) {
        util.doneLoading($scope.libraryContainer);
        $scope.availableDevicesTree = data;
        if($scope.availableDevicesTree) {
          let deviceTypesTemp = [{"name":'Select Type'}];
          // To iterate the key/value pairs of the object, use angular.forEach()
          angular.forEach(data, function(value, key) {
            deviceTypesTemp.push({
              "name": key,
              "value": key
            });
          });
          $scope.deviceTypes = deviceTypesTemp;
          $scope.selectedType = $scope.deviceTypes[0];
        }
      });
    };
    $scope.initializeFirebase();

    $scope.elmSelectType = angular.element('.indexes select.type');
    $scope.elmSelectBrand = angular.element('.indexes select.brand');
    $scope.elmSelectModel = angular.element('.indexes select.model');
    $scope.selectSearchChange = function (which) {
      $scope.$resultsRow.slideUp();
      switch (which) {
        case "type":
          $scope.deviceModels = [{"name":'Select Model'}];
          $scope.selectedModel = $scope.deviceModels[0];
          $scope.deviceBrands = [{"name":'Select Brand'}];
          $scope.selectedBrand = $scope.deviceBrands[0];
          if ($scope.selectedType.value) {
            if($scope.availableDevicesTree) {
              let brandsObj = $scope.availableDevicesTree[$scope.selectedType.value];
              let deviceBrandsTemp = [{"name":'Select Brand'}];
              // To iterate the key/value pairs of the object, use angular.forEach()
              angular.forEach(brandsObj, function(value, key) {
                deviceBrandsTemp.push({
                  "name": key,
                  "value": key
                });
              });
              $scope.deviceBrands = deviceBrandsTemp;
              $scope.selectedBrand = $scope.deviceBrands[0];
            }
          }
          break;
        case "brand":
          $scope.deviceModels = [{"name":'Select Model'}];
          $scope.selectedModel = $scope.deviceModels[0];
          if ($scope.selectedBrand.value) {
            if($scope.availableDevicesTree) {
              let modelsObj = $scope.availableDevicesTree[$scope.selectedType.value][$scope.selectedBrand.value];
              let deviceModelsTemp = [{"name":'Select Model'}];
              // To iterate the key/value pairs of the object, use angular.forEach()
              angular.forEach(modelsObj, function(value, key) {
                deviceModelsTemp.push({
                  "name": key,
                  "value": key
                });
              });
              $scope.deviceModels = deviceModelsTemp;
              $scope.selectedModel = $scope.deviceModels[0];
            }
          }
          break;
        case "model":

          break;
      }
    };
    $scope.openViewWindow = function (filename) {
      $scope.fileObjForView={};
      for (let i = 0; i < $scope.resources.length; i++) {
        if ($scope.resources[i].name == filename) {
          $scope.fileObjForView = $scope.resources[i];
        }
      }
      var modalInstance = $uibModal.open({
        templateUrl: 'viewFile.html',
        controller: 'viewFileController',
        resolve: {
          items: function () {
            return $scope.fileObjForView;
         }
        }
      })
    }
  }
});

angular.module('ImagineApp').controller('viewFileController',function ($scope, $uibModal, $uibModalInstance, items) {
  $scope.items = items;
  $scope.cancel = function () {
    $uibModalInstance.dismiss("cancel");
  };
});
