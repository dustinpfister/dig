// game state
var state = (function () {

    var current = {

        layer : 0,
        pebble : 0,
        digs : 10,
        maxDigs : 10,
        landLevel : 3

    },

    log = function (mess) {

        if (typeof mess === "string") {

            console.log('state.js: ' + mess);

        } else {

            console.log(mess);

        }

    },

    save = function () {

        localStorage.setItem('dig_gamesave', JSON.stringify(current));

    },

    load = function () {

        if (!localStorage.getItem('dig_gamesave')) {

            save();

        }

        current.pebble = JSON.parse(localStorage.getItem('dig_gamesave')).pebble;

        // reset with current values
        api.reset();

    },

    api = {

        current : current,

        // call this from the console if you want to start over
        startOver : function () {

            current = {

                layer : 0,
                pebble : 0,
                digs : 5,
                maxDigs : 5,
                landLevel : 1

            }
            save();

        },

        stepLayer : function () {

            current.ayer += 1;

            if (current.layer >= land.d) {

                current.layer = 0;

            }

        },

        reset : function () {

            current.layer = 0;
            current.digs = current.maxDigs;
            land.setLevel(current.landLevel);
            land.reset();

        },

        // the user has preformed an action
        userAction : function (x, y, done) {

            var cellX,
            cellY,
            cell;

            done = done || function () {};

            // if you have digs left
            if (current.digs > 0) {

                // player clicked on land
                if (x >= 0 && x <= 384 && y >= 0 && y <= 384) {

                    cellX = Math.floor((x - 0) / (384 / land.w));
                    cellY = Math.floor((y - 0) / (384 / land.h));

                    // dig at the land
                    land.digAt(cellX, cellY, current.layer, function (tileStatus) {

                        var dropEvent = false,
                        burst = false;
                        if (tileStatus.dropDown) {

                            if (current.layer < land.d - 1) {

                                dropEvent = true;
                                current.layer += 1;

                            }

                        } else {

                            if (tileStatus.hp === 0) {

                                burst = true;

                                current.pebble += tileStatus.amount;

                            }
                            current.digs -= 1;

                        }

                        //done(cellX, cellY);
                        done({

                            active : true,
                            tileX : cellX,
                            tileY : cellY,
                            dropEvent : dropEvent,
                            burst : burst,
                            tileStatus : tileStatus

                        });

                    });

                } else {

                    // player clicked elsewhere.

                    log('land not clicked');
                    done({});

                }

            } else {

                // out of digs
                this.reset();
                land.reset();
                done({});

            }

            save();

        }

    };

    load();

    return api;

}
    ());
