import React, { useState } from 'react';

import '../scss/app.scss';

const Categories = ({ value, onChangeCategory }) => {
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
