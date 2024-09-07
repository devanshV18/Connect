import React from 'react';
import { FaRegUserCircle } from 'react-icons/fa';

const Avatar = ({ userId, name, imageUrl, width, height }) => {
  let avatarName = '';

  if (name) {
    const splitName = name.split(' ');

    if (splitName.length > 1) {
      avatarName = splitName[0][0] + splitName[1][0];
    } else {
      avatarName = splitName[0][0];
    }
  }

  const bgColor = [
    'bg-violet-300',
  ]

  // const randomNumber = Math.floor(Math.random() * 6)
  

  return (
    <div className = {`text-black overflow-hidden rounded-full font-bold`} style={{ width: width + 'px', height: height + 'px' }}>
      {imageUrl ? (
        <img
          src={imageUrl}
          width={width}
          height={height}
          alt={name}
          className='overflow-hidden rounded-full'
        />
      ) : name ? (
        <div style={{ width: width + 'px', height: height + 'px' }} className = { `overflow-hidden rounded-full flex items-center justify-center text-lg ${bgColor[0]}` }>
          {avatarName}
        </div>
      ) : (
        <FaRegUserCircle size={width} />
      )}
    </div>
  );
};

export default Avatar;
