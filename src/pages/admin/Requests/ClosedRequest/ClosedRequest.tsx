import { PropsInterface } from "../../../../helpers/interfaces";
import { SearchBar } from "../../../reusableComponents";

export const ClosedRequest: React.FC<PropsInterface> = (): JSX.Element => {
  return (
    <div className="main">
      <div className="main__content">
        <SearchBar placeholder="Busca una solicitud cerrada" />
      </div>
    </div>
  );
};
