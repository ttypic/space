import React, { memo } from 'react';

const Logo = memo(props => {
    return (
        <svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M284.71 407.268H406.707M105.969 104.939L283.291 256.018L105.969 407.096V104.939Z"
                stroke="#FFE0AC"
                strokeWidth="37.5307"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
});

export default Logo;
