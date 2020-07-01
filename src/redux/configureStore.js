import {createStore,combineReducers,applyMiddleware} from 'redux';
import { Items } from './items';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createForms } from 'react-redux-form';
import { InitialFeedback } from './forms';
import {getFirebase} from 'react-redux-firebase';
import {getFirestore} from 'redux-firestore';
import { User } from './user';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            items: Items,
            comments: Comments,
        
            user: User,

            ...createForms({
                feedback: InitialFeedback
        })
    }),
        applyMiddleware(thunk, logger)
    );

    return store;
};