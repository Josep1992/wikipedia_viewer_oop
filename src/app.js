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

          // if (
          //   names.length === 0 &&
          //   descriptions.length === 0 &&
          //   links.length === 0
          // ) {
          //   data
          //     .displayError(
          //       `It look's like your search didn't bring any results. Try Another?`,
          //     )
          //     .then((err) => displayError(err, 2500));
          // }else{

          // }

          let htmlForNames = '';

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
            } else if (desc.textContent.includes('may refer to:')) {
              desc.parentElement.parentElement.remove();
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
      .catch((error) => {
        switch (error.status) {
          case 0:
            data
              .displayError('Your internet is too SLOW.')
              .then((error) => handleError(error, 2500));
            break;
          case 404:
            data
              .displayError('You really think it exist.')
              .then((error) => handleError(error, 2500));
            break;
          case 400:
            data
              .displayError('Bad Request')
              .then((error) => handleError(error, 2500));
            break;
          default:
            throw new Error(error);
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
