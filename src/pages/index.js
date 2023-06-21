import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react'
import Clock from '@/components/Clock';
import Timezone from '@/components/Timezone';
import DayOfYear from '@/components/Dayoftheyear';
import DayOfWeek from '@/components/Dayoftheweek';
import WeekNumber from '@/components/Weeknumber';
import Quotes from '@/components/Quotes';
import { motion } from 'framer-motion';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [isMore, setMore] = useState(true);
  const [isDaytime, setIsDaytime] = useState(false);

  const handleDaytimeChange = (daytime) => {
    setIsDaytime(daytime);
  };

  const showtop = {
    opacity: 1,
   
    height: '50%'
  
};

const showbot = {
    opacity: 1,
    height: '100%'
};

let bgImage;

const setBgImage = () => {
  if (isDaytime) {
    bgImage = "/images/bg-image-daytime.jpg";
  } else {
    bgImage = "/images/bg-image-nighttime.jpg";
  }
};

// Call the function to set the background image
setBgImage();

  return (
    <>
      <main className='h-screen min-w-screen bg-cover bg-fixed relative overflow-hidden' style={{
        backgroundImage: `url(${bgImage})`
      }}>
        <div className='h-full w-full absolute top-0 z-0 bg-black opacity-50' />
        <motion.section animate={!isMore ? showtop : showbot} transition={{duration: 1}} className={` lg:px-36 lg:py-20 md:py-10 md:px-16 max-md:p-8 h-full justify-between flex flex-col text-white relative z-20`}>

          <div className={`${!isMore && 'hidden'}`}>
            <Quotes />
          </div>


          <motion.div initial={{opacity: 0, x: -200 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 1 }} className='absolute bottom-[10%] max-md:bottom-[30%]'>
            {isDaytime ? (
              <>
                <div className='flex gap-2 items-center '>
                  <Image src='/images/icon-sun.svg' width={24} height={24} />
                  <h2 className='text-lg max-md:text-base font-thin tracking-widest'>
                    GOOD MORNING, IT&lsquo;S CURRENTLY
                  </h2>
                </div>
              </>
            ) : (
              <>
                <div className='flex gap-2 items-center '>
                  <Image src='/images/icon-sun.svg' width={24} height={24} />
                  <h2 className='text-lg max-md:text-base font-thin tracking-widest'>
                    GOOD EVENING, IT&lsquo;S CURRENTLY
                  </h2>
                </div>
              </>
            )
            }
            <span className='text-[10rem] max-md:text-9xl font-bold flex leading-none'>
              <Clock onDaytimeChange={handleDaytimeChange} />
            </span>
            <h2 className='text-2xl font-bold mt-4 tracking-widest'>
              <Timezone />
            </h2>
          </motion.div>

          <button
            className='flex items-center gap-4 bg-white rounded-full absolute md:right-36 lg:bottom-10 max-lg:bottom-4 w-fit p-1 pl-4 font text-[#303030] hover:brightness-125 duration-200'
            onClick={() => { isMore ? setMore(false) : setMore(true) }}>
            {!isMore ? (
              <span className=' tracking-widest'>
                LESS
              </span>
            ) :
              (
                <span className=' tracking-widest'>
                  MORE
                </span>
              )
            }

            < div className='bg-zinc-800 h-10 w-10  rounded-full flex justify-center items-center'>
              <Image className={` ${!isMore && 'rotate-180'} `} src={`/images/icon-arrow-down.svg`} width={14} height={9} />
            </div>
          </button>

        </motion.section>
        {!isMore && (
          <motion.div  initial={{ y: 300 }} whileInView={{ y: 0 }} transition={{ duration: 1 }} className={`flex max-md:flex-col lg:px-36 lg:py-20 md:justify-start max-md:justify-center max-md:gap-10 max-md:p-4 h-[50%] absolute w-full md:py-10 md:px-16 ${isDaytime ? 'text-[#303030] bg-[#979797] bg-opacity-90' : 'text-white bg-[#000000] bg-opacity-90'}`}>
            
            <div className='flex flex-col justify-between gap-10 md:w-[50%]'>
              <div className='flex md:flex-col max-md:justify-between'>
                <span className='tracking-widest max-md:w-[50%]'>
                  CURRENT TIMEZONE
                </span>
                <span className='text-6xl max-md:text-2xl max-md:w-[50%] font-bold'>
                  <Timezone />
                </span>
              </div>
              <div className='flex md:flex-col max-md:justify-between'>
                <span className='tracking-widest max-md:w-[50%]'>
                  DAY OF THE YEAR
                </span>
                <span className='text-6xl max-md:text-3xl font-bold max-md:w-[50%]'>
                  <DayOfYear />
                </span>
              </div>
            </div>

            <div className={` flex flex-col justify-between gap-10 md:w-[50%] md:pl-[10%] md:border-l ${isDaytime ? 'border-[#303030]' : 'border-[#979797]'} `}>
              <div className='flex md:flex-col max-md:justify-between'>
                <span className='tracking-widest max-md:w-[50%]'>
                  DAY OF THE WEEK
                </span>
                <span className='text-6xl max-md:text-3xl font-bold max-md:w-[50%]'>
                  <DayOfWeek />
                </span>
              </div>
              <div className='flex md:flex-col max-md:justify-between'>
                <span className='tracking-widest max-md:w-[50%]'>
                  WEEK NUMBER
                </span>
                <span className='text-6xl max-md:text-3xl font-bold max-md:w-[50%]'>
                  <WeekNumber />
                </span>
              </div>
            </div>
          </motion.div>
        )}


      </main >
    </>
  )
}
