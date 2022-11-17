export const animationHomeVariant = {
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
  hidden: { opacity: 0, scale: 0 },
};

export const animationBannerVariant = {
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, type: "spring", damping: 30 },
  },
  hidden: { y: 200, opacity: 0, scale: 0 },
};

export const animationSpecialistCard = {
  offscreenodd: {
    x: 300,
    opacity: 0,
  },
  offscreeneven: {
    x: -300,
    opacity: 0,
  },
  onscreen: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 1.2,
    },
  },
};
