const express = require('express')

const app = express()

//Greetings
app.get('/greetings/:username', (req, res) => {
    const username = req.params.username;
    res.send(`<h1>Hello, ${username}!</h1>`);
});

//Roll the dice
app.get('/roll/:number', (req, res) => {
    const number = Number(req.params.number)
    if (isNaN(number)){
        res.send('You must specify a number.');
    }
    else {
        const randomNumber = Math.floor(Math.random() * (number + 1));
        res.send(`You rolled a ${randomNumber}`);
    }
});

//collectibles array
const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

  //collectibles/index-parameter
  app.get('/collectibles/:index', (req, res) => {
    const index = Number(req.params.index);

    if (isNaN(index) || index < 0 || index >= collectibles.length) {
        res.send('This item is not yet in stock. Check back soon!');
    }
    else {
        const item = collectibles[index];
        res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!!!`);
    }
  });

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];


  //route for /shoes
  app.get('/shoes', (req, res) => {
    let filteredShoes = [];
    const minPrice = Number(req.query['min-price']);
    const maxPrice = Number(req.query['max-price']);
    const type = req.query.type

    for (let i =0; i < shoes.length; i++) {
        const shoe = shoes[i];
        let includeShoe = true;

        if (!isNaN(minPrice) && shoe.price < minPrice) {
            includeShoe = false;
        }

        if (!isNaN(maxPrice) && shoe.price > maxPrice) {
            includeShoe = false;
        }
        if (type && shoe.type !== type) {
            includeShoe = false;
        }
        if (includeShoe) {
            filteredShoes.push(shoe);
        }
    }
    res.json(filteredShoes);
  });

app.listen(3000, () => {
    console.log('Listening on port 3000');
});