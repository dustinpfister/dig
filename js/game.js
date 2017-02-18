
var Game = function () {},

map,
layer1,

proto = Game.prototype;

proto.create = function () {

    //  Creates a blank tilemap
    map = app.add.tilemap();

    //  Add a Tileset image to the map
    map.addTilesetImage('tiles');

    layer1 = map.create('level1', 8, 8, 32, 32);

    // tile size is a little weird for now
    // 50 is (map size in state.js / land width in land.js) 400 / 8 = 50.
    layer1.setScale(1.5, 1.5);

    layer1.fixedToCamera = false;
    layer1.x = 0;
    layer1.y = 0;
    layer1.inputEnabled = true;

    var genLayer = function () {

        var width = 8,
        height = 8,
        i = 0,
        x,
        y,
        len,
        data = [],
        len = width * height;

        // use map.put to populate the layer
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

    app.add.button(480, 0, 'button', function () {

        app.state.start('title');

    }, this, 0, 0, 1);

};

var doOnceIf = (function () {

    var didIt = false;

    return function (condition, what) {

        if (!didIt && condition) {

            what();
            didIt = true;

        }

    };

}
    ());

proto.render = function () {

    //app.debug.pointer(app.input.mousePointer);
    //app.debug.pointer(app.input.pointer1);

};

var userAction = function (pointer) {

    var x,
    y;

    // click or touch on the layer?
    if (layer1.input.pointerDown()) {

        // use pointer.x, and pointer.y for a position relative to the canvas, and not the window.

        // dig in state.js
        state.userAction(pointer.position.x, pointer.position.y, function (result) {

            if (result.active) {

                if (result.burst) {
                    // update the tile map
                    map.putTile(null, result.tileX, result.tileY, 'level1');

                }

                if (result.dropEvent) {

                    console.log('drop!');

                }

            }

        });

    }

    // dig
    //state.userAction(pointer.clientX, pointer.clientY);

};

proto.update = (function () {

    var delay = 1000,
    last = new Date();

    return function () {

        var pointer = app.input.pointer1.active;

        if (app.input.pointer1.active) {

            userAction(app.input.pointer1);

        }

        if (app.input.mousePointer.leftButton.isDown) {

            userAction(app.input.mousePointer);

        }

        doOnceIf(app.input.mousePointer.active, function () {});

    };

}
    ());
