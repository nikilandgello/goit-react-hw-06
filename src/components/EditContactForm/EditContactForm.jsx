import ContactFormBase from "../ContactFromBase/ContactFromBase";
import { useDispatch, useSelector } from "react-redux";
import { updateContact } from "../../redux/contactsSlice";
import { closeModal } from "../../redux/modalSlice";
import Modal from "../Modal/Modal";
import css from "./EditContactForm.module.css";

const EditContactForm = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modal.isModalOpen);
  const selectedContact = useSelector((state) => state.modal.selectedContact);

  if (!selectedContact) return null;

  const initialValues = {
    firstname: selectedContact.firstname || "",
    number: selectedContact.number || "",
  };

  const handleSubmit = (values, actions) => {
    dispatch(updateContact({ ...values, id: selectedContact.id }));
    actions.resetForm();
    dispatch(closeModal());
    document.body.style.overflow = "";
  };

  const handleClose = () => {
    dispatch(closeModal());
    document.body.style.overflow = "";
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <h2 className={css.title}>Edit Contact!</h2>
      <ContactFormBase
        onSubmit={handleSubmit}
        initialValues={initialValues}
        contentBtn="Edit Contact"
      />
    </Modal>
  );
};

export default EditContactForm;
