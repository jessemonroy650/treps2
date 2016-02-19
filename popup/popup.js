/*
    Date: 2016-02-19
*/
var popup = {
    visible : 0,    // This indicate the pop is not visible.
    timeout : 7000,
    id      : 'popup',
    button  : 'toggle',
    once    : 1,
    init : function (parms) {
        //console.log("popup.init:",JSON.stringify(parms));
        if (parms) {
            popup.timeout = (parms.timeout) ? parms.timeout : 7000;
            popup.id      = (parms.id)      ? parms.id      : 'popup';
            popup.button  = (parms.button)  ? parms.button  : 'toggle';
        }
        document.getElementById(popup.button).addEventListener('click', function() {
            popup.toggle();
        });
    },
    toggle : function () {
        console.log('popup.toggle:', popup.visible);
        if (popup.visible === 0) {
            document.getElementById(popup.id).style.opacity = 1;
            document.getElementById(popup.id).style.visibility = 'visible';
            console.log('opacity:1');
            popup.visible = 1;
            popup.once    = 1;
        } else {
            // Without this, the popup 'popup.id' and does not 'fade'.
            document.getElementById(popup.id).style.transitionProperty = 'all';
            // This actually trigers the fade.
            document.getElementById(popup.id).style.opacity = 0;
            // Without this, the popup invisibly blocks what is underneath
            document.getElementById(popup.id).style.visibility = 'collapse';
            console.log('opacity:0');
            popup.visible = 0;
            popup.once    = 0;
        }
        if (popup.timeout > 0) {
            if (popup.once > 0) {
                setTimeout(popup.toggle, popup.timeout);
            }
        }
    },
    message : function (obj) {
        if ('color' in obj) {
            document.getElementById(popup.id).style.color = obj.color;
        }
        if ('backgroundColor' in obj) {
            document.getElementById(popup.id).style.backgroundColor = obj.backgroundColor;
        }
        document.getElementById(popup.id).innerHTML = obj.message;
    },
    fire : function (obj) {
        popup.message(obj);
        popup.toggle();        
    },
    extingish : function (obj, timeout) {
        popup.message(obj);
        setTimeout(function () {
            popup.toggle();
        }, timeout);
    }
};

//console.log('togglePopup() loaded.');
