import Data from './oop';

const form = document.querySelector('.field');
const content = document.querySelector('.content');
const error_output = document.querySelector('.message-body');
const message = document.querySelector('.message');

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
          data.forEach((data) => {
            html += `
            <div class="notification">
                <p>
                  <a href='#' class="notification__no-underline">${data}</a>
                </p>  
            </div> 
            `;
          });

          // let html2;
          // data[2].forEach((data) => {
          //   html2 += `
          //   <div class="notification">
          //       <p>
          //         <a href='#'class="notification__no-underline">${data}</a>
          //       </p>
          //   </div> `;
          // });

          content.innerHTML = html;
          // content.insertAdjacentHTML('beforeend', html2);
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
