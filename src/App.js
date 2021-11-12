import { withStyles } from "@material-ui/core/styles";
//import api from './api/api';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
var dados = [];
var nomes;
var mudaTela = 0;
var estadoTelaQuiz = ' ';




const styles = () => ({


  mainApp: {
    display: "flex",
    margin: '-8px',
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
    background: "whitesmoke",
  },
  center: {
    border: "1px solid grey",
    borderRadius: "5px",
    minWidth: "600px",
    height: "90%",
    background: "white",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center",

  },
  titulo: {
    margin: "3px",
  },
  info: {
    display: "flex",
    flexDirection: "Row"
  },
  p: {
    margin: "15px",
    background: "#b6b5f3",
    padding: "5px",
    color: "white",
    borderRadius: "10px",
  },
  button: {
    width: "70%",
    height: "50px",
    margin: "10px",
    border: "none",
    background: "#g0b5f3",
  },
  cor: {
    width: "50%",
    height: "10px",
  },
  principalQTDA: {
    margin: "-8px",
    width: "100vw",
    height: "100vh",
    background: "whitesmoke",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  secundariaQTDA: {
    border: "1px solid grey",
    borderRadius: "5px",
    width: "50vw",
    height: "50vh",
    background: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  formField: {
    width: "80%",
    height: "50px",
    border: "none",
    background: "#c0d0f1",
    borderRadius: "5px",
    margin: "10px",
  },
  buttonForm: {
    marginLeft: "30px",
    width: "60%",
    height: "30px",
    border: "none",
    background: "#c0d0f1",
    borderRadius: "5px",
  },
  startUno: {
    margin: "-8px",
    width: "100vw",
    height: "100vh",
    background: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  startDois: {
    width: "50vw",
    height: "50vh",
    background: "grey",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  start: {
    width: "100px",
    height: "50px",
    background: "green",
    border: "none",
    margin: "10px",
    color: "white",
  },
  cancel: {
    width: "100px",
    height: "50px",
    background: "red",
    border: "none",
    margin: "10px",
    color: "white",

  }



})

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const App = ({ classes }) => {


  const [cont, setCont] = useState(1);
  var api = axios.create({
    baseURL: `https://opentdb.com/api.php?amount=${cont}`
  });

  const [user, setUser] = useState();
  const [i, setI] = useState(0);
  const [cor, setCor] = useState();
  const [condicao, setCondicao] = useState(0);
  const [Nome, setNome] = useState();
  var estado = ' ';

  useEffect(() => {
    api
      .get()
      .then((response) => setUser(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro " + err);
      });
  }, []);


  function salva(prop) {
    setCor('green')
    dados.push(prop)
    mudaTela += 1
  }
  function proximo() {
    setCor('red')
    mudaTela += 1
  }
  function mudaTelaMsm() {
    if (mudaTela > i) {
      if (mudaTela == cont) {
        if(dados.length > 0) {
          console.log(dados!=null) 
          console.log(dados)
          window.sessionStorage.setItem(`${Nome}`, dados)
        }
        estadoTelaQuiz = 'none'
        console.log("mudatelamsm")
        setCondicao(0)
        setI(0)
        mudaTela = 0

      }
      else {
        setCor('')
        setI(i + 1)
      }
    }
  }
  setTimeout(mudaTelaMsm, 350)

  const handleClick = (prop) => {
    console.log(prop.qtda)
    setCont(prop.qtda)
    console.log(cont)
    setNome(prop.name)
    setCondicao(1)

  }
  function StartQuiz() {
    setCondicao(2)
    api
      .get()
      .then((response) => setUser(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro " + err);
      });
    console.log(user)
  }
  function reset() {
    setCondicao(0)
  }



  function qtda() {
    if (user != null && condicao == 2) {
      console.log(user)
      if (user.results[i].incorrect_answers[2] == null) {
        estado = 'none'
      }
      estadoTelaQuiz = ' '
      const botao = [
        <button className={classes.button} onClick={() => { salva(user.results[i].correct_answer) }}> {'a'+ user.results[i].correct_answer}</button>,
        <button className={classes.button} onClick={() => { proximo() }}> {user.results[i].incorrect_answers[0]}</button>,
        <button style={{ display: `${estado}` }} className={classes.button} onClick={() => { proximo() }}> {user.results[i].incorrect_answers[1]}</button>,
        <button style={{ display: `${estado}` }} className={classes.button} onClick={() => { proximo() }}> {user.results[i].incorrect_answers[2]}</button>
      ]
      console.log(botao)
      console.log('alooooooooooooooooo')
      shuffleArray(botao)
      return (

        <div style={{ display: `${estadoTelaQuiz}` }} className={classes.mainApp}>
          <div className={classes.center}>
            <h1 className={classes.titulo}>Quiz</h1>
            <h3>{user.results[i].question}</h3>
            <div className={classes.info}>
              <p className={classes.p}>Categoria: {user.results[i].category}</p>
              <p className={classes.p}>Dificuldade: {user.results[i].difficulty}</p>
              <p className={classes.p}>Tipo: {user.results[i].type}</p>
            </div>
            {
              botao

            }
            <p>{i + 1}</p>
            <div style={{ backgroundColor: `${cor}` }} className={classes.cor}></div>

          </div>
        </div>

      )

    }
    estado = ''




    if (condicao == 1) {
      console.log('inicial')
      return (
        console.log('inicial/w'),


        <div className={classes.startUno}>
          <div className={classes.startDois}>
            {console.log('aa')}
            <button className={classes.start} onClick={() => { StartQuiz() }}>Start</button>
            <button className={classes.cancel} onClick={() => { reset() }}>Cancel</button>
          </div>
        </div>



      )
    }

    function pontos() {
      if (Nome != null) {
        console.log(Nome)
        var status = localStorage.getItem(`${Nome}`);
        
          return (
            <p>{typeof(window.sessionStorage.getItem(`${Nome}`))}</p>,
            <p>{status}</p>,
            <p>a  </p>
          )
        
      }
    }
    if (condicao == 0) {
      return (
        <div className={classes.principalQTDA}>
          <div className={classes.secundariaQTDA}>
            <h1>Informe quantas questoes quer responder</h1>
            <Formik initialValues={{}} onSubmit={handleClick} >
              <Form className="cadastro-form" >
                <div className="cadastro-form-group">
                  <Field name="name" className={classes.formField} pattern="[a-z\s]+$" placeholder="Name" />
                </div>
                <div className="cadastro-form-group">
                  <Field name="qtda" className={classes.formField} pattern="[0-50]+" placeholder="Quantas perguntas" />
                </div>
                <button className={classes.buttonForm} type="submit">Cadastrar</button>
              </Form>
            </Formik>

            {
            }
          </div>
        </div>
      )
    }
  }


  return (


    <div className={classes.master}>
      {

        qtda()}
    </div>


  )
}


export default withStyles(styles)(App);


