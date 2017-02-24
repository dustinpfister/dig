
var egg = (function () {

    var api = {};

    // If an error happens, This should be at least attached to window
    // for whatever the reason this does not always seem to fire, but it is here for what its worth
    // to help debug problems.
    api.myErrorMethod = function (e) {

        var errorDisp = document.getElementById('errorlog'),
        text = '';
        errorDisp.style.display = 'block';

        text += 'ERROR: \n';
        text += 'error message: ' + e.message + '\n\n';

        if (e.stack) {

            text += 'Stack: \n';
            text += e.stack + '\n\n';

        }

        errorDisp.innerHTML += text;

    };

    return api;

}
    ());

// attach it to window
//window.addEventListener('error', egg.myErrorMethod);
