

// the main Phaser game instance
var app = (function () {

    var background,
    logo,

    // If an error happens, This should be at least attached to window
    // for whatever the reason this does not always seem to fire, but it is here for what its worth
    // to help debug problems.
    myErrorMethod = function (e) {

        var errorDisp = document.getElementById('errorlog');
        errorDisp.style.display = 'block';

        errorDisp.innerHTML += 'error message: ' + e.message + ' ; stack : ' + e.error.stack;

    };

    // attach it to window
    window.addEventListener('error', myErrorMethod);

    return new Phaser.Game(

        //1280, 960,
        //640, 480,
        320, 260,
        //320, 240, // weird problem with the tilemap
        Phaser.AUTO,
        'gamearea', {

        // preload
        preload : function () {

            app.load.image('logo', 'img/logo.png');
            app.load.image('background', 'img/background.png');
            app.load.spritesheet('button', 'img/button.png', 160, 45);
            app.load.spritesheet('icons', 'img/icons.png', 32, 32);
            app.load.image('tiles', 'img/tiles2.png');
            app.load.spritesheet('tiles_split', 'img/tiles2.png', 16, 16);

            app.load.bitmapFont('desyrel', 'img/desyrel.png', 'img/font1.xml');

        },

        // create
        create : function () {

            // add states
            app.state.add('title', Title);
            app.state.add('dig_run', DIG.run);
            app.state.add('dig_over', DIG.over);
            app.state.add('dig_options', DIG.options);

            // start title
            app.state.start('title');
            //app.state.start('dig_run');
            //app.state.start('dig_options');


        },

        // update (ticks)
        update : function () {}

    });

    /*
    var pointer = new Phaser.Pointer(app, 0, 'TOUCH')
     */

}
    ());

//app.canvas.addEventListener('error', myErrorMethod);

//console.log(app);
