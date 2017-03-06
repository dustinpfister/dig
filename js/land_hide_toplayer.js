/*

    land_hide_toplayer.js

    everything on the top layer

 */

land.addHideMethod({

    name : 'top-layer',

    method : function (hideKit) {

        // the top layer will always have allot of loot cells, say 50%
        var options = hideKit.makeOptions(0),
        topCount = Math.floor(this.w * this.h * .5),
        i = 0,
        amount,
        cell,
        stackIndex;

        this.amount = 0;
        amount = Math.floor(this.totalPebble / topCount);

        // hide in top layer
        while (i < topCount) {

            cell = hideKit.spliceFromOptions(options);

            amount = amount;

            hideKit.setAmount(cell, amount);

            i += 1;

        }

        cell = hideKit.spliceFromOptions(options);

        amount = this.totalPebble - amount * topCount;

        hideKit.setAmount(cell, amount);

    }

});
