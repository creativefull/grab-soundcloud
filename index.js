var request = require('request');
var config = require('./config/config'), conf = new config();

function grabUrl(url, cb) {
	var gabungan = 'https://api.soundcloud.com/resolve.json?url=' + url + '&client_id=' + conf.api_key;
	request({url : gabungan, json : true}, function (err, response, body) {
		if (err) {
			return cb('Error Get Url', null);
		}
		if (!body.errors) {
			return cb(null, body);
		}
		else {
			return cb(body.errors, null);
		}
	});	
}

module.exports = {
	getTrackDetail : function(url, cb) {
		grabUrl(url, function(err, output) {
			if (!err) {
				if (output.kind == 'track') {
					return cb(null, output);
				}
				else {
					return cb(err, null);
				}
			}
			else {
				return cb(output.errors, null);
			}
		});
	},
	getPlaylistDetail : function(url, cb) {
		grabUrl(url, function(err, body) {
			if (err) {
				return cb(err, null);
			}
			else {
				if (body.kind == 'playlist') {
					return cb(null, body);
				}
				else {
					return cb(err, null);
				}
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
		grabUrl(url, function (errors, body) {
			if (!errors) {
				if (body.kind == 'user') {
					return cb(null, body);
				}
				else {
					return cb('Url Not Valid User', null);
				}
			}
			else {
				return cb(errors, null);
			}
		});
	},
	urlDownload : function(url, cb) {
		grabUrl(url, function(err, output) {
			if (output != null) {
				if (output.kind == 'track') {
					var data = [];
					request({ url : 'https://api.soundcloud.com/i1/tracks/' + output.id + '/streams?client_id=02gUJC0hH2ct1EGOcYXQIzRFU91c72Ea&app_version=540273e'}, function(err, response, body) {
						var data2 = JSON.parse(body);
						return cb(null, data2.http_mp3_128_url);
					})
				}
				else {
					return cb('Url Not Valid Song', null);
				}				
			}
			else {
				return cb(err, null);
			}
		});
	}
}
