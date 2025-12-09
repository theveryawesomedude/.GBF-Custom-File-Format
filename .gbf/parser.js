const WinReg = require('winreg');
const path = require('path');

const iconPath = 'C:\\Users\\Bani\\Documents\\Custom File Formats\\goofball.ico'; // full path to your .ico
const fileExt = '.gbf';
const progId = 'GoofballFile';

// Registry keys
const classesRoot = WinReg.HKCU; // Current user

// 1. Create ProgID
const progIdKey = new WinReg({
    hive: classesRoot,
    key: `\\Software\\Classes\\${progId}`
});

progIdKey.set('', WinReg.REG_SZ, 'Goofball File', (err) => {
    if (err) console.error(err);
    else console.log('ProgID created');
});

// 2. Set DefaultIcon for ProgID
const iconKey = new WinReg({
    hive: classesRoot,
    key: `\\Software\\Classes\\${progId}\\DefaultIcon`
});

iconKey.set('', WinReg.REG_SZ, iconPath, (err) => {
    if (err) console.error(err);
    else console.log('Icon assigned to ProgID');
});

// 3. Associate .gbf with ProgID
const extKey = new WinReg({
    hive: classesRoot,
    key: `\\Software\\Classes\\${fileExt}`
});

extKey.set('', WinReg.REG_SZ, progId, (err) => {
    if (err) console.error(err);
    else console.log('.gbf extension associated with ProgID');
});

console.log('Done! You may need to restart Explorer to see the icon.');

//This is the source code for parser.exe