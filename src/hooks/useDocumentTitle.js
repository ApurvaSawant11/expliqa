import { useEffect } from "react";

const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = `${title} | Expliqa`;
  }, [title]);
};

export { useDocumentTitle };
