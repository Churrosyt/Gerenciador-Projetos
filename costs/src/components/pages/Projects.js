import { useLocation } from "react-router-dom";
import Message from "../layout/Message";

function Projects() {

  const location = useLocation() // resgatar a mensagem, message
  console.log(location)
  let message = ''
  if (location.state){ // se tiver alguma coisa no location, entao a mensagem existe, entao atribuirmos o valor no message
    message = location.state.message
  }

  return (
  <div>
    <h1>Meus Projetos</h1>
    {message && <Message type="success" msg={message}/>} 
  </div> // se o message esta preechido, vamos imprimir nossa mensagem do "Message"
  )
}

export default Projects;
