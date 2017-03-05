
var egg = (function () {

    var api = function (command) {

        console.log('********** egg.js for DIG **********');

        switch (command) {

        case 'westside':

            if (app.state.current === 'dig_run') {

                // set hide method to all-in-left-top-zero
                land.currentHideMethod = 'all-in-left-top-zero';

                // reset to current level
                land.setLevel(state.current.landLevel);
                land.reset();

                // toggle show pebble cheat
                DIG.showPebble(true);

                // regen
                DIG.reGen();

            } else {
                console.log('I need 2b called durring da dig.run state fool, yall tripin.');

            }

            break;

        case 'show':

            console.log('Show pebble toggled');

            // toggle show pebble cheat
            DIG.showPebble();

            break;

        default:

            console.log('Take a look at egg.js at the repo, here:');
            console.log('https://raw.githubusercontent.com/dustinpfister/dig/master/js/egg.js');

            break

        }

        return '********************';

    };

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

// used for west side method
land.addHideMethod({

    name : 'all-in-left-top-zero',

    method : function () {

        console.log('I am the all-in-left-top-zero hide method');

        // set total, and amount of cell 0 to the amount of total pebble for the stack
        this.cells[0].total = this.totalPebble;
        this.cells[0].amount = this.cells[0].total;

    }

});

// attach it to window
//window.addEventListener('error', egg.myErrorMethod);
