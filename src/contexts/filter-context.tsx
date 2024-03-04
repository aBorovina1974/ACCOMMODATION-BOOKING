import { ReactNode, createContext, useContext, useState } from "react";

type FilterState = {
  startDate: Date | null;
  endDate: Date | null;
  selectedCapacity: string | null;
  selectedAmenity: string | null;
};

type FilterContextValue = {
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
};

const FilterContext = createContext<FilterContextValue | null>(null);

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useStateContext must be used within a StateProvider");
  }
  return context;
};

type FilterContextProviderProps = {
  children: ReactNode;
};

export default function DateContextProvider({
  children,
}: FilterContextProviderProps) {
  const [filterState, setFilterState] = useState<FilterState>({
    startDate: null,
    endDate: null,
    selectedCapacity: null,
    selectedAmenity: null,
  });

  return (
    <FilterContext.Provider value={{ filterState, setFilterState }}>
      {children}
    </FilterContext.Provider>
  );
}
