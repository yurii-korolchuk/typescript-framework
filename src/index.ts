import { User } from './models/User';

const user = User.buildUser({
  name: 'kokarik',
  age: 123
});

user.on('change', () => {
  console.log(user)
});

user.save();