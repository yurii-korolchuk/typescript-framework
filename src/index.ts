import { UserForm } from './view/UserForm';
import { User } from './models/User';
import axios from 'axios';

const user = User.buildUser({
  name: 'kokarik',
  age: 20
})
const root = document.querySelector('#root')
if (root) {
  const form = new UserForm(root, user);
  form.render();
} else {
  throw new Error('Root element not found');
}