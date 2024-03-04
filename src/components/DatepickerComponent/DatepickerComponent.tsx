import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import DatePicker from "react-datepicker";
import styles from "./DatepickerComponent.module.scss";

type DatepickerComponentProps = {
  placeholder: string;
  onDateChange: (date: Date | null) => void;
};

export default function DatepickerComponent({
  onDateChange,
  placeholder,
}: DatepickerComponentProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const specificYear = 2024;
  const startDate = new Date(specificYear, 0, 1);
  const endDate = new Date(specificYear, 11, 31);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    onDateChange(date);
  };

  return (
    <div className={styles.container}>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        placeholderText={placeholder}
        className={styles.input}
        calendarClassName={styles.calendar}
        minDate={startDate}
        maxDate={endDate}
      />
    </div>
  );
}
