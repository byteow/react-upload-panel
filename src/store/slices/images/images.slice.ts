import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Image } from "../../../shared/types";
import { setUploadStateReducer } from "./reducers";

interface IImagesState {
    images: Image[];
    isAllCompleted: boolean;
    isImagesUploading: boolean;
}

interface ImageProgressPayload {
    id: number;
    progress: number;
}

const initialState: IImagesState = {
    images: [],
    isAllCompleted: false,
    isImagesUploading: false
}

const imagesSlice = createSlice({
    name: 'images',
    initialState,
    reducers: {
        addImage(state, action: PayloadAction<Image>) {
            state.images.push(action.payload);
        },

        removeImage(state, action: PayloadAction<number>) {
            state.images = state.images
                .filter(image => image.id !== action.payload);
        },

        resetImages(state) {
            state.images = [];
        },

        setUploadState(state, action: PayloadAction<boolean>) {
            state.images = setUploadStateReducer(state.images, action.payload);
        },

        changeImageUploadingProgress(state, action: PayloadAction<ImageProgressPayload>) {
            let isAllUploaded = true; 
            let updatedImages = state.images.map(image => {
                const copy = { ...image };
                
                if (copy.id === action.payload.id) {
                    copy.bytesTransferredPercentage = action.payload.progress;
                }

                return copy;
            });
            
            updatedImages.forEach(image => {
                if (image.bytesTransferredPercentage !== 100) {
                    isAllUploaded = false;
                }
            });

            if (isAllUploaded) {
                state.isImagesUploading = false;
                state.isAllCompleted = true;

                updatedImages = setUploadStateReducer(updatedImages, false);
            }

            state.images = updatedImages;
        },

        completeAll(state, action: PayloadAction<boolean>) {
            state.isAllCompleted = action.payload;
        },

        setGlobalUploadingState(state, action: PayloadAction<boolean>) {
            state.isImagesUploading = action.payload;
        },

        updateDownloadURL(state, action: PayloadAction<{ id: number; url: string }>) {
            state.images = state.images.map(image => {
                const copy = { ...image };
                if (copy.id === action.payload.id) {
                    copy.fileLink = action.payload.url;
                }

                return copy;
            });
        }
    }
});

export default imagesSlice.reducer;
export const { 
    addImage, removeImage, resetImages, completeAll, updateDownloadURL,
    setUploadState, changeImageUploadingProgress, setGlobalUploadingState
} = imagesSlice.actions;