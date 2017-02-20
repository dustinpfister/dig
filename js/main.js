var app = (function () {

    var background,
    logo;

    return new Phaser.Game(

        640, 480,
        Phaser.AUTO,
        'gamearea', {

        // preload
        preload : function () {

            app.load.image('logo', 'img/logo.png');
            app.load.image('background', 'img/background.png');
            app.load.spritesheet('button', 'img/button.png', 160, 45);
            app.load.spritesheet('icons', 'img/icons.png', 32, 32);
            app.load.image('tiles', 'img/tiles2.png');

            //app.load.bitmapFont('desyrel', 'img/desyrel.png', 'img/desyrel.xml');

            app.load.bitmapFont('desyrel', 'img/desyrel.png', 'img/font1.xml');

        },

        // create
        create : function () {

            // add states
            app.state.add('title', Title);
            app.state.add('dig_run', DIG.run);
            app.state.add('dig_over', DIG.over);

            // start title
            app.state.start('dig_run');

        },

        // update (ticks)
        update : function () {}

    });

    /*
    var pointer = new Phaser.Pointer(app, 0, 'TOUCH')
     */

}
    ());
