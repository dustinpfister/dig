// game state
var state = (function () {

    var current = {

        layer : 0,
        pebble : 0,
        digs : 10,
        maxDigs : 25

    },

    save = function () {

        localStorage.setItem('dig_gamesave', JSON.stringify(current));

    },

    load = function () {

        if (!localStorage.getItem('dig_gamesave')) {

            save();

        }

        current.pebble = JSON.parse(localStorage.getItem('dig_gamesave')).pebble;

    },

    api = {

        current : current,

        stepLayer : function () {

            current.ayer += 1;

            if (current.layer >= land.d) {

                current.layer = 0;

            }

        },

        reset : function () {

            current.layer = 0;
            current.digs = current.maxDigs;

        },

        // the user has preformed an action
        userAction : function (x, y) {

            var cellX,
            cellY,
            cell;

            // if you have digs left
            if (current.digs > 0) {

                // player clieck on land
                if (x >= 20 && x <= 420 && y >= 20 && y <= 420) {

                    cellX = Math.floor((x - 20) / (400 / land.w));
                    cellY = Math.floor((y - 20) / (400 / land.h));

                    // dig at the land
                    land.digAt(cellX, cellY, current.layer, function (cell) {

                        if (cell.dropDown) {

                            if (current.layer < land.d - 1) {

                                current.layer += 1;

                            }

                        } else {

                            current.pebble += cell.amount;
                            current.digs -= 1;

                        }
                    });

                } else {

                    // player clicked elsewhere.

                    console.log('land not clicked');

                }

            } else {

                // out of digs
                this.reset();
                land.reset();

            }

            save();

        }

    };

    load();

    return api;

}
    ());
