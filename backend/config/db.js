const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${process.env.DB_USER_PASS}@groupomania.cmkrwox.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));