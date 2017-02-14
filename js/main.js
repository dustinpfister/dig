
// render, and event attachment
var canvas = document.getElementById('thecanvas'), ctx = canvas.getContext('2d');

var draw = function () {

    var obj = state.current;

    ctx.fillStyle = '#000000';
    ctx.textAlign = 'left';

    ctx.clearRect(0, 0, 640, 480);

    ctx.fillText('digs: ' + obj.digs + '; pebble: ' + obj.pebble + '; current layer: ' + obj.layer + ';', 10, 10);

    drawLayer(ctx, obj.layer);

},

drawLayer = function (ctx, layer) {

    var cellWidth = 400 / land.w,
    cellHeight = 400 / land.h,

    cells = land.getLayer(layer),
    x,
    y,
    i,
    len;

    ctx.strokeStyle = '#000000';
    ctx.textAlign = 'center';

    i = 0,
    len = cells.length;
    while (i < len) {

        x = Math.floor(i / land.h);
        y = i % land.h;

        //console.log(x+','+y);

        if (cells[i].canDig) {

            ctx.fillStyle = '#ffa050';
            if (cells[i].done) {

                ctx.fillStyle = '#aa5020';

            }

        } else {

            ctx.fillStyle = '#000000';

        }

        ctx.strokeRect(20 + x * cellWidth, 20 + y * cellHeight, cellWidth, cellHeight);
        ctx.fillRect(20 + x * cellWidth, 20 + y * cellHeight, cellWidth, cellHeight);

        if (cells[i].done) {
            ctx.fillStyle = '#ffff00';
            ctx.fillText(cells[i].total, 20 + (x * cellWidth) + (cellWidth / 2), 20 + (y * cellHeight) + (cellHeight / 2));
        };

        i++;
    }

    //console.log(cells);
    ctx.strokeStyle = '#ff0000';
    ctx.strokeRect(20, 20, 400, 400);

};

// event driven
canvas.addEventListener('mousedown', function (e) {

    var box = e.target.getBoundingClientRect(),
    x = e.clientX - box.left,
    y = e.clientY - box.top;

    state.userAction(x, y);
    draw();

});

// starting draw
draw();
