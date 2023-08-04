/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { Button, Modal, Alert } from 'antd';
import { Line } from '@ant-design/plots';

interface ICardProps {
  rate: [string, number];
}

function Card({ rate }: ICardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  const config = {
    data,
    padding: 'auto',
    xField: 'Date',
    yField: 'scales',
    xAxis: {
      // type: 'timeCat',
      tickCount: 5,
    },
  };

  useEffect(() => {
    asyncFetch();
  }, []);

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
        111 1 USD = {rate[1]} {rate[0]}
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
          message="Внимание, в бесплатном плане нельзя посмотреть исторические данные ни по какой валюте. Данный график построен как пример на основе данных из стороннего API."
          type="error"
          style={{ marginBottom: 30 }}
        />
        <Line {...config} />;
      </Modal>
    </>
  );
}

export default Card;
