//
var fullcontact = {
    // https://www.fullcontact.com/developer/docs/#response-codes
    responseCodes : {
        200 : 'Look up successful.',
        202 : 'Your request is currently being processed. Check back in a few hours.',
        400 : 'Your request was malformed.',
        403 : 'Your API key is invalid, missing, or has exceeded its quota.',
        404 : 'This identity was searched for in the past 24 hours and nothing was found.',
        405 : 'You have queried the API with an unsupported HTTP method.',
        410 : 'This resource cannot be found. ',
        422 : 'Invalid or missing API query parameter.',
        500 : 'There was an unexpected error on our server.',
        503 : 'There is a transient downstream error condition.'
    },
    twitterURL : "",
    emailURL   : "",
    phoneURL   : "",
    apiKey     : "",
    status     : {},
    //
    init : function (tURL, eURL, pURL, key) {
        fullcontact.twitterURL = tURL;
        fullcontact.emailURL   = eURL;
        fullcontact.phoneURL   = pURL;
        fullcontact.apiKey     = key;
    },
    //
    get : function (contact, callback) {
        console.log('fullcontact.get():' + contact);
        // 
        var url    = '';
        var rgex1  = /^@/; // if the string starts with an @
        var rgex2  = /@/;  // if the string contains a @
        //
        if (contact.match(rgex1)) {
            //url = 'https://api.fullcontact.com/v2/person.json?twitter=' + contact + '&apiKey=9ca495c39270a54d'
            url = fullcontact.twitterURL + contact + '&apiKey=' + fullcontact.apiKey;
        } else if (contact.match(rgex2)) {
            //url = 'https://api.fullcontact.com/v2/person.json?email=' + contact + '&apiKey=9ca495c39270a54d'
            url = fullcontact.emailURL + contact + '&apiKey=' + fullcontact.apiKey;
        } else if (contact.length > 0) {
            url = fullcontact.phoneURL + contact + '&apiKey=' + fullcontact.apiKey;
        }
        console.log('fullcontact.url:' + url);
        //return;
        $.get(url, function(data) {
            //
            console.log('fullcontact.status:' + status);
            if (data.status in fullcontact.responseCodes) {
                fullcontact.status.code    = data.status;
                fullcontact.status.message = fullcontact.responseCodes[data.status];
            } else {
                fullcontact.status.code    =  1;
                fullcontact.status.message = "We don't know what happened.";
            }
            callback(fullcontact.status, data);
        });
    }
};
