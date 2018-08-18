import Data from './oop';

const form = document.querySelector('.field');
const content = document.querySelector('.content');
const error_output = document.querySelector('.message-body');
const message = document.querySelector('.message');

//Initialize the Data Class
const data = new Data();

function arrayFromNodeList(nodeList) {
  return Array.from(document.querySelectorAll(nodeList));
}

function handleError(err, seconds) {
  console.log(err);
  content.innerHTML = '';
  message.classList.remove('hidden');
  error_output.textContent = err;
  setTimeout(() => {
    message.classList.add('hidden');
    error_output.textContent = '';
  }, seconds);
}

function checkIfDataFromArrayIsEmpty(data, element) {
  if (data === '') {
    element.remove();
  }
}

// TODO check if data comes empty. if it does display a message letting the user no that the term didn't return any results

form.addEventListener('submit', (e) => {
  const searchTerm = document.forms[0].children[0].children[0].value;

  if (searchTerm) {
    data
      .getWikiData(searchTerm)
      .then((res) => {
        data.createUi(res).then((data) => {
          const names = [...data[1]];
          const descriptions = [...data[2]];
          const links = [...data[3]];
          //This html variable will contain the names
          let htmlForNames = '';
          //This html variable will contain the names description
          let htmlForDescription = '';
          let htmlForLinks = '';
          names.forEach((name, index) => {
            htmlForNames += `
            <div class="message">
              <div class="message-header">
                <p>${name}</p>
              </div>
              <div class="message-body ${index}"></div>
              <div class="link ${index}"></div>
           </div> 
           `;
          });

          content.innerHTML = htmlForNames;

          descriptions.forEach((desc, index) => {
            htmlForDescription += `<p class="description ${index}">${desc}</p>`;

            const message_body = arrayFromNodeList('.message-body');

            message_body.forEach((element) => {
              element.innerHTML = htmlForDescription;
            });
          });

          const message_desc = arrayFromNodeList('.description');

          message_desc.forEach((desc) => {
            if (desc.parentElement.classList[1] !== desc.classList[1]) {
              desc.remove();
            }
          });

          links.forEach((link, index) => {
            htmlForLinks += `
            <a href=${link} class="message_link tag is-dark ${index}" target="_blank">Read More Here📰</a>`;

            const links = arrayFromNodeList('.link');

            links.forEach((link) => {
              link.innerHTML = htmlForLinks;
            });
          });

          const message_link = arrayFromNodeList('.message_link');
          message_link.forEach((link) => {
            if (link.parentElement.classList[1] !== link.classList[3]) {
              link.remove();
            }
          });
        });
      })
      .catch((err) => {
        if (err.status === 0) {
          data
            .displayError('Your internet is too SLOW, Please try again later.')
            .then((err) => {
              handleError(err, 2500);
            });
        }
      });
  } else {
    data.displayError('Please enter a search term').then((err) => {
      handleError(err, 2500);
    });
  }

  e.target.reset();
  e.preventDefault();
});
