/*
    Date: 2016-02-13
*/
var phonegapData = {
    deviceInfo : "",
    contacts   : "",
    storeAvailable : false,
    //
    getContactInfo : function () {
        var onSuccessContact = function(contacts) {
            phonegapData.contacts = JSON.stringify(contacts, null, 4);
        };
        var onErrorContact = function (err) {
            alert('getContactInfo.onErrorContact:' + err);
        };
        // find all contacts with 'me' in any name field
        var options      = new ContactFindOptions();
        options.filter   = "";
        options.multiple = true;
        //options.desiredFields = [navigator.contacts.fieldType.id];
        var fields       = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
        //
        navigator.contacts.find(fields, onSuccessContact, onErrorContact, options);
    },
    //
    getDeviceInfo : function () {
        phonegapData.deviceInfo = 'Version: ' + device.cordova + '<br />' +
            'Model: ' + device.model + '<br />' +
            'Platform: ' + device.platform + '<br />' +
            'UUID: ' + device.uuid + '<br />' +
            'Platform Version: ' + device.version;
    },
    //
    storageAvailable: function (type) {
        try {
            var storage = window[type],
			          x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            phonegapData.storeAvailable = true;
            return true;
        }
        catch(e) {
            return false;
        }
    }
};    