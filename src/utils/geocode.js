const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?types=address&access_token=pk.eyJ1IjoiZGluZXNoNTIyIiwiYSI6ImNrOGFlNzhsMzAwdTAzZXFmbzRsa2I3eW4ifQ.X5yh-vJ8EVKUOLT-MQGlnA&limit=1'

    request({ url, json:true }, (error, { body }) => {// implemented property short hand to url and destructuring response object
        if(error){
            callback('Unable to connect to location services', undefined)
        }else if(body.features.length === 0){// removed response in front of body for destructuring syntax
            callback('Unable to find location. Try another search', undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode