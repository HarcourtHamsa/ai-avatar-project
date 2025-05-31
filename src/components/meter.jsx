const Meter = ({ value, max = 10 }) => {
  const percentage = Math.min((value / max) * 100, 100); // clamp to 100%

  return (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-cOrange rounded-full"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default Meter;
