const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fetch = require('node-fetch');
// import fetch from 'node-fetch';
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})
app.use(express.static("public"))
// Bodyparser Middleware

// Static folder

// Signup Route
app.post('/', (req, res) => {
  const { firstname, lastname, email } = req.body;

  // Make sure fields are filled
  // if (!firstName || !lastName || !email) {
  //   res.redirect('/failure.html');
  //   return;
  // }

  // Construct req data
  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstname,
          LNAME: lastname
        }
      }
    ]
  };

  const postData = JSON.stringify(data);

  fetch('https://us14.api.mailchimp.com/3.0/lists/4abb421041', {
    method: 'POST',
    headers: {
      Authorization: 'auth da825f6f4984471a1404d26e89a46ef1-us14'
    },
    body: postData
  })
    .then(res.statusCode === 200 ?
      res.redirect('/success'):
      res.redirect('/failure'))
    .catch(err => console.log(err))
})

app.get("/success",function(req,res){
  res.sendFile(__dirname+"/success.html")
})
app.get("/failure",function(req,res){
  res.sendFile(__dirname+"/failure.html")
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on ${PORT}`));