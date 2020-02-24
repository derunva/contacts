var ask = require('./ask')
var readLineInterface = require('./rl')
var fs = require('fs');
var moment = require('moment');
var contacts = []
function recursionAsk() {

  var contact = {}
  ask("Your name is? ")
    .then(function (result) {
      console.log("Name is ", result)
      // у об'єкт контакт додаємо властивість name та записуєм в неї результат
      contact.name = result
      return ask("Your surname ? ")
    })
    .then(function (result) {
      console.log("Surname is ", result)
      contact.surname = result
      return ask("Your country ? ")
    })
    .then(function (result) {
      console.log("Country is ", result)
      contact.country = result
    }).finally(function (){

      if (JSON.stringify(contact).includes('exit')) {
        console.log(contacts);
        var fileName = moment().format('YYYY-MM-DD') + '.json'
        fs.writeFile(
          [__dirname, 'result_json', fileName].join('/'),
          JSON.stringify(contacts),
          function (err) {
            if (err) return console.log(err);
            console.log("created " + fileName);
        });
        readLineInterface.close()
      } else {
        console.log(contact);
        contacts.push(contact)
        recursionAsk()
      }
    }).catch(function (err) {
      readLineInterface.close()
      console.log(err);
    })
}
recursionAsk()
