/*
    Date: 2016-02-13
*/
var app = {
    self      : {},
    userEmail : "",
    //
    onDeviceReady : function () {
        //alert("device ready.");
        console.log("device ready.");
        if (device.platform === "iOS") {
            alert("got iOS.");
            // hide Exit button. They don't have one on iOS devices.
            document.getElementById('exitApp').classList.add("hidden");
            // deals with post-iOS-7 change that covers the status bar
            document.body.style.marginTop = "20px";
            // hide the Splash Screen for iOS only
            navigator.splashscreen.hide();
        } else if (device.platform == 'Android') {
            // Get rid of 300ms delay 
            document.addEventListener('DOMContentLoaded', function() {
                FastClick.attach(document.body);
            }, false);
            // Trap the button click to exit the app
            document.getElementById('exitApp').addEventListener('click', function() {
                navigator.app.exitApp();
            });
        } else if (device.platform == 'browser') {
            // hide Exit button. They don't need it for the browser.
            document.getElementById('exitApp').classList.add("hidden");
        }
        if (device.platform != 'browser') {
            app.phonegapStuff();
        }
        // Setup the buttons
        buttons.init();
        // This is in the popup message
        //document.getElementById('timeouttime').innerHTML = popup.timeout/1000;
        // set the popup button
        //popup.init();
        popup.init({'timeout':'0'});
        // 
        popup.fire({'message':'<p>&nbsp;<p>Fetching user data.','color':'green','minShowTime':2000});
        // initalize our network parameters and connections
        fullcontact.init(twitterURL, emailURL, phoneURL, fullContactKey);
        firebase.init(userInfoURL, trepsInfoURL, initUserData);
        // Initialize the account, if not setup.
        setTimeout(function () {
            if (app.userEmail === "") {
                firebase.setUser({'realname':'Jesse Monroy',
                    'email':'jesse650@gmail.com',
                    'twitterhandle':'@jessemonroy650'
                });
            }
        }, drTimeout * 3);
    },
    init : function () {
        var avail = phonegapData.storageAvailable('localStorage')
        app.displayInfo('#storeavailable', avail);
    },
    //
    currentUser : function (info) {
        app.userEmail = info.email;
        app.displayInfo('#realname', info.realname);
        app.displayInfo('#email', info.email);
        app.displayInfo('#twitterhandle', info.twitterhandle);  
    },
    //
    displayInfo : function (name, value) {
        $(name).text(value);
    },
    //
    displayListItem : function (url, title) {
        $('#treps').append('<a href="' + url + '">' + title + '</a><br>');
    },
    //
    shortMessage : function (message) {
        $('#image').html(message);
    },
    phonegapStuff : function () {
        // Requires the 'device' plugin
        return;
        // A bug in Phonegap does not allow us to use the `id=cordova`
        document.getElementById('acordova').innerHTML = device.cordova;
        document.getElementById('model').innerHTML = device.model;
        document.getElementById('platform').innerHTML = device.platform;
        document.getElementById('uuid').innerHTML = device.uuid;
        document.getElementById('version').innerHTML = device.version;
    }
};

function initUserData(data) {
    popup.extingish({'message':'<p>&nbsp;<p>Got it.','color':'black'}, 2000);
    app.currentUser(data);
};


//
// Firebase DB Connections.
//
var userInfoURL    = 'https://treps.firebaseio.com/user/user-info';
var trepsInfoURL   = 'https://treps.firebaseio.com/user/treps-list';
// Fullcontact API (base) calls.
var twitterURL     = 'https://api.fullcontact.com/v2/person.json?twitter=';
var emailURL       = 'https://api.fullcontact.com/v2/person.json?email=';
var phoneURL       = 'https://api.fullcontact.com/v2/person.json?phone=+';
var fullContactKey = '9ca495c39270a54d';
//
var drTimeout = 2000;

//
//    Entry Point
//
document.addEventListener('DOMContentLoaded', function() {
    // Check if we are using a webbrowser.
    var v = navigator.appVersion.match('X11');
    //
    // This is truthy, not absolute.
    if ( v == 'X11' ) {
        //document.getElementById('isbrowser').innerHTML = v;
        // This needs to be global so other modules can see it.
        device = {platform:'browser'};
        // Force the function.
        app.onDeviceReady();
    } else {
        //document.getElementById('isbrowser').innerHTML = 'not X11';
        // Wait for PhoneGap to load
        document.addEventListener("deviceready", app.onDeviceReady, false);
    }
});

