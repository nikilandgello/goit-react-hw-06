import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

import css from "./ContactFromBase.module.css";

const ContactFormBase = ({ onSubmit, initialValues, contentBtn }) => {
  const FeedbackSchema = Yup.object().shape({
    firstname: Yup.string()
      .min(3, "Too Short!")
      .max(20, "Too Long!")
      .required("Required"),
    number: Yup.string()
      .min(3, "Too Short!")
      .max(13, "Too Long!")
      .required("Required"),
  });

  const formatPhoneNumber = (value) => {
    let digits = value.replace(/\D/g, "").slice(0, 10);

    let formattedNumber = "";
    if (digits.length > 0) formattedNumber += digits.slice(0, 3);
    if (digits.length > 3) formattedNumber += "-" + digits.slice(3, 6);
    if (digits.length > 6) formattedNumber += "-" + digits.slice(6, 8);
    if (digits.length > 8) formattedNumber += "-" + digits.slice(8, 10);

    return formattedNumber;
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={FeedbackSchema}
    >
      {({ setFieldValue, values }) => (
        <Form className={css.contactForm}>
          <div className={css.groupForm}>
            <label htmlFor="firstname" className={css.labelForm}>
              First name
            </label>
            <Field
              type="text"
              name="firstname"
              id="firstname"
              className={css.inputForm}
              placeholder="enter name"
            />
            <ErrorMessage
              name="firstname"
              component="span"
              className={css.errorMessage}
            />
          </div>

          <div className={css.groupForm}>
            <label htmlFor="number" className={css.labelForm}>
              Number
            </label>
            <Field
              type="tel"
              name="number"
              id="number"
              className={css.inputForm}
              placeholder="xxx-xxx-xx-xx"
              value={values.number}
              onChange={(e) => {
                const { value } = e.target;
                if (e.nativeEvent.inputType === "deleteContentBackward") {
                  setFieldValue("number", value);
                } else {
                  setFieldValue("number", formatPhoneNumber(value));
                }
              }}
            />
            <ErrorMessage
              name="number"
              component="span"
              className={css.errorMessage}
            />
          </div>

          <button type="submit" className={css.buttonForm}>
            {contentBtn}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactFormBase;
