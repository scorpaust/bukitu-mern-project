import React, {
  CSSProperties,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import Modal from "../../shared/components/UIElements/Modal";
import { Book } from "../../types/Book";
import "./BookItem.css";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

type Props = {
  item: Book;
  onDelete: Function;
};

const BookItem = (props: Props) => {
  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [showBook, setShowBook] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const isOwner = () => {
    if (props.item.userIds.includes(auth.userId)) return true;

    return false;
  };

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteWarningHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `http://localhost:5000/api/livros/${props.item.id}`,
        "DELETE"
      );
      props.onDelete(props.item.id);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <li className="book-item">
        <Card className="book-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="book-item__image">
            <img src={props.item.image} alt={props.item.title} />
          </div>
          <div className="book-item__info">
            <h2>{props.item.title}</h2>
            <h3>{props.item.summary}</h3>
            <p>{props.item.authors}</p>
          </div>
          <Modal
            header="Tem a certeza?"
            footerClass="book-item__modal-actions"
            footer={
              <>
                <Button inverse onClick={cancelDeleteWarningHandler}>
                  Cancelar
                </Button>
                <Button danger onClick={confirmDeleteHandler}>
                  Remover
                </Button>
              </>
            }
            show={showConfirmModal}
            onCancel={cancelDeleteWarningHandler}
          >
            <p>Quer remover este livro?</p>
          </Modal>
          <div className="book-item__actions">
            {isOwner() && (
              <React.Fragment>
                <Button to={`/livros/${props.item.id}`}>Editar</Button>
                <Button danger onClick={showDeleteWarningHandler}>
                  Remover
                </Button>
              </React.Fragment>
            )}
            <Button to={`/`}>Comprar</Button>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default BookItem;
