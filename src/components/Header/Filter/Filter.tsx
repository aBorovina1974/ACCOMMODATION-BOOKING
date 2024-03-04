import { useState } from "react";
import DatepickerComponent from "../../DatepickerComponent/DatepickerComponent";
import DropdownComponent from "../../DropdownComponent/DropdownComponent";
import { Option } from "../../DropdownComponent/DropdownComponent";
import styles from "./Filter.module.scss";
import { AMENITIES_LIST, CAPACITY_LIST } from "../../../utils/store";
import { useFilterContext } from "../../../contexts/filter-context";

export default function Filter() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedCapacity, setSelectedCapacity] = useState<String | null>(null);
  const [selectedAmenity, setSelectedAmenity] = useState<String | null>(null);
  const { filterState, setFilterState } = useFilterContext();

  const amenitiesOptions: Option[] = AMENITIES_LIST.map((amenity) => {
    return { value: amenity, label: amenity };
  });

  const roomsOptions: Option[] = CAPACITY_LIST.map((capacity) => {
    return { value: capacity, label: capacity };
  });

  const onChangeHandlerStart = (date: Date | null) => {
    setStartDate(date);
    setFilterState((prevState) => ({ ...prevState, startDate: date }));
  };

  const onChangeHandlerEnd = (date: Date | null) => {
    setEndDate(date);
    setFilterState((prevState) => ({ ...prevState, endDate: date }));
  };

  const onSelectCapacityHandler = () => {
    console.log();
  };

  const onSelectAmenitiesHandler = () => {
    console.log();
  };
  return (
    <div className={styles.container}>
      <DatepickerComponent
        placeholder="Select start date"
        onDateChange={onChangeHandlerStart}
      />
      <DatepickerComponent
        placeholder="Select end date"
        onDateChange={onChangeHandlerEnd}
      />
      <DropdownComponent
        options={roomsOptions}
        onSelect={onSelectCapacityHandler}
        placeholder="Number of rooms"
      />
      <DropdownComponent
        options={amenitiesOptions}
        onSelect={onSelectAmenitiesHandler}
        placeholder="Amenity"
      />
    </div>
  );
}
