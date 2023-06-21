import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Quotes = () => {
  const [data, setData] = useState({ content: '', author: '' });
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 200));

    try {
      const response = await fetch('https://api.quotable.io/random');
      if (!response.ok) {
        throw new Error('Error in request: ' + response.status);
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading data...</p>;
  }

  const show = {
    opacity: 1,
    display: 'block',
  };

  const hide = {
    opacity: 0,
    transitionEnd: {
      display: 'none',
    },
  };

  return (
    <motion.div
      animate={isVisible ? show : hide}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="w-[40%] max-md:w-[80%]"
    >
      <motion.div className="flex gap-2 items-center">
        <motion.p>{data.content}</motion.p>
        <Image
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsVisible(!isVisible);
            fetchData();
            setTimeout(() => {
              setIsVisible(true);
            }, 400);
          }}
          className="cursor-pointer hover:animate-spin"
          src="/images/icon-refresh.svg"
          width={18}
          height={18}
        />
      </motion.div>
      <motion.p className="font-bold">{data.author}</motion.p>
    </motion.div>
  );
};

export default Quotes;