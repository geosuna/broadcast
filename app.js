var express = require('express');
const bodyParser = require('body-parser');
var app = express();
var QRCode = require('qrcode')
const csv = require('csv-parser');
const fs = require('fs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { Client, MessageMedia } = require('whatsapp-web.js');
const client = new Client();

client.on('qr', (qr) => {
  QRCode.toString(qr,{type:'terminal'}, function (err, url) {
  console.log(url)
})
});

client.on('ready', () => {
    console.log('Client is ready!');
    const media = MessageMedia.fromFilePath('./img/3.png');
    fs.createReadStream('./csv/5.csv')
    .pipe(csv())
    .on('data', (row) => {
      setTimeout(function(){
        console.log(row.name+' What are you waiting for to be part of APEX Call Centers? Answer this message and we will contact you to schedule an interview.');
        var w_id = '521'+row.phone_parsed+'@c.us';
        var msg = row.name+' What are you waiting for to be part of APEX Call Centers? Answer this message and we will contact you to schedule an interview.';
        client.sendMessage(w_id,media)
        client.sendMessage(w_id,msg)
}, row.timer);
    })
});

client.initialize();


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
