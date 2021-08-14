

module.exports = {
  index(red, res) {
    res.json({message: 'Hello world from Controller Usuário'});
  },
  create(req, res) {
    let msg = '';
    res.json({msg: msg});
  }
}