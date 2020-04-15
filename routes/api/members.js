const mongoose = require('mongoose');
const router = require('express').Router();
const Members = mongoose.model('Members');

router.post('/', (req, res, next) => {
  const { body } = req;

  if(!body.fullname) {
    return res.status(422).json({
      errors: {
        fullname: 'is required',
      },
    });
  }

  if(!body.birthday) {
    return res.status(422).json({
      errors: {
        birthday: 'is required',
      },
    });
  }

  if(!body.phone) {
    return res.status(422).json({
      errors: {
        phone: 'is required',
      },
    });
  }

  const finalMember = new Members(body);
  return finalMember.save()
    .then(() => res.json({ member: finalMember.toJSON() }))
    .catch(next);
});

router.get('/', (req, res, next) => {
  return Members.find()
    .sort({ createdAt: 'descending' })
    .then((members) => res.json({ members: members.map(member => member.toJSON()) }))
    .catch(next);
});

router.param('id', (req, res, next, id) => {
  return Members.findById(id, (err, member) => {
    if(err) {
      return res.sendStatus(404);
    } else if(member) {
      req.member = member;
      return next();
    }
  }).catch(next);
});

router.get('/:id', (req, res, next) => {
  return res.json({
    member: req.member.toJSON(),
  });
});

router.patch('/:id', (req, res, next) => {
  const { body } = req;

  if(typeof body.fullname !== 'undefined') {
    req.member.fullname = body.fullname;
  }

  if(typeof body.birthday !== 'undefined') {
    req.member.birthday = body.birthday;
  }

  if(typeof body.phone !== 'undefined') {
    req.member.phone = body.phone;
  }

  return req.member.save()
    .then(() => res.json({ member: req.member.toJSON() }))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  return Members.findByIdAndRemove(req.member._id)
    .then(() => res.sendStatus(200))
    .catch(next);
});

module.exports = router;