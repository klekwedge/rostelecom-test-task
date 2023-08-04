/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { Select, Pagination, Alert } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hook';
import { fetchCourses, fetchCurrencies } from '../../slices/coursesSlice/coursesSlice';
import './CoursesPage.scss';
import Card from '../../components/Card/Card';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

function CoursesPage() {
  const { currencies, rates, currenciesLoading } = useAppSelector((state) => state.courses);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrencies());
    dispatch(fetchCourses('USD'));
  }, []);

  const handleChange = (value: string) => {
    // ! В бесплатном плане нельзя выбрать базовую валюту относительно которой можно смотреть курс по отношению к другим валютам.
    // ! В бесплатном плане по-умолчанию можно посмотреть только доллар.
    // dispatch(fetchCourses(value))
  };

  if (currenciesLoading === 'loading') {
    return <Loader />;
  }

  if (currenciesLoading === 'error') {
    return <ErrorMessage />;
  }

  return (
    <>
      <Alert
        message="Внимание, в бесплатном плане нельзя выбрать базовую валюту относительно которой можно смотреть курс по отношению к другим валютам. В бесплатном плане по-умолчанию можно посмотреть только доллар."
        type="error"
        style={{ marginBottom: 30 }}
      />
      <Select
        defaultValue="USD"
        placeholder="Базовая валюта"
        style={{ width: 320, marginBottom: 10 }}
        onChange={handleChange}
        options={Object.entries(currencies).map((item) => ({ value: item[0], label: item[1] }))}
      />
      <div className="cards">
        {Object.entries(rates)
          .slice((currentPage - 1) * 10, currentPage * 10)
          .map((rate) => (
            <Card key={v4()} rate={rate} />
          ))}
      </div>
      {rates && (
        <Pagination
          defaultCurrent={currentPage}
          onChange={(value) => setCurrentPage(value)}
          total={Object.values(rates).length}
          showSizeChanger={false}
        />
      )}
    </>
  );
}

export default CoursesPage;
