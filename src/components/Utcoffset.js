import { useEffect, useState } from 'react';

const UtcOffset = () => {
  const [utcOffset, setUtcOffset] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://worldtimeapi.org/api/ip');
        if (!response.ok) {
          throw new Error('Erro na solicitação: ' + response.status);
        }
        const data = await response.json();
        setUtcOffset(data.utc_offset);
      } catch (error) {
        console.log('Ocorreu um erro:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <p className='max-md:hidden'>{utcOffset} UTC</p>
  );
};

export default UtcOffset;