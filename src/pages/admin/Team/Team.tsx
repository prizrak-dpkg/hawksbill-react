import { PropsInterface } from "../../../helpers/interfaces";
import { SearchBar } from "../../reusableComponents";

export const Team: React.FC<PropsInterface> = (): JSX.Element => {
  return (
    <div className="main">
      <div className="main__content">
        <SearchBar placeholder="Busca un integrante del equipo" />
      </div>
    </div>
  );
};
