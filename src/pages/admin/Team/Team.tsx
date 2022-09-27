import { useEffect } from "react";
import { formatTeamData, getTeamData } from "../../../helpers/helpers";
import { ItemCardInterface, PropsInterface } from "../../../helpers/interfaces";
import { useTeamData } from "../../../hooks/useTeamData";
import { ItemsCards, SearchBar } from "../../reusableComponents";

export const Team: React.FC<PropsInterface> = (): JSX.Element => {
  const [teamData, setTeamData] = useTeamData([]);
  useEffect(() => {
    getTeamData(setTeamData);
  }, []);
  const data: ItemCardInterface["data"] = formatTeamData(teamData);
  return (
    <div className="main">
      <div className="main__content">
        <SearchBar placeholder="Busca un integrante del equipo" />
        <ItemsCards data={data} />
      </div>
    </div>
  );
};
