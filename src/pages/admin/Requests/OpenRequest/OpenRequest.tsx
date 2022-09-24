import { useEffect } from "react";
import { formatRequestData, getRequestData } from "../../../../helpers/helpers";
import {
  ItemCardInterface,
  PropsInterface,
} from "../../../../helpers/interfaces";
import { useModal } from "../../../../hooks/useModal";
import { useRequestData } from "../../../../hooks/useRequestData";
import {
  OpenRequestItemsCards,
  Modal,
  PrimaryButton,
  SearchBar,
} from "../../../reusableComponents";
import { OpenRequestForm } from "./Forms";

export const OpenRequest: React.FC<PropsInterface> = (): JSX.Element => {
  const [modalIsOpen, openModal, closeModal] = useModal();
  const [requestData, setRequestData] = useRequestData([]);
  useEffect(() => {
    getRequestData(setRequestData);
  }, []);
  const data: ItemCardInterface["data"] = formatRequestData(requestData);
  return (
    <div className="main">
      <div className="main__content">
        <SearchBar placeholder="Busca una solicitud abierta" />
        <PrimaryButton action={openModal}>Abrir evento</PrimaryButton>
        <OpenRequestItemsCards data={data} closeRequest={true} />
        <Modal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          title="Abrir evento"
        >
          <OpenRequestForm />
        </Modal>
      </div>
    </div>
  );
};
