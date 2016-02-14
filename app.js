/*
    Date: 2016-02-13
*/
var app = {
    self      : {},
    userEmail : "",
    //
    onDeviceReady : function () {
        //alert("device ready.");
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
                app.exit();
            });
        } else if (device.platform == 'browser') {
            // hide Exit button. They don't need it for the browser.
            document.getElementById('exitApp').classList.add("hidden");
        }
        buttons.init();
        fullcontact.init(twitterURL, emailURL, phoneURL, fullContactKey);
        firebase.init(userInfoURL, trepsInfoURL, app.currentUser);
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
    //
    exit : function () {
        console.log('Called app.exit()');
        if ('app' in navigator) {
            navigator.app.exitApp();
        } else {
            alert('exit button hit.');
        }
    }
};
// Firebase DB Connections.
var userInfoURL    = 'https://treps.firebaseio.com/user/user-info';
var trepsInfoURL   = 'https://treps.firebaseio.com/user/treps-list';
// Fullcontact API (base) calls.
var twitterURL     = 'https://api.fullcontact.com/v2/person.json?twitter=';
var emailURL       = 'https://api.fullcontact.com/v2/person.json?email=';
var phoneURL       = 'https://api.fullcontact.com/v2/person.json?phone=+';
var fullContactKey = '9ca495c39270a54d';
//
// Wait for PhoneGap to load
document.addEventListener("deviceready", app.onDeviceReady, false);

var device = {'platform':'browser'};
var drTimeout = 2000;

setTimeout(app.onDeviceReady, drTimeout);
