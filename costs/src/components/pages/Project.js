import styles from './Project.module.css'

import { useParams } from 'react-router-dom' // para pegarmos o id pela url
import { useState, useEffect } from 'react'

function Project() {

    const { id } = useParams() // ele sabe que iremos pegar o id a partir da URL
    
    const [project, setProject] = useState([])

    useEffect(() => {   

        fetch(`http://localhost:5000/projects/${id}`, { // para acessarmos o projeto pela id da url PROJECTS
                                                        // vindo do id PROJECT    
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },                                               

        })
        .then(resp => resp.json()) // pegar a resposta e tranformar em Json
        .then((data) => { // pegar os dados e usar eles
            setProject(data)
        }).catch(err => console.log)

    }, [id]) //nossa referencia para monitoração 
    

    return (
        <p>{project.name}</p>
        
    )
}

export default Project