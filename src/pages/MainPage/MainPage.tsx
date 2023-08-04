import { InputNumber, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hook';
import { fetchCourse } from '../../slices/coursesSlice/coursesSlice';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

function MainPage() {
  const [dollarValue, setDollarValue] = useState<number | null>(null);
  const { currentUSDCourse, currentUSDCourseLoading } = useAppSelector((state) => state.courses);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCourse());
  }, []);

  if (currentUSDCourseLoading === 'loading') {
    return <Loader />;
  }

  if (currentUSDCourseLoading === 'error') {
    return <ErrorMessage />;
  }

  return (
    <Space direction="vertical">
      <InputNumber
        value={dollarValue}
        onChange={(value) => setDollarValue(value)}
        style={{ width: '220px' }}
        placeholder="Введите сумму в доларах"
        addonBefore="$"
      />
      <InputNumber
        value={dollarValue && (dollarValue * currentUSDCourse).toFixed(0)}
        readOnly
        addonBefore="₽"
        style={{ width: '220px' }}
      />
    </Space>
  );
}

export default MainPage;
