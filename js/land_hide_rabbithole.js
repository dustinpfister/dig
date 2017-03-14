/*

land_hide_rabbithole.js

I'm late, I'm late, for a very important date!

 */

land.addHideMethod({

    name : 'rabbithole',

    method : function (hideKit, params) {

        // a random 2d spot
        var spot = Math.floor(land.w * land.h * Math.random());

        // which mode?
        switch (params.mode) {

        case 'the_white_rabbit':

            console.log('I am late!');

            hideKit.forDepth(function (layer, d) {

                hideKit.setAmount(layer[spot], Math.floor(land.totalPebble / land.d * (d + 1)));

            });

            break;

        default:

            console.log('Oh, you can’t help that,” said the cat. “We’re all mad here');

            break;

        }

    }

});
