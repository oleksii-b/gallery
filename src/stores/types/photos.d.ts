import {IPhoto} from '../../types/photo.d';

export interface IPhotosStore {
  state: string;
  data: Array<>;
  selectedAlbum: number;
  searchQuery: string;
  filteredData: IPhoto[];
  selectAlbum: (string) => void;
  search: (string) => void;
  getData: () => void;
};
