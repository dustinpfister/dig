// game state
var state = (function () {

    var current = {

        layer : 0,
        pebble : 0,
        digs : 10,
        maxDigs : 10,
        landLevel : 1

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

        var saveData;

        if (!localStorage.getItem('dig_gamesave')) {

            save();

        }

        try {

            saveData = JSON.parse(localStorage.getItem('dig_gamesave'));

            current.pebble = saveData.pebble;
            current.landLevel = saveData.landLevel;
            //current.landLevel = 100;
            current.maxDigs = saveData.maxDigs;
            current.digs = current.maxDigs;

        } catch (e) {

            egg.myErrorMethod(new Error('error loading JSON data'));

        }

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

        // yes this is where I am setting the level
        levelUp : function () {

            var rawLevel = Math.log(current.pebble) / Math.log(4),
            newLevel = Math.floor(rawLevel);

            console.log('I am the level up method.');
            console.log('current level: ' + current.landLevel);
            console.log('new level: ' + newLevel);

            if (newLevel > current.landLevel) {

                console.log('level up!');
                current.landLevel = newLevel;

            }

            current.maxDigs = 10 + 5 * (current.landLevel - 1);

            // auto save
            save();

        },

        /*
        stepLayer : function () {

        current.layer += 1;

        if (current.layer >= land.d) {

        current.layer = 0;

        }

        },
         */

        reset : function () {

            current.layer = 0;
            current.digs = current.maxDigs;
            land.setLevel(current.landLevel);
            land.reset();

        },

        // the user has preformed an action
        //userAction : function (x, y, done) {
        userAction : function (cellX, cellY, done) {

            var cellX,
            cellY,
            cell;

            done = done || function () {};

            // if you have digs left
            if (current.digs > 0) {

                // player clicked on land
                //if (x >= 0 && x <= 384 && y >= 0 && y <= 384) {

                //cellX = Math.floor((x - 0) / (384 / land.w));
                //cellY = Math.floor((y - 0) / (384 / land.h));

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

                //} else {

                // player clicked elsewhere.

                ////    log('land not clicked');
                //    done({});

                // }

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
