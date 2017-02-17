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
            app.load.image('tiles', 'img/tiles.png');



        },

        // create
        create : function () {

            // add states
            app.state.add('title', Title);
            app.state.add('game', Game);

            // start title
            app.state.start('title');

        },

        // update (ticks)
        update : function () {}

    });

    /*
    var pointer = new Phaser.Pointer(app, 0, 'TOUCH')
     */

}
    ());
