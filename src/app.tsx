import * as React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

const Spinner = () => <h4>Loading...</h4>;
const MainPage = React.lazy(() => import('./pages/main-page'));

export default function App(props: {}) {
  return (
    <React.Suspense fallback={<Spinner />}>
      <Switch>
        <Route path='/' exact component={MainPage} />
        <Redirect from='*' to='/' />
      </Switch>
    </React.Suspense>
  );
};
