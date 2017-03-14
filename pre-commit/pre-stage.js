/*
 *    pre-stage.js
 *    what needs to get done before any files are even staged for a commit.
 *
 */

console.log('starting pre-stage processing...');

var fs = require('fs'),
compressor = require('node-minify'),
path = './js',

// compress dev files into a ./js-min/game-dig-min.js file
compressFiles = function (done) {

    done = done === undefined ? function () {}

     : done;

    console.log('starting node-minify compression.');

    // Using UglifyJS
    compressor.minify({
        compressor : 'uglifyjs',
        //input : './js/*.js',
        input : [
            './js/land.js',
            './js/land_hide_normal1.js',
            './js/state.js',
            './js/dig.js',
            './js/load.js',
            './js/title.js',
            './js/egg.js',
            './js/main.js'
        ],
        output : './js-min/game-dig-min.js',
        callback : function (err, min) {

            done();

        }
    });

},

// update hard_settings.json for production version in js-min folder
updateHardSet = function () {

    console.log('updating hard settings...');

    fs.readFile('./js-min/hard_settings.json', 'utf-8', function (err, data_hs) {

        fs.readFile('package.json', 'utf-8', function (err, data_pack) {

            var hs = JSON.parse(data_hs);

            hs.version = JSON.parse(data_pack).version;

            fs.writeFile('./js-min/hard_settings.json', JSON.stringify(hs), 'utf-8', function (err) {

                console.log('production hard settings version updated.');

            });

        });

    });

};

// start compression of files
compressFiles(function () {

    console.log('node-minify compression complete.');
    updateHardSet();

});
