//
//  Unit Data hooks
//
var firebase = {
    myInfoRef  : {},
    myTrepsRef : {},
    init : function (userURL, trepsURL, settingCallback) {
        // Setup DB connections.
        firebase.myInfoRef  = new Firebase(userURL);
        firebase.myTrepsRef = new Firebase(trepsURL);
        // Get userValue on startup & when updated.
        firebase.myInfoRef.on('value', function(snapshot) {
            var info = snapshot.val();
            settingCallback(info);
        });
    },
    setUser : function (obj) {
        firebase.myInfoRef.set(obj);
    },
    getList : function (ref, name, callback) {
        var storage = [];
        ref.orderByKey().once("value", function (data) {
            var d = data.val();
            var x = "";
            // Strip off the "push" key and return a linear array
            for (x in d) {
                //console.log(d[x]);
                storage.push(d[x])
            }
            callback(storage);
        });
    }
};







