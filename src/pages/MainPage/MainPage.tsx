import { InputNumber } from 'antd';
import { useEffect } from 'react';

function MainPage() {
  useEffect(() => {
    console.log(import.meta.env.VITE_API_KEY);
  }, []);

  return (
    <div>
      <InputNumber />
      <InputNumber />
    </div>
  );
}

export default MainPage;
