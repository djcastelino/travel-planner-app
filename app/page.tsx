'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import TravelForm, { TravelFormData } from '@/components/TravelForm';
import LoadingAnimation from '@/components/LoadingAnimation';
import ItineraryDisplay from '@/components/ItineraryDisplay';
import { Plane } from 'lucide-react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [itineraryData, setItineraryData] = useState<any>(null);
  const [requestInProgress, setRequestInProgress] = useState(false);

  const handleFormSubmit = async (formData: TravelFormData) => {
    // Prevent duplicate requests
    if (requestInProgress) {
      console.log('Request already in progress, ignoring duplicate submission');
      return;
    }

    setRequestInProgress(true);
    setIsLoading(true);

    try {
      const response = await fetch('https://workflowly.online/webhook/travel-planner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userId: 'web-user-' + Date.now(),
        }),
      });

      const data = await response.json();
      console.log('=== RAW API RESPONSE ===');
      console.log('Full response:', JSON.stringify(data, null, 2));
      console.log('First day weather:', data?.itinerary?.[0]?.weather);
      setItineraryData(data);
    } catch (error) {
      console.error('Error:', error);
      setItineraryData({ success: false, error: 'Failed to generate itinerary' });
    } finally {
      setIsLoading(false);
      setRequestInProgress(false);
    }
  };

  const handleReset = () => {
    setItineraryData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      {/* Loading Animation */}
      {isLoading && <LoadingAnimation />}

      {/* Header */}
      <header className="py-8 px-4">
        <motion.div
          className="container mx-auto text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Plane className="w-10 h-10 text-purple-600" />
            <h1 className="text-4xl md:text-5xl font-bold gradient-text">
              TravelCraft AI
            </h1>
          </div>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
            Create your perfect trip in seconds with AI
          </p>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-12">
        {!itineraryData ? (
          <div className="py-8">
            <TravelForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            
            {/* Features */}
            <motion.div
              className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🤖</span>
                </div>
                <h3 className="font-bold text-lg mb-2">AI-Powered</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Get personalized itineraries based on your preferences
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">☀️</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Weather Included</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Real-time weather forecasts for your travel dates
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🗺️</span>
                </div>
                <h3 className="font-bold text-lg mb-2">Smart Planning</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Optimized routes and detailed day-by-day itineraries
                </p>
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="py-8">
            <ItineraryDisplay data={itineraryData} onReset={handleReset} />
          </div>
        )}
      </main>
    </div>
  );
}

