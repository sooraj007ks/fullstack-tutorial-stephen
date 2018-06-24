const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');

const Survey = mongoose.model('Survey');

const loginCheck = require('../middlewares/loginCheck.mw');
const creditCheck = require('../middlewares/creditCheck.mw');

const Mailer = require('../controllers/Mailer.ctrl');

router.use(express.urlencoded({extended:false}));
router.use(express.json());

// router.get('/api/surveys/thanks', (req, res) => {
//   res.send('Thanks for voting');
// });
router.get('/api/surveys', loginCheck, async (req, res)=> {
  const surveys = await Survey.find({_user : req.user.id})
    .select({recipients: false});
  res.send(surveys);
});

router.get('/api/surveys/:surveyId/:choice', (req, res) => {
  res.send('Thanks for voting');
});

router.post('/api/surveys/webhook',  (req, res) => {
  const p = new Path('/api/surveys/:surveyId/:choice');

  const events = req.body.map(event => {
    const pathName = new URL(event.url).pathname
    const match = p.test(pathName);
    if (match) return {...match, email: event.email};
  });
  const compactEvents = _.compact(events);
  const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId');

  console.log(uniqueEvents);

  uniqueEvents.forEach(async( { email, choice, surveyId:_id } ) => {
    try{
      const updateRes = await Survey.updateOne(
        {
        _id,
        recipients : {
          $elemMatch : { email, responded : false}
          } 
      },
      {
        $inc : { [choice] : 1 },
        $set: { 
          'recipients.$.responded' : true,
          'recipients.$.responce' : choice 
        },
        lastResponded : new Date()
    });
      console.log('========== Vote Updation ===========');
      console.log(updateRes);
      console.log('====================================');
    }catch(err) {console.log(err)}
    
  });

  res.send({});
});

router.post('/api/surveys', loginCheck, creditCheck, async (req, res)=>{
  const { title, subject, body, recipients } = req.body;
  const survey = new Survey({
    title, 
    subject, 
    body,
    recipients: recipients.split(',').map( email => ({ email : email.trim()}) ),
    _user: req.user.id,
    dateSent: Date.now()
  });

  const mailer = new Mailer(
    survey, 
    require('../templates/survey.template')(survey)
  );

  try{
    await mailer.send();
    await survey.save();
    req.user.credits -= 1;
    const user = await req.user.save();
    res.send(user);
  }catch(err) {
    res.status(422).send(err);
  } 
  
});

module.exports = router;