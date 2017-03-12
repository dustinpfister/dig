
var fs = require('fs'),
beautify = require('js-beautify').js_beautify;

console.log('bumpversion.js:');

// read package.json
fs.readFile('package.json', 'utf8', function (err, data) {

    if (err) {

        // if error geting package.json

        console.log('error reading package.json');
        console.log(err);

    } else {

        // reading package.json

        var pack = JSON.parse(data),
        versionNumber = pack.version.split('.');

        console.log('current version number:');
        console.log(versionNumber);

        // bump
        versionNumber[2] = Number(versionNumber[2]) + 1;

        // join back into a string
        versionNumber = versionNumber.join('.');

        console.log('bumped version number:');
        console.log(versionNumber);

        // set new version number
        pack.version = versionNumber;

        // write the change
        fs.writeFile('package.json', beautify(JSON.stringify(pack), { indent_size: 2 }), 'utf8', function (err) {

            if (err) {

                console.log(err);

            } else {

                console.log('lookig good, bumped up to: ' + versionNumber);

            }

        });

    }

});
