/*

land_hide_topdown.js

The top down pebble hide method

 */

land.addHideMethod({

    name : 'top-down',

    method : function (hideKit) {

        // locals that may become arguments
        var depth = this.d,
        startPer = .24,
        tilesPerLayer = this.w * this.h,
        totalPebble = this.totalPebble,
        basePer = .2, // base percentage of totalpebble / depth per layer

        // other locals
        layerIndex = 0,
        per,
        layerData = [],
        totalTiles = 0,
        perLayer,
        totalUsed,
        sanity = false;

        // this will be called recursively
        nextLayer = function (done) {

            var lootTiles;

            per = startPer / (depth) * (depth - layerIndex);

            lootTiles = Math.ceil(tilesPerLayer * per);

            totalTiles += lootTiles;

            layerData.push({

                layerIndex : layerIndex,
                lootTiles : lootTiles,
                per : per

            });

            if (layerIndex < depth - 1) {

                layerIndex += 1;

                nextLayer(done);

            } else {

                // we are done with all the layers
                perLayer = totalPebble / depth;
                totalUsed = 0;

                layerData.forEach(function (layerObj) {

                    var log = Math.log(layerObj.layerIndex + 1) / Math.log(depth),
                    baseAmount = Math.floor(perLayer * basePer);

                    layerObj.pebble = Math.floor(baseAmount + perLayer * log * (1 - basePer));
                    totalUsed += layerObj.pebble;

                });

                // stuff any remaining pebble into the last layer
                layerData[layerData.length - 1].pebble += totalPebble - totalUsed;

                // sanity check
                totalUsed = 0;
                layerData.forEach(function (layerObj) {

                    totalUsed += layerObj.pebble

                });

                sanity = totalUsed === totalPebble;

                done({

                    sanity : sanity,
                    totalTiles : totalTiles,
                    totalUsed : totalUsed,
                    layerData : layerData

                });

            }

        };

        nextLayer(function (data) {

            //document.body.innerHTML = JSON.stringify(data);

            var options,
            amount,
            remain;

            this.amount = 0;

            data.layerData.forEach(function (layerObj) {

                // The loot tile count can not be greater than the amount of pebble for the layer
                if (layerObj.lootTiles > layerObj.pebble) {

                    layerObj.lootTiles = layerObj.pebble;

                }

                options = hideKit.makeOptions(layerObj.layerIndex);
                amount = Math.floor(layerObj.pebble / layerObj.lootTiles);
                i = 0;
                while (i < layerObj.lootTiles) {

                    cell = hideKit.spliceFromOptions(options);

                    amount = amount;

                    hideKit.setAmount(cell, amount);

                    i += 1;
                }

            });

            // place any remaining pebble in what should be the deepest layer
            remain = this.totalPebble - this.amount;
            if (remain > 0) {

                cell = spliceFromOptions(options);
                hideKit.setAmount(cell, Math.floor(this.totalPebble - this.amount));

            }

        });

    }
});
