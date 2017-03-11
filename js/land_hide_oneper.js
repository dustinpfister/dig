/*

land_hide_oneper.js

oneper hide method makes it so there is just one loot tile per layer, with the most valuable one at the bottom.

 */

land.addHideMethod({

    name : 'oneper',

    method : function (hideKit, params) {

        console.log('I am the \"oneper\" hide method.');

        // can I find a way to do this by way of a single expression?
        var startLTCount = land.w * land.h * params.topLTPer,

        // find starting stats for the stack
        stats = {

            layers : []

        };

        // loop threw layers from the bottom up, and find amounts
        var i = land.d,
        pebPer = 1,
        perLayer = land.totalPebble / land.d,
        layerAmount,
        totalUsed = 0,
        remain,
        layer;
        while (i--) {

            layer = {};

            pebPer = 1 - (land.d - i - 1) / land.d;
            layerAmount = Math.floor(perLayer * pebPer);
            totalUsed += layerAmount;
            console.log('layer # : ' + i + ' pebble amount = ' + layerAmount);

            layer.amount = layerAmount;

            stats.layers[i] = layer;

        }

        // find remain, and stuff it into the bottom layer
        remain = land.totalPebble - totalUsed;
        stats.layers[land.d - 1].amount += remain;

        console.log('total stack pebble = ' + land.totalPebble);
        console.log('totalUsed = ' + totalUsed);
        console.log('remain = ' + remain);

        console.log('stats');
        console.log(stats);

        hideKit.forDepth(function (layer, d) {

            var options = hideKit.makeOptions(d),

            cell = hideKit.spliceFromOptions(options);

            //amount = Math.floor(stats.layers[d].lootTileCount + (land.totalPebble - stats.totalLootTiles) / land.d);

            //hideKit.setAmount(cell, amount);
            hideKit.setAmount(cell, stats.layers[d].amount);

        });

    }
});
