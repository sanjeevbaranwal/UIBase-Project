angular.module('ImagineApp')
.service('logs',['$http' , function ($http) {
  this.sendLogs = function (logData) {
    let url = "http://52.25.206.225:80/GSMCServices/service/loginDetails/logUserActivityDetails";
    return $http.post(url,JSON.stringify(logData));
  }
}]);
