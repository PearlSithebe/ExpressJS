const express = require("express");
const app = express();
const fs = require('fs');
const data = fs.readFileSync("./database.json")
const musicians = JSON.parse(data);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.sendFile(`${__dirname}/index.html`));
// app.get("/", (req, res) => res.sendFile(`${__dirname}/database.js`));

//listen on port 3090
app.listen(3090, () => console.log("listening on port 3090"));


app.post('/api', (req, res) => {
  let music = [];
        let musicArray = fs.readFileSync(musicians)
        for(i < 0; i < musicArray.length; i++) {
          musicArray[i].push(music)
        }
        res.send(music);
        
})



// //get all data
// app.get("/get/", (req, res) => {
//   res.send(musicians);
// });

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
app.post("/edit", (req, res) => {
  const Selected = musicians.some(Musician => Musician.id === parseInt(req.body.id));

  if (Selected) {
    const UpdateMusician = req.body;
    musicians.forEach(Musician => {
      if (musician.id === parseInt(req.body.id)) {
        musician.name = UpdateMusician.name
          ? UpdateMusician.name
          : Musician.name;
          
        res.json({ msg: "Musician has been updated", Musician });
      }
    });
  }
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

//sort
// app.get("/", (req, res) => {
//   musicians.sort(() => (musician[i].name > musician[i+1].name ? 1 : -1));
//   res.json(musicians);
// });