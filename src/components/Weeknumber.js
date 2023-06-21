import { useEffect, useState } from 'react';

const WeekNumber = () => {
  const [weekNumber, setWeekNumber] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://worldtimeapi.org/api/ip');
        if (!response.ok) {
          throw new Error('Erro na solicitação: ' + response.status);
        }
        const data = await response.json();
        setWeekNumber(data.week_number.toString());
      } catch (error) {
        console.log('Ocorreu um erro:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <p className='max-md:text-center'>{weekNumber}</p>
  );
};

export default WeekNumber;