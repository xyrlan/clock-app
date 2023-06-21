import { useEffect, useState } from 'react';

const Timezone = () => {
  const [timezone, setTimezone] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://worldtimeapi.org/api/ip');
        if (!response.ok) {
          throw new Error('Erro na solicitação: ' + response.status);
        }
        const data = await response.json();
        setTimezone(data.timezone.replace(/_/g, ' '));
      } catch (error) {
        console.log('Ocorreu um erro:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <p className='max-md:text-center'>{timezone}</p>
  );
};

export default Timezone;
