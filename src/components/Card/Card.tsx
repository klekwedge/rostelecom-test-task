import { useState } from 'react';
import { Button, Modal, Alert } from 'antd';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
};

const labels = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

export const data = {
  labels,
  datasets: [
    {
      label: 'Курс в 2022 году',
      data: [83, 82, 79, 84, 81, 75, 82, 85, 91, 87, 92, 87],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

interface ICardProps {
  rate: [string, number];
}

function Card({ rate }: ICardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        1 USD = {rate[1]} {rate[0]}
      </Button>
      <Modal
        title="Таймлайн курса"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Закрыть
          </Button>,
        ]}
      >
        <Alert
          message="Внимание, в бесплатном плане нельзя посмотреть исторические данные ни по какой валюте. Данный график построен как пример на основе статических данных."
          type="error"
          style={{ marginBottom: 30 }}
        />
        <Line options={options} data={data} title="" />
      </Modal>
    </>
  );
}

export default Card;
