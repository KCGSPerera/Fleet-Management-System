 const express = require("express")
const collection = require ("./mongo")
const cors = require("cors")
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors())

app.get("/", cors() , (req,res) => {
    res.send("Hello, this is a GET request response.");
})
 
app.post("/", async(req,res) => {
    const {email , password} = req.body
    try {
            const check = await collection.findOne({email:email})

            if(check){
                res.json("exist")
            }else{
                res.json("notexist")
            }
    }
    catch{
        console.error("Error:", error.message);
        res.json("notexit")
    }
})

app.listen(3000,() => {
    console.log("Port Connected");
})
 