import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { get } from "../utils/http";

type Amenities = {
  airConditioning: boolean;
  parkingSpace: boolean;
  pets: boolean;
  pool: boolean;
  wifi: boolean;
  tv: true;
};

export type Price = {
  intervalStart: Date;
  intervalEnd: Date;
  pricePerNight: number;
};

type DateInterval = {
  intervalStart: Date;
  intervalEnd: Date;
};

export type AccommodationData = {
  id: string;
  title: string;
  image: string;
  capacity: number;
  beachDistanceInMeters: number;
  amenities: Amenities;
  pricelistInEuros: Price[];
  availableDates: DateInterval[];
};

type AccommodationsContextValue = {
  isFetching: boolean;
  error: Error | undefined;
  accommodations: AccommodationData[];
};

const AccommodationsContext = createContext<AccommodationsContextValue | null>(
  null
);

export function useAccommodationsContext() {
  const accCtx = useContext(AccommodationsContext);

  if (accCtx === null) {
    throw new Error(
      "useAccommodationsContext must be used within context provider!"
    );
  }
  return accCtx;
}

type AccommodationsContextProviderProps = {
  children: ReactNode;
};

export default function AccommodationsContextProvider({
  children,
}: AccommodationsContextProviderProps) {
  const [accommodations, setAccommodations] = useState<AccommodationData[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  const ctx: AccommodationsContextValue = {
    isFetching: isFetching,
    error: error,
    accommodations: accommodations,
  };

  useEffect(() => {
    async function fetchAccommodations() {
      setIsFetching(true);
      try {
        const data = await get<AccommodationData[]>(
          "https://api.adriatic.hr/test/accommodation"
        );
        setAccommodations(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        }
      }
      setIsFetching(false);
    }
    fetchAccommodations();
  }, []);

  return (
    <AccommodationsContext.Provider value={ctx}>
      {children}
    </AccommodationsContext.Provider>
  );
}
