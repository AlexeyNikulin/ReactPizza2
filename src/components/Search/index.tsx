import React, { FC, useCallback, useRef, useState } from 'react';
import style from './Search.module.scss';
import debounce from '../../utils/debounce';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';

const Search: FC = () => {
    const [value, setValue] = useState<string>('');
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement>(null);

    const onClickClearSearch = () => {
        dispatch(setSearchValue(''));
        setValue('');
        inputRef.current?.focus();
    };

    const updateSearchValue = useCallback(
        debounce((value: string) => {
            dispatch(setSearchValue(value));
        }, 600),
        [],
    );

    const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        updateSearchValue(e.target.value);
    };

    return (
        <div className={style.root}>
            <svg className={style.icon} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <title />
                <g id="search">
                    <path d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z" />
                </g>
            </svg>
            <input
                ref={inputRef}
                value={value}
                onChange={onChangeValue}
                className={style.input}
                placeholder="Поиск пиццы..."
            />
            {value && (
                <svg
                    onClick={onClickClearSearch}
                    className={style.clearIcon}
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
                </svg>
            )}
        </div>
    );
};

export default Search;
