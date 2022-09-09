import { PropsInterface } from "../../../../helpers/interfaces";
import { SearchBar } from "../../../reusableComponents";

export const Credentials: React.FC<PropsInterface> = (): JSX.Element => {
  return (
    <div className="main">
      <div className="main__content">
        <SearchBar placeholder="Busca un grupo cliente" />
      </div>
    </div>
  );
};
