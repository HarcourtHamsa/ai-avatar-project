import React from 'react';

const FaqItem = ({ question, answer, isFirst }) => {
  return (
    <div
      className={`flex flex-col gap-2.5 ${
        isFirst ? '' : 'border-t border-t-cGray/30 pt-6'
      }`}
    >
      <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-black">
        {question}
      </h3>
      <p className="text-sm sm:text-base text-[#535862] whitespace-pre-line">
        {answer}
      </p>
    </div>
  );
};

export default FaqItem;
