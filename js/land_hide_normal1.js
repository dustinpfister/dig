/*

land_hide_normal1.js

first attempt at a finale 'normal' game mode hide method.

 */

land.addHideMethod({

    name : 'normal1',

    method : function (hideKit, params) {

        console.log('I am the normal hide method.');
        console.log('total stack pebble to hide: ' + land.totalPebble);

        // can I find a way to do this by way of a single expression?
        var startLTCount = land.w * land.h * params.topLTPer,

        // find stats for the stack
        stats = (function () {

            var i = 0,
            layerCount,
            per,
            layers = [],
            totalLootTiles = 0;

            // find stats for each layer
            while (i < land.d) {

                per = (i + 1) / land.d;

                // loot tiles for the layer
                layerCount = Math.floor(startLTCount - (startLTCount - 1) * (i / (land.d - 1)));

                // min of one per layer
                layerCount = layerCount <= 0 ? 1 : layerCount;

                // percent of stack pebble


                // push the layer count
                layers.push({

                    lootTileCount : layerCount,
                    percentOfStackPebble : params.maxPer / land.d * (land.d - i)

                });

                totalLootTiles += layerCount;

                i += 1;

            }

            // return stats
            return {

                layers : layers,
                totalLootTiles : totalLootTiles

            };

        }
            ());

        console.log('stats');
        console.log(stats);

        hideKit.forDepth(function (layer, d) {

            var options = hideKit.makeOptions(d),

            cell = hideKit.spliceFromOptions(options);

            amount = Math.floor(stats.layers[d].lootTileCount + (land.totalPebble - stats.totalLootTiles) / land.d);

            console.log(amount);

            hideKit.setAmount(cell, amount);

        });

    }
});
