/*

land_hide_normal1.js

first attempt at a finale 'normal' game mode hide method.

 */

land.addHideMethod({

    name : 'normal1',

    method : function (hideKit, params) {

        console.log('I am the \"normal1\" hide method, but you can call me Jerry.');

        // can I find a way to do this by way of a single expression?
        var startLTCount = land.w * land.h * params.topLTPer,

        // find starting stats for the stack
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

                    lootTileCount : layerCount

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

        // loop threw layers from the bottom up, and find amounts
        var i = land.d,
        pebPer = 1,
        perLayer = land.totalPebble / land.d,
        layerAmount,
        totalUsed = 0,
        remain,
        layer;
        while (i--) {

            layer = stats.layers[i];

            //console.log('layer: ' + i);

            //pebPer = 1 - params.bestPebPer - (1 - params.bestPebPer) / land.d * ((land.d - i) / land.d);

            pebPer = 1 - (land.d - i - 1) / land.d;
            layerAmount = Math.floor(perLayer * pebPer);
            totalUsed += layerAmount;
            console.log('layer # : ' + i + ' pebble amount = ' + layerAmount);

            layer.amount = layerAmount;

            //console.log(layer);

            // total pebble for the whole layer
            //layer.totalPebble =

        }

        remain = land.totalPebble - totalUsed;

        console.log('total stack pebble = ' + land.totalPebble);
        console.log('totalUsed = ' + totalUsed);
        console.log('remain = ' + remain);

        console.log('stats');
        console.log(stats);

        hideKit.forDepth(function (layer, d) {

            var options = hideKit.makeOptions(d),

            cell = hideKit.spliceFromOptions(options);

            amount = Math.floor(stats.layers[d].lootTileCount + (land.totalPebble - stats.totalLootTiles) / land.d);

            hideKit.setAmount(cell, amount);

        });

    }
});
