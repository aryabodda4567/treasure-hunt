const {db, collectionRef} = require("../firebase");



// Function to write JSON data to Firestore
async function writeJson(data) {
    await collectionRef.doc(data.key).set(data);
    console.log("Data written successfully to Firestore");
}

async function searchJson(key) {
    const doc = await collectionRef.doc(key).get();
    return doc.exists ? doc.data() : false;
}

// Function to update the count of a specific key by decrementing it
async function updateCount(key) {
    const docRef = collectionRef.doc(key);
    const doc = await docRef.get();

    if (!doc.exists) return false;

    const data = doc.data();
    if (data.count > 0) {
        await docRef.update({ count: data.count - 1 });
        return true;
    }
    return false;
}

// Function to get JSON data of a specified key
async function getJsonDataByKey(key) {
    const doc = await collectionRef.doc(key).get();
    return doc.exists ? doc.data() : null;
}

// Exporting functions for use in other modules
module.exports = { writeJson, searchJson, updateCount, getJsonDataByKey };
