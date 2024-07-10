import React from "react";
import { CustomButton } from "./common";
import classNames from "classnames";

const BankCounter = ({ counters, addNextClient, queue }) => {
  return (
    <div className="relative flex flex-col divide-y-2 divide-black/10 overflow-x-auto shadow-md sm:rounded-lg bg-white/50 w-11/12 sm:w-3/4">
      <div className="text-slate-800 text-center py-8 font-extrabold text-2xl font-mono">
        Bank Counter
      </div>
      <div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead>
            <tr>
              <th scope="col" className="px-6 py-3">
                Counter Name
              </th>
              <th scope="col" className="px-6 py-3">
                Processing
              </th>
              <th scope="col" className="px-6 py-3">
                Processed
              </th>
            </tr>
          </thead>
          <tbody>
            {counters.map((counter) => (
              <tr key={counter.name}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {counter.name}
                </th>
                <td
                  className={classNames(
                    "px-6 py-4 font-semibold",
                    counter.status === "idle"
                      ? "text-green-800 "
                      : "text-amber-800"
                  )}
                >
                  {counter.status}
                </td>
                <td className="px-6 py-4 font-semibold text-cyan-800">
                  {counter.processedClients.length
                    ? counter.processedClients.join(", ")
                    : "NA"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col p-4 justify-center gap-2">
        <div className="flex flex-row gap-2 items-center justify-center">
          <div className="text-slate-600 font-mono">
            Number of People waiting:
          </div>
          <div className="text-slate-800 font-medium text-lg">
            {queue.length}
          </div>
        </div>
        <div>
          <CustomButton className="mx-auto w-28" onClick={addNextClient}>
            Next
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default BankCounter;
