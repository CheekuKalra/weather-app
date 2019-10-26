const request = require('request')

const forecast = (latitude, longitude, callback) => {

const url = 'https://api.darksky.net/forecast/f2410dec8c6ec704b719c3d49daa12bc/' + latitude + ',' + longitude

request({

    url,
    json: true
}, (error, {body}) => {

    if (error) {
        callback('Unable to connect to the app', undefined)
    } else if (body.error) {
        
        callback('please provide correct input', undefined)
    } else {
        callback(undefined,
                body.daily.data[0].summary + 'It is currently ' + body.currently.temperature + ' degrees out. ' + 'There is ' + body.currently.precipProbability + ' % chance of rain')
         }

        })


    }

module.exports = forecast