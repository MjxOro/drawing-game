'use client';

import { FC, useState } from 'react';
import { useDraw } from '../../hooks/useDraw';
import type { Draw, Point } from '../../hooks/useDraw';
import { ChromePicker } from 'react-color';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import {
  visionAi,
  toggleModal,
  getBase64Img
} from '../GlobalRedux/Features/modal/modalSlice';
import Modal from '../../components/Modal';
import { useWindowSize } from '../../hooks/useWindowSize';

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  const dispatch = useAppDispatch();
  const { isShow } = useAppSelector((state) => state.modal);
  const { address } = useAppSelector(state => state.auth)
  const [color, setColor] = useState<string>('#000');
  const [toggleColor, setToggleColor] = useState<boolean>(false);
  const { canvasRef, onMouseDown, clear } = useDraw(drawLine);
  const { width, height } = useWindowSize();

  function drawLine({ prevPoint, currentPoint, ctx }: Draw) {
    const { x: currX, y: currY } = currentPoint;
    const lineColor = color;
    const lineWidth = 5;

    let startPoint = prevPoint ?? currentPoint;
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currX, currY);
    ctx.stroke();

    ctx.fillStyle = lineColor;
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }
  const handleSubmit = async () => {
    try {
      const base64Img = canvasRef.current?.toDataURL() as string;
      const formattedBase64Img = base64Img.replace(
        /^data:image\/(png|jpeg);base64,/,
        ''
      ) as string;
      dispatch(toggleModal(true))
      dispatch(getBase64Img(formattedBase64Img))
    } catch (error) {
      console.error(error);
    }
  };

  const functionContainerStyle =
    'flex flex-col justify-center items-center bg-white gap-10 rounded-lg p-2 mx-4';
    const canvasStyle='rounded-lg bg-white drop-shadow-lg'
  return (
    <div className='w-screen h-screen bg-[#c5d4c8] bg-image-2 bg-cover bg-no-repeat'>
      {isShow && <Modal />}
      <header className='text-white body-font'>
        <div className='container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>
          <a className='flex title-font font-medium items-center text-white mb-4 md:mb-0'>
            <span className='ml-3 text-xs lg:text-xl'>{address}</span>
          </a>
          <nav className='md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center'>
            <button onClick={handleSubmit} className='mr-5 hover:text-gray-900 bg-gray-900 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0'>AI Guess</button>
            <button  onClick={clear} className='mr-5 hover:text-gray-900 bg-gray-900 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0'>Clear Canvas</button>
            <button style={{backgroundColor: color, zIndex: isShow ? -10 : undefined}}
            onClick={() => setToggleColor(true)}
            className={`relative w-12 h-12 rounded-full`}
             />
        {toggleColor && (
          <div
            onMouseLeave={() => setToggleColor(false)}
            className='absolute top-10  z-10'
          >
            <ChromePicker color={color} onChange={(e) => setColor(e.hex)} />
          </div>
        )}
          </nav>
        </div>
      </header>
      <div className='flex items-center justify-center'>
        <canvas
          ref={canvasRef}
          onMouseDown={onMouseDown}
          width={ width * 0.8}
          height={ height * 0.8}
          className={!isShow ? canvasStyle : canvasStyle + ' z-[-10]'}
        />
      </div>
    </div>
  );
};

export default Page;
