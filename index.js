const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// const {connectMongodb}=require("./connection");

const PORT =process.env.PORT|| 5050;
// connectMongodb("mongodb://localhost:27017").then(()=>{
//     console.log("database connected")
// }).catch((err)=>console.log(err)
// )
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const { AES, enc,format, mode, pad } = require('crypto-js');
const Base64 = require('crypto-js/enc-base64');




function decryptEas(data, key, iv) {
    const keys = Base64.parse(key);
    const ivs = Base64.parse(iv);
    // convert to binary data
    return AES.decrypt(data, keys, {
      iv: ivs,
      mode: mode.CBC,
      padding: pad.Pkcs7,
      format: format.Hex,
    }).toString(enc.Utf8);
  }
  
  
  function handlCallback(req, res) {
    const result = req.body.response;
    var dataitems = decryptEas(
      result,
      "JoYPd+qso9s7T+Ebj8pi4Wl8i+AHLv+5UNJxA3JkDgY=",
      "hlnuyA9b4YxDq6oJSZFl8g=="
    );
    const parsedData = JSON.parse(dataitems);
    console.log("data", parsedData);
    res.send(parsedData);
    
  }

 app.get("",(req,res)=>{
     res.send("hello from server");
})

  app.post("/callback", handlCallback);
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  })
  