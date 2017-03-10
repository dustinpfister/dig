/*

land_hide_normal1.js

first attempt at a finale 'normal' game mode hide method.

 */

land.addHideMethod({

    name : 'normal1',

    method : function (hideKit) {

        console.log('I am the normal hide method.');
        console.log('total stack pebble to hide: ' + land.totalPebble);

        hideKit.forDepth(function (layer, d) {

            var options = hideKit.makeOptions(d),

            cell = hideKit.spliceFromOptions(options);

            console.log(Math.floor(32 - 31 * (d / (land.d-1))));

            hideKit.setAmount(cell, 100);

        });

    }
});
