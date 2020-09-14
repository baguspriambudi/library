const { date } = require("@hapi/joi")

const datenow = new Date().setHours(0, 0, 0, 0)
const dateback = new Date('2020-09-12').setHours(0, 0, 0, 0)

if (datenow == dateback) {
    return console.log('sama')
}
console.log('beda')
// const compare = dateback > datenow
// const difdate = Math.abs(Date.parse(2020 - 09 - 13) - Date.now())
// const oneday = 60 * 60 * 24 * 1000
// const pembagian = difdate / oneday
// const ceil = Math.ceil(pembagian)
// const jumlah = dateback + difdate
// const compare = jumlah > datenow

// return console.log(compare)
// if (compare == false) {
//     const denda = ceil * 5000
//     console.log(denda)
// }