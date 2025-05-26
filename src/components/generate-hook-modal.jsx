import React, { useState } from "react";
import Button from "./button";
import Input from "./input";
import { ArrowLeft, ArrowRight } from "lucide-react";

const GenerateHookModal = ({ onClose }) => {
  const [isGeneratedHook, setIsGeneratedHook] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black opacity-80 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative z-50 bg-white w-full max-w-2xl rounded-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh]">
        <div className="space-y-2.5">
          <h3 className="text-xl sm:text-2xl font-bold text-black text-center">
            Generate Hook
          </h3>
          <p className="text-cGray text-sm sm:text-base text-center">
            Type your product name and a detailed description to ensure AI
            generates the best hook for you.
          </p>
        </div>

        <div className="flex flex-col gap-2.5 mt-6">
          <Input
            label="Product Name"
            name="productName"
            type="text"
            required
            placeholder="XYZ Shoes"
          />

          <div className="w-full flex flex-col gap-2.5">
            <div className="flex items-center justify-between w-full">
              <h2 className="text-black font-medium text-sm">
                Product Description
              </h2>
            </div>
            <textarea
              className="bg-white outline-cOrange text-cGray border py-2 px-3 rounded-lg w-full h-28 text-sm"
              placeholder="Type here"
            />
          </div>
        </div>

        <div className="flex  sm:items-center gap-2.5 mt-8 justify-end">
          <div className={"w-fit"}>
            <Button
              label="Cancel"
              theme="white"
              type="button"
              onClick={onClose}
            />
          </div>

          <div className={"w-fit"}>
            <Button
              label="Generate Hook"
              theme="primary"
              type="button"
              onClick={() => setIsGeneratedHook(true)}
            />
          </div>
        </div>

        {isGeneratedHook && (
          <div className="flex flex-col gap-2.5 mt-8 items-center">
            <div className="w-full flex flex-col gap-2.5">
              <div className="flex items-center justify-between w-full">
                <h2 className="text-black font-medium text-sm">
                  Generated Hooks:
                </h2>
                <div className="flex flex-row items-center gap-2.5">
                  <ArrowLeft color="#667085" width={10} height={10} />
                  <h5 className="text-xs font-medium text-cGray">1/2</h5>
                  <ArrowRight color="#667085" width={10} height={10} />
                </div>
              </div>
              <input
                className="bg-white text-cGray border py-2 px-3 rounded-lg w-full text-sm"
                placeholder="You need great Shoes, view this demo"
              />
            </div>

            <Button
              label="Use This"
              theme="primary"
              type="button"
              className={"w-fit"}
              onClick={() => {
                setIsGeneratedHook(false);
                onClose();
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateHookModal;
