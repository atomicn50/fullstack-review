const express = require('express');
const bodyParser = require('body-parser');
const github = require('../helpers/github.js');
const db = require('../database/index.js');
let app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  var username = req.body.username;

  github.getReposByUsername(username, function(err, repos) {
    if (err) {
      console.log(err);
      return;
    }
    var repos = JSON.parse(repos);
    var repoNames = [];

    repos.forEach(repo => {
      var name = repo.name;
      var forks = repo.forks;

      repoNames.push(name);
      db.save(name, forks);
    });
    
    res.send(repoNames);
  });
});

app.get('/repos', function (req, res) {
  db.findTop25(function(err, repos) {
    if (err) {
      console.log(err);
      return;
    }
    var repoNames = [];

    repos.forEach(repo => {
      repoNames.push(repo.repo)
    });
    res.send(repoNames)
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

