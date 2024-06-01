import React, { FC } from 'react';

import '../scss/app.scss';

type CategoriesProps = {
    value: number;
    onChangeCategory: (idx: number) => void;
};

const Categories: FC<CategoriesProps> = ({ value, onChangeCategory }) => {
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

    return (
        <div className="categories">
            <ul>
                {categories.map((category, categoryIndex) => {
                    return (
                        <li
                            className={value === categoryIndex ? 'active' : ''}
                            onClick={() => onChangeCategory(categoryIndex)}
                            key={category}>
                            {category}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Categories;
