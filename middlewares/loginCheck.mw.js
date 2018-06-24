module.exports = (req, res, next) => {
  // if(!req.user) return res.status(401).send({error: 'Not Authorized'});
  if(!req.user) return res.redirect('/auth/google');

  next();
};