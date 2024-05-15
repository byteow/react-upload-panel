import { createSlice } from "@reduxjs/toolkit";
import { FirebaseApp, initializeApp } from "firebase/app";
import { FirebaseStorage, getStorage } from "firebase/storage";
import { STORAGE_BUCKET_URL, firebaseConfig } from "../../../config/firebase.config";

interface IFirebaseState {
    app: FirebaseApp;
    storage: FirebaseStorage;
}

const app = initializeApp(firebaseConfig);

const initialState: IFirebaseState = {
    app,
    storage: getStorage(app, STORAGE_BUCKET_URL)
}

const firebaseSlice = createSlice({
    name: 'firebase',
    initialState,
    reducers: {

    }
});

export default firebaseSlice.reducer;