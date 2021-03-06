//
//    UI (User Interface) stuff
//
var buttons = {
    //
    hiddenButtons : 1,
    menu          : 1,
    //
    init : function () {
        $('#lookup').keydown( function (e) {
            //console.log("keydown");
            var key = e.which;
            if (key == 13) {
                // As ASCII code for ENTER key is "13"
                $('#lookupbutton').click();
            }
        });
        //
        $('#lookupbutton').click( function () {
            var contact = $('#lookup').val();
            if (contact === "") {return;}
            // console.log(contact); return;
            fullcontact.get(contact, function (status, data) {
                var outstring = '';
                var otherInfo = {};
                otherInfo['contact'] = contact;
                //console.log(JSON.stringify(data));
                if (data.photos) {
                    outstring += '<img class=trepsImage src=' + data.photos[0].url + '><br>';
                    otherInfo['photo'] = data.photos[0].url;
                }
                if (data.contactInfo) {
                    outstring += data.contactInfo.fullName + '<br>';
                    otherInfo['fullName'] = data.contactInfo.fullName;
                }
                if (data.demographics) {
                    outstring += data.demographics.locationDeduced.deducedLocation  + '<br>';
                    otherInfo['demographics'] = data.demographics.locationDeduced.deducedLocation;
                }
                if (data.socialProfiles) {
                    for (i = 0; i < data.socialProfiles.length; i++) {
                        if (i > 0) {
                            outstring += ', ';
                        }
                        outstring += '<a href=' + data.socialProfiles[i].url + '>' + data.socialProfiles[i].typeName + '</a>';
                    }
                }
                firebase.myTrepsRef.push({'contact': contact, 'otherInfo': otherInfo});
                app.shortMessage(outstring);
            });
        });
        //
        $('#getTrep').click( function () {
            console.log('#getTrep');
            // Let user know what is going on.
            popup.fire({'message':'<p>&nbsp;<p>Getting your Treps.','color':'green','minShowTime':2000});
            firebase.getList(firebase.myTrepsRef, 'name', function (data) {
                popup.extingish({'message':'<p>&nbsp;<p>Got it.','color':'black'}, 2000);
                //console.log(JSON.stringify(data, null, 4));
                //return;
                var theList = "";
                var xyz     = "";
                for (i = 0; i < data.length; i++) {
                    xyz  = "";
                    if (data[i].otherInfo['photo']) {
                        xyz += '<img class=trepsImage src=' + data[i].otherInfo['photo'] + '><br>';
                    }
                    xyz += "c:" + data[i].contact + "<br>";
                    if (data[i].otherInfo['fullName']) {
                        xyz += "fn:" + data[i].otherInfo['fullName'] + "<br>";
                    }
                    xyz += "<hr>";
                    //console.log(xyz);
                    theList += xyz + "\n";
                }
                //
                //$('#treps').html('<pre>' + theList + '</pre>');
                $('#treps').html(theList);
            });                
        });
        //
        $('#getDeviceInfo').click( function () {
            phonegapData.getContactInfo();
            $('#contactInformation').html(phonegapData.contacts);
        });
        //
        $('#getContactInfo').click( function () {
            phonegapData.getDeviceInfo();
            $('#deviceInformation').html(phonegapData.deviceInfo);
        });
        $('#appIcon').click( function() {
            if (hiddenButtons) {
                $('#hiddenButtons').removeClass('hidden');
                hiddenButtons = 0;
            } else {
                $('#hiddenButtons').addClass('hidden');
                hiddenButtons = 1;
            }
        });
        $('#menuIcon').click( function() {
            if (menu) {
                $('#menu').removeClass('hidden');
                menu = 0;
            } else {
                $('#menu').addClass('hidden');
                menu = 1;
            }
        });
    }
};
