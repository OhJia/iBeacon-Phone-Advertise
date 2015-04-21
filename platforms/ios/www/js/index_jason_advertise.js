var uuid = 'DA5336AE-2042-453A-A57F-F80DD34DFCD9';
var identifier = 'jason';
var minor = 2001;
var major = 5;
// what is the minor and major for?

function init(){
    //This will run when the page is ready
    // alert("init");     
    //Run device ready when phonegap is loaded
    document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
    alert('device ready');
    
// cordova.plugins.locationManager.isAdvertisingAvailable()
//     .then(function(isSupported){
//         console.log("isSupported: " + isSupported);
//     })
//     .fail(console.error)
//     .done();

    var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor);
    // console.log("beaconRegion");
    // document.body.innerHTML = "Hi";

    // The Delegate is optional
    var delegate = new cordova.plugins.locationManager.Delegate();

    cordova.plugins.locationManager.requestWhenInUseAuthorization();

    // Event when advertising starts (there may be a short delay after the request)
    // The property 'region' provides details of the broadcasting Beacon
    delegate.peripheralManagerDidStartAdvertising = function(pluginResult) {
        console.log('peripheralManagerDidStartAdvertising: '+ JSON.stringify(pluginResult.region));
        var e = document.createElementById('beacon');
        e.innerText = JSON.stringify(pluginResult.region);
    };
    // Event when bluetooth transmission state changes 
    // If 'state' is not set to BluetoothManagerStatePoweredOn when advertising cannot start
    // delegate.peripheralManagerDidUpdateState = function(pluginResult) {
    //     console.log('peripheralManagerDidUpdateState: '+ pluginResult.state);
    // };

    cordova.plugins.locationManager.setDelegate(delegate);

    // Verify the platform supports transmitting as a beacon
    cordova.plugins.locationManager.isAdvertisingAvailable()
    .then(function(isSupported){

        if (isSupported) {
            cordova.plugins.locationManager.startAdvertising(beaconRegion)
                .fail(console.error)
                .done();
        } else {
            console.log("Advertising not supported");
        }
    })
    .fail(console.error)
    .done();

}

//Setup this to run init when page loads
window.addEventListener('load', init, false);