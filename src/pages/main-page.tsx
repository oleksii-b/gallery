import * as React from 'react';

import Albums from '../components/albums';
import Photos from '../components/photos';
import TopPanel from '../components/top-panel';

export default function MainPage(props: {}) {
  return (
    <div className='container'>
      <TopPanel />

      <div className='row'>
        <div className='col-md-4'>
          <Albums />
        </div>

        <div className='col-md-8'>
          <Photos />
        </div>
      </div>
    </div>
  );
};
