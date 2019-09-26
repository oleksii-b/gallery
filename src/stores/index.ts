import {NameSpace} from '../namespace';
import albums from './albums';
import photos from './photos';

const stores = {
  [NameSpace.ALBUMS]: albums,
  [NameSpace.PHOTOS]: photos,
};

export default stores;
