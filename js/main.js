


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

            app.state.add('load', Load);
            app.state.start('load');

            //app.load.start();

            // add states
            //app.state.add('title', Title);
            //app.state.add('dig_run', DIG.run);
            //app.state.add('dig_over', DIG.over);
            //app.state.add('dig_options', DIG.options);

            // start title
            //app.state.start('title');
            //app.state.start('dig_run');
            //app.state.start('dig_options');


        },

        // update (ticks)
        update : function () {}

    });

}
    ());
