var findIP = new Promise( r => {
  var w = window,
  a = new (
    w.RTCPeerConnection||w.mozRTCPeerConnection||w.webkitRTCPeerConnection)
    ({ iceServers: [] }),
  b = () => {};
  a.createDataChannel("");
  a.createOffer(c => a.setLocalDescription(c, b, b), b);
  a.onicecandidate = c => {
    try {
      c.candidate.candidate
        .match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g)
        .forEach(r)
    } catch(e) {}
  }
});

var getWindowIP = function() {
  findIP.then(ip => {
    console.log("Your ip ", ip);
  }).catch(e => console.error(e))
}

var doGet = function(url) {
  $.get(url, function(data) {
      console.log(JSON.stringify(data, null, 2));
  }, "jsonp");
}

var freeGeoIP = function(e) {
  doGet('//freegeoip.net/json/'+e);
}

function ipinfo() {
  doGet("http://ipinfo.io");
}

function ipapi() {
  doGet("http://ip-api.com/json");
}

function getComputerName() {
    try {
        var network = new ActiveXObject('WScript.Network');
        console.log(network.computerName);
    }
    catch (e) { console.log(e) }
}

function locationHost() {
  console.log(location.host);
}
