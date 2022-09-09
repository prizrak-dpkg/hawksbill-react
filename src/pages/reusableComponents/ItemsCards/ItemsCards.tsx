import { APIPaths, PropsInterface } from "../../../helpers/interfaces";
import { Card } from "./Cards";

export const ItemsCards: React.FC<PropsInterface> = (): JSX.Element => {
  const exampleData = [
    {
      id: 1,
      modification_date: "Sep 08 2022",
      client: "Sistemas Barracuda SAS",
      clientImage: `${APIPaths.MEDIA_URL}/client/Sistemas_Barracuda.jpg`,
      request_type: "Operaciones",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat nostrum eius molestias, deserunt facere doloribus eveniet quisquam autem voluptates, fuga tempore in adipisci consectetur asperiores qui. Expedita alias laborum harum.",
    },
    {
      id: 2,
      modification_date: "Sep 08 2022",
      client: "Sistemas Barracuda SAS",
      clientImage: `${APIPaths.MEDIA_URL}/client/Sistemas_Barracuda.jpg`,
      request_type: "Operaciones",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat nostrum eius molestias, deserunt facere doloribus eveniet quisquam autem voluptates, fuga tempore in adipisci consectetur asperiores qui. Expedita alias laborum harum.",
    },
    {
      id: 3,
      modification_date: "Sep 08 2022",
      client: "Sistemas Barracuda SAS",
      clientImage: `${APIPaths.MEDIA_URL}/client/Sistemas_Barracuda.jpg`,
      request_type: "Operaciones",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat nostrum eius molestias, deserunt facere doloribus eveniet quisquam autem voluptates, fuga tempore in adipisci consectetur asperiores qui. Expedita alias laborum harum.",
    },
    {
      id: 4,
      modification_date: "Sep 08 2022",
      client: "Sistemas Barracuda SAS",
      clientImage: `${APIPaths.MEDIA_URL}/client/Sistemas_Barracuda.jpg`,
      request_type: "Operaciones",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat nostrum eius molestias, deserunt facere doloribus eveniet quisquam autem voluptates, fuga tempore in adipisci consectetur asperiores qui. Expedita alias laborum harum.",
    },
    {
      id: 5,
      modification_date: "Sep 08 2022",
      client: "Sistemas Barracuda SAS",
      clientImage: `${APIPaths.MEDIA_URL}/client/Sistemas_Barracuda.jpg`,
      request_type: "Operaciones",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat nostrum eius molestias, deserunt facere doloribus eveniet quisquam autem voluptates, fuga tempore in adipisci consectetur asperiores qui. Expedita alias laborum harum.",
    },
    {
      id: 6,
      modification_date: "Sep 08 2022",
      client: "Sistemas Barracuda SAS",
      clientImage: `${APIPaths.MEDIA_URL}/client/Sistemas_Barracuda.jpg`,
      request_type: "Operaciones",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat nostrum eius molestias, deserunt facere doloribus eveniet quisquam autem voluptates, fuga tempore in adipisci consectetur asperiores qui. Expedita alias laborum harum.",
    },
    {
      id: 7,
      modification_date: "Sep 08 2022",
      client: "Sistemas Barracuda SAS",
      clientImage: `${APIPaths.MEDIA_URL}/client/Sistemas_Barracuda.jpg`,
      request_type: "Operaciones",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat nostrum eius molestias, deserunt facere doloribus eveniet quisquam autem voluptates, fuga tempore in adipisci consectetur asperiores qui. Expedita alias laborum harum.",
    },
    {
      id: 8,
      modification_date: "Sep 08 2022",
      client: "Sistemas Barracuda SAS",
      clientImage: `${APIPaths.MEDIA_URL}/client/Sistemas_Barracuda.jpg`,
      request_type: "Operaciones",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat nostrum eius molestias, deserunt facere doloribus eveniet quisquam autem voluptates, fuga tempore in adipisci consectetur asperiores qui. Expedita alias laborum harum.",
    },
    {
      id: 9,
      modification_date: "Sep 08 2022",
      client: "Sistemas Barracuda SAS",
      clientImage: `${APIPaths.MEDIA_URL}/client/Sistemas_Barracuda.jpg`,
      request_type: "Operaciones",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat nostrum eius molestias, deserunt facere doloribus eveniet quisquam autem voluptates, fuga tempore in adipisci consectetur asperiores qui. Expedita alias laborum harum.",
    },
    {
      id: 10,
      modification_date: "Sep 08 2022",
      client: "Sistemas Barracuda SAS",
      clientImage: `${APIPaths.MEDIA_URL}/client/Sistemas_Barracuda.jpg`,
      request_type: "Operaciones",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat nostrum eius molestias, deserunt facere doloribus eveniet quisquam autem voluptates, fuga tempore in adipisci consectetur asperiores qui. Expedita alias laborum harum.",
    },
  ];
  return (
    <div className="reusable reusable--grid">
      {exampleData.map((card) => (
        <Card
          key={card.id}
          title={card.client}
          cardImageUrl={card.clientImage}
          info={[
            {
              detail: "Mofificado: ",
              content: card.modification_date,
            },
            {
              detail: "Tipo: ",
              content: card.request_type,
            },
          ]}
        />
      ))}
    </div>
  );
};
