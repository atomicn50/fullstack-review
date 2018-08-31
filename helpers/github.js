const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, cb) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'type': 'all',
      'sort': 'created',
      'direction': 'asc'
    }
  };

  request.get(options, function(err, res, repos) {
    if (err) {
      cb(err);
    }
    cb(null, repos)
  });

  

}

module.exports.getReposByUsername = getReposByUsername;