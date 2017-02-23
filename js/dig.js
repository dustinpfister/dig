
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
            textNames = ['digs', 'layer', 'pebble', 'landLevel'],
            text = {},
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

            // update Display Info
            updateInfo = function () {

                // update display info
                // what to display for each text
                var what = [

                    state.current.digs,
                    (state.current.layer + 1) + '/' + land.d,
                    state.current.pebble,
                    state.current.landLevel

                ];

                // update text
                textNames.forEach(function (textName, i) {

                    text[textName].text = what[i];

                });

                text_totals.text = land.getInfo().tabString;

            },

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

                // re gen the time map, and update info
                genLayer();
                updateInfo();

            };

            return {

                create : function () {

                    var iconSX = app.width * .72,
                    iconSY = app.height * .20,
                    iconStep = app.height * .15,
                    iconSize = app.width * .08,
                    textSize = app.width * .06,

                    // shovel, layers,coin,steps
                    iconIndexs = [0, 3, 2, 4],

                    sprite;

                    //  Creates a blank tilemap
                    map = app.add.tilemap();

                    //  Add a Tileset image to the map
                    map.addTilesetImage('tiles');

                    layer1 = map.create('activeLayer', 8, 8, 32, 32);

                    // place the icons
                    iconIndexs.forEach(function (iconIndex, i) {

                        // icons
                        sprite = app.add.sprite(iconSX, iconSY + iconStep * i, 'icons', iconIndex);
                        sprite.width = iconSize;
                        sprite.height = iconSize;

                        // icon text
                        text[textNames[i]] = app.add.bitmapText(
                                iconSX + iconSize,
                                iconSY + iconStep * i, 'desyrel', '0', textSize);

                    });

                    // pebble totals
                    text_totals = app.add.bitmapText(
                            app.width * 0.05,
                            app.height * .86, 'desyrel', land.getInfo().tabString, textSize);

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

                    sprite = app.add.button(app.width - iconSize, 0, 'icons', function () {

                            app.state.clearCurrentState();
                            app.state.start('dig_options');

                        }, this, 1, 1, 1);

                    sprite.width = iconSize;
                    sprite.height = iconSize;

                    // call update info foe the first time
                    updateInfo();

                },

                update : (function () {

                    return function () {};

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

                    var textSize = app.width * .1,
                    sprite,
                    buttonW = app.width * .6,
                    buttonH = app.height * .2,
                    buttonX = app.world.centerX - buttonW / 2,
                    buttonStartY = app.height * .3,
                    buttonStepY = app.height * .20,

                    text_label = app.add.bitmapText(0, 0, 'desyrel', 'Game Options:', textSize);
                    text_label.x = app.world.centerX - text_label.width / 2;
                    text_label.y = app.height * .05;

                    // resume button
                    sprite = app.add.button(0, 0, 'button', function () {

                            app.state.start('dig_run');

                        }, this, 6, 6, 7);
                    sprite.width = buttonW;
                    sprite.height = buttonH;
                    sprite.x = buttonX;
                    sprite.y = buttonStartY;

                    // new game button
                    sprite = app.add.button(0, 0, 'button', function () {

                            state.reset();
                            land.reset();

                            app.state.start('dig_run');

                        }, this, 0, 0, 1);
                    sprite.width = buttonW;
                    sprite.height = buttonH;
                    sprite.x = buttonX;
                    sprite.y = buttonStartY + buttonStepY;

                    // new game button
                    sprite = app.add.button(0, 0, 'button', function () {

                            app.state.start('title');

                        }, this, 4, 4, 5);
                    sprite.width = buttonW;
                    sprite.height = buttonH;
                    sprite.x = buttonX;
                    sprite.y = buttonStartY + buttonStepY * 2;

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

                    var textSize = app.width * .1,
                    landInfo = land.getInfo(),
                    pebbleWon = landInfo.tab.total - landInfo.tab.remaining,

                    buttonW = app.width * .6,
                    buttonH = app.height * .2,
                    buttonX = app.world.centerX - buttonW / 2,
                    buttonStartY = app.height * .55,
                    buttonStepY = app.height * .20,

                    iconSize = app.width * .08,
                    sprite,

                    text_label = app.add.bitmapText(0, 0, 'desyrel', 'Dig is Over!', textSize);
                    text_label.x = app.world.centerX - text_label.width / 2;
                    text_label.y = app.height * .05;

                    text_totalPebble = app.add.bitmapText(96, 128, 'desyrel',
                            'Total Land Pebble : ' + landInfo.tab.total, textSize / 2);

                    text_totalPebble.x = app.world.centerX - text_totalPebble.width * .5;
                    text_totalPebble.y = app.height * .25;

                    text_pebbleWon = app.add.bitmapText(96, 128 + 32, 'desyrel',
                            'Pebble Won : ' + pebbleWon, textSize * .9);

                    text_pebbleWon.x = app.world.centerX - text_pebbleWon.width / 2;
                    text_pebbleWon.y = app.height * .3;

                    state.levelUp();
                    state.reset();
                    land.reset();

                    // new game button
                    sprite = app.add.button(0, 0, 'button', function () {

                            state.reset();
                            land.reset();

                            app.state.start('dig_run');

                        }, this, 0, 0, 1);
                    sprite.width = buttonW;
                    sprite.height = buttonH;
                    sprite.x = buttonX;
                    sprite.y = buttonStartY;

                    // new game button
                    sprite = app.add.button(0, 0, 'button', function () {

                            app.state.start('title');

                        }, this, 4, 4, 5);

                    sprite.width = buttonW;
                    sprite.height = buttonH;
                    sprite.x = buttonX;
                    sprite.y = buttonStartY + buttonStepY;

                }

            };

        }
            ())

    };

}
    ());
