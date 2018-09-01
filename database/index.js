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
  forks: Number,
  url: String
});

repoSchema.plugin(require('mongoose-plugin-drop-duplicates'));

let Repo = mongoose.model('Repo', repoSchema);

let save = (repo, forks, url) => {
  var newRepo = new Repo({repo: repo, forks: forks, url: url});
  newRepo.save();
}

let findTop25 = (callback) => {
  Repo.find(callback).sort({forks: 'descending'}).limit(25);

}

// Repo.deleteMany(function(err) {
//   console.log(err);
// });

// Repo.find(function(err, docs) {
//   docs.forEach(doc => {console.log(doc)})
// }).sort({forks: 'descending'}).limit(5)



module.exports.save = save;
module.exports.findTop25 = findTop25;

