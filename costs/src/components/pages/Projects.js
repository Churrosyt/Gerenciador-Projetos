import { useLocation } from "react-router-dom";
import Message from "../layout/Message";

import styles from './Projects.module.css'
import Container from '../layout/Container'
import LinkButton from '../layout/LinkButton'

function Projects() {

  const location = useLocation() // resgatar a mensagem, message
  console.log(location)
  let message = ''
  if (location.state){ // se tiver alguma coisa no location, entao a mensagem existe, entao atribuirmos o valor no message
    message = location.state.message
  }

  return (
  <div className={styles.project_container}>
    <div className={styles.title_container}>
      <h1>Meus Projetos</h1>
      <LinkButton to="/newproject" text="Criar Projeto" />
      </div>    
    {message && <Message type="success" msg={message}/>} 
    <Container customclass="start">
    <p>Projetos...</p>
    </Container>
  </div> //se o message esta preechido, vamos imprimir nossa mensagem do "Message"
  )
}

export default Projects;
