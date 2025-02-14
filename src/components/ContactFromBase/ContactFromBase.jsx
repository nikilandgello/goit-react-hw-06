import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

import css from "./ContactFromBase.module.css";

const ContactFormBase = ({
  onSubmit,
  initialValues,
  contentBtn,
  onClick,
  open,
  btn = true,
}) => {
  const FeedbackSchema = Yup.object().shape({
    firstname: Yup.string()
      .min(3, "Too Short!")
      .max(20, "Too Long!")
      .required("Required"),
    number: Yup.string()
      .min(3, "Too Short!")
      .max(13, "Too Long!")
      .required("Required"),
    lastname: Yup.string()
      .min(3, "Too Short!")
      .max(20, "Too Long!")
      .notRequired(),
    email: Yup.string().email("Invalid email address").notRequired(),
    dateofbith: Yup.string().min(8, "Invalid data").notRequired(),
    notes: Yup.string().max(150, "Too Long!"),
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

  const formatData = (value) => {
    let digits = value.replace(/\D/g, "").slice(0, 8);

    let formattedData = "";
    if (digits.length > 0) formattedData += digits.slice(0, 4);
    if (digits.length > 3) formattedData += "-" + digits.slice(4, 6);
    if (digits.length > 6) formattedData += "-" + digits.slice(6, 8);

    return formattedData;
  };

  const onChangeFormat = (e, setFieldValue, format, fieldName) => {
    const { value } = e.target;
    if (e.nativeEvent.inputType === "deleteContentBackward") {
      setFieldValue(fieldName, value);
    } else {
      setFieldValue(fieldName, format(value));
    }
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
              placeholder="enter first name"
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
              onChange={(e) =>
                onChangeFormat(e, setFieldValue, formatPhoneNumber, "number")
              }
            />
            <ErrorMessage
              name="number"
              component="span"
              className={css.errorMessage}
            />
          </div>

          {open && (
            <>
              <div className={css.groupForm}>
                <label htmlFor="lastname" className={css.labelForm}>
                  Last name
                </label>
                <Field
                  type="text"
                  name="lastname"
                  id="lastname"
                  className={css.inputForm}
                  placeholder="enter last name"
                />
                <ErrorMessage
                  name="lastname"
                  component="span"
                  className={css.errorMessage}
                />
              </div>

              <div className={css.groupForm}>
                <label htmlFor="email" className={css.labelForm}>
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className={css.inputForm}
                  placeholder="enter email"
                />
                <ErrorMessage
                  name="email"
                  component="span"
                  className={css.errorMessage}
                />
              </div>

              <div className={css.groupForm}>
                <label htmlFor="dateofbith" className={css.labelForm}>
                  Date of bith
                </label>
                <Field
                  type="text"
                  name="dateofbith"
                  id="dateofbith"
                  className={css.inputForm}
                  placeholder="xxxx-xx-xx"
                  onChange={(e) =>
                    onChangeFormat(e, setFieldValue, formatData, "dateofbith")
                  }
                />
                <ErrorMessage
                  name="dateofbith"
                  component="span"
                  className={css.errorMessage}
                />
              </div>

              <div className={css.groupForm}>
                <label htmlFor="notes" className={css.labelForm}>
                  Notes
                </label>
                <Field
                  as="textarea"
                  name="notes"
                  id="notes"
                  className={`${css.inputForm} ${css.textareaForm}`}
                  placeholder="Notes..."
                />
                <ErrorMessage
                  name="notes"
                  component="span"
                  className={css.errorMessage}
                />
              </div>
            </>
          )}

          {btn && (
            <button type="button" onClick={onClick} className={css.BtnMore}>
              {open ? "Less" : "More"}
            </button>
          )}

          <button type="submit" className={css.buttonForm}>
            {contentBtn}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactFormBase;
