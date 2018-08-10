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
          console.log({ data });
          let html;
          let html2;
          data[1].forEach((data) => {
            html += `
            <div class="message">
                <div class="message-header">
                 <p>${data}</p>
                </div>
                <div class="message-body"> 
                
                </div>
            </div> 
            `;
          });

          content.innerHTML = html;
          let message_body = Array.from(
            document.querySelectorAll('.message-body'),
          );

          data[2].forEach((data) => {
            html2 += `
                <p>${data}</p>  
            `;
            message_body.forEach((element) => {
              let messages = Array.from(document.querySelectorAll('.message'));

              if (
                message_body.indexOf(element) ===
                messages.indexOf(messages.children)
              ) {
                element += html2;
              }
            });
          });
        });
      })
      .catch((error) => {
        console.log(error);
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
