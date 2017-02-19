

var Title = (function () {

    var map,
    layer1;

    return {

        create : function () {

            //  Creates a blank tilemap
            var map = app.add.tilemap();

            //  Add a Tileset image to the map
            map.addTilesetImage('tiles');

            console.log('title state setup.');

            layer1 = map.create('level1', 4, 4, 32, 32);
            layer1.setScale(3.5, 3.5);
            layer1.fixedToCamera = false;
            layer1.x = app.world.centerX - (32 * 2) * 3.5;
            layer1.y = app.world.centerY - (32 * 2) * 3.5;

            var genLayer = function () {

                var width = 4,
                height = 4,
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

        }
    };

}
    ());
