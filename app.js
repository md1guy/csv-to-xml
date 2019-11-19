const fs = require('fs');

const parseCsv = csvString => {
    const csvRows = csvString.split(/\r/g);
    const [rawHeaders] = csvRows;
    const headers = rawHeaders.split(',');
    csvRows.shift();

    const csvObjects = csvRows
        .filter(row => row !== '\n')
        .map(row => {
            let csvObject = {};

            const nullRegex = /NULL/;
            const csvValueRegex = /(?<=")[^"]+?(?="(?:\s*?,|\s*?$))|(?<=(?:^|,)\s*?)(?:[^,"\s][^,"]*[^,"\s])|(?:[^,"\s])(?![^"]*?"(?:\s*?,|\s*?$))(?=\s*?(?:,|$))|(,"")|("",)|(,"",)/g;
            const emptyStringRegex = /(,"")|("",)|(,"",)/;

            row.match(csvValueRegex).forEach((key, index) => {
                if (emptyStringRegex.test(key)) {
                    csvObject[headers[index]] = '';
                } else if (!nullRegex.test(key)) {
                    csvObject[headers[index]] = escapeCharacters(
                        key
                            .replace(/"/g, '')
                            .replace('False', 'false')
                            .replace('True', 'true')
                            .trim(),
                    );
                }
            });

            return csvObject;
        });

    return csvObjects;
};

const escapeCharacters = str =>
    str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/'/g, '&apos;')
        .replace(/"/g, '&quot;');

const objectToXmlString = (xmlKey, obj) =>
    Reflect.ownKeys(obj).reduce(
        (acc, key) => `${acc} ${key.replace(/["]/g, '')}="${obj[key]}"`,
        `<${xmlKey}`,
    ) + '/>';

const logArgcError = () =>
    console.log(`Command line arguments count error.\nUsage: node app.js <filename.csv>`);

const buildXmlArrayString = (csvObjects, xmlKey) =>
    csvObjects
        .slice(0, csvObjects.length)
        .reduce((acc, value) => `${acc}${objectToXmlString(xmlKey, value)} \n\n`, '');

const getFileSizeInMB = fileName => {
    const stats = fs.statSync(fileName);
    const fileSizeInBytes = stats.size;
    return fileSizeInBytes / 1000000.0;
};

const renameFile = (oldName, newName) => {
    fs.rename(oldName, newName, e =>
        e ? console.log('Error occured while renaming the file: ' + err) : null,
    );
};

(function() {
    if (process.argv.length < 1) return logArgcError();

    const dataDirectory = 'data/';
    const outputDirectory = 'output/';
    const outputFileName = outputDirectory + 'output.xml';
    const csvFileName = process.argv[2].toString();
    const csvString = fs.readFileSync(dataDirectory + csvFileName + '.csv').toString();
    const csvObjects = parseCsv(csvString);
    const xmlArray = buildXmlArrayString(csvObjects, csvFileName);

    fs.appendFileSync(outputFileName, xmlArray);
    if (getFileSizeInMB(outputFileName) >= 1) renameFile(outputFileName, Date.now() + '.xml');

    console.log(xmlArray);
})();
