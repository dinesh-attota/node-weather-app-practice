const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/3768c42e97c05101baa4761b2112d3a5/'+latitude+','+longitude
    const url1 = 'https://api.darksky.net/forecast/3768c42e97c05101baa4761b2112d3a5/37.8267,-122.4233'

    // request({ url: url }, (error, response) => {
    //     const data = JSON.parse(response.body)
    //     console.log(data.currently)
    // })

    // request({ url: url, json: true }, (error, response) => {   // re-structuring tom implement property short hand 
        request({ url, json: true }, (error, { body }) => { // implemented property short hand to url and destructuring response object
        // console.log(response.body.timezone)
        if (error) {
            callback('Unable to connect to weather service', undefined)
        }
        else if (body.error) { // removed response in front of body for destructuring syntax
            callback('Unable to find location to forecast', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is ' + body.currently.precipProbability + '% chance of rain')
        }
    })
}

module.exports = forecast