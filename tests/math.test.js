const math = require('../src/math')


test('Calculate tip + total', () => {
    const total = math.cTip(20)

    expect(total).toBe(24)
    // if (total !== 24) {
    //     throw new Error('Total should be 24. Instead gave '+total)
    // }
})

test('Calculate total with default tip.', () => {
    const total = math.cTip(20,0.3)
    expect(total).toBe(26)
})
test('Fahrenheit to Celcius', () => {
    expect(math.FtoC(32)).toBe(0)
})
test('Celsius to Fahrenheit', () => {
    expect(math.CtoF(0)).toBe(32)
})

// test('Async test demo', (done) => {
//     setTimeout(() => {
//         expect(1).toBe(2)
//         done()
//     }, 2000)
// })

test('Add two numbers', (done) => {
    math.add(2, 3).then((sum) => {
        expect(sum).toBe(5)
        done()
    })
})

test('Add two numbers async-await', async() => {
    const sum = await math.add(10,22)
    expect(sum).toBe(32)
})



