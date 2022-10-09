const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");
const https = require("https");
const { Console } = require("console");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  var firstName = req.body.fname;
  var lastName = req.body.lname;
  var email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us10.api.mailchimp.com/3.0/lists/9d65b6cba2";

  const options = {
    method: "POST",
    auth: "akashkv11:021476036665415718b61a162e0a0a20-us10",
  };

  const request = https.request(url, options, (response) => {
    if (response.statusCode === 200) {

      res.sendFile(__dirname + "/success.html")
      
    } else {
      res.sendFile(__dirname + "/failure.html")
      
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();

});

app.post("/failure",(req,res)=>{
  res.redirect('/');
})

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running at 3000...");
});

//
