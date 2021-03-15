const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const mailchimp = require("@mailchimp/mailchimp_marketing");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html")
});
mailchimp.setConfig({
  apiKey: "ced87ceb98be4a0ee0d7205a2f323842-us1",
  server: "us1"
});
app.post("/", function(req, res) {
      const firstName = req.body.f;
      const lastName = req.body.l;
      const email = req.body.e;
      console.log(firstName, lastName, email);
      const listId = "85b17a1a23";
      const subuser = {
        firstName: firstName,
        lastName: lastName,
        email: email
      };
      const run = async () => {
        try {
          const response = await mailchimp.lists.addListMember(listId, {
            email_address: subuser.email,
            status: "subscribed",
            merge_fields: {
              FNAME: subuser.firstName,
              LNAME: subuser.lastName
            }
          });
      res.sendFile(__dirname+"/success.html");
    }
    catch(err){
      res.sendFile(__dirname+"/failure.html");
    }
    };
        run();
      });
app.post("/failure",function(req,res){
  res.redirect("/");
});
    app.listen(process.env.PORT || 3000, function() {
      console.log("Server is running");
    });





    //ced87ceb98be4a0ee0d7205a2f323842-us1
    //85b17a1a23
