const express = require("express");
const app = express();
const musician = require('./database.js')
const fs = require('fs');
const data = fs.readFileSync("./database.js")
const musicians = JSON.parse(data);
const jsonfile = require('jsonfile')
const bodyparser = require('body-parser')

app.use(bodyparser.json(musician))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.sendFile(`${__dirname}/index.html`));


//listen on port 3090
app.listen(3090, () => console.log("listening on port 3090"));


app.post('/api', (req, res) => {
  let music = [];
  let name = req.body.name;
  let song = req.body.song;
  let id = req.body.id;
  music.push(name,song,id);
  res.json(music);
        
})

// Create a new Musician
app.post("/add", (req, res) => {
  const newMusician = {
    id: musicians.length + 1,
    name: req.body.name,
    song: req.body.song
  };
  musicians.push(newMusician);
  console.log(musicians)
  res.json(musicians);
  var s = JSON.stringify(musicians);
  fs.writeFile('database.json', s, function(){

  })
res.redirect('/')
  
});

// Update a Musician
app.post("/:edit", (req, res) => {
  let id = req.body.id;
  let newName = req.body.name;

  jsonfile.readFile("./database.json", function(err,obj) {
      let newObj = obj;

      newObj[id].name = newName;
      
      jsonfile.writeFile("./database.json", newObj, function(err) {
        if(err){
           throw err;
        }
      })
  })
  


  });
// Delete a  Musician
app.post("/delete", (req, res) => {
  const Selected = musicians.some(Musician => Musician.id === parseInt(req.body.id));

  if (Selected) {
    res.json({
      msg: "Musician has been deleted",
      musicians: musicians.filter(Musician => Musician.id !== parseInt(req.body.id))
    });
      }
  
});

sort
app.get("/sort", (req, res) => {
  musicians.sort((a,b) => (musician[a].name > musician[b].name ? 1 : -1));
  res.json(musicians);
});