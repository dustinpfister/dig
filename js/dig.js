
var DIG = (function () {

    var showPebble = false;

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
            text_landLevel,
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

            userAction = function (sprite, pointer) {

                var cellSize = Math.floor(sprite.width / land.w),
                x = pointer.x - sprite.x,
                y = pointer.y - sprite.y,
                cellX = Math.floor(x / cellSize),
                cellY = Math.floor(y / cellSize);

                log('cellSize: ' + cellSize);
                log('cellPos: (' + cellX + ',' + cellY + ')');

                // dig at state.js
                state.userAction(
                    cellX,
                    cellY,
                    function (result) {

                    if (result.active) {

                        if (result.burst) {
                            // update the tile map
                            map.putTile(0, result.tileX, result.tileY, 'activeLayer');

                        }

                        if (result.dropEvent) {

                            //genLayer();

                        }

                    }

                });

                genLayer();

                // out of digs?
                if (state.current.digs <= 0) {

                    app.state.start('dig_over');

                }

                // out of tiles on the bottom layer?
                if (state.current.layer === land.d - 1) {

                    //console.log(land.getCell(0,0,land.d-1).done);

                    (function () {

                        var theBottom = land.getLayer(land.d - 1),
                        count = theBottom.length;

                        theBottom.forEach(function (cell) {

                            if (cell.done) {

                                count -= 1;

                            }

                        });

                        if (count <= 0) {

                            app.state.start('dig_over');

                        }

                    }
                        ());

                }

                // all the pebble? wow!
                (function () {

                    var info = land.getInfo();

                    if (info.tab.remaining <= 0) {

                        app.state.start('dig_over');

                    }

                }
                    ());

            };

            return {

                create : function () {

                    var iconSX = app.width * .72,
                    iconSY = app.height * .20,
                    iconStep = app.height * .15,
                    iconSize = 32,
                    textSize = 20;

                    //  Creates a blank tilemap
                    map = app.add.tilemap();

                    //  Add a Tileset image to the map
                    map.addTilesetImage('tiles');

                    layer1 = map.create('activeLayer', 8, 8, 32, 32);

                    // place the icons
                    app.add.sprite(iconSX, iconSY, 'icons', 0); // shovel
                    app.add.sprite(iconSX, iconSY + iconStep, 'icons', 3); // layers
                    app.add.sprite(iconSX, iconSY + iconStep * 2, 'icons', 2); // coin
                    app.add.sprite(iconSX, iconSY + iconStep * 3, 'icons', 4); // coin

                    // text
                    text_digs = app.add.bitmapText(iconSX + iconSize, iconSY, 'desyrel', '0', textSize);
                    text_layer = app.add.bitmapText(iconSX + iconSize, iconSY + iconStep, 'desyrel', '0', textSize);
                    text_pebble = app.add.bitmapText(iconSX + iconSize, iconSY + iconStep * 2, 'desyrel', '0', textSize);
                    text_landLevel = app.add.bitmapText(iconSX + iconSize, iconSY + iconStep * 3, 'desyrel', '0', textSize);
                    text_totals = app.add.bitmapText(50, 435, 'desyrel', land.getInfo().tabString, textSize / 2);

                    // tile size is a little weird for now
                    layer1.fixedToCamera = false;
                    layer1.width = app.height * .8;
                    layer1.height = app.height * .8;
                    layer1.x = app.width * .05; //digmap.offset.x;
                    layer1.y = app.height * .05; //digmap.offset.x;
                    layer1.inputEnabled = true;

                    // touch mouse event handler on the tilemap
                    layer1.events.onInputDown.add(userAction);

                    genLayer();

                    app.add.button(640 - 64, 16, 'icons', function () {

                        app.state.clearCurrentState();
                        app.state.start('dig_options');

                    }, this, 1, 1, 1);

                },

                update : (function () {

                    return function () {

                        // update display info
                        text_digs.text = state.current.digs;
                        text_layer.text = (state.current.layer + 1) + '/' + land.d;
                        text_pebble.text = state.current.pebble;
                        text_totals.text = land.getInfo().tabString;
                        text_landLevel.text = state.current.landLevel;

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

                    // resume button
                    app.add.button(app.world.centerX - 80, app.world.centerY + 25, 'button', function () {

                        app.state.start('dig_run');

                    }, this, 6, 6, 7);

                    // new game button
                    app.add.button(app.world.centerX - 80, app.world.centerY + 70, 'button', function () {

                        state.reset();
                        land.reset();

                        app.state.start('dig_run');

                    }, this, 0, 0, 1);

                    // new game button
                    app.add.button(app.world.centerX - 80, app.world.centerY + 115, 'button', function () {

                        app.state.start('title');

                    }, this, 4, 4, 5);

                }

            };
        }
            ()),

        // DIG.Over state
        over : (function () {

            var test_label,
            text_totalPebble,
            text_pebbelWon;

            return {

                create : function () {

                    var landInfo = land.getInfo(),
                    pebbleWon = landInfo.tab.total - landInfo.tab.remaining;

                    text_label = app.add.bitmapText(8 + 32, 8, 'desyrel', 'Dig is Over!', 30);

                    text_totalPebble = app.add.bitmapText(96, 128, 'desyrel',
                            'Total Land Pebble : ' + landInfo.tab.total, 16);
                    text_pebbleWon = app.add.bitmapText(96, 128 + 32, 'desyrel',
                            'Pebble Won : ' + pebbleWon, 24);

                    state.levelUp();
                    state.reset();
                    land.reset();

                    app.add.button(640 - 64, 16, 'icons', function () {

                        app.state.start('dig_options');

                    }, this, 1, 1, 1);

                    // new game button
                    app.add.button(app.world.centerX - 80, app.world.centerY + 70, 'button', function () {

                        state.reset();
                        land.reset();

                        app.state.start('dig_run');

                    }, this, 0, 0, 1);

                    // new game button
                    app.add.button(app.world.centerX - 80, app.world.centerY + 115, 'button', function () {

                        app.state.start('title');

                    }, this, 4, 4, 5);

                }

            };

        }
            ())

    };

}
    ());
