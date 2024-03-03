import { ReactNode, useEffect, useState } from "react";
import { get } from "../../../../utils/http";
import AccommodationItem from "../AccomodationItem/AccomodationItem";
import { AccommodationData } from "../AccomodationItem/AccomodationItem";

export default function AccommodationList() {
  const [fetchedAccommodations, setFetchedAccomodations] =
    useState<AccommodationData[]>();
  const [isFetchcing, setIsFetching] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    async function fetchAccommodations() {
      setIsFetching(true);
      try {
        const data = await get<AccommodationData[]>(
          "https://api.adriatic.hr/test/accommodation"
        );
        setFetchedAccomodations(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
      setIsFetching(false);
    }
    fetchAccommodations();
  }, []);

  let content: ReactNode;

  if (isFetchcing) {
    content = <h1>Fetching....</h1>;
  }

  if (fetchedAccommodations) {
    content = (
      <ul>
        {fetchedAccommodations?.map((acc) => (
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
