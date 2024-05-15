import { FC, useMemo, useRef } from 'react';
import { Image } from '../../../shared/types';
import styles from './ImageList.module.css';
import { bytesToSize } from '../../../shared/utils';
import { useDispatch } from 'react-redux';
import { removeImage } from '../../../store/slices/images/images.slice';

const ImageItem: FC<Image> = ({ id, source, file, isUploading, bytesTransferredPercentage, fileLink }) => {
    const fileSize = useMemo(() => bytesToSize(file.size), [file.size]);
    const itemRef = useRef<HTMLLIElement>(null);
    const dispatch = useDispatch();

    const isCompleted = bytesTransferredPercentage === 100;
    const linkProps = fileLink ? { href: fileLink } : {}

    const handleRemove = () => {
        itemRef.current?.classList.add(styles.removing);
        setTimeout(() => dispatch(removeImage(id)), 220);
    }

    return (
        <a {...linkProps}>
            <li ref={itemRef} className={styles.preview} >
                
                { !isUploading && <div className={styles.remove} onClick={handleRemove}>&times;</div> }
                <img className={styles.image} src={source?.toString()} alt={`image-${id}`} />
                <div className={`${styles.meta} ${isUploading ? styles['show-panel'] : ''}`}>
                    {
                        !isUploading
                        ?
                        <>
                            <span className={styles['meta__filename']}>{ file.name }</span>
                            <span>{ fileSize }</span>
                        </>
                        :
                        <div className={styles.progress} style={{
                            width: `${bytesTransferredPercentage}%`
                        }}>
                            {
                                (bytesTransferredPercentage || 0) >= 15
                                &&
                                <span className={styles['progress-info']}>
                                    {
                                        !isCompleted
                                        ?  `${bytesTransferredPercentage}%`
                                        :
                                        <span className={`material-symbols-outlined ${styles['progress-done']}`}>
                                            check
                                        </span>
                                    }
                                </span>
                            }
                        </div>
                    }
                </div>
            </li>
        </a>
    );
}

export default ImageItem;
