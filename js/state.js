// game state
var state = (function () {

    var api = {

        currentLayer: 0
        , pebble: 0
        , startTime: new Date()
        , timeLimit: 30000
        , elapsed: 0

        , stepLayer: function () {

            this.currentLayer += 1;

            if (this.currentLayer >= land.d) {

                this.currentLayer = 0;

            }

        },

        // update things based on time
        update: function () {

            var now = new Date();

            this.elapsed = now - this.startTime;

            if (this.elapsed > this.timeLimit) {

                this.elapsed = this.timeLimit;

            }

        },

        // the user has preformed an action
        userAction: function (x, y) {

            var cellX, cellY, cell, self = this;

            if (self.elapsed < self.timeLimit) {

                // player clieck on land
                if (x >= 20 && x <= 420 && y >= 20 && y <= 420) {

                    cellX = Math.floor((x - 20) / (400 / land.w));
                    cellY = Math.floor((y - 20) / (400 / land.h));

                    land.digAt(cellX, cellY, state.currentLayer, function (status) {

                        if (status.dropDown) {

                            if (self.currentLayer < land.d - 1) {

                                self.currentLayer += 1;

                            }

                        } else {

                            self.pebble += status.amount;

                        }
                    });

                // player clicked elsewhere.
                } else {

                    console.log('land not clicked');

                }

            }

        }

    };

    return api;

}());