
// the main Phaser game instance
var app = (function () {

    var background,
    logo,

    // load state
    Load = (function () {

        return {
            create : function () {

                app.load.spritesheet('button', 'img/button.png', 160, 45);
                app.load.spritesheet('icons', 'img/icons.png', 32, 32);
                app.load.image('tiles', 'img/tiles2.png');
                app.load.spritesheet('tiles_split', 'img/tiles2.png', 16, 16);
                app.load.bitmapFont('desyrel', 'img/desyrel.png', 'img/font1.xml');
                app.load.image('logo', 'img/logo.png');

                // load start
                app.load.onLoadStart.add(function () {

                    console.log('load start');

                }, this);

                // on file complete
                app.load.onFileComplete.add(function (progress) {

                    console.log(progress);

                }, this);

                // loading done
                app.load.onLoadComplete.add(function () {

                    console.log('compleate');

                    app.state.add('title', Title);
                    app.state.add('dig_run', DIG.run);
                    app.state.add('dig_over', DIG.over);
                    app.state.add('dig_options', DIG.options);

                    app.state.start('title');

                }, this);

            }
        };

    }
        ()),

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

            app.load.image('background', 'img/background.png');

            app.state.add('load', Load);
            app.state.start('load');

        },

        // create
        create : function () {

            // add states
            app.state.add('title', Title);
            app.state.add('dig_run', DIG.run);
            app.state.add('dig_over', DIG.over);
            app.state.add('dig_options', DIG.options);

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
