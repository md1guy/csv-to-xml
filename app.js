const fs = require('fs');

const parseCsv = csvString => {
    const csvRows = csvString.split(/\r/g);
    const [rawHeaders] = csvRows;
    const headers = rawHeaders.split(',');
    csvRows.shift();

    const csvObjects = csvRows.map(e => {
        let csvObject = {};

        const nullRegex = /NULL/;

        e.split(',').forEach((e, i) => {
            nullRegex.test(e)
                ? null
                : (csvObject[headers[i]] = e
                      .replace(/"/g, '')
                      .replace('False', 'false')
                      .trim());
        });

        return csvObject;
    });

    return csvObjects;
};

const objectToXmlString = (xmlKey, obj) =>
    `<${xmlKey} ${Reflect.ownKeys(obj).reduce(
        (acc, key) => `${acc}${key.replace(/["]/g, '')}="${obj[key]}" `,
        '',
    )}/>`;

const logArgcError = _ =>
    console.log(
        `Command line arguments count error.\nUsage: node app.js <filename.csv> <xmlKey> <first result index> <number of results>`,
    );

const parseArgv = _ => ({
    csvFileName: process.argv[2].toString(),
    xmlKey: process.argv[3].toString(),
    resultIndex: parseFloat(process.argv[4]),
    resultsNumber: parseFloat(process.argv[5]),
});

const buildXmlArrayString = (resultIndex, resultsNumber, csvObjects, xmlKey) =>
    csvObjects
        .slice(resultIndex, resultIndex + resultsNumber)
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
    if (process.argv.length !== 6) return logArgcError();

    const { csvFileName, xmlKey, resultIndex, resultsNumber } = parseArgv();
    const csvString = fs.readFileSync(csvFileName).toString();
    const csvObjects = parseCsv(csvString);
    const xmlArray = buildXmlArrayString(resultIndex, resultsNumber, csvObjects, xmlKey);
    const fileName = 'output.xml';

    fs.appendFileSync(fileName, xmlArray);
    if (getFileSizeInMB(fileName) >= 1) renameFile(fileName, Date.now() + '.xml');

    console.log(xmlArray);
})();
