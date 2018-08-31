const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){console.log('mongoose connected!')})

let repoSchema = new mongoose.Schema({
  repoName: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repo) => {
  //create new instance of Repo
  var newRepo = new Repo({repoName: repo});
  //save instance to db
  newRepo.save();
}

Repo.find(function(err, docs) {
  console.log(docs)
})

module.exports.save = save;