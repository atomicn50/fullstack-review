const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){console.log('mongoose conncted!')})

let repoSchema = new mongoose.Schema({
  repoName: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repo) => {
  var newRepo = new Repo({repoName: repo});
  newRepo.save();
}

// Repo.find(function(err, docs) {
//   docs.forEach(doc => {console.log(doc.repoName)})
// })

module.exports.save = save;
// module.exports.find = Repo.find;