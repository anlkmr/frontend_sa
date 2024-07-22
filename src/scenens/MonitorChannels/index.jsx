import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const MonitorChannels = () => {
  const [sentMessages, setSentMessages] = useState([]);
  const [deliveredMessages, setDeliveredMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8145/api/v1/manage/messages');
        const messages = response.data;

        const sentMessages = messages.filter(message => message.status === 'sent');
        const deliveredMessages = messages.filter(message => message.status === 'delivered');

        setSentMessages(sentMessages);
        setDeliveredMessages(deliveredMessages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handlePieClick = (data) => {
    navigate(`/view-messages?status=${data.name}`);
  };

  const chartData = [
    { name: 'sent', value: sentMessages.length },
    { name: 'delivered', value: deliveredMessages.length }
  ];

  const COLORS = ['#FF8042', '#00C49F'];

  return (
    <div>
      <h2>Monitor Channels</h2>
      <PieChart width={400} height={400}>
        <Pie
          data={chartData}
          cx={200}
          cy={200}
          innerRadius={60}
          outerRadius={100}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          onClick={(entry, index) => handlePieClick(entry)}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default MonitorChannels;
