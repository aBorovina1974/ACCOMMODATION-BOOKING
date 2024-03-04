import { ReactNode, useState } from "react";
import AccommodationItem, {
  AccommodationData,
} from "../AccomodationItem/AccomodationItem";
import styles from "./AccommodationsList.module.scss";
import { useAccommodationsContext } from "../../../../contexts/accommodations-context";
import { useFilterContext } from "../../../../contexts/filter-context";

type DateRange = {
  startDate: string | undefined;
  endDate: string | undefined;
};

export default function AccommodationList() {
  const { accommodations, isFetching } = useAccommodationsContext();
  const { filterState } = useFilterContext();
  const [filteredAccommodations, setFilteredAccommodations] = useState<
    AccommodationData[] | null
  >(null);

  const isDateRangeWithinRange = (
    dateRange: DateRange,
    availableStartDate: string,
    availableEndDate: string
  ): boolean => {
    const { startDate, endDate } = dateRange;
    const isWithinRange: boolean = false;
    if (startDate && endDate) {
      startDate >= availableStartDate && endDate <= availableEndDate;
    }
    return isWithinRange;
  };

  if (
    (filterState.startDate && filterState.endDate) ||
    filterState.selectedCapacity ||
    filterState.selectedAmenity
  ) {
    console.log("Aktivirano je");
    const filtered: AccommodationData[] = accommodations.filter((acc) =>
      acc.availableDates.filter((range) => {
        isDateRangeWithinRange(
          {
            startDate: filterState.startDate?.toISOString(),
            endDate: filterState.endDate?.toISOString(),
          },
          range.intervalStart.toISOString(),
          range.intervalEnd.toISOString()
        );
      })
    );
    setFilteredAccommodations(filtered);
  }

  let content: ReactNode;

  if (isFetching) {
    content = <h1>Fetching....</h1>;
  }

  if (filteredAccommodations ? filteredAccommodations : accommodations) {
    content = (
      <ul className={styles.accommodations}>
        {accommodations?.map((acc) => (
          <AccommodationItem
            key={crypto.randomUUID()}
            id={acc.id}
            title={acc.title}
            image={acc.image}
            capacity={acc.capacity}
            beachDistanceInMeters={acc.beachDistanceInMeters}
            amenities={acc.amenities}
            pricelistInEuros={acc.pricelistInEuros}
            availableDates={acc.availableDates}
          />
        ))}
      </ul>
    );
  }

  return <>{content}</>;
}
