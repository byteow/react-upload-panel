import { FC } from 'react';
import styles from './CompleteAnimation.module.css';

const CompleteAnimation: FC = () => {
    return (
        <div className={styles['animation-container']}>
            <h2 className={styles.text}>Все файлы были успешно загружены</h2>
        </div>
    );
}

export default CompleteAnimation;
