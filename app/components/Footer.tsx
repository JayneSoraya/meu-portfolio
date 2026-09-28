'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 text-center text-neutral-600 text-xs font-mono uppercase border-t border-white/5 relative overflow-hidden">
      <motion.div
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-purple-600 to-transparent"
        animate={{
          x: ['-100%', '100%']
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear'
        }}
        style={{ width: '50%' }}
      />

      <div className="space-y-2 relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
         <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 640 640" 
            className="w-7 h-7 gap-3 fill-current inline-block mr-2"
          >
            <path d="M317.8 278.9L284.6 296.2C275.2 276.6 259.4 276.3 257.1 276.3C235 276.3 223.9 290.9 223.9 320.1C223.9 343.7 233.1 363.9 257.1 363.9C271.6 363.9 281.7 356.8 287.7 342.6L318.3 358.1C312.1 369.6 292.6 397.1 253.2 397.1C230.6 397.1 179.2 386.8 179.2 320.1C179.2 261.4 222.2 243 251.8 243C282.5 243 304.5 254.9 317.8 278.9zM460.8 278.9L428 296.2C418.5 276.4 402.3 276.3 400.1 276.3C378 276.3 366.9 290.9 366.9 320.1C366.9 343.6 376.1 363.9 400.1 363.9C414.5 363.9 424.7 356.8 430.6 342.6L461.6 358.1C459.5 361.9 440.2 397.1 396.5 397.1C373.8 397.1 322.5 387.2 322.5 320.1C322.5 261.4 365.5 243 395.1 243C425.8 243 447.7 254.9 460.7 278.9zM319.6 72C176.7 72 72 187.1 72 320.1C72 458.5 185.6 568.1 319.6 568.1C449.5 568.1 568 467.2 568 320.1C568 182.2 461.4 72 319.6 72zM320.5 522.8C208 522.8 116.8 429.8 116.8 320C116.8 214.6 202.2 116.7 320.5 116.7C433 116.7 523.3 206.2 523.3 320C523.3 441.7 423.6 522.8 320.5 522.8z"/>
          </svg>

          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 640 640"
            className="w-7 h-7 fill-current inline-block mr-2"
            >
              <path d="M386.9 258.4L386.9 359.8L358.6 359.8L358.6 480.3L281.5 480.3L281.5 359.9L253.2 359.9L253.2 258.4C253.2 254 254.8 250.2 257.8 247.1C260.9 244 264.7 242.4 269.1 242.4L371 242.4C375.1 242.4 378.8 244 382.1 247.1C385.2 250.3 386.9 254 386.9 258.4zM354.4 193.9C354.6 213 339.4 228.6 320.3 228.8C301.2 229 285.6 213.8 285.4 194.7C285.2 175.6 300.4 160 319.5 159.8C338.6 159.6 354.2 174.8 354.4 193.9zM319.6 72C461.4 72 568 182.1 568 320C568 467.1 449.5 568 319.6 568C185.6 568 72 458.5 72 320C72 187.1 176.7 72 319.6 72zM320.4 116.7C202.2 116.7 116.7 214.6 116.7 320C116.7 429.8 207.9 522.8 320.4 522.8C423.6 522.8 523.2 441.7 523.2 320C523.3 206.2 433 116.7 320.4 116.7z"/>
          </svg>
           Commons Attribution 4.0 International license {currentYear}.
          </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-neutral-400"
        >
          Construído com <span className="text-red-500">♥</span> por <span className="text-purple-500">Jayne Soraya</span>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
