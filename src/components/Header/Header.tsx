import { useState } from "react";
import Filter from "./Filter/Filter";
import styles from "./Header.module.scss";

export default function Header() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const toggleFilter = () => {
    setIsFilterOpen((prev) => !prev);
  };
  return (
    <div className={styles.header}>
      {isFilterOpen && <Filter />}
      <h2 className={styles.title}>StayBook</h2>
      <button onClick={toggleFilter}>Filter</button>
    </div>
  );
}
