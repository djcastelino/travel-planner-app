'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Heart, Sparkles } from 'lucide-react';

interface TravelFormProps {
  onSubmit: (data: TravelFormData) => void;
  isLoading: boolean;
}

export interface TravelFormData {
  destination: string;
  startDate: string;
  endDate: string;
  interests: string[];
  travelStyle: string;
}

const interestOptions = [
  { value: 'culture', label: 'Culture & History', emoji: '🏛️' },
  { value: 'food', label: 'Food & Dining', emoji: '🍜' },
  { value: 'adventure', label: 'Adventure', emoji: '🏔️' },
  { value: 'beach', label: 'Beach & Relaxation', emoji: '🏖️' },
  { value: 'shopping', label: 'Shopping', emoji: '🛍️' },
  { value: 'nightlife', label: 'Nightlife', emoji: '🎉' },
  { value: 'nature', label: 'Nature', emoji: '🌿' },
  { value: 'art', label: 'Art & Museums', emoji: '🎨' },
];

const travelStyles = [
  { value: 'budget', label: 'Budget', emoji: '💰' },
  { value: 'moderate', label: 'Moderate', emoji: '✨' },
  { value: 'luxury', label: 'Luxury', emoji: '👑' },
];

export default function TravelForm({ onSubmit, isLoading }: TravelFormProps) {
  const [formData, setFormData] = useState<TravelFormData>({
    destination: '',
    startDate: '',
    endDate: '',
    interests: [],
    travelStyle: 'moderate',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const toggleInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-8">
        {/* Destination */}
        <div>
          <label className="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
            <MapPin className="w-5 h-5 text-purple-500" />
            Where do you want to go?
          </label>
          <input
            type="text"
            required
            value={formData.destination}
            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
            placeholder="e.g., Paris, France"
            className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-900 transition-all outline-none text-lg"
            disabled={isLoading}
          />
        </div>

        {/* Dates */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
              <Calendar className="w-5 h-5 text-blue-500" />
              Start Date
            </label>
            <input
              type="date"
              required
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 transition-all outline-none"
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
              <Calendar className="w-5 h-5 text-blue-500" />
              End Date
            </label>
            <input
              type="date"
              required
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 transition-all outline-none"
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Interests */}
        <div>
          <label className="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            <Heart className="w-5 h-5 text-pink-500" />
            What are you interested in?
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {interestOptions.map((interest) => (
              <motion.button
                key={interest.value}
                type="button"
                onClick={() => toggleInterest(interest.value)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  formData.interests.includes(interest.value)
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30'
                    : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                }`}
                whileTap={{ scale: 0.95 }}
                disabled={isLoading}
              >
                <div className="text-2xl mb-1">{interest.emoji}</div>
                <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {interest.label}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Travel Style */}
        <div>
          <label className="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            Travel Style
          </label>
          <div className="grid grid-cols-3 gap-4">
            {travelStyles.map((style) => (
              <motion.button
                key={style.value}
                type="button"
                onClick={() => setFormData({ ...formData, travelStyle: style.value })}
                className={`p-4 rounded-xl border-2 transition-all ${
                  formData.travelStyle === style.value
                    ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/30'
                    : 'border-gray-200 dark:border-gray-700 hover:border-yellow-300'
                }`}
                whileTap={{ scale: 0.95 }}
                disabled={isLoading}
              >
                <div className="text-2xl mb-1">{style.emoji}</div>
                <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {style.label}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isLoading || formData.interests.length === 0}
          className="w-full py-5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-bold shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          whileHover={!isLoading ? { scale: 1.02 } : {}}
          whileTap={!isLoading ? { scale: 0.98 } : {}}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Planning Your Trip...
            </span>
          ) : (
            '✨ Plan My Perfect Trip'
          )}
        </motion.button>
      </div>
    </motion.form>
  );
}

