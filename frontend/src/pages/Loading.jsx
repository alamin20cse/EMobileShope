import Lottie from 'lottie-react';
import React from 'react';
import ani1 from '../components/LoadingAnimation.json';

const Loading = () => {
    return (
        <div className='min-h-screen'>
             <Lottie animationData={ani1} className="w-[300px] h-[300px]" />
            
        </div>
    );
};

export default Loading;