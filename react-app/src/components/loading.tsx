import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../assets/loadingAnimation.json'; // Update this path to your actual Lottie file

interface LoadingProps {
  width?: number;
  height?: number;
}

const Loading: React.FC<LoadingProps> = ({ width = 200, height = 200 }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className="loading-container">
      <Lottie options={defaultOptions} height={height} width={width} />
    </div>
  );
};

export default Loading;