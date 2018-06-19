const router = require('express').Router();
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSK);
const loginChecker = require('../middlewares/loginCheck.mw');

router.use(require('express').json());

router.post('/', loginChecker, (req, res)=> {
  stripe.charges.create({
    amount: 500,
    currency: 'usd',
    description: '%5 for 5 email credits',
    source: req.body.id
  })
  .then(charge => {
    req.user.credits += 5;
    req.user.save()
      .then(user => res.send(user))
  })
  .catch(err => console.log(err));
});

module.exports = router;