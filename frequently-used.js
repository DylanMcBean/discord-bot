const fs = require('fs').promises;

module.exports = {createUserIfNotReal, readSlots, writeSlots, getOrSet, addCommas};
// TODO: Move this to env
const DATA_PATH = './slotsData.json';

async function createUserIfNotReal(id) {
    const slotsData = await readSlots();
    if (slotsData[id] === undefined) {
        slotsData[id] = {balance: 500, last: 0};
        console.log('Create new user for slots');
    }
    await writeSlots(slotsData);
}

function addCommas(num){
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Returns the value for the given key,
 * or sets it as defaultValue if
 * there was no entry for the given key.
 */
function getOrSet(object, id, defaultValue) {
    const result = object[id];
    if (typeof result == "undefined" || result == null) {
        object[id] = defaultValue;    
    } else {
        object[id] = result;
        for (const [key, value] of Object.entries(defaultValue)){
            if (!(key in object[id])){
                object[id][key] = defaultValue[key];
            }
        }
        for (const [key, value] of Object.entries(object[id])){
            if (!(key in defaultValue)){
                delete object[id][key];
            }
        }
    }
    return object[id];
}

/**
 *
 * @returns {Promise<String>} Result as JSON
 */
function readSlots() {
    return new Promise((resolve, reject) => {
        fs.readFile(DATA_PATH)
            .then(text => resolve(JSON.parse(text)))
            .catch(err => reject(err));
    });
}

/**
 *
 * @param {any} serializeableObject
 * @return {Promise<void>} Result
 */
function writeSlots(serializeableObject) {
    return new Promise((resolve, reject) => {
        fs.writeFile(DATA_PATH, JSON.stringify(serializeableObject, null, 3))
            .then(resolve())
            .catch(err => reject(err));
    });
}