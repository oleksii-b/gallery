import {observable, action, decorate, configure, runInAction} from 'mobx';

import {IAlbum} from '../types/album.d';
import {IAlbumsStore} from './types/albums.d';

class AlbumsStore implements IAlbumsStore {
  state = 'pending';

  data: IAlbum[] = [];

  getData(): void {
    try {
      fetch('https://jsonplaceholder.typicode.com/albums?_limit=5')
        .then(response => response.json())
        .then(json => {
          this.data = json;
          this.state = 'done';
        });
    } catch (error) {
      this.state = 'error';
    }
  }
};

decorate(AlbumsStore, {
  state: observable,
  data: observable,
  getData: action.bound,
});

export default new AlbumsStore();
