'use client';

import { motion } from 'framer-motion';
import { MapPin, Clock, DollarSign, Sun, Cloud, CloudRain, ExternalLink, Calendar, Utensils, Briefcase, Sparkles, Banknote } from 'lucide-react';

interface ItineraryDisplayProps {
  data: any;
  onReset: () => void;
}

const weatherIcons: Record<string, any> = {
  'clear sky': Sun,
  'few clouds': Cloud,
  'scattered clouds': Cloud,
  'broken clouds': Cloud,
  'rain': CloudRain,
  'default': Sun,
};

export default function ItineraryDisplay({ data, onReset }: ItineraryDisplayProps) {
  // Debug logging
  console.log('ItineraryDisplay received data:', data);
  console.log('Itinerary array:', data?.itinerary);
  console.log('Itinerary length:', data?.itinerary?.length);

  if (!data || !data.success) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 text-lg">Oops! Something went wrong. Please try again.</p>
        <button
          onClick={onReset}
          className="mt-4 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Safely access nested properties with defaults
  const destination = data.destination || 'Your Destination';
  const overview = data.overview || 'Plan your perfect trip';
  const duration = data.dates?.duration || data.itinerary?.length || (data.itinerary && Array.isArray(data.itinerary) ? data.itinerary.length : 0);
  const bestTimeToVisit = data.bestTimeToVisit || 'Check weather before traveling';
  const packingList = data.packingList || [];
  const localTips = data.localTips || [];
  const itinerary = Array.isArray(data.itinerary) ? data.itinerary : [];
  const weather = data.weather || {};

  console.log('Processed itinerary:', itinerary);
  console.log('Is itinerary an array?', Array.isArray(itinerary));
  console.log('Itinerary items:', itinerary.length);
  console.log('Duration:', duration);

  return (
    <motion.div
      className="w-full max-w-6xl mx-auto space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-3xl p-8 md:p-12 shadow-2xl">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
        >
          {destination}
        </motion.h1>
        <p className="text-lg md:text-xl opacity-90 mb-6">{overview}</p>
        <div className="flex flex-wrap gap-4 text-sm md:text-base">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <span>{duration} days</span>
          </div>
        </div>
      </div>

      {/* Quick Info Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Weather Summary */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
            <Sun className="w-5 h-5 text-yellow-500" />
            Weather
          </h3>
          <p className="text-gray-600 dark:text-gray-400">{bestTimeToVisit}</p>
        </motion.div>

        {/* Packing */}
        {packingList.length > 0 && (
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-purple-500" />
              Pack These
            </h3>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              {packingList.slice(0, 3).map((item: string, idx: number) => (
                <li key={idx}>• {item}</li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Currency & Tipping (New) */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg md:col-span-2 lg:col-span-1"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
            <Banknote className="w-5 h-5 text-green-500" />
            Money Matters
          </h3>
          
          {data.currencyRates && Object.keys(data.currencyRates).length > 0 ? (
            <div className="mb-4 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-100 dark:border-green-800">
               <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Exchange Rate</p>
               <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
                 {/* Fallback display if specific format matches, otherwise dump key/val */}
                 {data.currencyRates.code ? `1 ${data.currencyRates.base || 'USD'} ≈ ${data.currencyRates.rate} ${data.currencyRates.code}` : 'Rates available'}
               </p>
            </div>
          ) : (
            <div className="mb-4 text-sm text-gray-500 italic">
              Currency info not available
            </div>
          )}

          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Traveler Tips</p>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              {/* Filter for money-related tips, or show generic ones if none found */}
              {localTips.filter((t: string) => t.toLowerCase().match(/(tip|cash|card|money|currency|atm)/)).length > 0 ? (
                localTips.filter((t: string) => t.toLowerCase().match(/(tip|cash|card|money|currency|atm)/)).slice(0, 3).map((tip: string, idx: number) => (
                  <li key={idx}>• {tip}</li>
                ))
              ) : (
                <>
                  <li>• Check current exchange rates</li>
                  <li>• Inform your bank before travel</li>
                  <li>• Carry some local cash for small shops</li>
                </>
              )}
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Day by Day Itinerary */}
      <div>
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-purple-600" />
          Your Day-by-Day Adventure
        </h2>
        <div className="space-y-6">
          {itinerary.map((day: any, index: number) => {
            const WeatherIcon = day.weather?.description ? weatherIcons[day.weather.description.toLowerCase()] || weatherIcons.default : Sun;
            const dayWeather = day.weather || weather[day.day];
            
            console.log(`Day ${day.day} weather:`, dayWeather);
            console.log(`Day ${day.day} has temp:`, dayWeather?.temp);

            const isUS = data.destination?.toLowerCase().includes('usa') || 
                         data.destination?.toLowerCase().includes('united states') ||
                         data.destination?.match(/,\s*[A-Z]{2}$/); // Matches ", NY", ", CA", etc.

            const displayTemp = (celsius: number) => {
              if (isUS) {
                return `${Math.round(celsius * 9 / 5 + 32)}°F`;
              }
              return `${Math.round(celsius)}°C`;
            };

            return (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow"
              >
                {/* Day Header */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold">Day {day.day}{day.theme ? `: ${day.theme}` : ''}</h3>
                      {day.date && <p className="opacity-90">{day.date}</p>}
                    </div>
                    {dayWeather && dayWeather.temp !== null && dayWeather.temp !== undefined && (
                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
                          <WeatherIcon className="w-5 h-5" />
                          <span className="font-bold">
                            {dayWeather.isHistorical ? 'Typical: ' : ''}
                            {displayTemp(dayWeather.temp)}
                          </span>
                        </div>
                        {dayWeather.isHistorical && (
                          <p className="text-xs opacity-75 mt-1">
                            {dayWeather.tempRange || 'Historical average'}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Activities */}
                <div className="p-6 space-y-6">
                  {/* Morning */}
                  {day.morning && (
                    <ActivityCard activity={day.morning} timeOfDay="Morning" icon="🌅" />
                  )}
                  {/* Afternoon */}
                  {day.afternoon && (
                    <ActivityCard activity={day.afternoon} timeOfDay="Afternoon" icon="☀️" />
                  )}
                  {/* Evening */}
                  {day.evening && (
                    <ActivityCard activity={day.evening} timeOfDay="Evening" icon="🌙" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Local Tips */}
      {localTips && localTips.length > 0 && (
        <motion.div
          className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-yellow-600" />
            Local Tips
          </h3>
          <ul className="space-y-2">
            {localTips.map((tip: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-yellow-600 mt-1">💡</span>
                <span className="text-gray-700 dark:text-gray-300">{tip}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Reset Button */}
      <div className="text-center pt-8">
        <button
          onClick={onReset}
          className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all"
        >
          Plan Another Trip ✈️
        </button>
      </div>
    </motion.div>
  );
}

function ActivityCard({ activity, timeOfDay, icon }: { activity: any; timeOfDay: string; icon: string }) {
  return (
    <div className="border-l-4 border-purple-500 pl-4">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4 className="font-bold text-lg flex items-center gap-2">
            <span>{icon}</span>
            {timeOfDay}
          </h4>
          <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">{activity.activity}</p>
        </div>
      </div>
      <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <a
            href={activity.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-600 flex items-center gap-1"
          >
            {activity.location}
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{activity.duration}</span>
        </div>
        {activity.tips && (
          <p className="mt-2 text-gray-700 dark:text-gray-300">
            💡 <span className="font-medium">Tip:</span> {activity.tips}
          </p>
        )}
      </div>
    </div>
  );
}

