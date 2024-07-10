"use client";
import React, { useState, useEffect, useCallback } from "react";
import InitSetter from "@/app/components/InitSetter";
import BankCounter from "@/app/components/BankCounter";

export default function Home() {
  const [counters, setCounters] = useState([
    {
      id: 1,
      name: "Counter 1",
      priority: 1,
      processingTime: 2,
      status: "idle",
      processedClients: [],
    },
    {
      id: 2,
      name: "Counter 2",
      priority: 2,
      processingTime: 2,
      status: "idle",
      processedClients: [],
    },
    {
      id: 3,
      name: "Counter 3",
      priority: 3,
      processingTime: 2,
      status: "idle",
      processedClients: [],
    },
    {
      id: 4,
      name: "Counter 4",
      priority: 4,
      processingTime: 2,
      status: "idle",
      processedClients: [],
    },
  ]);
  const [queue, setQueue] = useState([]);
  const [totalClient, setTotalClient] = useState(1);
  const [isCountersWorking, setIsCountersWorking] = useState(false);

  const findHighPriorityCounter = (counters) => {
    let resultCounter = counters[0];
    counters.forEach((counter) => {
      if (resultCounter.priority > counter.priority) resultCounter = counter;
    });
    return resultCounter;
  };

  const onInitialSetup = (startNumber, processingTimes) => {
    const updatedCounters = counters.map((counter) => ({
      ...counter,
      processingTime: processingTimes[counter.name],
    }));
    const initialClient = Array.from(
      { length: startNumber },
      (_, index) => index + 1
    );
    setCounters(updatedCounters);
    setQueue(initialClient);
    setTotalClient(startNumber);
    setIsCountersWorking(true);
  };

  const addNextClient = () => {
    const newClientNumber = totalClient + 1;
    setTotalClient((prev) => prev + 1);
    setQueue((prev) => [...prev, newClientNumber]);
  };

  const processClient = useCallback(
    (clientNumber, counter) => {
      setTimeout(() => {
        if (queue.length === 0) {
          setCounters((prevCounters) => {
            const updatedCounters = prevCounters.map((el) => {
              if (el.id === counter.id) {
                return {
                  ...counter,
                  status: "idle",
                  processedClients: [...counter.processedClients, clientNumber],
                };
              } else return el;
            });

            return updatedCounters;
          });
        } else SystemMonitor();
      }, counter.processingTime * 1000);
    },
    []
  );

  const assignClientToCounter = useCallback(
    (clientNumber, counter) => {
      setCounters((prevCounters) => {
        const updatedCounters = prevCounters.map((el) => {
          if (el.id === counter.id) {
            return {
              ...counter,
              status: clientNumber,
            };
          } else return el;
        });
        return updatedCounters;
      });
      processClient(clientNumber, counter);
      setQueue((prev) => prev.slice(1));
    },
    [processClient]
  );

  const SystemMonitor = useCallback(() => {
    if (queue.length === 0) return;
    let availableCounters = counters.filter(
      (counter) => counter.status === "idle"
    );
    queue.forEach((clientNumber) => {
      if (availableCounters.length === 0) return;
      const idleCounter = findHighPriorityCounter(availableCounters);
      assignClientToCounter(clientNumber, idleCounter);
      availableCounters = availableCounters.filter(
        (counter) => counter.id !== idleCounter.id
      );
    });
    console.log(queue, "queue");
  }, [queue, counters, assignClientToCounter]);

  useEffect(() => {
    let timer;
    if (isCountersWorking) {
      timer = setInterval(() => {
        SystemMonitor();
        console.log("monitor is working");
      }, 1000);
    } else if (timer) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isCountersWorking, SystemMonitor, counters]);

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-l p-4 from-gray-200 via-fuchsia-200 to-stone-100">
      <InitSetter
        onInitialSetup={onInitialSetup}
        counters={counters}
        totalClient={totalClient}
      />
      <div className="absolute flex justify-center w-full mt-24">
        <BankCounter
          counters={counters}
          addNextClient={addNextClient}
          queue={queue}
        />
      </div>
    </main>
  );
}
