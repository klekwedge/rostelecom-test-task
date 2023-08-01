import { useEffect } from 'react';
import { Select } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hook';
import { fetchCourses, fetchCurrencies } from '../../slices/coursesSlice/coursesSlice';
import './CoursesPage.scss';

function CoursesPage() {
  const { currencies, rates } = useAppSelector((state) => state.courses);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrencies());
    dispatch(fetchCourses());
  }, []);

  const handleChange = (value: string) => {
    // dispatch(fetchCourses())
  };

  return (
    <>
      <Select
        defaultValue="USD"
        placeholder="Базовая валюта"
        style={{ width: 320, marginBottom: 10 }}
        onChange={handleChange}
        options={Object.entries(currencies).map((item) => ({ value: item[0], label: item[1] }))}
      />

      <div className="cards">
        {Object.entries(rates).map((rate) => (
          <div className="card">
            1 USD = {rate[1]} {rate[0]}
          </div>
        ))}
      </div>
    </>
  );
}

export default CoursesPage;
