
var Load = (function () {

    var baseURL = 'https://cdn.rawgit.com/dustinpfister/dig/44ed7956593901a57980341f616e5c5ded3eb6c0/';

    return {

        preload : function () {

            var loadSprite = app.add.sprite(0, 0, 'loadingbar');
            loadSprite.width = 0;
            loadSprite.x = app.world.centerX - loadSprite.width / 2;
            loadSprite.y = app.world.centerY - 16;

            app.load.onLoadStart.add(function () {}, this);
            app.load.onFileComplete.add(function (progress) {

                loadSprite.width = app.width * (progress / 100);
                loadSprite.x = app.world.centerX - loadSprite.width / 2;

            }, this);
            app.load.onLoadComplete.add(function () {}, this);

            //app.load.image('background', 'img/background.png');
            app.load.spritesheet('button', baseURL + 'img/button.png', 160, 45);
            app.load.spritesheet('icons', baseURL + 'img/icons.png', 32, 32);
            app.load.image('tiles', baseURL + 'img/tiles2.png');
            app.load.spritesheet('tiles_split', baseURL + 'img/tiles2.png', 16, 16);
            app.load.bitmapFont('desyrel', baseURL + 'img/desyrel.png', baseURL + 'img/font1.xml');
            app.load.image('logo', baseURL + 'img/logo.png');

        },

        create : function () {

            app.state.add('title', Title);
            app.state.add('dig_run', DIG.run);
            app.state.add('dig_over', DIG.over);
            app.state.add('dig_options', DIG.options);

            app.state.start('title');

        }

    }

}
    ());
