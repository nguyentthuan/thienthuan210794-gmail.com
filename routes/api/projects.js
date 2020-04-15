const mongoose = require('mongoose');
const router = require('express').Router();
const Projects = mongoose.model('Projects');

router.post('/', (req, res, next) => {
  const { body } = req;

  if(!body.nameProject) {
    return res.status(422).json({
      errors: {
        nameProject: 'is required',
      },
    });
  }

  if(!body.members) {
    return res.status(422).json({
      errors: {
        members: 'is required',
      },
    });
  }

  if(!body.description) {
    return res.status(422).json({
      errors: {
        description: 'is required',
      },
    });
  }

  const finalProject = new Projects(body);
  return finalProject.save()
    .then(() => res.json({ project: finalProject.toJSON() }))
    .catch(next);
});

router.get('/', (req, res, next) => {
  return Projects.find()
    .sort({ createdAt: 'descending' })
    .then((projects) => res.json({ projects: projects.map(project => project.toJSON()) }))
    .catch(next);
});

router.param('id', (req, res, next, id) => {
  return Projects.findById(id, (err, project) => {
    if(err) {
      return res.sendStatus(404);
    } else if(project) {
      req.project = project;
      return next();
    }
  }).catch(next);
});

router.get('/:id', (req, res, next) => {
  return res.json({
    project: req.project.toJSON(),
  });
});

router.patch('/:id', (req, res, next) => {
  const { body } = req;

  if(typeof body.nameProject !== 'undefined') {
    req.project.nameProject = body.nameProject;
  }

  if(typeof body.members !== 'undefined') {
    req.project.members = body.members;
  }

  if(typeof body.description !== 'undefined') {
    req.project.description = body.description;
  }

  return req.project.save()
    .then(() => res.json({ project: req.project.toJSON() }))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  return Projects.findByIdAndRemove(req.project._id)
    .then(() => res.sendStatus(200))
    .catch(next);
});

module.exports = router;