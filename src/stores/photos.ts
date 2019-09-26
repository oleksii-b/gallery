import {observable, computed, action, decorate} from 'mobx';

import {IPhoto} from '../types/photo.d';
import {IPhotosStore} from './types/photos.d';

class PhotosStore implements IPhotosStore {
  state = 'pending';

  data: IPhoto[] = [];

  selectedAlbum: number = null;

  searchQuery = '';

  get filteredData() {
    let data = [...this.data];

    if (this.searchQuery) {
      data = data.filter(it => it.title.match(new RegExp(this.searchQuery, 'i')));
    }

    if (this.selectedAlbum) {
      data = data.filter(it => it.albumId === this.selectedAlbum);
    }

    return data;
  };

  selectAlbum(id: number): void {
    this.selectedAlbum = id;
  };

  search(query: string): void {
    this.searchQuery = query;
  };

  getData(): void {
    try {
      fetch('https://jsonplaceholder.typicode.com/photos?_limit=220')
        .then(response => response.json())
        .then(json => {
          this.data = json;
          this.state = 'done';
        });
    } catch (error) {
      this.state = 'error';
    }
  };
};

decorate(PhotosStore, {
  state: observable,
  data: observable,
  selectedAlbum: observable,
  searchQuery: observable,
  filteredData: computed,
  selectAlbum: action,
  search: action,
  getData: action,
});

export default new PhotosStore();
