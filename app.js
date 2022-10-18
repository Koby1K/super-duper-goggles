const express = require('express')
const app = express()
const PORT = (process.env.PORT || 3000)
const { MongoClient, ServerApiVersion } = require('mongodb');
const MONGO_URI = "mongodb+srv://kingram:bDKr6sPxMLSwfaap@cluster0.mzkvvap.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

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

  // console.log("get/:", result);


  res.render('index', {
     someVar: "Hello young Padawan we will be training w/ a full data stack",
     herokuVar: process.env.HEROKU_NAME,   
   //  quoteData: result
     })
})

app.listen(PORT, () => {
  console.log(`Server is running & listening on port ${PORT}`);
});
