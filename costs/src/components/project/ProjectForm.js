import { useState, useEffect } from 'react';

import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';
import styles from './ProjectForm.module.css';

function ProjectForm({ handleSubmit, btnText , projectData }) {
  const [categories, setCategories] = useState([]); // criando as constantes de categories
  const [project, setProject] = useState(projectData || {}) // Project data que eu recebo do componente pai ou um objeto vazio

    useEffect(() => {
    fetch('http://localhost:5000/categories', { // 
    method: 'GET',
    headers: {
      'Content-Type': 'application/json', // para dizer que queremos receber json
    },
  })
    .then((resp) => resp.json()) // tranformar os dados da resposta em json, entao o que recebemos de dados irá virar json
    .then((data) => { // pegar os dados do json e colocar no set categories
      setCategories(data)
    })
    .catch((err) => console.log(err)) // imprimir um erro que der no request
    }, [])

    const submit = (e) => {
      e.preventDefault() // não deixa o formulario retornar a pagina 
      handleSubmit(project) // executo o metodo que for passado pela props e passo o projeto como argumento
    }

    function handleChange(e){
      setProject({...project, [e.target.name]: e.target.value})
      console.log(project)
    }

    function handleCategory(e){
        setProject({...project, category:{
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    })
    }
      
    return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Nome do projeto"
        name="name"
        placeholder="Insira o nome do projeto"
        handleOnChange={handleChange}
        value={project.name ? project.name : ''}
      />
      <Input
        type="number"
        text="Orçamento do projeto"
        name="budget"
        placeholder="Insira o orçamento total"
        handleOnChange={handleChange}
        value={project.budget ? project.budget : ''}
      />
      <Select 
      name="category_id" 
      text="Selecione a categoria" 
      options={categories}
      handleOnChange={handleCategory}
      value={project.category ? project.category.id : ''}
        />
      <SubmitButton text={btnText} />
    </form>
  );
}

export default ProjectForm;
