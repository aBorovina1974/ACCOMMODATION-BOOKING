import styles from "./AccommodationItem.module.scss";
import { findMinMax } from "../../../../utils/utils";
import { AMENITIES_LIST } from "../../../../utils/store";
import { useState } from "react";
import { useFilterContext } from "../../../../contexts/filter-context";

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

export default function AccommodationItem({
  title,
  image,
  capacity,
  beachDistanceInMeters,
  amenities,
  pricelistInEuros,
}: AccommodationData) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { filterState } = useFilterContext();

  const priceRange = findMinMax(
    pricelistInEuros.map((priceObj) => priceObj.pricePerNight)
  );

  const detailsToggleHandler = () => {
    setIsDetailsOpen((prev) => !prev);
  };
  return (
    <div className={styles.container}>
      <div className={styles["main-content"]}>
        <img src={image} alt="Image" />
        <div className={styles.info}>
          <h2>{title}</h2>
          <h3>Number of rooms: {capacity}</h3>
          <h3>Distance from the beach: {beachDistanceInMeters} m</h3>
          <div className={styles.expand}>
            <button onClick={detailsToggleHandler}>
              {!isDetailsOpen ? "View Details" : "Close"}
            </button>
          </div>
        </div>
      </div>
      {isDetailsOpen && (
        <div className={styles.details}>
          <div className={styles.amenities}>
            <h2>Additional amenities:</h2>
            <ul className={styles.amenities}>
              {amenities &&
                Object.entries(amenities)
                  .filter((amenity) => amenity[1])
                  .map((_, index) => (
                    <li key={crypto.randomUUID()}>
                      <h3>{AMENITIES_LIST[index]}</h3>
                    </li>
                  ))}
            </ul>
          </div>
          <div className={styles.book}>
            {/* <h3>Price:</h3> */}
            <h3>
              Price range:
              {`${priceRange.min}€ - ${priceRange.max}€`}
            </h3>
            {filterState.startDate && filterState.endDate && (
              <button>Book Now</button>
            )}
          </div>
          {(!filterState.startDate || !filterState.endDate) && (
            <div className={styles.message}>
              <h3>
                Please select dates in order to see the price and make a
                reservation
              </h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
