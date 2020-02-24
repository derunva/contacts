var readLineInterface = require('./rl')
module.exports = function (question) {
  return new Promise(function (resolve, reject) {
    readLineInterface.question(question, function(input) {
      if (input.length < 3) {
        reject("Закоротке значення")
      }
      if (input == 'die') {
        reject('закінчено ввід')
      }
      resolve(input)
    })
  })
}
