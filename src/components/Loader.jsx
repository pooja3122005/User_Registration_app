// import React from 'react';
// import { Loader2 } from 'lucide-react';

// /**
//  * Loader Component
//  * Displays a loading spinner with optional text
//  */
// const Loader = ({ text = 'Loading...', size = 'default' }) => {
//   const sizeClasses = {
//     small: 'w-4 h-4',
//     default: 'w-8 h-8',
//     large: 'w-12 h-12'
//   };

//   return (
//     <div className="flex flex-col items-center justify-center p-8">
//       <Loader2 className={`${sizeClasses[size]} animate-spin text-primary-600`} />
//       {text && (
//         <p className="mt-4 text-gray-600 text-sm font-medium">{text}</p>
//       )}
//     </div>
//   );
// };

// export default Loader;

import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Loader Component
 * Displays a loading spinner with optional text and modern styling
 */
const Loader = ({ text = 'Loading...', size = 'default' }) => {
  const sizeClasses = {
    small: 'w-5 h-5',
    default: 'w-10 h-10',
    large: 'w-16 h-16'
  };

  const containerClasses = {
    small: 'p-4',
    default: 'p-8',
    large: 'p-12'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${containerClasses[size]}`}>
      <div className="relative">
        {/* Outer ring */}
        <div className={`${sizeClasses[size]} rounded-full border-4 border-primary-100 absolute inset-0 animate-ping`} />
        {/* Spinning loader */}
        <Loader2 className={`${sizeClasses[size]} animate-spin text-primary-600 relative z-10`} />
      </div>
      {text && (
        <p className={`mt-4 text-gray-600 font-medium animate-pulse ${
          size === 'small' ? 'text-xs' : size === 'large' ? 'text-base' : 'text-sm'
        }`}>
          {text}
        </p>
      )}
    </div>
  );
};

export default Loader;
