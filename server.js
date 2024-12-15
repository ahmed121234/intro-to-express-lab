const express = require('express')

const app = express()

const collectibles = [
  { name: 'shiny ball', price: 5.95 },
  { name: 'autographed picture of a dog', price: 10 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
]

const shoes = [
  { name: 'Birkenstocks', price: 50, type: 'sandal' },
  { name: 'Air Jordans', price: 500, type: 'sneaker' },
  { name: 'Air Mahomeses', price: 501, type: 'sneaker' },
  { name: 'Utility Boots', price: 20, type: 'boot' },
  { name: 'Velcro Sandals', price: 15, type: 'sandal' },
  { name: 'Jet Boots', price: 1000, type: 'boot' },
  { name: 'Fifty-Inch Heels', price: 175, type: 'heel' }
]

app.get('/greetings/:name', (req, res) => {
  console.log(req.params.name)
  res.send(`Hello there, ${req.params.name}`)
})

app.get('/roll/:number', (req, res) => {
  const { number } = req.params

  if (isNaN(number)) {
    return res.send('You must specify a number.')
  }

  const maxNumber = parseInt(number, 10)

  if (maxNumber <= 0) {
    return res.send('You must specify a number greater than 0.')
  }

  const rollRs = Math.floor(Math.random() * (maxNumber + 1))

  res.send(`You rolled a ${rollRs}.`)
})

app.get('/collectibles/:index', (req, res) => {
  const index = parseInt(req.params.index, 10)

  if (isNaN(index) || index < 0 || index >= collectibles.length) {
    return res.send('This item is not yet in stock. Check back soon!')
  }

  const item = collectibles[index]

  res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`)
})

app.get('/shoes', (req, res) => {
  let filteredShoes = [...shoes]

  const { 'min-price': minPrice, 'max-price': maxPrice, type } = req.query

  if (minPrice) {
    const minPriceValue = parseFloat(minPrice)

    if (!isNaN(minPriceValue)) {
      filteredShoes = filteredShoes.filter(
        (shoes) => shoes.price >= minPriceValue
      )
    }
  }

  if (maxPrice) {
    const maxPriceValue = parseFloat(maxPrice)
    if (!isNaN(maxPriceValue)) {
      filteredShoes = filteredShoes.filter(
        (shoe) => shoe.price <= maxPriceValue
      )
    }
  }

  if (type) {
    filteredShoes = filteredShoes.filter(
      (shoe) => shoe.type.toLowerCase() === type.toLowerCase()
    )
  }

  res.json(filteredShoes)
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
