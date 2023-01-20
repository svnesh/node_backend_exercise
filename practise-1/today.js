module.exports.getDate = function getDate(){
    var iesttime = new Date().toLocaleString("en-US", {timeZone: "Australia/Brisbane"});
    return iesttime;
}