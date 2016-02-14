//
//
//
function onSuccessContact(contacts) {
    //alert('Found ' + contacts.length + ' contacts.');
    document.getElementById('contactInformation').innerHTML = JSON.stringify(contacts, null, 4);
};

function onErrorContact(contactError) {
    alert('onError!');
};

function pgGetContactInfo() {

    // find all contacts with 'me' in any name field
    var options      = new ContactFindOptions();
        options.filter   = "";
        options.multiple = true;
        //options.desiredFields = [navigator.contacts.fieldType.id];
        var fields       = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
        navigator.contacts.find(fields, onSuccessContact, onErrorContact, options);
};
