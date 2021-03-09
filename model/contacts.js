const Contact = require('./schemas/contact');

const listContacts = async (
  userId,
  { sortBy, sortByDesc, filter, limit = '5', offset = '0' },
) => {
  const results = await Contact.paginate(
    { owner: userId },
    {
      limit,
      offset,
      populate: {
        path: 'owner',
        select: 'name email subscription -_id',
      },
    },
  );
  const { docs: coontacts, totalDocs: total } = results;
  return { total: total.toString(), limit, offset, coontacts };
};

const getContactById = async (contactId, userId) => {
  const result = await Contact.findOne({
    _id: contactId,
    owner: userId,
  }).populate({
    path: 'owner',
    select: 'name email subscription -_id',
  });

  return result;
};

const removeContact = async (contactId, userId) => {
  const result = await Contact.findOneAndRemove({
    _id: contactId,
    owner: userId,
  });
  return result;
};

const addContact = async body => {
  const result = await Contact.create(body);
  return result;
};

const updateContact = async (contactId, body, userId) => {
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
    { ...body },
    { new: true },
  );
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
