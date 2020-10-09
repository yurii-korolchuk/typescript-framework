import { UserForm } from './view/UserForm';
import { User } from './models/User';

const user = User.buildUser({
  name: 'kokarik',
  age: 20
})

const form = new UserForm(document.querySelector('#root'), user);
form.render();