const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();


require("./config/db").connect();

const User = require("./models/User");
const app = express();
const PORT = process.env.PORT || 4000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/api/get", async(req ,res)=>{

    try {
        const users = await User.find();
        res.status(200).send(users);
      } catch (err) {
        res.status(500).send(err.message);
      }
});

app.post("/api/post",async( req , res )=>{ 
    try  {
        const {firstName, lastName, profession, company } = req.body;
        if (!(firstName && lastName && profession && company)) {
          return res.status(400).send("all input are required");
        }
    
        // save new user
        const savedUser = await User.create({
          firstName,
          lastName,
          profession,
          company,
        });
    
        res.status(201).json({ msg: "User created", data: savedUser });
      } catch (err) {
        res.status(500).send(err.message);
      }
     



});
app.put("/api/put/:id", async(req, res)=>{



    try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: req.params.id },
          req.body,
          { new: true, useFindAndModify: false }
        );
        res.status(200).json({ messae: "user update", data: updatedUser });
      } catch (err) {
        res.status(500).send(err.message);
      }
  }
  
  
  
  
  
  );


  app.delete("/api/delete/:id" , async(req , res )=>{
    try {
        await User.deleteOne({ _id: req.params.id });
        res.status(200).send("user deleted");
      } catch (err) {
        res.status(500).send(err.message);
      }


  });
  app.listen(PORT, () => console.log(`app started on port ${PORT}`));