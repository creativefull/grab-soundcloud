# grab-soundcloud
TO GET ALL DESCRIPTION FROM URL SONG ON SOUNDCLOUD

Install Module
```
npm install grab-soundcloud
```

How to use
```
var soundcloud = require('grab-soundcloud');
```

Get Track Detail
```
soundcloud.getTrackDetail('URL SONG', function(err, doc) {
  // output
  console.log(doc);
});
```
Get Playlist Detail
```
soundcloud.getPlaylistDetail('URL PLAYLIST', function(err, doc) {
  // output
  console.log(doc);
});
```
Get All Track In Playlist
```
soundcloud.getTracksPlaylist('URL PLAYLIST', function(err, doc) {
  // output
  console.log(doc);
});
```
Get Author Detail
```
soundcloud.getAuthorDetail('URL PLAYLIST', function(err, doc) {
  // output
  console.log(doc);
});
```

Contributor
@creativefull
