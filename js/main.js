/*
 *    main.js
 *    contains the main 'boot' phaser state
 */

// the main Phaser game instance
var app = (function () {

    var background,
    logo,

    start = function () {

        //app.load.start();

    },

    // set res
    w = window.innerWidth < 640 ? window.innerWidth : 640,
    h = w < 640 ? 260 : 480;

    return new Phaser.Game(

        w, h,
        //320, 240, // weird problem with the tilemap
        Phaser.AUTO,
        'gamearea', {

        // preload
        preload : function () {

            app.load.image('loadingbar', 'img/loadingbar.png');

        },

        // create
        create : function () {

            // set to top down hide method
            land.currentHideMethod = 'top-down';
            land.reset();


            app.state.add('load', Load);
            app.state.start('load');

        }

    });

}
    ());
