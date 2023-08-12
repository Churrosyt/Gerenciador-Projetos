import { useLocation } from "react-router-dom";

import { useState, useEffect } from "react";

import Message from "../layout/Message";

import Container from "../layout/Container";
import Loading from "../layout/Loading";
import LinkButton from "../layout/LinkButton";
import styles from "./Projects.module.css";
import ProjectCard from "../project/ProjectCard";

function Projects() {
    const [projects, setProjects] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false); // deixar como false pq o loading sempre inicia
    const [projectMessage, setProjectMessage] = useState('')

    const location = useLocation(); // resgatar a mensagem, message
    console.log(location);
    let message = "";
    if (location.state) {
        // se tiver alguma coisa no location, entao a mensagem existe, entao atribuirmos o valor no message
        message = location.state.message;
    }

    useEffect(() => {
        setTimeout(() => {
            fetch("http://localhost:5000/projects", {
                metho: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((resp) => resp.json())
                .then((data) => {
                    console.log(data);
                    setProjects(data);
                    setRemoveLoading(true); // quando carregar todos os projetos, mudar o para true
                })
                .catch((err) => console.log(err));
        }, 500);
    }, []);

    function removeProject(id) {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((resp) => resp.json()) // transformar em json
            .then((data) => { // pegar os dados da requisicao
                setProjects(projects.filter((project) => project.id !== id));
                //fazendo um map de Projects, percorrendo cada um dos projetos
                // project.id !== id) para filtrar e setar uma nova lista sem o projeto que nos deletamos
                setProjectMessage('Projeto removido com sucesso!')
            })
            .catch(err => console.log(err))
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto" />
            </div>
            {message && <Message type="success" msg={message} />}
            {projectMessage && <Message type="success" msg={projectMessage} />}

            <Container customClass="start">
                {projects.length > 0 && // checagem SE eu tenho produtos // Project.leght maior de 0, pode prosseguir
                    projects.map((project) => (
                        <ProjectCard
                            id={project.id}
                            name={project.name}
                            budget={project.budget}
                            category={project.category.name}
                            key={project}
                            handleRemove={removeProject}
                        />
                    ))}
                {!removeLoading && <Loading /> /*Para mostrar o loading*/}
                {removeLoading &&
                    projects.length === 0 && ( // se caso nao tiver nenhum projeto, ele mostra a mensagem
                        <p>Não há projetos cadastrado</p>
                    )}
            </Container>
        </div> //se o message esta preechido, vamos imprimir nossa mensagem do "Message"
    );
}

export default Projects;
