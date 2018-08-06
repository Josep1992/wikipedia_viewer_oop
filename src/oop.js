import axios from 'axios';

const endpoint = `https://en.wikipedia.org/w/api.php?action=opensearch&search=`;

export default class Data {
  async getWikiData(searchTerm) {
    const request = await axios.get(
      `https://cors-anywhere.herokuapp.com/${endpoint}${searchTerm}`,
    );
    const response = await request.data;
    return response;
  }

  displayError(error) {
    return new Promise(function(resolve, reject) {
      if (error) {
        resolve(error);
      } else {
        reject();
      }
    });
  }

  createUi(data) {
    return ``;
  }
}
