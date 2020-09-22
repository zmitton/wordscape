var fs = require("fs");
var characters = fs.readFileSync("./wordlist.txt").toString('utf-8');
var wordlist = characters.split("\n")


  function get(_letters){
    if(_letters.length == 1){ return _letters}
    var combos = []

    for (var i = 0; i < _letters.length; i++) {
      var letters = _letters.slice()
      var firstChar = letters.splice(i,1)
      var suffexCombos = get(letters)

      for (var j = 0; j < suffexCombos.length; j++) {
        combos.push( firstChar + suffexCombos[j])
      }
      combos.push(...suffexCombos)
    }
    return combos.slice().filter(onlyUnique)
  }

  function onlyUnique(value, index, self) { 
      return self.indexOf(value) === index;
  }

  function isWord(_word){
    return wordlist.indexOf(_word) != -1
  }


  function solve(blob){
    return get((blob).split('')).filter(isWord).sort((a,b)=>{return a.length < b.length ? -1:1}).sort((c,d)=>{return c < d && c.length == d.length ? -1: 0})
  }

  function find(){
    // console.log("Here")
    var letters = document.getElementById("letters").value.toLowerCase()
    var words = solve(letters)
    var text = ""
    words.forEach((word)=>{return text += word + " "})
    // console.log(words)
    document.getElementById("words").innerHTML = text
  }

solve(y).filter(isWord)



