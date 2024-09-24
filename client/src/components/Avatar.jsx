import React, {useState} from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Avatar = ({ userId, name, imageUrl, width, height }) => {
  const onlineUser = useSelector(state => state?.user?.onlineUser)

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
    'bg-yellow-300',
    'bg-green-200',
    'bg-red-200'
  ]

  // const randomNumber = Math.floor(Math.random() * 6)
  
  const isOnline = onlineUser.includes(userId)
  return (
    <div className = {`text-black rounded-full font-bold relative`} style={{ width: width + 'px', height: height + 'px' }}>
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
      
      {
        isOnline && (
          <div className='bg-green-600 p-1 absolute bottom-2 -right-1 z-10 rounded-full'></div>
        )
      }

    </div>
  );
};

export default Avatar;
