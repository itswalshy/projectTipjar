import type { Distribution, Partner } from "@shared/schema";

const STORAGE_KEY = "tipjar.data";

export type StoredData = {
  partners: Partner[];
  distributions: Distribution[];
  nextPartnerId: number;
  nextDistributionId: number;
};

export const defaultStoredData: StoredData = {
  partners: [],
  distributions: [],
  nextPartnerId: 1,
  nextDistributionId: 1,
};

function isValidStoredData(value: unknown): value is StoredData {
  if (!value || typeof value !== "object") {
    return false;
  }

  const data = value as Partial<StoredData>;

  return (
    Array.isArray(data.partners) &&
    Array.isArray(data.distributions) &&
    typeof data.nextPartnerId === "number" &&
    typeof data.nextDistributionId === "number"
  );
}

export function loadStoredData(): StoredData {
  if (typeof window === "undefined") {
    return { ...defaultStoredData };
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return { ...defaultStoredData };
  }

  try {
    const parsed = JSON.parse(raw);
    if (isValidStoredData(parsed)) {
      return {
        ...parsed,
        partners: parsed.partners ?? [],
        distributions: parsed.distributions ?? [],
      };
    }
    return { ...defaultStoredData };
  } catch (error) {
    console.error("Failed to parse TipJar storage", error);
    return { ...defaultStoredData };
  }
}

export function persistData(data: StoredData) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function clearStoredData() {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.removeItem(STORAGE_KEY);
}
