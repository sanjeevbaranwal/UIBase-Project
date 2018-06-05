angular.module('ImagineApp')
.service('main',['$http','$state', function ($http,$state) {
  this.sendLogs = function (logData,config) {
    let url = "http://" + config.server.ip + ":" + config.server.port + "/" + config.servicesRoot + "/service/loginDetails/logUserActivityDetails";
    return $http.post(url,JSON.stringify(logData));
  }

  this.checkforCall = function (loginId,fbAppDBRef) {
    let messagesCheck = fbAppDBRef.child('messages/' + loginId + '_chatID');
    messagesCheck.off();
    messagesCheck.on('child_added',function (snapshot) {
      if (loginId != undefined) {
        let msgType = snapshot.val().type;
        if (msgType == 3) {
          $state.go('messages');
        }
      }
    })
  }

  this.availableExpert = function (connectDirectly,config) {
    console.log(connectDirectly);
    let url = "http://" + config.server.ip + ":" + config.server.port + "/" + config.servicesRoot + "/service/availability/fetchAvailableExpert";
    return $http.post(url,JSON.stringify(connectDirectly));
  }
}]);
