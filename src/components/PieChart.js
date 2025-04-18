import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from 'chart.js';

// Registering the required chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

/**
    Pie Chart Component from react-chartjs-2
      - Display related 'Carbs', 'Fats', 'Proteins', 'Fiber' in an animate Pie Chart

    On Hover : 
        - Displays related value

    Input : Array containing, in order, ['Carbs', 'Fats', 'Proteins', 'Fiber']
 */
const PieChart = ({ data }) => {
  const chartData = {
    labels: ['Carbs', 'Fats', 'Proteins', 'Fiber'],
    datasets: [
      {
        label: 'Macronutrient Breakdown',
        data: data, // Data passed as props, e.g., [10, 20, 30, 40]
        backgroundColor: ['#FF5733', '#33FF57', '#3399FF', '#cddc39'],
        borderColor: ['#FF5733', '#33FF57', '#3399FF', '#cddc39'],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`;
          },
        },
      },
    },
    hover: {
      mode: 'nearest',
      intersect: false,
      onHover: function (event, chartElement) {
        const chart = this.chart;
        chartElement.forEach((element) => {
          const segment = chart.getDatasetMeta(element.datasetIndex).data[element.index];
          segment._model.borderWidth = 4; // Increase the border width to create the "enlarge" effect
          segment._model.radius = segment._model.outerRadius + 5; // Enlarge the section radius
        });
        chart.update();
      },
    },
    interaction: {
      mode: 'nearest',
      intersect: false,
    },
  };

  return (
    <div style={{ position: 'relative', width: '300px', height: '300px' }}>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
