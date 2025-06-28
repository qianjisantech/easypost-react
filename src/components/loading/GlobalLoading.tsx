import React from 'react';
import { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { useGlobalContext } from '@/contexts/global';

interface LoadingProps {
  fullScreen?: boolean;
  tip?: string;
  style?: CSSProperties;
  spinnerColor?: string;
  textColor?: string;
  iconSize?: number;
}

export const GlobalLoading: React.FC<LoadingProps> = ({
                                                        fullScreen = false,
                                                        tip = '加载中...',
                                                        style,
                                                        spinnerColor = '#FF7300',
                                                        textColor = '#666',
                                                        iconSize = 32
                                                      }) => {
  const { globalLoading } = useGlobalContext();

  if (!globalLoading) return null; // 当不需要加载时不渲染

  const containerStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    ...(fullScreen ? {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.92)',
      zIndex: 9999,
      backdropFilter: 'blur(4px)',
    } : {
      padding: '40px 0',
    }),
    ...style,
  };

  const textStyle: CSSProperties = {
    marginTop: '16px',
    color: textColor,
    fontSize: '16px',
    fontWeight: 500,
    letterSpacing: '0.5px',
  };

  return (
    <motion.div
      style={containerStyle}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{
          rotate: {
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          },
          scale: {
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse"
          }
        }}
      >
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 1028 1024"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M585.473374 295.885775l-240.51966 65.974206 48.843004 180.976182 240.583927-65.974205 49.067938 180.815514-240.583927 63.854395 46.81859 180.976182-240.583927 63.841341-59.672012-216.962752a178.104246 178.104246 0 0 0 36.250667-159.735902c-17.062918-57.48693-59.639878-102.184705-110.700097-121.336304L55.330969 244.793423l483.288669-127.795149z m304.433301-8.483258L811.147331 0 0.001004 215.005617l78.75834 289.555465c46.81859 8.579659 89.427684 44.697775 102.184705 95.790128 14.90997 51.124486-4.273763 102.184705-40.456146 136.246273l76.606395 287.402517 811.180469-217.126432-76.7038-287.402516c-48.939404-8.579659-89.363417-44.697775-104.273386-95.790128-12.753005-51.124486 4.273763-104.333637 42.57696-136.246274z"
            fill={spinnerColor}
          />
        </svg>
      </motion.div>

      {tip && (
        <motion.div
          style={textStyle}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {tip}
        </motion.div>
      )}
    </motion.div>
  );
};