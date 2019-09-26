import {IAlbum} from '../../types/album.d';


export interface IAlbumsStore {
  state: string;
  data: IAlbum[];
  getData: () => void;
};
