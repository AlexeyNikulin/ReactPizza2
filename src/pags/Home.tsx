import React, { useEffect, useRef } from 'react';
import qs from 'qs';
import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setFilters, setPageCount } from '../redux/slices/filterSlice';
import { useNavigate } from 'react-router';

import pizzasJson from '../pizzas.json';
import { fetchPizzas } from '../redux/slices/pizzaSlice';

const Home = () => {
    const navigate = useNavigate();
    const {
        categoryId,
        sort: sortType,
        pageCount,
        searchValue,
    } = useSelector((state) => state.filter);
    const { pizzas, status } = useSelector((state) => state.pizza);
    const dispatch = useDispatch();
    const isSearch = useRef(false);
    const isMounted = useRef(false);

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            const sort = sortList.find((sort) => sort.sortProperty === params.sortProperty);

            dispatch(setFilters({ ...params, sort }));
            isSearch.current = true;
        }
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);

        if (!isSearch.current) {
            getPizzas();
        }

        isSearch.current = false;
    }, [categoryId, sortType, pageCount, searchValue]);

    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sortType.sortProperty,
                categoryId,
                pageCount,
            });

            navigate(`?${queryString}`);
        }

        isMounted.current = true;
    }, [categoryId, sortType, pageCount, searchValue]);

    const getPizzas = async () => {
        dispatch(
            fetchPizzas({
                categoryId,
                sortProperty: sortType.sortProperty,
                pageCount,
                searchValue,
            }),
        );
    };

    const onChangeCategory = (idx) => {
        dispatch(setCategoryId(idx));
    };

    const pizzasBlock = pizzas.map((pizza, idx) => {
        return <PizzaBlock pizza={pizza} key={pizza.id} />;
    });
    const skeletons = [...new Array(4)].map((_, idx) => <Skeleton key={idx} />);

    const onChangePage = (num) => {
        dispatch(setPageCount(num));
    };

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={(idx) => onChangeCategory(idx)} />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {status === 'error' ? (
                <div className="content__error-info">
                    <h2>Упс... Произошла ошибка 😕</h2>
                    <p>
                        Не удальсь загрузить пиццы!
                        <br />
                        Повторите попытку позже!
                    </p>
                </div>
            ) : (
                <div className="content__items">
                    {status === 'loading' ? skeletons : pizzasBlock}
                </div>
            )}
            <Pagination currentPage={pageCount} setCurrentPage={onChangePage} />
        </div>
    );
};

export default Home;
