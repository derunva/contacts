var rl = require('./rl');
var ask = require('./ask')

var fileName = '';
var search = '';
ask("Файл за який день >>")
  .then(function (result) {
    fileName = result + '.json'
    return ask("пошукове слово >>")
  })
  .then(function (result) {
    search = result
    var data = require('./result_json/'+fileName)

    // JavaScript Array filter
    var result = data.filter(function (item) {
      return item.country.includes(search) || item.name.includes(search) || item.surname.includes(search)
    })
    console.log(result);
    rl.close()
  })
