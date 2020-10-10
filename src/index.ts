import { UserEdit } from './view/UserEdit';
import { User } from './models/User';

const user = User.buildUser({
  name: 'kokarik',
  age: 20
})
const root = document.querySelector('#root')
if (root) {
  const form = new UserEdit(root, user);
  form.render();
  console.log(form)
} else {
  throw new Error('Root element not found');
}