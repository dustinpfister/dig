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

            // set up diglayer
            app.load.tilemap('diglayer', null, {
                "width" : 5,
                "height" : 5,
                "tileheight" : 32,
                "tilewidth" : 32,
                "backgroundcolor" : "#656667",
                "orientation" : "orthogonal",
                "layers" : [{
                        "data" : [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
                        "height" : 5,
                        "name" : "layer1",
                        "opacity" : 1,
                        "type" : "tilelayer",
                        "visible" : true,
                        "width" : 5,
                        "x" : 0,
                        "y" : 0
                    }

                ],
                "tilesets" : [{
                        "firstgid" : 0,
                        "image" : "tiles.png",
                        "imageheight" : 64,
                        "imagewidth" : 64,
                        "name" : "diglayer1",
                        "tileheight" : 32,
                        "tilewidth" : 32
                    }
                ],
            }, Phaser.Tilemap.TILED_JSON);

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
