import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

Chart.register(...registerables);

const data = {
  labels: ['Available', 'Occupied'],
  datasets: [
    {
      label: 'Rooms',
      data: [785, 215],
      backgroundColor: ['#50fa7b', '#ff5555'],
      hoverBackgroundColor: ['#50fa7b', '#ff5555'],
    },
  ],
};

const options = {
  cutout: '70%',
};

const DonutChartComponent = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <Doughnut ref={chartRef} data={data} options={options} />
  );
};

export default DonutChartComponent;
