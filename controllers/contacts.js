const Contacts = require('../model/contacts');
const { HttpCode } = require('../helpers/constants');

const listContacts = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contacts = await Contacts.listContacts(userId, req.query);
    return res.json({
      status: 'Success',
      code: HttpCode.OK,
      data: {
        ...contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contacts.getContactById(req.params.contactId, userId);

    if (contact) {
      return res.json({
        status: 'Success',
        code: HttpCode.OK,
        data: {
          contact,
        },
      });
    } else {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'Error',
        code: HttpCode.NOT_FOUND,
        message: 'Not found',
      });
    }
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contacts.addContact({ ...req.body, owner: userId });
    return res.status(HttpCode.CREATED).json({
      status: 'Success',
      code: HttpCode.CREATED,
      message: 'New contact has been added',
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contacts.removeContact(req.params.contactId, userId);

    if (contact) {
      return res.json({
        status: 'Success',
        code: HttpCode.OK,
        message: 'Contact has been deleted',
        data: {
          contact,
        },
      });
    } else {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'Error',
        code: HttpCode.NOT_FOUND,
        message: 'Not found',
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contacts.updateContact(
      req.params.contactId,
      req.body,
      userId,
    );

    if (contact) {
      return res.json({
        status: 'Success',
        code: HttpCode.OK,
        message: 'Contact has been updated',
        data: {
          contact,
        },
      });
    } else {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'Error',
        code: HttpCode.NOT_FOUND,
        message: 'Not found',
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
