import { ChangeEvent, FC, useRef } from 'react';
import Button from '../shared/button/Button';
import { useDispatch } from 'react-redux';
import { addImage, completeAll, resetImages } from '../../store/slices/images/images.slice';

const FileInput: FC = () => {
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => inputRef.current?.click();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;

        dispatch(resetImages());
        dispatch(completeAll(false));

        const files = Array.from(e.target.files);
        
        files.forEach(file => {
            if (!file.type.match('image')) return;

            const reader = new FileReader();

            reader.onload = e => {
                dispatch(addImage({
                    file,
                    source: e.target?.result,
                    id: Date.now()
                }));
            }

            reader.readAsDataURL(file);
        });
    }

    return (
        <>
            <input type="file" ref={inputRef} style={{ display: 'none' }} 
                onChange={handleChange} multiple accept='image/*'
            />
            <Button onClick={handleClick}>Открыть</Button>
        </>
    );
}

export default FileInput;