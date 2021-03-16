const express = require('express');
const router = express.Router();
// const validate = require('./validation');
const guard = require('../../../helpers/guard');
const upload = require('../../../helpers/upload');

const { validateUploadAvatar } = require('./validation');

const { createAccountLimiter } = require('../../../helpers/rate-limit-reg');

const userController = require('../../../controllers/users');

router.post('/registration', createAccountLimiter, userController.reg);
router.post('/login', userController.login);
router.post('/logout', guard, userController.logout);
router.patch(
  '/avatars',
  guard,
  upload.single('avatar'),
  validateUploadAvatar,
  userController.avatars,
);

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
