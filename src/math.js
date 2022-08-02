// const cTip = (total, percentTip) => {
//     const tip = total * percentTip
//     return total + tip
// }
const cTip = (total, percentTip = 0.2) => total + (total * percentTip)
const FtoC = (temp) => (temp-32) / 1.8
const CtoF = (temp) => (temp*1.8) + 32
const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a<0 || b<0){
                return reject('Numbers must be positive')
            }
            resolve(a + b)
        },2000)
    })
}
module.exports = {
    cTip,
    FtoC,
    CtoF,
    add
}