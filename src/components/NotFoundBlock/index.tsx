import { FC } from 'react';
import style from './NotFoundBlock.module.scss';

const NotFoundBlock: FC = () => {
    return (
        <div className={style['not-found']}>
            <h1>
                Ничего не найдено <span>🙁</span>
            </h1>
            <p className={style.descr}>К сожалению страницы по данному адресу не существует</p>
        </div>
    );
};

export default NotFoundBlock;
