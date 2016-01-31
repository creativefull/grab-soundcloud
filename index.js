var request = require('request');
var config = require('./config/config'), conf = new config();

module.exports = {
	getTrackDetail : function(url, cb) {
		var gabungan = 'https://api.soundcloud.com/resolve.json?url=' + url + '&client_id=' + conf.api_key;
		request({url : gabungan, json : true}, function (err, response, body) {
			if (err) {
				return cb('Error Get Url', null);
			})
			if (!body.errors) {
				if (body.kind == 'track') {
					return cb(null, body);
				}
				else {
					return cb('Url Not Valid Song', null);
				}
			}
			else {
				return cb(body.errors, null);
			}
		});
	},
	getPlaylistDetail : function(url, cb) {
		var gabungan = 'https://api.soundcloud.com/resolve.json?url=' + url + '&client_id=' + conf.api_key;
		request({url : gabungan, json : true}, function (err, response, body) {
			if (err) {
				return cb('Error Get Url', null);
			})
			if (!body.errors) {
				if (body.kind == 'playlist') {
					return cb(null, body);
				}
				else {
					return cb('Url Not Valid Playlist', null);
				}
			}
			else {
				return cb(body.errors, null);
			}
		});
	},
	getTracksPlaylist : function(url, cb) {
		var trackList = [];
		this.getPlaylistDetail(url, function(err, doc) {
			if (doc.tracks.length != 0) {
				doc.tracks.forEach(function(track) {
					trackList.push(track)
				})				
				return cb(null, trackList)
			}
			else {
				return cb({errors : 'Tracks Not Found'}, null)
			}
		});
	},
	getAuthorDetail : function(url, cb) {
		var gabungan = 'https://api.soundcloud.com/resolve.json?url=' + url + '&client_id=' + conf.api_key;
		request({url : gabungan, json : true}, function (err, response, body) {
			if (err) {
				return cb('Error Get Url', null);
			})
			if (!body.errors) {
				if (body.kind == 'user') {
					return cb(null, body);
				}
				else {
					return cb('Url Not Valid User', null);
				}
			}
			else {
				return cb(body.errors, null);
			}
		});
	}
}
