import styles from "./Project.module.css";

import { useParams } from "react-router-dom"; // para pegarmos o id pela url
import { useState, useEffect } from "react";

import Loading from "../layout/Loading";

import Container from "../layout/Container";

function Project() {
    const { id } = useParams(); // ele sabe que iremos pegar o id a partir da URL

    const [project, setProject] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            // simulando o carregamento enquanto os dados nao vem
            fetch(`http://localhost:5000/projects/${id}`, {
                // para acessarmos o projeto pela id da url PROJECTS
                // vindo do id PROJECT
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((resp) => resp.json()) // pegar a resposta e tranformar em Json
                .then((data) => {
                    // pegar os dados e usar eles
                    setProject(data);
                })
                .catch((err) => console.log);
        }, 300);
    }, [id]); //nossa referencia para monitoração

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm); // negativo de projectform. se esta true vira false e vice e versa
    }

    return (
        <>
            {project.name ? (
                <div className={styles.project_details}> 
                    <Container customClass="column">
                        <div className={styles.project_container} >
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}> 
                               {!showProjectForm ? 'Editar projeto' : 'fechar'} 
                               {/* Se nao tiver ShowprojectForm sendo exibido, eu vou exibir editar projeto 
                               cas o contrario eu exibo fechar */}
                            </button> 
                            {!showProjectForm ? (
                                //se nao tiver project form eu exibo project form
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria:</span> {project.category.name}
                                    </p>
                                    <p>
                                        <span>Total de Orçamento:</span> R${project.budget}
                                    </p>
                                    <p>
                                        <span>total Utilizado:</span> R${project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <p>detalhes do projeto</p>
                                </div>
                            )}
                        </div>
                    </Container> 
                </div> 
            ) : (
                <Loading />
            )}
        </>
    );
}

export default Project;
