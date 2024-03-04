import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { useState } from "react";
import styles from "./DropdownComponent.module.scss";

export type Option = {
  value: string;
  label: string;
};

type DropdownComponentProps = {
  options: Option[];
  onSelect: (option: Option | null) => void;
  placeholder: string;
};

export default function DropdownComponent({
  options,
  onSelect,
  placeholder,
}: DropdownComponentProps) {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const handleOptionChange = (option: Option) => {
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <div className={styles.container}>
      <Dropdown
        options={options}
        value={selectedOption?.value}
        onChange={(option) => handleOptionChange(option as Option)}
        placeholder={placeholder}
        className={styles.select}
      />
    </div>
  );
}
