wordwrap:normal

var fs = require("fs");
var characters = fs.readFileSync("./wordlist.txt").toString('utf-8');
var wordlist = characters.split("\n")

var x = "go"
var y = "cat"
var z = "thing"

function get(_letters){
  if(_letters.length == 1){ return _letters}
  var combos = []
// console.log("_letters.length", _letters.length)
  for (var i = 0; i < _letters.length; i++) {
    var letters = _letters.slice()
    var firstChar = letters.splice(i,1)
    // console.log("firstChar", firstChar)
    var suffexCombos = get(letters)
    // console.log("suffexCombos", suffexCombos)

    for (var j = 0; j < suffexCombos.length; j++) {
      // console.log("combos", suffexCombos)
      // suffexCombos[j] = firstChar + suffexCombos[j]
      combos.push( firstChar + suffexCombos[j])
    }
    combos.push(...suffexCombos)
  }
  // console.log("finalcombosL:::::::", suffexCombos)
  return combos.slice().filter(onlyUnique)
}

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

function isWord(_word){
  return wordlist.indexOf(_word) != -1
}

// console.log(get(x))
// console.log(get(y))

function solve(blob){
  return get((blob).split('')).filter(isWord).sort((a,b)=>{return a.length < b.length ? -1:1}).sort((c,d)=>{return c < d && c.length == d.length ? -1: 0})
}



solve(y).filter(isWord)



