//
//
//
function pgGetDeviceInfo() {
    document.getElementById('deviceInformation').innerHTML = pgDeviceInfo();
};

function pgDeviceInfo() {
    return 'Version: ' + device.cordova + '<br />' +
            'Model: ' + device.model + '<br />' +
            'Platform: ' + device.platform + '<br />' +
            'UUID: ' + device.uuid + '<br />' +
            'Platform Version: ' + device.version;
};
