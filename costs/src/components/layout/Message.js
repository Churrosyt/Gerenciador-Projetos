import { useState, useEffect } from "react";
import styles from "./Message.module.css";

function Message({ type, msg }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => { 
    if (!msg) { // se a mensagem não existe, false e nao retornamos 
      setVisible(false);
      return;
    }

    setVisible(true); // se tiver mensagem, visibilidade true, entao exibi

    const timer = setTimeout(() => { // inicia o time de 3 segundos, para mostrar a mensagem e apos 3s sair
      setVisible(false);
    }, 3000)

    return () => clearTimeout(timer) // finalizar o time

  }, [msg]);

  return (
    <>
      {visible && (
        <div className={`${styles.message} ${styles[type]}`}>{msg}</div>
      )}
    </>
  );
}

export default Message;
