
var Title = function () {},
map,

proto = Title.prototype;

proto.create = function () {

    //  Creates a blank tilemap
    map = app.add.tilemap();

    //  Add a Tileset image to the map
    map.addTilesetImage('tiles');

    layer1 = map.create('level1', 4, 4, 32, 32);
	layer1.setScale(3.5,3.5);
	layer1.fixedToCamera = false;
	layer1.x = app.world.centerX- (32 * 2) * 3.5;
	layer1.y = app.world.centerY- (32 * 2) * 3.5;

    var genLayer = function () {

        var width = 4,
        height = 4,
        i = 0,
        x,
        y,
        len,
        data = [], //[Math.floor(Math.random() * 3) + 1, 0, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 0, 0, 4];
        len = width * height;
        while (i < len) {

            x = i % width;
            y = Math.floor(i / width);

            map.putTile(

                Math.floor(Math.random() * 4),
                x,
                y,
                'level1');

            i += 1;

        }

    };
	
	genLayer();

    app.add.button(app.world.centerX - 80, app.world.centerY + 30, 'button', function () {

        app.state.start('game');

    }, this, 0, 0, 1);

    app.add.button(app.world.centerX - 80, app.world.centerY + 100, 'button', function () {

        genLayer();

    }, this, 0, 0, 1);

    var logo = app.add.sprite(app.world.centerX, app.world.centerY, 'logo');
    logo.angle = 0;
    logo.width = logo.width * 2;
    logo.height = logo.height * 2;
    logo.x = app.width / 2 - logo.width / 2;
    logo.y = app.world.centerY - 200;

};

proto.update = function () {};

/*
var map,

layer,

genLayer = function () {

// generate tile map

var width = 4,
height = 4,
i = 0,
len,
data = [], //[Math.floor(Math.random() * 3) + 1, 0, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 0, 0, 4];

i = 0,
len = width * height;
while (i < len) {

data.push(Math.floor(Math.random() * 3 + 1));

i += 1;

}

if (layer) {

layer.kill();

console.log('cache size:');
console.log(app.cache);

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
tilewidth : 32,
}
],
}, Phaser.Tilemap.TILED_JSON);

map = app.add.tilemap('diglayer');
map.addTilesetImage('diglayer1', 'tiles');

layer = map.createLayer('layer1', 320, 240);

// a layers fixed to camera is set to false by default
layer.fixedToCamera = false;
layer.x = 32 + 5 * layer.z;
layer.y = 32;

// set the scale
layer.setScale(2, 2);

};

var Title = function () {},

proto = Title.prototype;

proto.create = function () {

//background = app.add.tileSprite(0, 0, 640, 480, 'background');

genLayer();

app.add.button(app.world.centerX - 80, app.world.centerY + 30, 'button', function () {

app.state.start('game');

}, this, 0, 0, 1);

app.add.button(app.world.centerX - 80, app.world.centerY + 100, 'button', function () {

genLayer();

}, this, 0, 0, 1);

var logo = app.add.sprite(app.world.centerX, app.world.centerY, 'logo');
logo.angle = 0;
logo.width = logo.width * 2;
logo.height = logo.height * 2;
logo.x = app.width / 2 - logo.width / 2;
logo.y = app.world.centerY - 200;

};

proto.update = function () {};

*/
