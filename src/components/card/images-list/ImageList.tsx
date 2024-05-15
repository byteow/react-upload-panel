import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store.types';
import styles from './ImageList.module.css';
import ImageItem from './ImageItem';

const ImageList: FC = () => {
    const images = useSelector((state: RootState) => state.images.images);
    
    return (
        <ul className={styles['image-list']}>
            {
                images.map(image => (
                    <ImageItem {...image} key={image.id} />
                ))
            }
        </ul>
    );
}

export default ImageList;
