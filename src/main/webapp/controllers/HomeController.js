angular.module('ImagineApp')
.controller('HomeController', function ($rootScope, $scope, $localStorage, $state, main) {
  $rootScope.pageTitle = 'Home | ' + $rootScope.appTitle;
  $rootScope.showNavbarIcons = false;
  if ($rootScope.user == undefined) {
    $rootScope.user = $localStorage.engineerDetail;
    $rootScope.fbAppDBRef = $rootScope.firebaseApp.database().ref($rootScope.user.groupName);
    $rootScope.fbAppStorageRef = $rootScope.firebaseApp.storage().ref($rootScope.user.groupName);
  }
  if (!$rootScope.user) {
    $rootScope.goToState('login');
  } else {
    main.checkforCall($rootScope.user.loginId,$rootScope.fbAppDBRef);
  }
});
