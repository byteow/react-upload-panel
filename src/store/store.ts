import { configureStore } from "@reduxjs/toolkit";
import imagesReducer from './slices/images/images.slice';
import firebaseReducer from './slices/firebase/firebase.slice';

export const store = configureStore({
    reducer: {
        images: imagesReducer,
        firebase: firebaseReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});