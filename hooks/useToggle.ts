import { useState, useCallback } from "react";

type useToggleProps = {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
};

export const useToggle = (initialState: boolean = false): useToggleProps => {
  const [isOpen, setIsOpen] = useState(initialState);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  return { isOpen, toggle, open, close };
};
