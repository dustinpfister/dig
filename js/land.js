var land = (function () {

    var api = {

        cells : [],

        // width height and depth of the land
        w : 8,
        h : 8,
        d : 3,

        // the total amount of pebble in the land
        totalPebble : 1000,
        amount : 0,

        //currentHideMethod : 'random_amount', // default to single built in method

        hideMethod : {

            current : 'random_amount',
            params : {

                topLTPer : .5,
                bottomPebPer : .5,
                maxPer : .5

            }

        },

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

    // a set of tools to be used in hide methods
    hideKit = {

        makeOptions : function (z) {

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

        // splice out a random index from the given options array, and return that cell
        spliceFromOptions : function (options) {

            return api.cells[options.splice(Math.floor(Math.random() * options.length), 1)[0]];

        },

        // do what needs to get done when setting an amount for the given cell
        setAmount : function (cell, amount) {

            api.amount += amount;
            cell.total = amount;
            cell.amount = cell.total;

        },

        // for all layers
        forDepth : function (method) {

            var l = 0,
            len = api.d;
            while (l < len) {

                method(api.getLayer(l), l);

                l += 1;

            }

        }

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

                var options = hideKit.makeOptions(),
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

                    cell = hideKit.spliceFromOptions(options);

                    hideKit.setAmount(cell, amount);

                    i += 1;

                }

                if (remainAmount) {

                    cell = hideKit.spliceFromOptions(options);

                    hideKit.setAmount(cell, remainAmount);

                }

            }

        },

        // local API for hidePebble
        localAPI = function (hideMethod) {

            hideMethod = hideMethod === undefined ? 'random_amount' : hideMethod;

            methods[hideMethod].call(api, hideKit, api.hideMethod.params, api);

        };

        // list all hide methods
        localAPI.list = function () {

            return Object.keys(methods);

        };

        // inject a method
        localAPI.injectMethod = function (method) {

            methods[method.name] = method.method;

        };

        // return the localAPI
        return localAPI;

    }
        ()),

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

        // use the current hide method
        //hidePebble(api.currentHideMethod);
        hidePebble(api.hideMethod.current);

        // set amount to total
        api.amount = api.totalPebble;

    };

    //setupLand();

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

    };

    // get info about the land
    api.getInfo = function () {

        var tab = tabulate();

        return {

            tab : tab,
            tabString : tab.remaining + '/' + tab.total,
            layers : this.d,
            hideMethods : hidePebble.list()

        };

    };

    api.addHideMethod = function (methodObj) {

        hidePebble.injectMethod(methodObj);

    };

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
                cell.done = true;

            }

        }

        // tabulate current pebble counts.
        status.tab = tabulate();
        done(status);

    };

    return api;

}
    ());
