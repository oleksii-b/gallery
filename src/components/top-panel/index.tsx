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
class TopPanel extends React.PureComponent<Props> {
  inputRef = React.createRef<HTMLInputElement>();

  onSearch = (): void => {
    this.props[photos].search((this.inputRef.current as HTMLInputElement).value);
  }

  render() {
    const {data, filteredData} = this.props[photos];

    return (
      <div className='TopPanel header well'>
        <div hidden={!data.length}>
          Photos {filteredData.length} of {data.length}
        </div>

        <div>
          <input
            type='search'
            className='form-control'
            ref={this.inputRef}
            onChange={this.onSearch}
            placeholder='Search photos...'
          />
        </div>
      </div>
    );
  }
};

export default TopPanel;
