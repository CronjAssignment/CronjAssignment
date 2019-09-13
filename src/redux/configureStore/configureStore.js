import {createStore, combineReducers} from 'redux';
import reducer from '../reducers/reducer';

const ConfigureStore = () => {
  const store = createStore (
        combineReducers({
            stateData : reducer
        })
    );
    return store;
}

export default ConfigureStore 
