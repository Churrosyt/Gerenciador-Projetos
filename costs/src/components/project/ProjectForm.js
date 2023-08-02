import { useState, useEffect } from 'react';

import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';
import styles from './ProjectForm.module.css';

function ProjectForm({ btnText }) {
  const [categories, setCategories] = useState([]); // criando as constantes de categories

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
      
    return (
    <form className={styles.form}>
      <Input
        type="text"
        text="Nome do projeto"
        name="name"
        placeholder="Insira o nome do projeto"
      />
      <Input
        type="number"
        text="Orçamento do projeto"
        name="budget"
        placeholder="Insira o orçamento total"
      />
      <Select 
      name="category_id" 
      text="Selecione a categoria" 
      options={categories}
        />
      <SubmitButton text={btnText} />
    </form>
  );
}

export default ProjectForm;
