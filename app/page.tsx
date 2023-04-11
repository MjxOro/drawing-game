'use client';

import { connect } from './GlobalRedux/Features/auth/authSlice';
import { useAppDispatch } from '../hooks/useRedux';
import { useRouter } from 'next/navigation';

const Page = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleConect = async () => {
    await dispatch(connect());
    router.push('/play');
  };

  return (
    <div className='w-screen h-screen flex justify-center items-center bg-image bg-cover bg-center bg-no-repeat md:justify-start md:pl-[25%]'>
      <section className='text-black body-font'>
        <div className='container mx-auto flex px-5 py-24 md:flex-row flex-col items-center'>
          <div className='lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center bg-white bg-opacity-50 p-8 '>
            <h1 className='title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900'>
              Discovering New Avenues of Creative Expression: A Relaxed and
              Open-Minded Journey
            </h1>
            <p className='mb-8 leading-relaxed'>
              Play Guess the Drawing, an exciting AI-powered game that invites
              you to test your drawing skills! Relax and have fun while
              competing against cutting-edge technology in a friendly
              atmosphere.
            </p>
            <div className='flex justify-center'>
              <button
                onClick={handleConect}
                className='inline-flex text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded text-lg'
              >
                Connect your wallet
              </button>
            </div>
          </div>
          <div className='lg:max-w-lg lg:w-full md:w-1/2 w-5/6'></div>
        </div>
      </section>
    </div>
  );
};

export default Page;
