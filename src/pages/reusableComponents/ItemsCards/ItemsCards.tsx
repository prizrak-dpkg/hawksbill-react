import {
  ItemCardInterface,
  OpenRequestItemCardInterface,
} from "../../../helpers/interfaces";
import { OpenRequestCard, Card } from "./Cards";

export const OpenRequestItemsCards: React.FC<OpenRequestItemCardInterface> = ({
  data,
  closeRequest,
}): JSX.Element => {
  return (
    <div className="reusable reusable--grid">
      {data.map((card) => (
        <OpenRequestCard
          requestId={card.id}
          closeRequest={closeRequest}
          key={card.id}
          title={card.card.title}
          cardImageUrl={card.card.cardImageUrl}
          info={card.card.info ? [...card.card.info] : []}
          request={card.request}
        />
      ))}
    </div>
  );
};

export const ItemsCards: React.FC<ItemCardInterface> = ({
  data,
}): JSX.Element => {
  return (
    <div className="reusable reusable--grid">
      {data.map((card) => (
        <Card
          key={card.id}
          title={card.card.title}
          cardImageUrl={card.card.cardImageUrl}
          info={card.card.info ? [...card.card.info] : []}
        />
      ))}
    </div>
  );
};
