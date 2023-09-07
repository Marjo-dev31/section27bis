const express = require('express');
const multer = require('multer');

const db = require('../data/database');

const storageConfig = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'images'); /* cb: callback, null: en cas d erreur, images: path*/
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); /* date.now: temps en milliseconde depuis 1970*/
  }
});

const upload = multer({storage: storageConfig}); /* où et comment est stocker l image*/

const router = express.Router();

router.get('/',  async function(req, res) {
  const users = await db.getDb().collection('users').find().toArray();
  res.render('profiles', {users: users});
});

router.get('/new-user', function(req, res) {
  res.render('new-user');
});

router.post('/profiles', upload.single('image'), async function(req,res) { /*middleware upload une seule image ('nom de l'input dans view'), est execute avant la fonction*/
const uploadedImageFile = req.file; /*pointe le file*/
const userData = req.body; /*pointe les données rattachées au file*/

await db.getDb().collection('users').insertOne({
  name: userData.username,
  imagePath: uploadedImageFile.path
});

res.redirect('/');
});

module.exports = router;