// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


app.get("/api/:date?", function(req, res) {

  let d = req.params.date;
  let date = new Date(d);
  if (!req.params.date) {
    date = new Date(Date.now());
  } 
  
  if (date == 'Invalid Date' && /^[0-9]+$/.test(d)) {
    const unixDate = new Date(parseInt(d));
    let unix = Math.floor(unixDate.getTime());
    let utc = unixDate.toUTCString();
    res.json({unix: unix, utc: utc});
  } else if (date != 'Invalid Date') {
    let unix = Math.floor(date.getTime());
    let utc = date.toUTCString();
    res.json({unix: unix, utc: utc});
  } else {
    res.json({ error : "Invalid Date" });
  }
  
});
