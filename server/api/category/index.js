'use strict';

var express = require('express');
var controller = require('./category.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/:id/questions', controller.getQuestions);
router.post('/', controller.create);
router.put('/:id', controller.upsert);
// router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

module.exports = router;
