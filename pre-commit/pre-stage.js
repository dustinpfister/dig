/*
 *    pre-stage.js
 *    what needs to get done before any files are even staged for a commit.
 *
 */

console.log('starting pre-stage processing...');

var fs = require('fs'),
compressor = require('node-minify');
path = './js',

// the compress files method
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

};

// start compression of files
compressFiles(function () {

    console.log('node-minify compression complete.');

});

/*

readJSFile = function (path,fileName) {

fs.readFile(path + '/' + fileName, 'utf8', function (err, data) {

if (err) {

console.log('error reading js file:');
console.log(err);

} else {

console.log(fileName + ' pre min file length (chars) : ' + data.length);


console.log('*****');
}

});

};

// read file names in the path
fs.readdir(path, function (err, files) {

var i = files.length,
fileName,
fileNameParts;

if (err) {

console.log('error getting files');
console.log(err);

} else {

// loop threw the files
while (i--) {

fileName = files[i],
fileNameParts = fileName.split('.');

if (fileNameParts.length >= 2 && fileNameParts[fileNameParts.length - 1] === 'js') {

// call the read file method with the given path, and filename
readJSFile(path, fileName);

}

}

}

});

*/
