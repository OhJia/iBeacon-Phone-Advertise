// var uuid = 'DA5336AE-2042-453A-A57F-F80DD34DFCD9';
// var identifier = 'jajaja';
// var minor = 2000;
// var major = 5;

var uuid = 'DA5336AE-2042-453A-A57F-F80DD34DFCD9';
var identifier = 'Jason';
var minor = 2001;
var major = 5;
var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor);




function init(){
    //This will run when the page is ready
    // alert("init");     
    //Run device ready when phonegap is loaded
    document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
    alert('device ready');
    
    var logToDom = function (message) {
        var e = document.createElement('label');
        e.innerText = message;

        var br = document.createElement('br');
        var br2 = document.createElement('br');
        document.body.appendChild(e);
        document.body.appendChild(br);
        document.body.appendChild(br2);

        window.scrollTo(0, window.document.height);
    };

    var delegate = new cordova.plugins.locationManager.Delegate();

    delegate.didDetermineStateForRegion = function (pluginResult) {

        logToDom('[DOM] didDetermineStateForRegion: ' + JSON.stringify(pluginResult));

        cordova.plugins.locationManager.appendToDeviceLog('[DOM] didDetermineStateForRegion: '
            + JSON.stringify(pluginResult));
    };

    delegate.didStartMonitoringForRegion = function (pluginResult) {
        console.log('didStartMonitoringForRegion:', pluginResult);

        logToDom('didStartMonitoringForRegion:' + JSON.stringify(pluginResult));
    };

    delegate.didRangeBeaconsInRegion = function (pluginResult) {
        logToDom('[DOM] didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult));
    };



    cordova.plugins.locationManager.setDelegate(delegate);

    // required in iOS 8+
    cordova.plugins.locationManager.requestWhenInUseAuthorization(); 
    // or cordova.plugins.locationManager.requestAlwaysAuthorization()

    cordova.plugins.locationManager.startMonitoringForRegion(beaconRegion)
        .fail(console.error)
        .done();


}

//Setup this to run init when page loads
window.addEventListener('load', init, false);