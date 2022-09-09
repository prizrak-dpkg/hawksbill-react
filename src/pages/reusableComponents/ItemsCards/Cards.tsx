import { useRef, useEffect } from "react";
import { CardInterface } from "../../../helpers/interfaces";

export const Card: React.FC<CardInterface> = ({
  title,
  cardImageUrl,
  info,
}): JSX.Element => {
  const useCardImage: React.RefObject<HTMLDivElement> =
    useRef<HTMLDivElement>(null);
  useEffect((): void => {
    if (useCardImage.current !== null) {
      useCardImage.current.style.background = `url('${cardImageUrl}')`;
      useCardImage.current.style.backgroundSize = "cover";
      useCardImage.current.style.backgroundRepeat = "no-repeat";
    }
  }, [cardImageUrl]);
  return (
    <div className="reusable__card">
      <div ref={useCardImage} className="reusable__card-image" />
      <div className="reusable__card-detail">
        <span className="reusable__card-info reusable__card-info--center reusable__card-info--title">
          {title}
        </span>
        {info?.map((data) => (
          <span className="reusable__card-info">
            <span className="reusable__card-info--bold">{data.detail}</span>
            {data.content}
          </span>
        ))}
      </div>
    </div>
  );
};
