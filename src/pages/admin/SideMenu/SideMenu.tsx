import { useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { HiDocumentDuplicate } from "react-icons/hi";
import { RiShutDownLine } from "react-icons/ri";
import {
  AdminPaths,
  PropsInterface,
  SharedPaths,
} from "../../../helpers/interfaces";
import { NavBarCategory, NavBarItem } from "./NavBarItems";
import { NavigationBar } from "./NavigationBar";
import { ToggleButton } from "./ToggleButton";

export const SideMenu: React.FC<PropsInterface> = (): JSX.Element => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  return (
    <div
      className={openSideMenu ? "side-menu side-menu--open-menu" : "side-menu"}
    >
      <ToggleButton
        openSideMenu={openSideMenu}
        setOpenSideMenu={setOpenSideMenu}
      />
      <NavigationBar>
        <ul className="side-menu__navbar-list">
          <NavBarCategory
            detail="Inicio"
            icon={<AiFillHome className="reusable__icon" />}
            destination={AdminPaths.Dashboard}
          />
          <NavBarCategory
            detail="Documentos"
            icon={<HiDocumentDuplicate className="reusable__icon" />}
          >
            <NavBarItem
              detail="Actas de entrega"
              destination={AdminPaths.DeliveryCertificates}
            ></NavBarItem>
            <NavBarItem
              detail="Cuadros de licenciamiento"
              destination={AdminPaths.LicensingTables}
            ></NavBarItem>
            <NavBarItem
              detail="Hojas de vida"
              destination={AdminPaths.EquipmentSpecifications}
            ></NavBarItem>
          </NavBarCategory>
        </ul>
        <ul className="side-menu__navbar-list">
          <NavBarCategory
            detail="Cerrar sesión"
            icon={<RiShutDownLine className="reusable__icon" />}
            destination={SharedPaths.Login}
          />
        </ul>
      </NavigationBar>
    </div>
  );
};
