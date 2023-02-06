const express= require("express");
const bodeParser=require("body-parser");
const request=require("request");
const https=require("https");
const app=express();
app.use(bodeParser.urlencoded({extended:true}))
app.use(express.static("public"))
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})
app.post("/",function(req,res){
    const Firstname=req.body.firstname;
    const Lastname=req.body.lastname;
    const Email=req.body.email;
    const data={
        member:[{
            email_address:Email,
            status:"subscribed",
            merge_fields :{
                FNAME:Firstname,
                LNAME:Lastname
            }
        }
        ]
    }
    const Jsondata=JSON.stringify(data);
    // console.log(Jsondata);
    const options={
        method:'POST',
        auth:"sahil:da825f6f4984471a1404d26e89a46ef1-us14"
    }
    const request=https.request("https://us14.api.mailchimp.com/3.0/lists/4abb421041",options,function(response){
        if(response.statusCode===200){
            res.redirect('/success')
        }
        else res.redirect('/failure')
       
    })
    request.write(Jsondata);
    request.end();
})
app.get("/success",function(req,res){
    res.sendFile(__dirname+"/success.html")
  })
  app.get("/failure",function(req,res){
    res.sendFile(__dirname+"/failure.html")
  })
app.listen(process.env.PORT|| 3000,function(){
    console.log("Server is running on port 3000");
})