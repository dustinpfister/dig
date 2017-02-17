
var genLayer = function () {

    // generate tile map

    var width = 4,
    height = 4,
    i = 0,
    len,
    data = [],//[Math.floor(Math.random() * 3) + 1, 0, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 0, 0, 4];

    i = 0,
    len = width * height;
    while (i < len) {

        data.push(Math.floor(Math.random() * 3 + 1));

        i += 1;

    }

    app.load.tilemap('diglayer', null, {
        width : width,
        height : height,
        tileheight : 32,
        tilewidth : 32,
        orientation : "orthogonal",
        layers : [{
                data : data,
                height : width,
                width : height,
                name : "layer1",
                type : "tilelayer"
            }

        ],
        tilesets : [{
                firstgid : 1,
                image : "tiles.png",
                imageheight : 64,
                imagewidth : 64,
                name : "diglayer1",
                tileheight : 32,
                tilewidth : 32
            }
        ],
    }, Phaser.Tilemap.TILED_JSON);

},

layer;

var Title = function () {},

map,

proto = Title.prototype;

proto.create = function () {

    console.log('title state created');

    background = app.add.tileSprite(0, 0, 640, 480, 'background');

    logo = app.add.sprite(app.world.centerX, app.world.centerY, 'logo');
    logo.angle = 0;
    logo.width = logo.width * 2;
    logo.height = logo.height * 2;
    logo.x = app.width / 2 - logo.width / 2;
    logo.y = app.world.centerY - 200;

    genLayer();

    map = app.add.tilemap('diglayer');
    map.addTilesetImage('diglayer1', 'tiles');

    //var tile = map.layers[0].data[0][0];
    //tile.alpha = 0;

    //console.log(map.layers[0].data[0][0]);

    layer = map.createLayer('layer1');

    console.log(map.layers);

    //  This resizes the game world to match the layer dimensions
    //layer.resizeWorld();

    app.add.button(app.world.centerX - 80, app.world.centerY + 30, 'button', function () {

        app.state.start('game');

    }, this, 0, 0, 1);

    app.add.button(app.world.centerX - 80, app.world.centerY + 100, 'button', function () {

        console.log('re do the layer');

        genLayer();
        map = app.add.tilemap('diglayer');
        map.addTilesetImage('diglayer1', 'tiles');
        map.createLayer('layer1');

    }, this, 0, 0, 1);

};

proto.update = function () {};
