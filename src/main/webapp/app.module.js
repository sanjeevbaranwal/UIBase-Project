const ImagineApp = angular.module('ImagineApp',['ui.router','firebase','ngStorage','ui.bootstrap', 'ngFileUpload', 'ngAnimate']);
ImagineApp.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.when('', 'login');
  $urlRouterProvider.otherwise('error');
  $stateProvider.state('error', {
    url: '/error',
    views : {
      "content" : {
        templateUrl : 'templates/404.html',
        controller : 'ErrorController'
      }
    }
  })
  .state('login', {
    url: '/login',
    views : {
      "content" : {
        templateUrl : 'templates/login.html',
        controller : 'LoginController'
      }
    }
  })
  .state('home', {
    url: '/home',
    views : {
      "content" : {
        templateUrl : 'templates/home.html',
        controller : 'HomeController'
      }
    }
  })
  .state('messages', {
    url: '/messages/:expertID',
    views : {
      "content" : {
        templateUrl : 'templates/messages.html',
        controller : 'MessagesController'
      }
    }
  })
  .state('remoteHelp', {
    url: '/remoteHelp/:expertID',
    views : {
      "content" : {
        templateUrl : 'templates/messages.html',
        controller : 'MessagesController'
      }
    }
  })
  .state('library', {
    url: '/library',
    views : {
      "content" : {
        templateUrl : 'templates/library.html',
        controller : 'LibraryController'
      }
    }
  })
  .state('share-sop', {
    url: '/shareSOP',
    views : {
      "content" : {
        templateUrl : 'templates/shareSOP.html',
        controller : 'shareSOPController'
      }
    }
  })
  .state('ar-player', {
    url: '/ar-player',
    views : {
      "content" : {
        templateUrl : 'templates/ar-player.html',
        controller : 'ARPlayerController'
      }
    }
  })
  .state('v-sme', {
    url: '/v-sme',
    views : {
      "content" : {
        templateUrl : 'templates/v-sme.html',
        controller : 'VirtualSMEController'
      }
    }
  })
}).run(function ($rootScope, $location, $state, $localStorage) {
  $rootScope.appTitle = "Imagine";
  $rootScope.redirectRouteTo = function (route) {
    $location.path(route);
  };
  $rootScope.goToState = function (state) {
    $state.go(state);
  };

  $rootScope.configProd = {
    "appVersion" : "2.0",
    "appState" : "prod v",
    "server": {
      "ip": "52.200.80.202",
      "port": "8080"
    },
    "servicesRoot" : "GSMCServices",
    "firebaseStorageURL" : "gs://demogsmc-fieldassist.appspot.com/gsmc/",
    "firebaseConfig" : {
    	"apiKey": "AIzaSyDozrFhKLdgeJEcfd-JR8m0CMDS9CzVPKQ",
        "authDomain": "fir-devtest-eda42.firebaseapp.com",
        "databaseURL": "https://fir-devtest-eda42.firebaseio.com",
        "projectId": "fir-devtest-eda42",
        "storageBucket": "fir-devtest-eda42.appspot.com",
        "messagingSenderId": "658391973583"
    }
  }

  $rootScope.config = {
    "appVersion" : "2.4",
    "appState" : "dev v",
    "server": {
      "ip": "13.126.78.167",
      "port": "8080"
    },
    "servicesRoot" : "HDFCServices",
    "firebaseStorageURL" : "gs://devhdfc-c0ded.appspot.com/",
    "firebaseConfig" : {    	
    	"apiKey": "AIzaSyDozrFhKLdgeJEcfd-JR8m0CMDS9CzVPKQ",
        "authDomain": "fir-devtest-eda42.firebaseapp.com",
        "databaseURL": "https://fir-devtest-eda42.firebaseio.com",
        "projectId": "fir-devtest-eda42",
        "storageBucket": "fir-devtest-eda42.appspot.com",
        "messagingSenderId": "658391973583"
    }
  }

  $rootScope.firebaseApp = firebase.initializeApp($rootScope.config.firebaseConfig);
  if ($rootScope.user != undefined) {
    $rootScope.fbAppDBRef = $rootScope.firebaseApp.database().ref($rootScope.user.groupName);
    $rootScope.fbAppStorageRef = $rootScope.firebaseApp.storage().ref($rootScope.user.databaseName);
  }
});
