// game state
var state = (function () {

    var current = {

        layer : 0,
        pebble : 0,
        digs : 10,
        maxDigs : 10

    },

    api = {

	    current: current,
	
        //currentLayer : 0,
        //pebble : 0,
        //digs : 10,
        stepLayer : function () {

            current.ayer += 1;

            if (current.layer >= land.d) {

                current.layer = 0;

            }

        },

        // the user has preformed an action
        userAction : function (x, y) {

            var cellX,
            cellY,
            cell,
            self = this;

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

            }

        }

    };

    return api;

}
    ());
