import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import { PartnerHours, DistributionData, Partner, Distribution } from "@shared/schema";
import {
  defaultStoredData,
  loadStoredData,
  persistData,
  type StoredData,
} from "@/lib/persistence";

interface TipContextType {
  partnerHours: PartnerHours;
  setPartnerHours: React.Dispatch<React.SetStateAction<PartnerHours>>;
  extractedText: string;
  setExtractedText: React.Dispatch<React.SetStateAction<string>>;
  distributionData: DistributionData | null;
  setDistributionData: React.Dispatch<React.SetStateAction<DistributionData | null>>;
  partners: Partner[];
  addPartner: (name: string) => Partner | null;
  distributionHistory: Distribution[];
  recordDistribution: (distribution: DistributionData) => Distribution;
  isStorageReady: boolean;
}

const TipContext = createContext<TipContextType | undefined>(undefined);

export function TipContextProvider({ children }: { children: React.ReactNode }) {
  const [partnerHours, setPartnerHours] = useState<PartnerHours>([]);
  const [extractedText, setExtractedText] = useState<string>("");
  const [distributionData, setDistributionData] = useState<DistributionData | null>(null);
  const [storage, setStorage] = useState<StoredData>(defaultStoredData);
  const [isStorageReady, setIsStorageReady] = useState(false);

  useEffect(() => {
    const data = loadStoredData();
    setStorage(data);
    setIsStorageReady(true);
  }, []);

  const addPartner = useCallback((name: string) => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      return null;
    }

    let createdPartner: Partner | null = null;

    setStorage((prev) => {
      const exists = prev.partners.some(
        (partner) => partner.name.toLowerCase() === trimmedName.toLowerCase(),
      );

      if (exists) {
        return prev;
      }

      const newPartner: Partner = {
        id: prev.nextPartnerId,
        name: trimmedName,
      };

      const nextState: StoredData = {
        ...prev,
        nextPartnerId: prev.nextPartnerId + 1,
        partners: [...prev.partners, newPartner],
      };

      createdPartner = newPartner;
      persistData(nextState);
      return nextState;
    });

    return createdPartner;
  }, []);

  const recordDistribution = useCallback((distribution: DistributionData) => {
    let createdDistribution: Distribution | null = null;

    setStorage((prev) => {
      const newDistribution: Distribution = {
        id: prev.nextDistributionId,
        date: new Date().toISOString(),
        totalAmount: distribution.totalAmount,
        totalHours: distribution.totalHours,
        hourlyRate: distribution.hourlyRate,
        partnerData: distribution.partnerPayouts,
      };

      const nextState: StoredData = {
        ...prev,
        nextDistributionId: prev.nextDistributionId + 1,
        distributions: [newDistribution, ...prev.distributions],
      };

      createdDistribution = newDistribution;
      persistData(nextState);
      return nextState;
    });

    if (!createdDistribution) {
      throw new Error("Failed to record distribution");
    }

    return createdDistribution;
  }, []);

  return (
    <TipContext.Provider
      value={{
        partnerHours,
        setPartnerHours,
        extractedText,
        setExtractedText,
        distributionData,
        setDistributionData,
        partners: storage.partners,
        addPartner,
        distributionHistory: storage.distributions,
        recordDistribution,
        isStorageReady,
      }}
    >
      {children}
    </TipContext.Provider>
  );
}

export function useTipContext() {
  const context = useContext(TipContext);
  if (context === undefined) {
    throw new Error("useTipContext must be used within a TipContextProvider");
  }
  return context;
}
