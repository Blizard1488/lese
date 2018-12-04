const express = require('express');
const router = express.Router();
const request = require('request');

const apiKey = '4f7a6866a558e33c158a1f964fa01884';
const city = 'Kyiv';
const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

let weather;

request(url, (err, response, body) => {
  if(err){
    console.log('error:', error);
  } else {
    const parsed = JSON.parse(body)
    weather = `It's ${parsed.main.temp} degrees in ${parsed.name}!`;
  }
});

router.get('/', (req, res, next) => {
  res.render('index', { title: 'lese', weather: weather });
});

router.get('search', (req, res) => {
  res.render('search')
})

module.exports = router;
