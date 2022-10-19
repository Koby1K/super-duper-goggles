const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { urlencoded } = require('body-parser')
const { ObjectId } = require('mongodb')
const PORT = (process.env.PORT || 3000)
const herokuVar = process.env.HEROKU_NAME || "kingram"
const { MongoClient, ServerApiVersion } = require('mongodb');
const MONGO_URI = "mongodb+srv://kingram:bDKr6sPxMLSwfaap@cluster0.mzkvvap.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

let someVar = "";

async function cxnDB(){
  try{
    client.connect;
    const collection = client.db("kingramquebec").collection("quotes");
    const result = await collection.find().toArray();

    console.log("cxnDB result:", result);
    return result;

  }
  catch(e){
    console.log(e)
  }
  finally{
    client.close;
  }
}

app.get('/', async (req, res) => {
  
  let quoteData = await cxnDB().catch(console.error);

  console.log("get/:", quoteData);


  res.render('index', {
     someVar: "Today young Padawan we will be training w/ a full data stack.",
     herokuVar: process.env.HEROKU_NAME,   
     quoteData: quoteData
     })
})

app.post('/addQuote', async (req, res) => {

  try {
 // console.log("req.body: ", req.body)
 // .then(result => {
  client.connect;
  const collection = client.db("kingramquebec").collection("quotes");
  await collection.insertOne(req.body)
  res.redirect('/');
  }
  catch(e){
    console.log(error)
  }
  finally{
   // client.close()
  }

    })

  app.post('/deleteQuote/:_id', async (req, res) => {

      try {
        console.log("req.params.id: ", req.params.id)

        client.connect;
        const collection = client.db("kingramquebec").collection("quotes");
        let result = await collection.findOneAndDelete( {
        "_id": ObjectId(req.params.id)
        })

        .then(result => {
        console.log(result);
        res.redirect('/');
      })
       .catch(error => console.error(error))
      }
        finally{
       // client.close()
      }
      
        })

   
app.listen(PORT, () => {
  console.log(`Server is running & listening on port ${PORT}`);
});
