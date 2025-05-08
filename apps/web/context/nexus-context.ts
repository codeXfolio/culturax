import { NexusClient } from "@biconomy/abstractjs";
import { createContext } from "react";

type NexusContextType = {
  nexusClient: NexusClient | null;
  setNexusClient: (nexusClient: NexusClient | null) => void;
};

const NexusContext = createContext<NexusContextType>({
  nexusClient: null,
  setNexusClient: () => {},
});

export default NexusContext;
