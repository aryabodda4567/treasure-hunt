const fs = require('fs');
const filePath = 'data.json';

// Function to write or append JSON data to the file
function writeJson(data) {
    let jsonArray = [];

    // Check if file exists and read existing data
    if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf8');
        if (fileData) {
            jsonArray = JSON.parse(fileData);
        }
    }

    // Append new data
    jsonArray.push(data);

    // Write back to the file
    fs.writeFileSync(filePath, JSON.stringify(jsonArray, null, 2), 'utf8');
    console.log("Data written successfully");
}

// Function to search for a JSON object by key
function searchJson(key) {
    if (!fs.existsSync(filePath)) return false;

    const fileData = fs.readFileSync(filePath, 'utf8');
    const jsonArray = JSON.parse(fileData);

    const foundItem = jsonArray.find(item => item.key === key);
    return foundItem ? foundItem : false;
}


// Function to update the count of a specific key by decrementing it
function updateCount(key) {
    if (!fs.existsSync(filePath)) return false;

    const fileData = fs.readFileSync(filePath, 'utf8');
    let jsonArray = JSON.parse(fileData);

    let found = false;
    jsonArray = jsonArray.map(item => {
        if (item.key === key) {
            if (item.count > 0) {
                item.count -= 1;
            }else{
                return false;
            }
            found = true;
        }
        return item;
    });

    if (found) {
        fs.writeFileSync(filePath, JSON.stringify(jsonArray, null, 2), 'utf8');
        return true;
    }
    return false;
}



// Function to get JSON data of a specified key
function getJsonDataByKey(key) {
    if (!fs.existsSync(filePath)) return null;

    const fileData = fs.readFileSync(filePath, 'utf8');
    const jsonArray = JSON.parse(fileData);

    return jsonArray.find(item => item.key === key) || null;
}

// Exporting functions for use in other modules
module.exports = { writeJson, searchJson, updateCount ,getJsonDataByKey};
