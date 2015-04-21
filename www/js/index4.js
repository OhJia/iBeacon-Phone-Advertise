var uuid = 'DA5336AE-2042-453A-A57F-F80DD34DFCD9';
var identifier = 'jajaja';
var minor = 2000;
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
    
    cordova.plugins.locationManager.isAdvertisingAvailable()
    .then(function(isSupported){
        console.log("isSupported: " + isSupported);
    })
    .fail(console.error)
    .done();

}

//Setup this to run init when page loads
window.addEventListener('load', init, false);