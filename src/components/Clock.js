import { useEffect, useState } from 'react';

import UtcOffset from './Utcoffset';

const Clock = ({ onDaytimeChange }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDaytime, setIsDaytime] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://worldtimeapi.org/api/ip');
        if (!response.ok) {
          throw new Error('Erro na solicitação: ' + response.status);
        }
        const data = await response.json();
        const timezone = data.timezone;
        setCurrentTime(new Date(data.datetime));

        // Atualizar a hora a cada segundo
        setInterval(() => {
          setCurrentTime(new Date());
        }, 1000);
      } catch (error) {
        console.log('Ocorreu um erro:', error);
      }
    };

    fetchData();
  }, []);

  const formatDigits = (value) => {
    return value < 10 ? `0${value}` : value;
  };

  const hours = formatDigits(currentTime.getHours());
  const minutes = formatDigits(currentTime.getMinutes());
  const seconds = formatDigits(currentTime.getSeconds());

  useEffect(() => {
    const currentHour = currentTime.getHours();
    const daytime = currentHour > 6 && currentHour < 18;
    setIsDaytime(daytime);
    onDaytimeChange(daytime);
  }, [currentTime, onDaytimeChange]);

  return (
    <h1 className='flex justify-end items-end'>
      {hours}:{minutes}<span className='max-md:hidden'>:{seconds}</span> <span className='text-xl font-extralight'><UtcOffset/></span>
    </h1>
  );
};

export default Clock;