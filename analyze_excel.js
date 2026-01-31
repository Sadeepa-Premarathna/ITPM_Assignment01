const XLSX = require('xlsx');

const workbook = XLSX.readFile('ITPM_A01 New.xlsx');
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

// Convert to JSON to see structure
const data = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // Array of arrays

console.log('Sheet Name:', sheetName);
console.log('Total Rows:', data.length);
if (data.length > 0) {
    console.log('Headers:', data[0]);
    console.log('First 3 data rows:');
    data.slice(1, 4).forEach((row, i) => {
        console.log(`Row ${i + 1}:`, row);
    });
}
