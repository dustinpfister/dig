
var Game = function () {},

logo,

proto = Game.prototype;

proto.create = function () {

    console.log('game state created');
    app.load.image('logo', 'assets/phaser.png');

    logo = app.add.sprite(app.world.centerX, app.world.centerY, 'logo');

    app.add.button(0, 0, 'button', function () {

        app.state.start('title');

    }, this, 0, 0, 1);

    app.input.addPointer();

    logo.x = 0;
    logo.y = 0;
    logo.width = 200;
    logo.height = 200;

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

proto.update = function () {

    if (app.input.pointer1.active) {

        console.log(app.input.pointer1.clientX + ',' + app.input.pointer1.clientY);

        logo.width = 200;
        logo.height = 200;
        logo.x = app.input.pointer1.clientX - 100;
        logo.y = app.input.pointer1.clientY - 100;

    }

    doOnceIf(app.input.pointer1.active, function () {});

};
