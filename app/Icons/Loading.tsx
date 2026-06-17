import React from 'react';

const ChatThinkingLoader = ({ className ='', size = 24, ...props }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      {...props}
    >
      <style>{`
        .thinking-dot {
          fill: currentColor;
          animation: dotPulse 1.4s infinite ease-in-out both;
        }
        .dot-1 { animation-delay: -0.32s; }
        .dot-2 { animation-delay: -0.16s; }

        @keyframes dotPulse {
          0%, 80%, 100% { 
            transform: scale(0.6);
            opacity: 0.4;
          } 
          40% { 
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
      {/* Three dots aligned horizontally with central origins for smooth scaling */}
      <circle className="thinking-dot dot-1" cx="4" cy="12" r="2.5" style={{ transformOrigin: '4px 12px' }} />
      <circle className="thinking-dot dot-2" cx="12" cy="12" r="2.5" style={{ transformOrigin: '12px 12px' }} />
      <circle className="thinking-dot"       cx="20" cy="12" r="2.5" style={{ transformOrigin: '20px 12px' }} />
    </svg>
  );
};

export default ChatThinkingLoader;