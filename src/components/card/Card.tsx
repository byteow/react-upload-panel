import { FC } from 'react';
import styles from './Card.module.css';
import Button from '../shared/button/Button';
import FileInput from './FileInput';
import ImageList from './images-list/ImageList';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store.types';
import { changeImageUploadingProgress, setGlobalUploadingState, setUploadState, updateDownloadURL } from '../../store/slices/images/images.slice';
import { StorageError, StorageReference, UploadTaskSnapshot, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const Card: FC = () => {
    const { images, isAllCompleted, isImagesUploading } = useSelector((state: RootState) => state.images);
    const { storage } = useSelector((state: RootState) => state.firebase);
    const dispatch = useDispatch();

    const handleUpload = () => {
        dispatch(setUploadState(true));
        dispatch(setGlobalUploadingState(true));

        const handleStateChanged = (snapshot: UploadTaskSnapshot, fileId: number) => {
            const percentage = Math.round(((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
            
            dispatch(changeImageUploadingProgress({
                id: fileId,
                progress: percentage
            }));
        }

        const handleError = (error: StorageError) => {
            console.error('Occured firebase error:', error);
        }

        const handleComplete = async (id: number, ref: StorageReference) => {
            const url = await getDownloadURL(ref);
            dispatch(updateDownloadURL({ id, url }));
        }

        for (let i = 0; i < images.length; i++) {
            const image = images[i];

            const imageRef = ref(storage, `images/${image.file.name}`);
            const task = uploadBytesResumable(imageRef, image.file);

            task.on(
                'state_changed', 
                e => handleStateChanged(e, image.id), 
                handleError, 
                () => handleComplete(image.id, task.snapshot.ref)
            );
        }
    }

    return (
        <div className={styles.card}>
            <div className={styles.buttons}>
                <FileInput />
                {   ( images.length || isImagesUploading ) 
                    ? <Button variant='primary' onClick={handleUpload}>Загрузить</Button> 
                    : <></> 
                }
            </div>
            <ImageList />
            { isAllCompleted && <h2 className={styles.text}>Нажмите на картинку, чтобы посмотреть её</h2> }
        </div>
    );
}

export default Card;