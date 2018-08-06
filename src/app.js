import Data from './oop';

const form = document.querySelector('.field');
const content = document.querySelector('.content');
const error_output = document.querySelector('.message-body');
const message = document.querySelector('.message');

const data = new Data();

form.addEventListener('submit', (e) => {
  const searchTerm = document.forms[0].children[0].children[0].value;

  if (searchTerm) {
    data.getWikiData(searchTerm).then((res) => {
      console.log(res);
    });
  } else {
    data.displayError('Please enter a search term').then((err) => {
      console.log(err);
      message.classList.remove('hidden');
      error_output.textContent = err;
      setTimeout(() => {
        message.classList.add('hidden');
      }, 2000);
    });
  }

  e.target.reset();
  e.preventDefault();
});
