function getArtists(req,res){
    const artists = req.songs.map((s) =>s.artist);
    const uniqueArtists = new Set(artists);
    const uniqueArray = [...uniqueArtists];
    res.json(uniqueArray);
}

module.exports = {getArtists};