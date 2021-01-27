const axios = require('axios');
const httpStatus = require('http-status-codes');

function getCovidDetailByCountryPromise(request,response,next){
    console.log('Inside getCovidDetailByCountryPromise'+request.params.country);
    axios.get(`https://corona.lmao.ninja/v2/countries/${request.params.country}`,
        {
            params:{
                yesterday: true,
            }
        })
        .then((res)=>{
            if(res.status ==httpStatus.OK){
                //console.log(res.data);
                response.send(res.data);
            }
        })
        .catch(error=>{
            console.log('Error occured:'+error);
            next(new Error(error))
        })
    return next;
}



//with await

async function getCovidDetailByCountry(request, response, next) {
    console.log('Inside getCovidDetailByCountry' + request.params.country);
    let res;
    try {
        res = await axios.get(`https://corona.lmao.ninja/v2/countries/${request.params.country}`,
            {
                params: {
                    yesterday: true,
                }
            })
        //console.log('covidData', res.data);
        response.send(res.data);
    } catch (err) {
        console.log(err);
        next(new Error(err));
    }

    console.log("after the call");
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
    getCovidDetailByCountryPromise,
    getJoke}
