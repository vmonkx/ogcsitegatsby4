import { useEffect } from "react";

export function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

export function useOnKeypress(handler) {
  useEffect(() => {
    const listener = (event) => {
      if (event.key === "Escape" || event.key === "Esc") {
        handler(event);
      }
    };

    document.addEventListener("keydown", listener);
    document.addEventListener("keyup", listener);

    return () => {
      document.removeEventListener("keydown", listener);
      document.removeEventListener("keyup", listener);
    };
  }, [handler]);
}
