function firebaseSignalling (engineer, audioOut, config, fbAppDBRef) {
  let self = this;
  this.initiateWebRTC = function (expert,callDirection,callLogData) {
    if (!this.webRTC) {
      this.webRTC = new webRTCcore(engineer,expert,config,fbAppDBRef);
    }
    this.webRTC.startPeerConnection1(audioOut, expert, callDirection, callLogData);
  };
}
