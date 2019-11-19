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

            row.split(',').forEach((key, index) =>
                nullRegex.test(key)
                    ? null
                    : (csvObject[headers[index]] = escapeCharacters(
                          key
                              .replace(/"/g, '')
                              .replace('False', 'false')
                              .replace('True', 'true')
                              .trim(),
                      )),
            );

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
    console.log(
        `Command line arguments count error.\nUsage: node app.js <filename.csv> <xmlKey> <first result index> <number of results>`,
    );

const parseArgv = () => ({
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
    if (process.argv.length < 4) return logArgcError();

    const dataDirectory = 'data/';
    const outputDirectory = 'output/';
    const outputFileName = outputDirectory + 'output.xml';
    const { csvFileName, xmlKey, resultIndex, resultsNumber } = parseArgv();
    const csvString = fs.readFileSync(dataDirectory + csvFileName).toString();
    const csvObjects = parseCsv(csvString);

    const xmlArray = buildXmlArrayString(
        resultIndex ? resultIndex : 0,
        resultsNumber ? resultsNumber : csvObjects.length,
        csvObjects,
        xmlKey,
    );

    fs.appendFileSync(outputFileName, xmlArray);
    if (getFileSizeInMB(outputFileName) >= 1) renameFile(outputFileName, Date.now() + '.xml');

    console.log(xmlArray);
})();
