const chai = require('chai');
const sinon = require('sinon')
const handler= require('../../src/service/CovidGateWayService').getCovidDetailByCountry;
const httpMocks = require('node-mocks-http')

const expect = chai.expect;
const assert = sinon.assert;

let req,res,next;

const error={
    "code": "Internal",
    "message": "Error: Error: Request failed with status code 404"
};




describe('Testing getCountryDetail',function(){
    beforeEach(function () {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        next = sinon.spy();
        req={
            params:{
                country: 'India'
            }
        };
    });

    afterEach(function () {
        req = null;
        res = null;
        next = null;

    });
    describe('getCountryDetail return success', function (){
        it('should return successful response',async ()=>{
            let response=await handler(req, res,next);
            //console.log('XXXXXXXXXX'+res._getData().country);
            expect(res._getData().country).equals('India','Countries should match.');

        });
    });

    describe('getCountryDetail return error',function (){
        it('should return error response',async ()=>{
            req={
                params:{
                    country: 'I'
                }
            };
            let response=await handler(req, res,next);
            //console.log('XXXXXXXXXX'+res._getData().country);
            expect(response()).equals(error,'Error should be there.');

        })
    });

});
