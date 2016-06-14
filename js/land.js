var land = (function(){
            
            
    var api = {

        cells: [],

        // width height and depth of the land
        w: 4
        , h: 4
        , d: 5,

        // the total amount of pebble in the land
        totalPebble: 100
        , amount: 0

    },


    makeOptions = function () {

        var options = [];

        api.cells.forEach(function (cell, index) {

            options.push(index);

        });

        return options;

    },

    // hide the amount of pebble in the land
    hidePebble = (function () {

        options = [];

        return function () {

            var len = api.w * api.h * api.d,

                amount
                , remain, i,cell,z,y,z;
            
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
                hidePebble();

            } else {

                cell.amount += remain;
                api.amount += remain;

            }

        };

    }()),

    setupLand = function () {

        var i, x,y,z, len = api.w * api.h * api.d;

        api.cells = [];
        api.amount = 0;

        i = 0;
        while (i < len) {

            z = i % api.d;
            x = Math.floor(i / (api.d * api.h));
            y = Math.floor((i - (x * (api.d * api.h))) / api.d);
            
            api.cells.push({
                amount: 0,
                done:false,
                canDig: z === 0 ? true : false ,
                i:i,x:x,y:y,z:z
            });
            

            i += 1;

        }

        hidePebble();

    };

    setupLand();

    
    // get a cell by index, or x,y,z
    api.getCell = function(ix,y,z){
        
        if(y !== undefined && z !== undefined){
            
            return api.cells[api.h * api.d * ix + y * api.d + z];
            
        }else{
            
            return api.cells[ix];
            
        }
        
    };
    
    // get an 2d layer at the given z level that is a copy of the cells at that level
    api.getLayer = function(z){
        
        var layer = [],
            i = z, len = api.cells.length;
        
        while(i < len){
            
            layer.push(api.cells[i])
            
            i += api.d;
        }
        
        return layer;
        
    };
    
    // get an array that is a copy of a given depth at x,y in api.cells
    api.getDepth = function(x,y){
        
        return api.cells.splice(y * api.d + api.d * api.w * x, api.d);
        
    };
    
    // dig at a location
    api.digAt = function(x,y,z,done){
        
        var cell = this.getCell(x,y,z),
        self = this,
        layer,
        status = {     
            amount : 0,
            dropDown : false
        };
        
        if(cell.canDig){
        
            if(cell.done){
        
                status.dropDown = true
            
            }else{
            
                if(cell.amount > 0){
            
                    status.amount = cell.amount
                    cell.amount = 0;
                }
                
                layer = this.getLayer(z);
                
                layer.forEach(function(otherCell){
                    
                    
                    if(otherCell.x >= cell.x-1 && otherCell.x <= cell.x+1){
                        
                        if(otherCell.y >= cell.y-1 && otherCell.y <= cell.y+1){
                            
                            console.log(otherCell);
                            
                            self.getCell(otherCell.i).canDig = true;
                            
                        }
                        
                    }
                    
                });
        
                cell.done = true;
        
            }
        }
        
        done(status);
        
    };
    
    return api;

}());