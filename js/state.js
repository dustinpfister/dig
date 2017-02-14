// game state
var state = (function () {

    var api = {

        currentLayer : 0,
        pebble : 0,
        digs : 10,
        stepLayer : function () {

            this.currentLayer += 1;

            if (this.currentLayer >= land.d) {

                this.currentLayer = 0;

            }

        },

        // the user has preformed an action
        userAction : function (x, y) {

            var cellX,
            cellY,
            cell,
            self = this;

            // if you have digs left
            if (self.digs > 0) {

                // player clieck on land
                if (x >= 20 && x <= 420 && y >= 20 && y <= 420) {

                    cellX = Math.floor((x - 20) / (400 / land.w));
                    cellY = Math.floor((y - 20) / (400 / land.h));

                    // dig at the land
                    land.digAt(cellX, cellY, self.currentLayer, function (cell) {

                        if (cell.dropDown) {

                            if (self.currentLayer < land.d - 1) {

                                self.currentLayer += 1;

                            }

                        } else {

                            self.pebble += cell.amount;
                            self.digs -= 1;

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
