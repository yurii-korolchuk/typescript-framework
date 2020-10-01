import { User } from './models/User';

const user = new User({
  name: 'kokarik'
})

console.log(user.get('name'));