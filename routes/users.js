const express = require('express');
const multer = require('multer');

const upload = multer();

const router = express.Router();

router.get('/', function(req, res) {
  res.render('profiles');
});

router.get('/new-user', function(req, res) {
  res.render('new-user');
});

router.post('/profiles', upload.single('image'), function(req,res) { /*middleware upload une seule image ('nom de l'input dans view'), est execute avant la fonction*/
const uploadedImageFile = req.file; /*donne acces et store automatiquement le file*/
const userData = req.body;
});

module.exports = router;