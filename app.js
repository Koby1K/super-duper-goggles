const express = require('express')
const app = express()
const PORT = (process.env.PORT || 3000)

app.set('view engine', 'ejs')

let someVar = "";

app.get('/', function (req, res) {
  // res.send('Hello World!')
  res.render('index', {
     someVar: "Hello from young Padawan we will be training w/ a full data stack",
     herokuVar: process.env.HEROKU_NAME
     })
})

app.listen(PORT, () => {
  console.log(`Server is running & listening on port ${PORT}`);
});