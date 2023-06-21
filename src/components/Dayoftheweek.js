import { useEffect, useState } from 'react';

const DayOfWeek = () => {
  const [dayOfWeek, setDayOfWeek] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://worldtimeapi.org/api/ip');
        if (!response.ok) {
          throw new Error('Erro na solicitação: ' + response.status);
        }
        const data = await response.json();
        setDayOfWeek(data.day_of_week.toString());
      } catch (error) {
        console.log('Ocorreu um erro:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <p className='max-md:text-center'>{dayOfWeek}</p>
  );
};

export default DayOfWeek;