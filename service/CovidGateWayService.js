const axios = require('axios');
const httpStatus = require('http-status-codes');
var restify = require('restify');

async function getCovidDetailByCountry(request,response,next){
console.log('Inside getCovidDetailByCountry'+request.params.country);
let covidData;
    await axios.get(`https://corona.lmao.ninja/v2/countries/${request.params.country}`,
        {
            params:{
                yesterday: true,
            }
        })
        .then((res)=>{
            if(res.status ==httpStatus.OK){
                //console.log(res.data);
                covidData={...res.data};
            }
        })
        .catch(error=>{
            console.log('Error occured:'+error);
        })
    console.log('covidData',covidData);
    response.send(covidData);
    return next;
}

// getCovidDetailByCountry({
//     params:{
//         country: 'Italy'
//             }
//     });


function getJoke(req,res,next){

    axios.get('https://api.chucknorris.io/jokes/search',
        {
            params:{
                query: "moon"
            }
        })
        .then((res)=>{
            for(const joke of res.data.result){
                console.log(joke.value);
            }

        })
        .catch(error=>{
            console.log(error);
        })
}

module.exports= {getCovidDetailByCountry,
    getJoke}
