import React from "react";
import { useParams } from "react-router-dom";
import BookList from "../components/BookList";

const dummy_books = [
  {
    id: "b1",
    isbn: "9781501137259",
    title: "O Enigma das Sombras",
    summary:
      "Num mundo onde a escuridão possui poderes misteriosos, um jovem aprendiz embarca em uma busca perigosa para descobrir a verdade por trás das sombras enigmáticas. Conforme segredos são revelados, ele percebe que seu destino está entrelaçado com o destino de todo o reino.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Shadowman-3.jpg/220px-Shadowman-3.jpg",
    author: "Amelia Harper",
    userIds: ["u1"],
  },
  {
    id: "b2",
    isbn: "0738531367",
    title: "Ecos na Eternidade",
    summary:
      "Ambientado em um futuro distópico, um músico talentoso descobre uma melodia escondida que detém a chave para restaurar a harmonia em uma sociedade arruinada. Junto a um grupo de rebeldes, ela precisa confrontar o regime opressor e reacender a esperança em um mundo à beira do colapso.",
    image:
      "https://static.livrariaespirita.org.br/media/catalog/product/cache/1/image/450x/17f82f742ffe127f42dca9de82fb58b1/e/c/ecos-na-eternidade.jpg",
    author: "Sebastian Mitchell",
    userIds: ["u1"],
  },
  {
    id: "b3",
    isbn: "0738531367",
    title: "O Reino Esquecido",
    summary:
      "Em uma terra governada por magia antiga e lendas esquecidas, uma jovem guerreira se ergue para reconquistar seu trono legítimo. Com um grupo de companheiros leais, ela embarca em uma jornada perigosa, enfrentando criaturas míticas e forças sombrias que ameaçam mergulhar o reino em uma escuridão eterna.",
    image:
      "https://static.fnac-static.com/multimedia/Images/PT/MC/59/b9/90/9484633/1507-1/tsp20230117231550/O-Reino-Esquecido-Arqueologia-E-Historia-De-Israel.jpg",
    author: "Gabriella Knight",
    userIds: ["u1"],
  },
];

const UserBooks = () => {
  const userId = useParams().userId;

  const loadedBooks = dummy_books.filter((book) =>
    book.userIds.includes(userId as string)
  );

  return <BookList items={loadedBooks} />;
};

export default UserBooks;
