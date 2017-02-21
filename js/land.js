var land = (function () {

    var api = {

        cells : [],

        // width height and depth of the land
        w : 8,
        h : 8,
        d : 3,
        //level : 1,

        // the total amount of pebble in the land
        totalPebble : 1000,
        amount : 0,

        hpRange : {

            low : 1,
            high : 1

        }

    },

    // get an x,y,z pos from an index out of total number of land tiles
    getPos = function (i) {

        i = i === undefined ? 0 : i;

        var z = i % api.d,
        x = Math.floor(i / (api.d * api.h)),
        y = Math.floor((i - (x * (api.d * api.h))) / api.d);

        return {

            x : x,
            y : y,
            z : z

        };

    },

    makeOptions = function (z) {

        var options = [];

        api.cells.forEach(function (cell, index) {

            if (z === undefined) {

                options.push(index);

            } else {

                if (cell.z === z) {

                    options.push(index);

                }

            }

        });

        return options;

    },

    // tabulate pebble
    tabulate = function () {

        var total = 0,
        remaining = 0,
        lootCells = {

            total : 0,
            remaining : 0

        };

        api.cells.forEach(function (cell) {

            total += cell.total;
            remaining += cell.amount;

            if (cell.total > 0) {

                lootCells.total += 1;

                if (cell.amount > 0) {

                    lootCells.remaining += 1;

                }

            }

        });

        return {

            total : total,
            remaining : remaining,
            lootCells : lootCells

        };

    },

    hidePebble = (function () {

        var methods = {

            // a random flat amount per loot tile
            random_amount : function () {

                var options = makeOptions(),
                i,
                cell,
                stackIndex,

                // the range for the random amount
                range = {

                    low : .1,
                    high : .2

                },

                per = (Math.random() * (range.high - range.low) + range.low).toFixed(2) - 0,

                // the random amount
                amount = Math.floor(api.totalPebble * per),
                tileCount = Math.floor(api.totalPebble / amount),
                remainAmount = api.totalPebble % amount; // 1 or 0 tiles to place whats remaining

                // put it in there
                api.amount = 0;
                i = 0;
                while (i < tileCount) {

                    stackIndex = options.splice(Math.floor(Math.random() * options.length), 1)[0];

                    cell = api.cells[stackIndex];
                    api.amount += amount;
                    cell.total = amount;
                    cell.amount = cell.total;

                    i += 1;

                }

                if (remainAmount) {

                    stackIndex = options.splice(Math.floor(Math.random() * options.length), 1)[0];
                    console.log('yes one remainder tile.');

                    cell = api.cells[stackIndex];

                    api.amount += remainAmount;
                    cell.total = remainAmount;
                    cell.amount = cell.total;

                }

            },

            // common but low value loot tiles on the top, rate but valuable loot at the bottom
            common_to_rare : function () {

                // the top layer will always have allot say 50%
                var options = makeOptions(0),
                topCount = Math.floor(api.w * api.h * .5);

                console.log('topCount: ' + topCount);

            },

            // everything on the top layer
            top_layer : function () {

                // the top layer will always have allot of loot cells, say 50%
                var options = makeOptions(0),
                topCount = Math.floor(api.w * api.h * .5),
                i = 0,
                amount,
                cell,
                stackIndex;

                api.amount = 0;
                amount = Math.floor(api.totalPebble / topCount);

                // hide in top layer
                while (i < topCount) {

                    stackIndex = options.splice(Math.floor(Math.random() * options.length), 1)[0];
                    cell = api.cells[stackIndex];

                    amount = amount;

                    api.amount += amount;
                    cell.total = amount;
                    cell.amount = cell.total;

                    i += 1;

                }

                stackIndex = options.splice(Math.floor(Math.random() * options.length), 1)[0];
                cell = api.cells[stackIndex];

                amount = api.totalPebble - amount * topCount;

                api.amount += amount;
                cell.total = amount;
                cell.amount = cell.total;

                console.log('topCount: ' + topCount);

            }

        };

        return function (hideMethod) {

            hideMethod = hideMethod === undefined ? 'random_amount' : hideMethod;

            methods[hideMethod]();

        }

    }
        ()),

    // hide the amount of pebble in the land
    /*
    hidePebble = (function () {

    options = [];

    return function () {

    var len = api.w * api.h * api.d,

    amount,
    remain,
    i,
    cell,
    z,
    y,
    z;

    if (options.length === 0) {

    options = makeOptions();

    }

    // get a random cell from options array
    //i = Math.floor(Math.random() * len);
    i = options.splice(Math.floor(Math.random() * options.length), 1);
    cell = api.cells[i];
    z = i % api.d;
    x = Math.floor(i / (api.d * api.h));
    y = Math.floor((i - (x * (api.d * api.h))) / api.d);

    remain = api.totalPebble - api.amount;

    // up to 10% depending on depth
    amount = Math.floor(api.totalPebble / 10 * ((z + 1) / api.d));

    if (amount < remain) {

    cell.amount += amount;
    api.amount += amount;
    cell.total = cell.amount;
    hidePebble();

    } else {

    cell.amount += remain;
    cell.total = cell.amount;
    api.amount += remain;

    }

    };

    }
    ()),

     */

    setupLand = function () {

        var i,
        x,
        y,
        z,
        len = api.w * api.h * api.d,
        maxHp;

        api.cells = [];
        api.amount = 0;

        i = 0;
        while (i < len) {

            z = i % api.d;
            x = Math.floor(i / (api.d * api.h));
            y = Math.floor((i - (x * (api.d * api.h))) / api.d);

            maxHp = Math.floor(Math.random() * (api.hpRange.high - api.hpRange.low + 1)) + api.hpRange.low;

            api.cells.push({
                amount : 0,
                total : 0,
                done : false,
                hp : maxHp,
                maxHp : maxHp,
                canDig : false, //z === 0 ? true : false,
                i : i,
                x : x,
                y : y,
                z : z
            });

            i += 1;

        }

        hidePebble('top_layer');

    };

    //setupLand();
    console.log('pos');
    console.log(getPos(3));

    api.reset = function () {

        setupLand();

    };

    api.setLevel = function (level) {

        // total stack pebble
        this.totalPebble = 100 * level + Math.pow(2, level) - 2;

        // layers
        this.d = 3 + Math.floor(level * .5);

        // set max layers to 20
        if (this.d > 20) {

            this.d = 20;

        }

        // land tile hp range
        this.hpRange.low = 1 + Math.floor(level / 20 * 1);
        this.hpRange.high = 1 + Math.floor(level / 20 * 3);

        this.hpRange.low = this.hpRange.low > 4 ? 4 : this.hpRange.low;
        this.hpRange.high = this.hpRange.high > 4 ? 4 : this.hpRange.high;

    },

    // get info about the land
    api.getInfo = function () {

        var tab = tabulate();

        return {

            tab : tab,
            tabString : tab.remaining + '/' + tab.total,
            layers : this.d

        };

    },

    // get a cell by index, or x,y,z
    api.getCell = function (ix, y, z) {

        if (y !== undefined && z !== undefined) {

            return api.cells[api.h * api.d * ix + y * api.d + z];

        } else {

            return api.cells[ix];

        }

    };

    // get an 2d layer at the given z level that is a copy of the cells at that level
    api.getLayer = function (z) {

        var layer = [],
        i = z,
        len = api.cells.length;
        while (i < len) {

            layer.push(api.cells[i])

            i += api.d;
        }

        return layer;

    };

    // get an array that is a copy of a given depth at x,y in api.cells
    api.getDepth = function (x, y) {

        return api.cells.splice(y * api.d + api.d * api.w * x, api.d);

    };

    // dig at a location
    api.digAt = function (x, y, z, done) {

        var cell = this.getCell(x, y, z),
        self = this,
        layer,
        status = {
            amount : 0,
            dropDown : false,
            hp : cell.hp,
            canDig : cell.canDig,
            tab : {}
        };

        if (cell.hp <= 0) {

            status.dropDown = true;

            layer = this.getLayer(z);

            layer.forEach(function (otherCell) {

                if (otherCell.x >= cell.x - 1 && otherCell.x <= cell.x + 1) {

                    if (otherCell.y >= cell.y - 1 && otherCell.y <= cell.y + 1) {

                        self.getCell(otherCell.i).canDig = true;

                    }

                }

            });

            cell.done = true;

        } else {

            cell.hp -= 1;

            status.hp = cell.hp;
            if (cell.hp <= 0) {

                cell.canDig = true;
                status.hp = 0;

                if (cell.amount > 0) {

                    status.amount = cell.amount;
                    cell.amount = 0;

                }

                console.log(tabulate());

            }

        }

        // tabulate current pebble counts.
        status.tab = tabulate();
        done(status);

    };

    return api;

}
    ());
