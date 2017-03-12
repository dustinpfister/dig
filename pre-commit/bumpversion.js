console.log('bumpversion.js:');

var fs = require('fs');

fs.readFile('package.json', 'utf8', function (err, data) {

    if (err) {

        console.log('error reading package.json');
        console.log(err);

    } else {

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
        fs.writeFile('package.json', JSON.stringify(pack), 'utf8', function (err) {

            if (err) {

                console.log(err);

            } else {

                console.log('lookig good');

            }

        });

    }

});
