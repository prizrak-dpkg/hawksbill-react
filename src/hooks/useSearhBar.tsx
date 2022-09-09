import { useState } from "react";
import { SearchInterface } from "../helpers/interfaces";

export const useSearchBar = (
  initialValue: SearchInterface
): [SearchInterface, (event: React.ChangeEvent<HTMLInputElement>) => void] => {
  const [form, setForm] = useState(initialValue);
  const handleChanges = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setForm({
      ...form,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };
  return [form, handleChanges];
};
