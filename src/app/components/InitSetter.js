"use client";
import React, { useState } from "react";
import { CustomInput, CustomButton } from "@/app/components/common/";
import Draggable from "react-draggable";

const InitSetter = ({ onInitialSetup, counters, totalClient }) => {
  const initialProcessingTimes = counters.reduce((acc, counter) => {
    acc[counter.name] = counter.processingTime;
    return acc;
  }, {});
  const [isHidden, setIsHidden] = useState(true);
  const [startNumber, setStartNumber] = useState(totalClient);
  const [processingTimes, setProcessingTimes] = useState(
    initialProcessingTimes
  );

  const handleSetup = () => {
    onInitialSetup(startNumber, processingTimes);
  };

  return (
    <Draggable scale={1} bounds="parent">
      <div className="z-10 p-6 isolate rounded-xl bg-black/5 shadow-lg ring-1 ring-black/5 backdrop-blur-md cursor-move w-[320px] sm:w-[520px]">
        <div className="flex flex-row justify-between items-center">
          <div className="sm:text-2xl font-bold select-none text-slate-800">
            Set Initial State
          </div>
          <CustomButton onClick={() => setIsHidden((prev) => !prev)}>
            {isHidden ? "Show" : "Hide"}
          </CustomButton>
        </div>

        {!isHidden && (
          <>
            <div className="flex flex-col gap-4 pt-6">
              {counters.map((counter) => (
                <div
                  key={counter.id}
                  className="flex flex-col sm:flex-row justify-between gap-2 items-center"
                >
                  <div className="text-slate-700 select-none whitespace-nowrap">
                    {counter.name} Processing Time
                  </div>
                  <CustomInput
                    id={counter.name}
                    name={counter.name}
                    type="number"
                    value={processingTimes[counter.name]}
                    onChange={(e) => {
                      setProcessingTimes((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }));
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-2 items-center pt-4">
              <div className="font-semibold text-slate-700 select-none whitespace-nowrap">
                Start Number
              </div>
              <CustomInput
                id="startNumber"
                name="startNumber"
                type="number"
                onChange={(e) => {
                  setStartNumber(parseInt(e.target.value));
                }}
                value={startNumber}
              />
            </div>
            <div className="pt-4 flex justify-end">
              <CustomButton
                onClick={() => {
                  setIsHidden(true);
                  handleSetup();
                }}
                className="text-center text-red-700 w-32"
              >
                Change Init
              </CustomButton>
            </div>
          </>
        )}
      </div>
    </Draggable>
  );
};

export default InitSetter;
