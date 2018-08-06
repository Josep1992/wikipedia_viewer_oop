import axios from 'axios';

const endpoint = `https://en.wikipedia.org/w/api.php?action=opensearch&search=`;

export default class Data {
  async getWikiData(e) {
    //Input data
    const searchTerm = document.forms[0].children[0].children[0].value;

    const request = await axios.get(
      `https://cors-anywhere.herokuapp.com/${endpoint}${searchTerm}`,
    );
    const response = await request;

    return response;
  }

  displayError(error) {
    return new Promise(function(resolve, reject) {
      if (error) {
        resolve();
      } else {
        reject();
      }
    });
  }
}
