import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/contactsSlice";
import clsx from "clsx";

import ContactFormBase from "../ContactFromBase/ContactFromBase";
import css from "./ContactForm.module.css";
import { nanoid } from "nanoid";
import { openAdditionalInfoForm } from "../../redux/additionalInfoSlice";

const ContactForm = () => {
  const dispatch = useDispatch();
  const additionalInfoForm = useSelector(
    (state) => state.additionalInfo.isOpenForm
  );

  const initialValues = {
    firstname: "",
    number: "",
    lastname: "",
    email: "",
    dateofbith: "",
    notes: "",
  };

  const handleSubmit = (values, actions) => {
    dispatch(addContact({ ...values, id: nanoid() }));
    actions.resetForm();
  };

  const onClick = () => {
    dispatch(openAdditionalInfoForm());
  };

  return (
    <div className={clsx("container", css.containerForm)}>
      <div className={css.block}>
        <h2 className={css.title}>Add Contact!</h2>
        <ContactFormBase
          onSubmit={handleSubmit}
          initialValues={initialValues}
          contentBtn="Add Contact"
          onClick={onClick}
          open={additionalInfoForm}
        />
      </div>
    </div>
  );
};

export default ContactForm;
