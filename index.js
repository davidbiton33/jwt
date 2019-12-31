const express = require('express');
const jwt = require('jsonwebtoken');
const log = require('tracer').colorConsole();

const CHANNEL_ID = 'nlAK1DXlrq7AtteM';
const CHANNEL_SECRET = 'gDkUkfaoX6ZWJgfuEgDGYWqN5GUmhI2W';

if(!CHANNEL_ID){
    log.error('channel id ');
};

if(!CHANNEL_SECRET){
    log.error('CHANNEL_SECRET');
}

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.set('view engine', 'ejs');

app.get('/', (req,res) => {
    res.render('index', {CHANNEL_ID})
})

app.get('/auth/:clientID', (req,res)=>{
    if(hasAccessToken(req)){
        const payload = {
            client: req.params.clientID,
            channel : CHANNEL_ID,
            permissions: {
                '^myroom$': {
                    publish : true,
                    subscribe:true 
                },
            },
    exp: Math.floor(Date.now() / 1000) + 60 * 3

        }

    const token = jwt.sign(payload,CHANNEL_SECRET, {algorithm: 'HS256'});
    res.send(200).end(token); 
}
else{
    res.status(403);
}
    
})




function hasAccessToken(){
    return true
}

app.listen(3000);



