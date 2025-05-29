import { useState, useEffect } from "react";

const PercentageLoader = ({ isActive, onComplete, duration = 90000 }) => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setPercentage(0);
      return;
    }

    const interval = 100;
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setPercentage((prev) => {
        let adjustedIncrement = increment;
        const newPercentage = prev + increment;

        if (newPercentage > 85) {
          adjustedIncrement = increment * 0.3;
        } else if (newPercentage > 70) {
          adjustedIncrement = increment * 0.6;
        }

        const finalPercentage = prev + adjustedIncrement;

        if (finalPercentage >= 100) {
          clearInterval(timer);
          onComplete?.();
          return 100;
        }

        return finalPercentage;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isActive, duration, onComplete]);

  if (!isActive) return null;

  // For SVG circle
  const radius = 60;
  const stroke = 10;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center mt-8">
      <div className="relative w-36 h-36">
        {/* Outer static border */}
        <svg height="100%" width="100%" className="transform -rotate-90">
          <circle
            stroke="#e5e7eb" // Tailwind gray-200
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx="50%"
            cy="50%"
          />
          <circle
            stroke="url(#gradient)"
            fill="transparent"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            r={normalizedRadius}
            cx="50%"
            cy="50%"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f97316" /> {/* cOrange */}
              <stop offset="100%" stopColor="#ec4899" /> {/* pink-500 */}
            </linearGradient>
          </defs>
        </svg>

        {/* Percentage text in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-semibold text-cOrange">
            {Math.round(percentage)}%
          </span>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-500 text-center">
        {percentage < 30 && "Analyzing your prompt..."}
        {percentage >= 30 && percentage < 60 && "Creating facial features..."}
        {percentage >= 60 && percentage < 85 && "Adding final details..."}
        {percentage >= 85 && "Almost ready..."}
      </div>
    </div>
  );
};

export default PercentageLoader;
