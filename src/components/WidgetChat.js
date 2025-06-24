import React, { useState } from "react";
import { FaRegComments } from "@react-icons/all-files/fa/FaRegComments";
import { FaWhatsapp } from "@react-icons/all-files/fa/FaWhatsapp";
import { FaTelegramPlane } from "@react-icons/all-files/fa/FaTelegramPlane";
import { MdClose } from "@react-icons/all-files/md/MdClose";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

const WidgetChatStyled = styled.div`
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 2147483647;
  .widget-btn {
    position: relative;
    width: 60px;
    height: 60px;
    padding: 10px;
    background-size: cover;
    border-radius: 50%;
    font-size: 30px;
    cursor: pointer;
    box-shadow: 0 5px 40px rgb(0 0 0 / 16%);
    background-color: ${(props) => props.theme.secondary};
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2147483647;

    /* animation: waves-widget linear 1s infinite; */
    box-shadow: initial;
    backface-visibility: hidden;
    &::after {
      animation: animationBtn 18s linear infinite;
      transform: scale(0);
      transform-origin: 50% 50%;
      content: " ";
      position: absolute;
      display: block;
      border-radius: 100% !important;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: inherit;
      opacity: 0;
      transition: opacity 0.15s linear, transform 0.15s linear;
    }
  }

  .widget-icon {
    width: 35px;
    height: 35px;
    fill: #fff;
    stroke: none;
    fill-rule: nonzero;
    fill-opacity: 1;
    z-index: 2147483648;
  }

  .widget-links {
    position: absolute;

    top: 0;
    left: 0;

    width: 60px;
  }

  .widget-link {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.primary};
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    margin-top: 0.5rem;
    span {
      line-height: 1;
    }
  }

  .widget-icon__link {
    width: 25px;
    height: 25px;
    fill: #fff;
    stroke: none;
    fill-rule: nonzero;
    fill-opacity: 1;
  }

  @keyframes animationBtn {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    73% {
      transform: scale(0);
      opacity: 1;
    }
    80% {
      transform: scale(2.6);
      opacity: 0;
    }
    81% {
      transform: scale(0);
      opacity: 0;
    }
    83% {
      transform: scale(0);
      opacity: 1;
    }
    90% {
      transform: scale(2.6);
      opacity: 0;
    }
    91% {
      transition-duration: 0.01s;
      transform: scale(0);
      opacity: 0;
    }
    93% {
      transform: scale(0);
      opacity: 1;
    }
    to {
      transform: scale(2.6);
      opacity: 0;
    }
  }
`;

function WidgetChat() {
  const [showLinks, setShowLinks] = useState(false);

  const toggleShow = () => {
    setShowLinks((prev) => !prev);
  };

  return (
    <WidgetChatStyled>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.8 }}
        animate={{
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          loop: Infinity,
          repeatDelay: 1,
        }}
        title="Напишите нам мы онлайн"
        aria-label="Напишите нам мы онлайн"
        role="button"
        className="widget-btn"
        onClick={toggleShow}
      >
        {showLinks ? (
          <MdClose className="widget-icon" />
        ) : (
          <FaRegComments className="widget-icon" />
        )}
      </motion.div>
      <AnimatePresence>
        {showLinks && (
          <motion.div
            animate={{ y: -200 }}
            exit={{ opacity: 0, y: 100 }}
            className="widget-links"
          >
            <motion.a
              className="widget-link"
              title="Напишите нам Whatsapp"
              aria-label="Напишите нам Whatsapp"
              role="button"
              href="https://wa.me/79869238872?text=Здравствуйте%21&app_absent=0"
              target="_blank"
              rel="nofollow noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.8 }}
            >
              <span>
                <FaWhatsapp className="widget-icon__link" />
              </span>
            </motion.a>

            <motion.a
              className="widget-link"
              title="Напишите нам в Telegram"
              aria-label="Напишите нам в Telegram"
              role="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.8 }}
              href="https://t.me/OGCclinic"
              rel="nofollow noopener noreferrer"
              target="_blank"
            >
              <span>
                <FaTelegramPlane className="widget-icon__link" />
              </span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </WidgetChatStyled>
  );
}

export default React.memo(WidgetChat);
