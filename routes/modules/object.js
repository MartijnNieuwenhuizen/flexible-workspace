var object = {};

// Thx ycart for this function 
// source: http://stackoverflow.com/questions/909003/javascript-getting-the-first-index-of-an-object
object.getFirst = function(obj) {
    
    for (var a in obj) return a;

}

module.exports = object;