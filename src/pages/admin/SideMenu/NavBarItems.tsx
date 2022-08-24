import { useRef } from "react";
import { Link } from "react-router-dom";
import { preventDrag } from "../../../helpers/helpers";
import {
  NavBarCategoryInterface,
  NavBarItemInterface,
} from "../../../helpers/interfaces";

export const NavBarCategory: React.FC<NavBarCategoryInterface> = ({
  children,
  detail,
  icon,
  destination,
}): JSX.Element => {
  const useSubList: React.RefObject<HTMLLIElement> =
    useRef<HTMLLIElement>(null);
  return children ? (
    <>
      <li className="side-menu__item side-menu__item-destination">
        <div className="side-menu__item-container">
          <div className="side-menu__item-icon">{icon}</div>
          <span className="side-menu__item-detail">{detail}</span>
        </div>
      </li>
      <li ref={useSubList} className="side-menu__item-sublist">
        <ul>{children}</ul>
      </li>
    </>
  ) : (
    <li className="side-menu__item">
      {destination ? (
        <Link
          className="side-menu__item-destination"
          to={destination}
          onDragStart={preventDrag}
        >
          <div className="side-menu__item-container">
            <div className="side-menu__item-icon">{icon}</div>
            <span className="side-menu__item-detail">{detail}</span>
          </div>
        </Link>
      ) : (
        <div className="side-menu__item-container">
          <div className="side-menu__item-icon">{icon}</div>
          <span className="side-menu__item-detail">{detail}</span>
        </div>
      )}
    </li>
  );
};

export const NavBarItem: React.FC<NavBarItemInterface> = ({
  detail,
  destination,
}): JSX.Element => {
  return (
    <li className="side-menu__item">
      {destination ? (
        <Link
          className="side-menu__item-detail side-menu__item-destination"
          to={destination}
          onDragStart={preventDrag}
        >
          {detail}
        </Link>
      ) : (
        detail
      )}
    </li>
  );
};
