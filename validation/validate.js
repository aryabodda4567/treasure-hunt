

function isEmpty(obj) {
    if(obj === undefined || obj === null) {
        return true;
    }
    const strObj = obj.toString()
    return strObj.trim().length === 0;
}



module.exports = {isEmpty}