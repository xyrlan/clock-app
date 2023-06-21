import { useEffect, useState } from 'react';

const DayOfYear = () => {
  const [dayOfYear, setDayOfYear] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://worldtimeapi.org/api/ip');
        if (!response.ok) {
          throw new Error('Erro na solicitação: ' + response.status);
        }
        const data = await response.json();
        setDayOfYear(data.day_of_year.toString());
      } catch (error) {
        console.log('Ocorreu um erro:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <p className='max-md:text-center'>{dayOfYear}</p>
  );
};

export default DayOfYear;