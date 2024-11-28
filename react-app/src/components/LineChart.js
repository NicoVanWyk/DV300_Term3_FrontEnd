import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const LineChart = () => {

  const monthData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    values: [120, 150, 180, 170],
  };

  const data = {
    labels: monthData.labels,
    datasets: [
      {
        label: 'Trasnactions',
        data: monthData.values,
        fill: true,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return null;
          }
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, 'rgba(155, 89, 182, 0.5)'); 
          gradient.addColorStop(0.5, 'rgba(155, 89, 182, 0.25)'); 
          gradient.addColorStop(1, 'rgba(155, 89, 182, 0)'); 
          return gradient;
        },
        borderColor: '#9B59B6', 
        borderWidth: 2,
        pointBackgroundColor: 'white',
        tension: 0.4, 
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    animation: {
      easing: 'easeInOutQuad',
      duration: 520,
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(200, 200, 200, 0.05)',
          lineWidth: 1,
        },
      },
      y: {
        grid: {
          color: 'rgba(200, 200, 200, 0.08)',
          lineWidth: 1,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        titleFont: {
          family: 'Open Sans',
          size: 12,
        },
        backgroundColor: 'rgba(0,0,0,0.3)',
        titleColor: 'red',
        caretSize: 5,
        cornerRadius: 2,
        padding: 10,
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        backgroundColor: 'white',
      },
    },
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
  };

  return (
    <div style={containerStyle}>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
