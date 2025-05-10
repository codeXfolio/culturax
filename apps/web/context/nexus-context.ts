import { NexusClient, SessionData } from "@biconomy/abstractjs";
import { createContext } from "react";
import { StartaleAccountClient } from "startale-aa-sdk";

type StartaleContextType = {
  startaleClient: StartaleAccountClient | undefined;
  setStartaleClient: (
    startaleClient: StartaleAccountClient | undefined
  ) => void;
};

const StartaleContext = createContext<StartaleContextType>({
  startaleClient: undefined,
  setStartaleClient: () => {},
});

export default StartaleContext;
