var humidity = {
    service: "F000AA20-0451-4000-B000-000000000000",
    data: "F000AA21-0451-4000-B000-000000000000", // read/notify 3 bytes X : Y : Z
    configuration: "F000AA22-0451-4000-B000-000000000000", // read/write 1 byte
    period: "F000AA23-0451-4000-B000-000000000000" // read/write 1 byte Period = [Input*10]ms
};

var tagID = "8459697A-F95B-94C6-A0F1-52D788B5BF22";

var peripheralId = null;

var lastValue = null;

function init(){
    //This will run when the page is ready
    // alert("init");     
    //Run device ready when phonegap is loaded
    document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
        alert('device ready');
        ble.scan([], 1, scanSuccess, scanFailure);
}



function scanSuccess(peripheral) {
        console.log(peripheral.name);
        //document.body.innerHTML = document.innerHTML + peripheral.name;
            
        if (peripheral.id == tagID) {
            ble.stopScan(stopScanSuccess, stopScanFailure);
            console.log(peripheral);
            console.log("Connecting");
            ble.connect(peripheral.id, connectSuccess, connectFailure);
        }
}

function scanFailure(err) {
        console.log(err);
}

function stopScanSuccess() {
        console.log("Stop Scan Success");
}

function stopScanFailure() {
        console.log("Stop Scan Failure");
}

function connectSuccess(peripheral) {
        console.log("Connected");
        console.log(peripheral.id);
        
        peripheralId = peripheral.id;
        //console.log(foundPeripheral);

        // Turn it on
        var configData = new Uint8Array(1);
        configData[0] = 0x01;
        ble.write(peripheral.id, humidity.service, humidity.configuration, configData.buffer, 
        function() { console.log("Started humidity."); },function() { console.log("Start humidity error");});

        // Do a read
        //ble.read(peripheral.id, accelerometer.service, accelerometer.data, readSuccess, readFailure);

        // We want to be notified
        alert('Connected to: '+ peripheral.name);
        ble.startNotification(peripheral.id, humidity.service, humidity.data, notifySuccess, notifyError);

        //ble.startNotification(peripheral.id, button.service, button.data, onButtonData, onButtonError);

}

function connectFailure() {
        console.log("Connection Failed");
}


function notifySuccess(data) {
    //console.log(data)

    var a = new Uint8Array(data); //need
    //console.log(a.length);
    
    // log all values in the array
    // for (var i = 0; i < a.length; i++){
    //     console.log(i+": "+a[i]);
    // }

    lowerByte = a[0];
    upperByte = a[1];

    var mid = (upperByte << 8) + lowerByte;

    var temp = -46.85 + 175.72/65536 * mid;
    

    console.log('temp: '+temp+', last: '+lastValue);

    // need this code
    if (lastValue != null) {
        if (temp - lastValue > 0.1) {
            eSize += 10;
            speed += 2;
            playSound();
        } 
    }

    lastValue = temp;  

    //document.body.innerHTML = message;
}

function notifyError(err) {
    console.log(err);
}



//Setup this to run init when page loads
window.addEventListener('load', init, false);