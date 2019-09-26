import * as React from 'react';
import {inject, observer} from 'mobx-react';
import cx from 'classnames';

import {NameSpace} from '../../namespace';
import {IAlbum} from '../../types/album.d';
import {IAlbumsStore} from '../../stores/types/albums.d';
import {IPhotosStore} from '../../stores/types/photos.d';

const albums = NameSpace.ALBUMS;
const photos = NameSpace.PHOTOS;

interface Props {
  [albums]?: IAlbumsStore;
  [photos]?: IPhotosStore;
};

@inject(albums)
@inject(photos)
@observer
class Albums extends React.PureComponent<Props> {
  onFilter = (id: number): void => {
    this.props[photos].selectAlbum(id);
  }

  componentDidMount(): void {
   this.props[albums].getData();
  }

  render() {
    const albumsList = this.props[albums].data;
    const {selectedAlbum} = this.props[photos];

    return (
      <ul className='nav nav-pills nav-stacked' hidden={!albumsList.length}>
        <li
          className={cx({'active': !selectedAlbum})}
          onClick={this.onFilter.bind(null, null)}
        >
          <a href='#'>All photos</a>
        </li>

        {
          albumsList
          &&
            albumsList.map((it: IAlbum) => (
              <li
                key={it.id}
                className={cx({'active': it.id === selectedAlbum})}
                onClick={this.onFilter.bind(null, it.id)}
              >
                <a href='#'>{it.title}</a>
              </li>
            ))
        }
      </ul>
    );
  }
};

export default Albums;
