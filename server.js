const express = require('express')
const app = express()
const axios = require('axios')
const cors = require('cors')
const AxiosParamsObject = require('./classes/AxiosParamsObject')

app.use(cors({
    origin: '*'
}))

require('dotenv').config()

app.get(':endpoint([\\/\\w\\.-]*)', function (req, res) {
    let endpoint = (process.env.API_BASE_URL).replace(/\/$/, "") + req.params.endpoint
    console.log('end', req.query)
    if(req.query.my_base_url) {
        endpoint = req.params.endpoint.slice(1)
        delete req.query.my_base_url
    }
    console.log('end', req.query)

    // Remove any trailing slash from base url
    // const endpoint = (process.env.API_BASE_URL).replace(/\/$/, "") + req.params.endpoint
    console.log(endpoint)

    const paramsObj = new AxiosParamsObject()
    // paramsObj.setApiKey(process.env.API_KEY_PARAM_NAME, process.env.API_KEY)
    paramsObj.addParamsFromRequest(req)
    
    axios.get(endpoint, {
        params: paramsObj.getParams(req)
    }).then(response => {
        res.json(response.data)
    }).catch(error => {
        res.json(error)
    })
})


app.listen(8080, function(){
    console.log('Listening on port 8080')
})