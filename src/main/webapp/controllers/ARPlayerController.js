angular.module('ImagineApp')
.controller('ARPlayerController', function ($rootScope, $scope) {
  $rootScope.pageTitle = 'AR Player | ' + $rootScope.appTitle;
  $rootScope.showNavbarIcons = true;
  if ($rootScope.user == undefined) {
    $rootScope.user = $localStorage.engineerDetail;
    $rootScope.fbAppDBRef = $rootScope.firebaseApp.database().ref($rootScope.user.groupName);
    $rootScope.fbAppStorageRef = $rootScope.firebaseApp.storage().ref($rootScope.user.groupName);
  }
  if(!$rootScope.user){
    $rootScope.goToState("login");
  } else {
  }
});
