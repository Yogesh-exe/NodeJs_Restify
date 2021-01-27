const restify = require('restify')
const covidService =require('./service/CovidGateWayService')
const server = restify.createServer()

const logger=(req,res,next)=>{
    console.log('interceptin..');
    next();
}
server.use(logger);

server.listen(3000,()=>{
    console.log(`Server started on ${server.url}`)
})

server.get("/countries/:country",covidService.getCovidDetailByCountry)
server.get("/countries/promise/:country",covidService.getCovidDetailByCountryPromise)
