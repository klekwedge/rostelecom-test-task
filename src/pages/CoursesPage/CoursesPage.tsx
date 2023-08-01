import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hook';
import { fetchCurrencies } from '../../slices/coursesSlice/coursesSlice';
import './CoursesPage.scss'

function CoursesPage() {
  const { currencies } = useAppSelector((state) => state.courses);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, []);

  return <div className='cards'>{Object.entries(currencies).map((item) => <div className='card'>{item[0]} ({item[1]})</div>)}</div>;
}

export default CoursesPage;
