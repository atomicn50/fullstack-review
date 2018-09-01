const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){console.log('mongoose conncted!')})

let repoSchema = new mongoose.Schema({
  repo: {
    type: String,
    dropDups: true
  },
  forks: Number
});

repoSchema.plugin(require('mongoose-plugin-drop-duplicates'));

let Repo = mongoose.model('Repo', repoSchema);

let save = (repo, forks) => {
  var newRepo = new Repo({repo: repo, forks: forks});
  newRepo.save();
}

let findTop25 = (callback) => {
  Repo.find(function(err, repos) {
    if (err) {
      callback(err);
    } else {
      callback(null, repos)
    }
  }).sort({forks: 'descending'}).limit(25)
}

// Repo.deleteMany(function(err) {
//   console.log(err);
// });

Repo.find(function(err, docs) {
  docs.forEach(doc => {console.log([doc.repo, 'forks: ', doc.forks])})
}).sort({forks: 'descending'}).limit(5)



module.exports.save = save;
module.exports.findTop25 = findTop25;

