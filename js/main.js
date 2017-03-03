/*
 *    main.js
 *    contains the main 'boot' phaser state
 */

// the main Phaser game instance

var app = (function () {

    var background,
    logo,
    // also set in load.js
    baseURL = 'https://cdn.rawgit.com/dustinpfister/dig/44ed7956593901a57980341f616e5c5ded3eb6c0/', 


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

            app.load.image('loadingbar', baseURL + 'img/loadingbar.png');

        },

        // create
        create : function () {

            app.state.add('load', Load);
            app.state.start('load');

        }

    });

}
    ());
