import React, { useState, useRef, useEffect } from "react";
import { Formik, Form } from "formik";
import InputStyled from "./InputStyled";
import { ButtonPrimary } from "./Styled/Button";
import InputTextField from "./InputTextStyled";
import axios from "axios";
import ModalMessage from "./ModalMessage";

import InputCheckBox from "./InputCheckBox";

import { LinkStyl } from "./Styled/Link";
import { useModalWindow } from "../contexts/ModalProvider";
import { HeaderModal } from "./Styled/HeaderStyled";

function validatePhone(value) {
  let error;
  if (!value) {
    error = "Введите ваш номер телефона для связи";
  } else if (!/^((\+?\s?7|7|8)+\s?(\(?[0-9]\)?\s?){10})$/i.test(value)) {
    error = "Введен некорректный номер телефона";
  }
  return error;
}

function validateName(value) {
  let error;
  if (!value) {
    error = "Введите ваше имя";
  }
  return error;
}

function validateRules(value) {
  let error;
  if (!value) {
    error = "Необходимо принять соглашение";
  }
  return error;
}

function FormOrder({ textMessage }) {
  const [status, setStatus] = useState({
    sent: false,
    message: "",
    title: "Записаться на прием",
  });
  const [loading, setLoading] = useState(false);

  const firstInputRef = useRef(null);

  const SubmitHandler = async (values) => {
    setLoading(true);
    try {
      typeof window !== "undefined" && window.gtag("event", "send_form_order");
    } catch (error) {
      console.log("gtag", error);
    } finally {
      if (!values.lastName) {
        axios
          .post(
            `/api/order`,
            {
              data: {
                firstName: values.firstName,
                comment: values.comment,
                phone: values.phone,
              },
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            if (res.status === 200) {
              setStatus({
                sent: true,
                title: "Заявка успешно отправлена",
                message: "Спасибо, в ближайшее время мы с Вами свяжемся.",
              });
            }
          })
          .catch((err) => {
            setStatus({
              sent: true,
              title: "Заявка не отправлена",
              message: `Что-то пошло не так, попробуйте позже или позвоните нам по телефону ${process.env.GATSBY_PHONE}.`,
            });
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setStatus({
          sent: true,
          title: "Заявка не отправлена",
          message:
            "Что-то пошло не так, попробуйте позже или позвоните нам по телефону.",
        });
        return;
      }
    }
  };

  const { close } = useModalWindow();

  useEffect(() => {
    firstInputRef.current.focus();
  }, [firstInputRef]);

  return status.sent ? (
    <React.Fragment>
      <HeaderModal>{status.title}</HeaderModal>
      <ModalMessage message={status.message} />
    </React.Fragment>
  ) : (
    <React.Fragment>
      <HeaderModal>{status.title}</HeaderModal>
      <Formik
        initialValues={{
          firstName: "",
          phone: "",
          comment: textMessage,
          rules: false,
        }}
        onSubmit={SubmitHandler}
      >
        <Form>
          <InputStyled
            name="firstName"
            type="text"
            inputMode="text"
            label="Ваш имя"
            validate={validateName}
            ref={firstInputRef}
          />
          <InputStyled
            name="lastName"
            type="text"
            inputMode="text"
            label="Ваша фамилия"
            service
          />
          <InputStyled
            name="phone"
            type="text"
            inputMode="tel"
            label="Ваш телефон"
            validate={validatePhone}
          />
          <InputTextField
            name="comment"
            label="Комментарий"
            inputMode="text"
            resize="none"
            rows="3"
          />
          <InputCheckBox
            name="rules"
            label={
              <span>
                Согласен(на) с обработкой персональных данных
                <LinkStyl to="/docs/privacy" onClick={close}>
                  Подробнее
                </LinkStyl>
              </span>
            }
            validate={validateRules}
          />

          <br />

          <ButtonPrimary type="submit" disabled={loading} id="submit_order">
            {loading ? "Отправляем заявку..." : "Отправить"}
          </ButtonPrimary>
        </Form>
      </Formik>
    </React.Fragment>
  );
}

export default FormOrder;
