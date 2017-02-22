
var DIG = (function () {

    var showPebble = true;

    return {

        cheat : function () {

            showPebble = !showPebble;

        },

        run : (function () {

            var digmap = {

                offset : {

                    x : 50,
                    y : 50

                }

            },
            text_disp,
            text_digs,
            text_layer,
            text_pebble,
            text_totals,
            map,
            layer1,

            log = function (mess) {

                if (typeof mess === "string") {

                    console.log('game.js: ' + mess);

                } else {

                    console.log(mess);

                }

            },

            genLayer = function () {

                var width = 8,
                height = 8,
                i = 0,
                x,
                tile,
                y,
                len,
                data = [],
                len = width * height,
                tileSet = state.current.layer === 0 ? 3 : 1,
                zeroTile = state.current.layer === land.d - 1 ? 1 : 0, // the tile sheet index for a tile with 0 hp
                landData;

                // use map.put to populate the layer
                while (i < len) {

                    x = i % width;
                    y = Math.floor(i / width);

                    tile = land.getCell(x, y, state.current.layer);

                    map.putTile(

                        showPebble ? tile.amount > 0 ? 2 : tile.hp === 0 ? zeroTile : tileSet * 10 + tile.hp : tile.hp === 0 ? zeroTile : tileSet * 10 + tile.hp,
                        //tile.hp === 0 ? zeroTile : tileSet * 10 + tile.hp,
                        x,
                        y,
                        'activeLayer');

                    i += 1;

                }

            },

            doOnceIf = (function () {

                var didIt = false;

                return function (condition, what) {

                    if (!didIt && condition) {

                        what();
                        didIt = true;

                    }

                };

            }
                ()),

            userAction = function (pointer) {

                var x,
                y;

                // click or touch on the layer?
                if (layer1.input.pointerDown()) {

                    // dig in state.js
                    state.userAction(
                        pointer.position.x - digmap.offset.x,
                        pointer.position.y - digmap.offset.y,
                        function (result) {

                        if (result.active) {

                            if (result.burst) {
                                // update the tile map
                                map.putTile(0, result.tileX, result.tileY, 'activeLayer');

                            }

                            if (result.dropEvent) {

                                //genLayer();

                            }

                            log('result');
                            log(result);

                        }

                    });

                }

                genLayer();

                // dig
                //state.userAction(pointer.clientX, pointer.clientY);

            };

            return {

                create : function () {

                    //  Creates a blank tilemap
                    map = app.add.tilemap();

                    //  Add a Tileset image to the map
                    map.addTilesetImage('tiles');

                    layer1 = map.create('activeLayer', 8, 8, 32, 32);

                    // place the icons
                    app.add.sprite(450, 64, 'icons', 0); // shovel
                    app.add.sprite(450, 96 + 10, 'icons', 3); // layers
                    app.add.sprite(450, 128 + 20, 'icons', 2); // coin

                    // text
                    text_digs = app.add.bitmapText(450 + 32, 64, 'desyrel', '0', 30);
                    text_layer = app.add.bitmapText(450 + 32, 96 + 10, 'desyrel', '0', 30);
                    text_pebble = app.add.bitmapText(450 + 32, 128 + 20, 'desyrel', '0', 30);

                    text_totals = app.add.bitmapText(50, 435, 'desyrel', land.getInfo().tabString, 15);
                    //text_disp = app.add.bitmapText(5, 5, 'desyrel', '', 30);

                    // tile size is a little weird for now
                    // 50 is (map size in state.js / land width in land.js) 400 / 8 = 50.
                    layer1.setScale(1.5, 1.5);

                    layer1.fixedToCamera = false;
                    layer1.x = digmap.offset.x;
                    layer1.y = digmap.offset.x;
                    layer1.inputEnabled = true;

                    genLayer();

                    app.add.button(640 - 64, 16, 'icons', function () {

                        app.state.start('dig_options');

                    }, this, 1, 1, 1);

                    //app.input.addMoveCallback(move, this);

                },

                update : (function () {

                    var delay = 300,
                    last = new Date();

                    return function () {

                        if (app.input.pointer1.active) {

                            userAction(app.input.pointer1);

                        }

                        if (app.input.mousePointer.leftButton.isDown) {

                            if (new Date() - last >= delay) {

                                last = new Date();

                                userAction(app.input.mousePointer);

                            }

                        }

                        //text_disp.text = 'digs: ' + state.current.digs + '; layer: ' + state.current.layer;

                        // update display info
                        text_digs.text = state.current.digs;
                        text_layer.text = (state.current.layer + 1) + '/' + land.d;
                        text_pebble.text = state.current.pebble;
                        text_totals.text = land.getInfo().tabString;
                        //doOnceIf(app.input.mousePointer.active, function () {});


                        // out of digs?
                        if (state.current.digs <= 0) {

                            // reset state, land, and regen the tilemap
                            //state.reset();
                            //land.reset();
                            //genLayer();

                            app.state.start('dig_over');

                        }

                    };

                }
                    ())

            };

        }
            ()),

        // the options state the game switches to when the gear icon is clicked
        options : (function () {

            var text_label;

            return {

                create : function () {

                    text_label = app.add.bitmapText(8 + 32, 8, 'desyrel', 'Game Options:', 30);

                    // new game button
                    app.add.button(app.world.centerX - 80, app.world.centerY + 30, 'button', function () {

                        state.reset();
                        land.reset();

                        app.state.start('dig_run');

                    }, this, 0, 0, 1);

                }

            };
        }
            ()),

        // DIG.Over state
        over : (function () {

            var test_label;

            return {

                create : function () {

                    text_label = app.add.bitmapText(8 + 32, 8, 'desyrel', 'Dig is Over!', 30);

                    state.reset();
                    land.reset();

                    app.add.button(640 - 64, 16, 'icons', function () {

                        app.state.start('dig_options');

                    }, this, 1, 1, 1);

                    // new game button
                    app.add.button(app.world.centerX - 80, app.world.centerY + 30, 'button', function () {

                        app.state.start('dig_run');

                    }, this, 0, 0, 1);

                }

            };

        }
            ())

    };

}
    ());
