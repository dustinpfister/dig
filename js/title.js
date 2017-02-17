
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

    //tiles = app.add.sprite(0, 0, 'tiles');

    //map = app.add.tilemap('digLayer');

    map = app.add.tilemap('diglayer');
    map.addTilesetImage('diglayer1', 'tiles');
    layer = map.createLayer('layer1');

    //  This resizes the game world to match the layer dimensions
    //layer.resizeWorld();

    app.add.button(app.world.centerX - 80, app.world.centerY + 30, 'button', function () {

        console.log('yeah man I was clicked what up?');

        app.state.start('game');

    }, this, 0, 0, 1);

};

proto.update = function () {};
