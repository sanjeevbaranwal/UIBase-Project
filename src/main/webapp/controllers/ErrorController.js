angular.module('ImagineApp')
.controller('ErrorController', function ($rootScope, $scope) {
  $rootScope.pageTitle = '404 | ' + $rootScope.appTitle;
  if ($rootScope.user == undefined) {
    $rootScope.user = $localStorage.engineerDetail;
  }
  if(!$rootScope.user){
    $rootScope.goToState("login");
  } else {
  }
});
