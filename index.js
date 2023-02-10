const http = require('http');
const express = require('express');

const router  = express();

router.get('/',(req,res)=>{
	res.send("It's Alive!");
});

const server = http.createServer(app);

 server.listen(8000);



