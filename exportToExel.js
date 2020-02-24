var rl = require('./rl');
var ask = require('./ask')
var fs = require('fs');
var fileName = '';
var tableHead = '';
var tableBody = '';
ask("Файл за який день >>")
  .then(function (result) {
    fileName = result + '.json'
    var data = require('./result_json/'+fileName)
    console.log(data);
    var props = []
    for (var variable in data[0]) {
      if (data[0].hasOwnProperty(variable)) {
        props.push(variable)
      }
    }

    tableHead = props.join(',') + "\n"
    for (var i = 0; i < data.length; i++) {
      var props = []
      for (var variable in data[i]) {
        if (data[i].hasOwnProperty(variable)) {
          props.push(data[i][variable])
        }
      }
      tableBody += props.join(',') + "\n"
    }
    fs.writeFile(fileName+'.csv', tableHead + tableBody,
      function (err) {
        if (err) return console.log(err);
        console.log("created " + fileName);
    })
    rl.close()
  })
