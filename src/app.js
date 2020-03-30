const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.Port || 3000
//Define Paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Set up handle bars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Dinesh A'
    })
})

// app.get('', (req, res) => { // callback has 2 arguments 1. has incoming request type to the server 2. response contains bunch of methods allowing us to customize what we gonna send back to the corresponding request
//     res.send('<h1> Express </h1>')
// })

app.get('/help', (req, res) => { 
    // res.send([{
    //     name:'Dinesh',
    //     age: 27
    // },{
    //     name:'Sony',
    // }
    // ])
    res.render('help',{
        helpText: 'Some helpful text',
        title: 'Help',
        name: 'Dinesh '
    })
})

app.get('/about', (req, res) => { 
    // res.send(' <h1> About Page </h1>')
    res.render('about',{
        title: 'About Me',
        name: 'Dinesh'
    })
})

app.get('/weather', (req, res) => { 
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {} ) => {
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send( {error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send('You must provide a search term ')
    }
    console.log(req.query.search)  
    res.send({
        products: []
    })
})

app.get('*/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help',
        name: 'Dinesh',
        errorMessage: 'Help Article not found '
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Dinesh',
        errorMessage: 'Page Not Found'
    })
})

app.listen(port, () => {
    console.log('Server is UP on port'+ port)
})

