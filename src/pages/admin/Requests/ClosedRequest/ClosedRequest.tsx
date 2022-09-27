import { useEffect } from "react";
import { formatRequestData, getRequestData } from "../../../../helpers/helpers";
import {
  OpenRequestItemCardInterface,
  PropsInterface,
} from "../../../../helpers/interfaces";
import { useRequestData } from "../../../../hooks/useRequestData";
import { OpenRequestItemsCards, SearchBar } from "../../../reusableComponents";

export const ClosedRequest: React.FC<PropsInterface> = (): JSX.Element => {
  const [requestData, setRequestData] = useRequestData([]);
  useEffect(() => {
    getRequestData(setRequestData, true);
  }, []);
  const data: OpenRequestItemCardInterface["data"] =
    formatRequestData(requestData);
  return (
    <div className="main">
      <div className="main__content">
        <SearchBar placeholder="Busca una solicitud cerrada" />
        {data.length > 0 ? (
          <OpenRequestItemsCards data={data} closeRequest={false} />
        ) : null}
      </div>
    </div>
  );
};
