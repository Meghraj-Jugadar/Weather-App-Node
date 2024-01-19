const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

app.use(express.static(publicDirectoryPath))

app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialPath)


app.get('/', (req,res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Meghraj'
    })
})

app.get('/about', (req,res)=>{
    res.render('about', {
        title: 'About me',
        name: 'Meghraj'
    })
})

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }

geocode(req.query.address,(error, {latitude, longitude, location} = {})=>{
    if(error){
        return res.send({error})
    }
    forecast(latitude, longitude, (error, forecastData)=>{
        if(error){
            return res.send({error})
        }

        res.send({
            forecast: forecastData,
            location,
            address: req.query.address
        })
    })
})
})


app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/about/*', (req,res)=>{
    res.render('404', {
        title: '404',
        name: 'Meghraj',
        errorMessage: 'About article not found'
    })
})

app.get('*', (req,res)=>{
    res.render('404', {
        title: '404',
        name: 'Meghraj',
        errorMessage: 'Page Not Found'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000...')
})
