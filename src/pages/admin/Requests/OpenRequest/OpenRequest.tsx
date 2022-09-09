import { PropsInterface } from "../../../../helpers/interfaces";
import { ItemsCards, SearchBar } from "../../../reusableComponents";

export const OpenRequest: React.FC<PropsInterface> = (): JSX.Element => {
  return (
    <div className="main">
      <div className="main__content">
        <SearchBar placeholder="Busca una solicitud abierta" />
        <ItemsCards />
      </div>
    </div>
  );
};
