import { PropsInterface } from "../../../../helpers/interfaces";
import { SearchBar } from "../../../reusableComponents";

export const LicensingTables: React.FC<PropsInterface> = (): JSX.Element => {
  return (
    <div className="main">
      <div className="main__content">
        <SearchBar placeholder="Busca un cuadro de licenciamiento" />
      </div>
    </div>
  );
};
