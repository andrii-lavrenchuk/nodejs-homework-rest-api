const User = {
  _id: '604160bf244710506826c5bc',
  subscription: 'pro',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNDE2MGJmMjQ0NzEwNTA2ODI2YzViYyIsImlhdCI6MTYxNTU0Mjg3MywiZXhwIjoxNjE1NTUwMDczfQ._3Q9Q9eoRIPn40B6ha-_Eybvp9GvZb1muv3BPiGStf4',
  email: 'example@example.com',
  password: '$2a$08$okH6376YlenyP1aDx3eJkuE6NoiQNWSXs66Mul0RQr1lrAR9S4pMi',
  avatarURL: '604160bf244710506826c5bc\\1615557622893-default.png',
};

const users = [];
users[0] = User;

const newUser = { email: 'test@test.com', password: '1234567' };

const contacts = [
  {
    _id: '604cc081ebcd820d685093d2',
    subscription: 'pro',
    name: 'First contact',
    email: 'first@gmail.com',
    phone: '12367',
    owner: '604cc04debcd820d685093d0',
  },
];

const newContact = {
  name: 'AndriiTest',
  email: 'andriiTest@gmail.com',
  phone: '4658454',
  subscription: 'premium',
};

module.exports = { User, users, newUser, contacts, newContact };
