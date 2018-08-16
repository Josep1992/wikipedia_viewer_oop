import Data from './oop';

const form = document.querySelector('.field');
const content = document.querySelector('.content');
const error_output = document.querySelector('.message-body');
const message = document.querySelector('.message');

//Initialize the Data Class
const data = new Data();

form.addEventListener('submit', (e) => {
  const searchTerm = document.forms[0].children[0].children[0].value;

  if (searchTerm) {
    data
      .getWikiData(searchTerm)
      .then((res) => {
        data.createUi(res).then((data) => {
          const names = [...data[1]];
          const description = [...data[2]];
          const link = [...data[3]];
          //This html variable will contain the names
          let html = '';
          //This html variable will contain the names description
          let html2 = '';
          names.forEach((name, index) => {
            html += `
            <div class="message">
              <div class="message-header">
                <p>${name}</p>
              </div>
              <div class="message-body ${index}"></div>
           </div> 
           `;
          });

          content.innerHTML = html;

          description.forEach((desc, index) => {
            html2 += `<p class="description ${index}">${desc}</p>`;

            const message_body = Array.from(
              document.querySelectorAll('.message-body'),
            );

            message_body.forEach((element) => {
              element.innerHTML = html2;
            });
          });

          const message_desc = Array.from(
            document.querySelectorAll('.description'),
          );

          message_desc.forEach((desc) => {
            if (desc.parentElement.classList[1] !== desc.classList[1]) {
              desc.remove();
            }
          });
        });
      })
      .catch((error) => {
        console.log(new Error(error));
      });
  } else {
    data.displayError('Please enter a search term').then((err) => {
      console.log(err);
      content.innerHTML = '';
      message.classList.remove('hidden');
      error_output.textContent = err;
      setTimeout(() => {
        message.classList.add('hidden');
        error_output.textContent = '';
      }, 2000);
    });
  }

  e.target.reset();
  e.preventDefault();
});
