import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import Container from '../layout/Container';
import Loading from '../layout/Loading';
import Message from '../layout/Message';
import ProjectForm from '../project/ProjectForm';
import ServiceForm from '../Service/ServiceForm';
import styles from './Project.module.css';
import ServiceCard from '../Service/ServiceCard'

function Project() {
    const { id } = useParams(); // ele sabe que iremos pegar o id a partir da URL

    const [project, setProject] = useState([]);
    const [services, setServices] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showServiceForm, setShowServiceForm] = useState(false);
    const [message, setMessage] = useState()
    const [type, setType] = useState()

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
                    setServices(data.services)
                })
                .catch((err) => console.log);
        }, 300);
    }, [id]); //nossa referencia para monitoração

    function editPost(project){
        setMessage('')
        // budget validation
        if(project.budget < project.cost) {
            setMessage('O orçamento não pode ser menor que o custo do projeto')
            setType('erro')
            return false
        }
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(project),
        })
        .then( resp => resp.json())
        .then((data) => {
            setProject(data)
            setShowProjectForm(false)
            setMessage('Projeto atualizado!')
            setType('success')
        })
        .catch(err => console.log(err))
    }

    function createService(project) {
        setMessage('')

       // last service
       const lastService = project.services[project.services.length - 1]

       lastService.id = uuidv4()

       const lastServiceCost = lastService.cost

       const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

       // maximum value validation
       if(newCost > parseFloat(project.budget)){
        setMessage("Orçamento ultrapassado, verifique o valor do serviço")
        setType("erro")
        project.services.pop()
        return false
       }

       // add service cost to project cost
       project.cost = newCost

       // update project
       fetch(`http://localhost:5000/projects/${project.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(project)
       }).then((resp) => resp.json())
       .then(data => {
        setShowServiceForm(false)
       })
       .catch(err => console.log(err))

    }

    function removeService(){

    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm); // negativo de projectform. se esta true vira false e vice e versa
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm); // negativo de projectform. se esta true vira false e vice e versa
    }

    return (
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column">
                        {message && <Message type={type} msg={message}/>}
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button
                                className={styles.btn}
                                onClick={toggleProjectForm}
                            >
                                {!showProjectForm ? "Editar projeto" : "fechar"}
                                {/* Se nao tiver ShowprojectForm sendo exibido, eu vou exibir editar projeto 
                               cas o contrario eu exibo fechar */}
                            </button>
                            {!showProjectForm ? (
                                //se nao tiver project form eu exibo project form
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria:</span>{" "}
                                        {project.category.name}
                                    </p>
                                    <p>
                                        <span>Total de Orçamento:</span> R$
                                        {project.budget}
                                    </p>
                                    <p>
                                        <span>total Utilizado:</span> R$
                                        {project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <ProjectForm
                                        handleSubmit={editPost}
                                        btnText="Concluir edição"
                                        projectData={project}
                                    />
                                </div>
                            )}
                        </div>
                        <div className={styles.service_form_container}>
                                <h2>Adicione um serviço:</h2>
                                <button
                                className={styles.btn}
                                onClick={toggleServiceForm}
                            >
                                {!showServiceForm ? "Adiconar serviço" : "fechar"}
                                {/* Se nao tiver ShowprojectForm sendo exibido, eu vou exibir editar projeto 
                               caso contrario eu exibo fechar */}
                            </button>
                            <div className={styles.project_info}>
                               {showServiceForm && (
                                <ServiceForm
                                handleSubmit={createService}
                                btnText="Adicionar serviço"
                                projectData={project}
                                />
                               ) }
                               {/* se showServiceForm estiver abilitado, abilite o formulário do serviço */}
                            </div>
                        </div>
                        <h2>Serviço</h2>
                        <Container customClass="start">
                               {services.length > 0 && // se for maior que 0 exibir
                                services.map((service) => ( // usar parenteses pq ele tem que retornar um objeto
                                    <ServiceCard  
                                    id={service.id}
                                    name={service.name}
                                    cost={service.cost}
                                    description={service.description}
                                    key={service.id}
                                    handleRemove={removeService}
                                    /> 
                                ))
                               }
                               {services.length === 0 && <p>Não há serviços cadastrados </p>
                               } 
                        </Container>
                     </Container> 
                </div>
            ) : (
                <Loading />
            )}
        </>
    );
}

export default Project;
