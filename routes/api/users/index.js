const express = require('express');
const router = express.Router();
// const validate = require('./validation');
const guard = require('../../../helpers/guard');

const userController = require('../../../controllers/users');

router.post('/registration', userController.reg);
router.post('/login', userController.login);
router.post('/logout', guard, userController.logout);

// router
//   .get('/', contactsController.listContacts)
//   .post('/', validate.createContact, contactsController.addContact);

// router
//   .get('/:contactId', contactsController.getContactById)
//   .delete('/:contactId', contactsController.removeContact)
//   .patch(
//     '/:contactId',
//     validate.updateContact,
//     contactsController.updateContact,
//   );

module.exports = router;
