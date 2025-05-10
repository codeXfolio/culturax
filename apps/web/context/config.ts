import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import type { Address } from "viem";
import { soneiumMinato } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "CulturaX",
  projectId: "3ae588daa6eb969b4155142fe8d147ef",
  chains: [soneiumMinato],
  ssr: false,
});

export const AA_CONFIG = {
  MINATO_RPC: "https://rpc.minato.soneium.org",
  BUNDLER_URL:
    "https://soneium-minato.dev.bundler.scs.startale.com?apikey=scsadmin",
  PAYMASTER_SERVICE_URL: "https://public.paymaster.scs.startale.com/v1",
  USDC_ADDRESS: "0xE9A198d38483aD727ABC8b0B1e16B2d338CF0391" as Address,
  CULTURA_X_ADDRESS: "0x3c364F6195d4002e59B651Eb77D0A0EC80adE305" as Address,
  SUBSCRIPTION_MANAGER_ADDRESS:
    "0xf1dE70e4289733e8de0B182Bdf4d47d2Fb38ffa7" as Address,
  ACCOUNT_RECOVERY_MODULE_ADDRESS:
    "0xA04D053b3C8021e8D5bF641816c42dAA75D8b597" as Address,
  NEXUS_K1_VALIDATOR_ADDRESS:
    "0x9130927806aC54F93Feb58Eb459c08dcA7D116F8" as Address,
  NEXUS_K1_VALIDATOR_FACTORY_ADDRESS:
    "0x2ecd86799137FA35De834Da03D876bcc363ec0c3" as Address,
  MOCK_ATTESTER_ADDRESS:
    "0xaeD4d8bAa80948d54d33dE041513D30124e1Ae3f" as Address,
};
