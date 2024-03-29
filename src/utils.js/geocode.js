const request = require('request')

const geoCode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiY2hpcmFna2FscmEiLCJhIjoiY2syM3BmNmYxMHAybDNnbXplbWhkZ2FoeSJ9.mwdYiTPW1JxxNULNZRQ1Uw'
    request({
        url,
        json: true
    }, (error, {body}) => {
    
        if (error) {
            callback('Unable to connect to the weather app!', undefined)
        } else if (body.features.length === 0) {
            
        callback('Unable to find location', undefined)
        } else {
    
            callback(undefined, {
    
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                placeName: body.features[0].place_name
            })
        }
       
    })
    }

  module.exports = geoCode