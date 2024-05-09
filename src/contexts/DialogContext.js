import { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types';
const DialogContext = createContext({
  show: false,
  setShow: null
});

export function DialogProvider({ children }) {
  const [show, setShow] = useState(false);
  const value = { show, setShow };
  return (
    <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
  );
}
DialogProvider.propTypes = {
    children: PropTypes.element
  }
export function useShowDialog() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useLoading must be used within DialogProvider");
  }
  return context;
}