import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import Container from 'semantic-ui-react/dist/commonjs/elements/Container';

import TradeDataContainer from './containers/TradeData'
import configureStore from './redux/store';

import 'semantic-ui-css/semantic.min.css';

const store = configureStore();

const App = () =>
  <div>
    <Provider store={store}>
      <BrowserRouter>
        <Container >
          <Route path="/" />
          <Route component={TradeDataContainer} path="/trade-data" />
        </Container>
      </BrowserRouter>
    </Provider>
  </div>;

export default App;