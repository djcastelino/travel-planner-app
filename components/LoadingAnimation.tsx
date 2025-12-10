'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Plane, MapPin, Utensils, Sun, DollarSign, Sparkles } from 'lucide-react';

const loadingSteps = [
  { icon: Globe, text: 'Analyzing your destination...', color: 'text-blue-500', duration: 3000 },
  { icon: MapPin, text: 'Crafting your perfect itinerary...', color: 'text-purple-500', duration: 3000 },
  { icon: Plane, text: 'Finding best activities...', color: 'text-indigo-500', duration: 3000 },
  { icon: Utensils, text: 'Selecting amazing restaurants...', color: 'text-pink-500', duration: 3000 },
  { icon: Sun, text: 'Checking weather forecast...', color: 'text-yellow-500', duration: 3000 },
  { icon: DollarSign, text: 'Calculating budget...', color: 'text-green-500', duration: 3000 },
  { icon: Sparkles, text: 'Finalizing your dream trip...', color: 'text-violet-500', duration: 2000 },
];

export default function LoadingAnimation() {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 0.5; // Increment by 0.5% every 100ms = 20 seconds to 100%
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    // Rotate through loading messages
    const messageInterval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % loadingSteps.length);
    }, loadingSteps[currentStep].duration);

    return () => clearInterval(messageInterval);
  }, [currentStep]);

  const CurrentIcon = loadingSteps[currentStep].icon;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 flex items-center justify-center z-50">
      <div className="max-w-md w-full px-6">
        {/* Animated Globe */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="relative"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center shadow-2xl">
              <Globe className="w-12 h-12 text-white" />
            </div>
            {/* Orbiting icon */}
            <motion.div
              className="absolute -top-2 -right-2"
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <div className="w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center">
                <Plane className="w-4 h-4 text-blue-600" />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Loading Message */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-3 mb-2">
              <CurrentIcon className={`w-6 h-6 ${loadingSteps[currentStep].color}`} />
              <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {loadingSteps[currentStep].text}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
            {Math.round(progress)}% Complete
          </p>
        </div>

        {/* Pulsing Dots */}
        <div className="flex justify-center gap-2">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-2 h-2 rounded-full bg-purple-500"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2,
              }}
            />
          ))}
        </div>

        {/* Fun message */}
        <motion.p
          className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Creating your perfect adventure...
        </motion.p>
      </div>
    </div>
  );
}

