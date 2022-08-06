const express=require('express');

const app = express();

const songs = [
    {
        id: 1,
        title: 'Never Gonna Give You Up',
        artist: 'Rick Astley',
    },
    {
        id: 2,
        title: 'First Times',
        artist: 'Ed Sheeran',
    },
    {
        id: 3,
        title: 'Into The Unknown',
        artist: 'I dont know',
    },
    {
        id: 4,
        title: 'Perfect',
        artist: 'Ed Sheeran',
    },
    {
        id: 5,
        title: 'Pay Phone',
        artist: 'Maroon 5',
    },
];

//middleware

app.use(express.json())
app.use((req,res,next) =>{
    req.songs = songs;
    next();
})

app.use((req,res,next) => {
    console.log(new Date().toJSON())
    next();
})
//controllers
const {getTitles} = require('./controllers/titles');

const {getArtists} = require('./controllers/artists');

//routes
app.get('/', (req,res) =>{
    res.json(songs);
})

app.get('/titles',getTitles)

app.get('/artists',getArtists)


app.get('/songs',(req,res) => {
    console.log(req.query.artist);
    const temp = songs.filter ((s) => {
        return s.artist == req.query.artist
    })
    res.json(temp);
})
//http://localhost:3000/songs?artist=Ed%20Sheeran

app.get('/songs/:id',(req,res) =>{
    const reqId = songs.find ((s) =>{
        return s.id == req.params.id;
    })
    res.json(reqId);
});

app.post('/songs',(req,res) =>{
    console.log(req.body)
    songs.push(req.body);
    res.sendStatus(200);
})

app.patch('/songs/:id',(req,res) =>{
    console.log(req.params.id);
    // for (let s of songs){
    //     if (s.id == req.params.id){
    //         s.artist = req.params.artist;
    //         break;
    //     }
    // }
    songs.forEach((s) => {
        if (s.id == req.params.id){
            s.artist = req.body.artist;
        }
    })
    res.sendStatus(200);
})


app.delete('/songs/:id',(req,res) =>{
    let index;
    for (let s in songs){
        if(songs[s].id == req.params.id){
            index=s;
        }
    }
    songs.splice(index,1);
    res.sendStatus(200);
})
//http://localhost:3000/songs/1
// app.get('/songs/:artist',(req,res) => {
//     console.log(req.params.artist);
//     const reqArtist = songs.filter((song) => {
//         return song.artist == req.params.artist
//     })
//     res.json(reqArtist);
// });
// (req,res) => {
//     const artists = songs.map((a) => a.artist);
//     const uniqueArtists = new Set(artists);
//     //const uniqueArray = [...uniqueArtists];
//     const uniqueArray = Array.from(uniqueArtists);
//     res.json(uniqueArray);
// })


var axios = require("axios");
app.get("/data", async function(req,res) {
    const data = await axios.get("https://workshop-backend-t22.herokuapp.com");
    console.log(data.data);
    res.send(data.data);
})
app.listen(3000, () => {
    console.log("Listening on port 3000");
});
