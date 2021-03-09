const Contact = require('./schemas/contact');

const listContacts = async (
  userId,
  { sortBy, sortByDesc, sub, page = '1', limit = '20' },
) => {
  const results = { owner: userId };
  if (sub) {
    results.subscription = { $all: [sub] };
  }
  const data = await Contact.paginate(results, {
    page,
    limit,
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
      ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
    },
    populate: {
      path: 'owner',
      select: 'email subscription -_id',
    },
  });
  const { docs: contacts, totalDocs: total } = data;
  return { total: total.toString(), page, limit, contacts };
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
