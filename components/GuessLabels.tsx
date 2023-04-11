import { FC } from 'react';

type GuessLabelProps = {
  key?: any;
  color?: number;
  message: string;
};

const GuessLabels: FC<GuessLabelProps> = ({ key, color, message }) => {
  const colorList = [
    'bg-blue-100 text-blue-800 font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400',
    'bg-red-100 text-red-800 font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400',
    'bg-green-100 text-green-800 font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400',
    'bg-yellow-100 text-yellow-800 font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-yellow-300 border border-yellow-300',
    'bg-indigo-100 text-indigo-800 font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-indigo-400 border border-indigo-400',
    'bg-purple-100 text-purple-800 font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-purple-400 border border-purple-400',
    'bg-pink-100 text-pink-800 font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-pink-400 border border-pink-400',
  ];
  const randomColor = color
    ? color
    : Math.floor(Math.random() * colorList.length);
  return <span className={colorList[randomColor]} key={key}>{message}</span>;
};

export default GuessLabels;
