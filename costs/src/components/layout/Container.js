import styles from './Container.module.css'

function Container(props){
    return <div className={`${styles.container} ${styles[props.customClass]}`}>{props.children}</div>
                                                // Criando uma classe custoClass e chamando ela no app.js e passando o
                                                // nome da classe css no container 
}

export default Container