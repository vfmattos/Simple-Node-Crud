var express = require('express');
var router = express.Router();
const db = require('../db');

/* GET home page. */


router.get('/edit/:id', async function (req, res){
  
  const id = req.params.id;

try {

  const doc = await db.findOne(id);
  res.render('new', {title: 'Edição do cliente', doc, action: '/edit/' + doc._id});

} catch (error) {
  res.redirect(`/erro=${error}`);
}

  

});

router.get('/delete/:id', async function (req, res){
  const id = req.params.id;

  try {

    const doc = await db.deleteOne(id);
    res.redirect('/?delete=true');

  } catch (error) {
    res.redirect(`/erro=${error}`);
  }

 
});

router.get('/', async function(req, res) {

  try{

    res.render('index', { title: 'Express', action: '/new', docs: await db.findAll() });

  }

  catch(err){
    res.redirect(`/erro=${err}`);
  }
});

router.post('/new', async function(req, res) {
  const nome = req.body.nome;
  const idade = parseInt(req.body.idade);
  const uf = req.body.uf;

  try {

    await db.insert({nome, idade, uf});
    res.redirect('/?new=true');

  } catch (error) {
    res.redirect(`/erro=${error}`);
  }
  });

router.post('/edit/:id', async function(req, res) {
  const id = req.params.id;
  const nome = req.body.nome;
  const idade = parseInt(req.body.idade);
  const uf = req.body.uf;

  try {

    await db.update(id,{nome, idade, uf});
  res.redirect('/?edit=true');

  } catch (error) {
    res.redirect(`/erro=${error}`);
  }

  
});

module.exports = router;
