import * as React from 'react';
import {inject, observer} from 'mobx-react';

import {NameSpace} from '../../namespace';
import {IPhoto} from '../../types/photo.d';
import {IPhotosStore} from '../../stores/types/photos.d';
import './styles.scss';

const photos = NameSpace.PHOTOS;

interface Props {
  [photos]?: IPhotosStore;
};

@inject(photos)
@observer
class Photos extends React.PureComponent<Props> {
  componentDidMount(): void {
   this.props[photos].getData();
  }

  render() {
    const {data, filteredData, state} = this.props[photos];

    return (
      <div className='Photos'>
        {
          filteredData.length
          ?
            <ul className='gallery'>
              {
                filteredData.map((it: IPhoto) => (
                  <li key={it.id} className='photo'>
                    <div className='thumbnail'>
                      <img
                        src={it.thumbnailUrl}
                        alt={it.title}
                      />

                      <div className='description'>
                        {it.title}
                      </div>
                    </div>
                  </li>
                ))
              }
            </ul>
          :
            <h4 className='text-center'>
              {
                state === 'pending'
                ?
                  'Loading photos...'
                :
                  'No photos found'
              }
            </h4>
        }
      </div>
    );
  }
};

export default Photos;
