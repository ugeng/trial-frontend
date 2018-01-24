import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './modules';
import api from '../api'

const loggerMiddleware = createLogger();
const thunkMiddleware = reduxThunk.withExtraArgument(api);

let store;

export default function configureStore() {
  if (store) return store;

  if (process.env.NODE_ENV === 'development') {
    store = createStore(
        reducer, 
        applyMiddleware(thunkMiddleware),
        // applyMiddleware(loggerMiddleware)
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
  } else {
    store = createStore(reducer, applyMiddleware(thunkMiddleware));
  }

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./modules', () => {
      // eslint-disable-next-line global-require
      const nextRootReducer = require('./modules');

      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

export const getStore = () => store;