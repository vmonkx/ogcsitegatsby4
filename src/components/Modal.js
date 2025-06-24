import React, { useCallback, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { MdClose } from "@react-icons/all-files/md/MdClose";
import { AnimatePresence, motion } from "framer-motion";
import { GatsbyImage } from "gatsby-plugin-image";
import { useModalWindow } from "../contexts/ModalProvider";

const Background = styled(motion.div)`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalWrapper = styled(motion.div)`
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr;
  position: relative;
  z-index: 1000;
  border-radius: 30px;
  -webkit-mask-image: -webkit-radial-gradient(white, black);
  padding-top: 50px;
  padding-bottom: 20px;

  @media screen and (min-width: 768px) {
    padding: 0;
    grid-template-columns: 1fr 1fr;
    max-width: 768px;
  }
  @media screen and (min-width: 1024px) {
    max-width: 1024px;
  }
`;

const ModalWrapperImg = styled.div`
  display: none;
  @media screen and (min-width: 768px) {
    display: flex;
    border-radius: 30px 0 0 30px;
    overflow: hidden;

    .gatsby-image-wrapper {
      width: 100%;
    }
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;

  color: #141414;
  padding: 0 25px;

  @media screen and (min-width: 768px) {
    padding: 25px 50px;
  }

  p {
    margin-bottom: 1rem;
  }

  input {
    margin-bottom: 1rem;
  }

  textarea {
    margin-bottom: 1rem;
  }

  button {
    padding: 10px 24px;

    border: none;
  }

  form {
    width: 100%;
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

const variantsModalWindow = {
  open: { scale: [0.9, 1], opacity: 1 },
  closed: { scale: [1, 0.5], opacity: 0 },
};

const portalRoot =
  typeof document !== `undefined` ? document.getElementById("portal") : null;

function Modal({ content, cover }) {
  const modalRef = useRef();
  const { show, close } = useModalWindow();

  const backgroundClose = (e) => {
    if (modalRef.current === e.target) {
      close();
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && show) {
        close();
      }
    },
    [close, show]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);

    return () => document.removeEventListener("keydown", keyPress);
  }, [modalRef, keyPress]);

  return (
    portalRoot &&
    ReactDOM.createPortal(
      <AnimatePresence>
        {show ? (
          <Background
            ref={modalRef}
            onClick={backgroundClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ModalWrapper
              role="dialog"
              animate={show ? "open" : "closed"}
              variants={variantsModalWindow}
            >
              <ModalWrapperImg>
                <GatsbyImage
                  image={cover}
                  alt="Запись в клинику доктора Горчаковой - OGC clinic"
                />
              </ModalWrapperImg>

              <ModalContent>{content && content}</ModalContent>
              <CloseModalButton aria-label="Close modal" onClick={close} />
            </ModalWrapper>
          </Background>
        ) : null}
      </AnimatePresence>,
      portalRoot
    )
  );
}

export default Modal;
