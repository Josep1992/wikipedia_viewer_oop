import Data from './oop';

const form = document.querySelector('.field');
const content = document.querySelector('.content');
const error_output = document.querySelector('.message-body');
const message = document.querySelector('.message');

const data = new Data();

form.addEventListener('submit', (e) => {
  data.getWikiData().then((res) => {
    console.log(res.data);
  });
  e.target.reset();
  e.preventDefault();
});
