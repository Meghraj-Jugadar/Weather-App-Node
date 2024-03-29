const request=require('request')


const forecast = (latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=e6801d6906e004c8c3e8dfb748087743&query='+latitude+','+longitude+''
    
    request({url, json:true}, (error, { body })=>{
        if(error){
            callback('Unable to connect to location services!', undefined)
        }
        else if(body.error){
            callback('Unable to find location.', undefined)
        }
        else{
            callback(undefined, body.current.weather_descriptions[0])
        }
    })
}


module.exports=forecast