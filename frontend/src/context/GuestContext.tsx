import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { fetchGuest } from "../api/guests";
import {
  getStoredToken,
  getTokenFromUrl,
  setStoredToken,
} from "../utils/storage";
import type { Guest } from "../types/guest";

type LoadStatus = "idle" | "loading" | "ready" | "error" | "no-token";

interface GuestContextValue {
  guest: Guest | null;
  token: string | null;
  status: LoadStatus;
  error: string | null;
  refresh: () => Promise<void>;
  setGuest: (guest: Guest) => void;
}

const GuestContext = createContext<GuestContextValue | null>(null);

export function GuestProvider({ children }: { children: ReactNode }) {
  const initialToken = useMemo(
    () => getTokenFromUrl() ?? getStoredToken(),
    [],
  );

  const [token] = useState<string | null>(initialToken);
  const [guest, setGuestState] = useState<Guest | null>(null);
  const [status, setStatus] = useState<LoadStatus>(
    initialToken ? "loading" : "no-token",
  );
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (t: string) => {
    setStatus("loading");
    setError(null);
    try {
      const data = await fetchGuest(t);
      setGuestState(data);
      setStatus("ready");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load guest");
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    if (!token) return;
    setStoredToken(token);
    void load(token);
  }, [token, load]);

  const refresh = useCallback(async () => {
    if (token) await load(token);
  }, [token, load]);

  const setGuest = useCallback((g: Guest) => setGuestState(g), []);

  const value = useMemo(
    () => ({ guest, token, status, error, refresh, setGuest }),
    [guest, token, status, error, refresh, setGuest],
  );

  return (
    <GuestContext.Provider value={value}>{children}</GuestContext.Provider>
  );
}

export function useGuest(): GuestContextValue {
  const ctx = useContext(GuestContext);
  if (!ctx) throw new Error("useGuest must be used within a GuestProvider");
  return ctx;
}
