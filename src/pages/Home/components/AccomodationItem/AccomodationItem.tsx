import styles from "./AccommodationItem.module.scss";
import { findMinMax, splitCamelCase } from "../../../../utils/utils";

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
  id,
  title,
  image,
  capacity,
  beachDistanceInMeters,
  amenities,
  pricelistInEuros,
  availableDates,
}: AccommodationData) {
  const priceRange = findMinMax(
    pricelistInEuros.map((priceObj) => priceObj.pricePerNight)
  );
  return (
    <div className={styles.container}>
      <div className={styles["main-content"]}>
        <img src={image} alt="Image" />
        <div className={styles.info}>
          <h2>{title}</h2>
          <h3>Number of rooms: {capacity}</h3>
          <h3>Distance from the beach: {beachDistanceInMeters} m</h3>
          <div className={styles.expand}>
            <button>View Details</button>
          </div>
        </div>
      </div>
      <div className={styles.details}>
        <h2>Additional amenities:</h2>
        <ul className={styles.amenities}>
          {amenities &&
            Object.entries(amenities)
              .filter((amenity) => amenity[1])
              .map((amenity) => (
                <li key={crypto.randomUUID()}>
                  <h3>{splitCamelCase(amenity[0])}</h3>
                </li>
              ))}
        </ul>
        <div className={styles.book}>
          <div className={styles.price}>
            {/* <h3>Price:</h3> */}
            <h3>
              Price range:
              {`${priceRange.min}€ - ${priceRange.max}€`}
            </h3>
          </div>
          <h3>
            Please select dates in order to see the price and make a reservation
          </h3>
          <button>Book Now</button>
        </div>
      </div>
    </div>
  );
}
