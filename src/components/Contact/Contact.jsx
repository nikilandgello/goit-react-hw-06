import { useDispatch } from "react-redux";
import css from "./Contact.module.css";
import { deleteContact } from "../../redux/contactsSlice";
import { openModal } from "../../redux/modalSlice";

const Contact = ({
  data: { id, firstname, number, lastname, email, dateofbith, notes },
}) => {
  const dispatch = useDispatch();
  const fullname = `${firstname} ${lastname}`;
  const maxLegth = 15;

  const handleOpenModal = () => {
    dispatch(
      openModal({
        id,
        firstname,
        number,
        lastname,
        email,
        dateofbith,
        notes,
      })
    );
    document.body.style.overflow = "hidden";
  };

  return (
    <div className={css.contact}>
      <div className={css.contactGroup}>
        <div className={css.contactItem}>
          <svg className={css.icon} width={20} height={20}>
            <use href="/sprite.svg#icon-user"></use>
          </svg>
          <p className={css.contactDescription}>
            {fullname.length <= maxLegth
              ? fullname
              : `${fullname.substring(0, maxLegth)}...`}
          </p>
        </div>
        <div className={css.contactItem}>
          <svg className={css.icon} width={20} height={20}>
            <use href="/sprite.svg#icon-phone"></use>
          </svg>
          <p className={css.contactDescription}>+38-{number}</p>
        </div>
      </div>
      <div className={css.blockBtn}>
        <button className={css.button} onClick={handleOpenModal}>
          Edit
        </button>
        <button
          className={css.button}
          onClick={() => {
            dispatch(deleteContact(id));
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Contact;
