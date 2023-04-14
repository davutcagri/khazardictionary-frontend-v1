import { createStore, applyMiddleware, compose } from 'redux';
import { setAuthorizationHeader } from '../api/apiCalls';
import authReducer from './authReducer';
import SecureLS from 'secure-ls';
import thunk from 'redux-thunk';

const secureLs = new SecureLS();

const getStateFromStorage = () => {
    const kdAuth = secureLs.get('kd-auth');

    let stateInLocalStorage = {
        isLoggedIn: false,
        username: undefined,
        displayName: undefined,
        image: undefined,
        password: undefined,
        roleName: undefined
    };
    if (kdAuth) {
        return kdAuth;
    }
    return stateInLocalStorage;
}

const updateStateInStorage = newState => {
    secureLs.set('kd-auth', newState);
}

const configureStore = () => {
    const initialState = getStateFromStorage()
    setAuthorizationHeader(initialState);
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(authReducer, initialState, composeEnhancers(applyMiddleware(thunk)));

    store.subscribe(() => {
        updateStateInStorage(store.getState())
        setAuthorizationHeader(store.getState());
    })

    return store;
}

export default configureStore;