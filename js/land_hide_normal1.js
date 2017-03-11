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
        var startLTCount = land.w * land.h * params.topPer,

        // find stats for the stack
        stats = (function () {

            var i = 0,
            layerCount,
            layers = [],
            total = 0;

            // find starts for each layer
            while (i < land.d) {

                // loot tiles for the layer
                layerCount = Math.floor(startLTCount - (startLTCount - 1) * (i / (land.d - 1)));

                // min of one per layer
                layerCount = layerCount <= 0 ? 1 : layerCount;

                console.log('layer ' + i + ' lt count = ' + layerCount);

                total += layerCount;

                i += 1;

            }

            // return stats
            return {

                layers : layers,
                total : total

            };

        }
            ());

        console.log(stats);
        console.log(stats);

        hideKit.forDepth(function (layer, d) {

            var options = hideKit.makeOptions(d),

            cell = hideKit.spliceFromOptions(options);

            console.log(stats.layer[d]);

            hideKit.setAmount(cell, 100);

        });

    }
});
