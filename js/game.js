
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

var userAction = function (pointer) {

    console.log(pointer);

    logo.width = 200;
    logo.height = 200;
    logo.x = pointer.clientX - 100;
    logo.y = pointer.clientY - 100;
	
	// dig
	state.userAction(pointer.clientX, pointer.clientY);

};

proto.update = function () {

    var pointer = app.input.pointer1.active;

    if (app.input.pointer1.active) {

        userAction(app.input.pointer1);

    }

    if (app.input.mousePointer.leftButton.isDown) {

        userAction(app.input.mousePointer);

    }

    doOnceIf(app.input.mousePointer.active, function () {

        console.log(app.input.mousePointer);

    });

};

