const path = require('path')
const express = require ('express')
const hbs = require('hbs')
const geoCode = require('./utils.js/geocode')
const forecast = require('./utils.js/forecast')

const app = express()

// Define path for expree config
const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)


// setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {

    res.render('index', {

        title: 'Weather App',
        name: 'Chirag Kalra'
    })
})

app.get('/products', (req, res) =>{


    if (!req.query.search) {
        
        return res.send({
            error: 'Please provide a search term!'
        })
    }


    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/about', (req, res) => {

    res.render('about', {
        title: 'I am the about Page',
        name: 'Chirag Kalra'
    })
})

app.get('', (req, res) => {

    res.send('Hello express')
})

// app.get('/help', (req, res) => {

//     res.send('Help Page')
// })

app.get('/help', (req, res) => {

    res.render('help', {

        title: 'HELP ME BITCH!',
        name: "I'M DYING"
    })
})


//app.com
// app.com/help
// app.com/about

app.get('/about', (req, res) => {

    res.send('<h1> Welcome to the About Page </h1>')
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        
        return res.send({
            error: 'Please provide the address'
        })
    }

    geoCode(req.query.address, (error, {latitude, longitude, placeName} = {}) => {

        if (error) {
            
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {

            if (error) {
            
                return res.send({error})
            }

            res.send({

                forecast: forecastData,
                placeName,
                address: req.query.address

            })
        })
    })
    // res.send([{
    //     location: 'New Delhi',
    //     forecast: 'Partially Cloudy',
    //     address: req.query.address

    // }, {
    //     MaxTemp: 30,
    //     MinTemp: 18

    // }])
})

app.get('/help/*', (req, res) => {
    res.render('404_univ', {

        title: 'Help Article not found'
    } )
})

app.get('*', (req, res) => {

    res.render('404_univ', {

        title: 'Page not found'

    } )
})

app.listen(3000, () => {
console.log('Server is up on port 3000.')
})