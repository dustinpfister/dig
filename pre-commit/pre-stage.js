/*
 *    pre-stage.js
 *    what needs to get done before any files are even staged for a commit.
 *
 */

console.log('starting pre-stage processing...');

var fs = require('fs'),
path = './js';

fs.readdir(path, function (err, files) {

    var i = files.length,
    item,
    itemParts;

    // loop threw the files
    while (i--) {

        item = files[i],
        itemParts = item.split('.');

        if (itemParts.length >= 2 && itemParts[itemParts.length - 1] === 'js') {

            fs.readFile(path + '/' + item, 'utf8', function (err, data) {

                console.log(data)

            });

        }

    }

});
