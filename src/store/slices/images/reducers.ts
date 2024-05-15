import { Image } from "../../../shared/types";

export function setUploadStateReducer(images: Image[], state: boolean) {
    return images.map(image => {
        const copy = { ...image };
        copy.isUploading = state;
        return copy;
    });
}