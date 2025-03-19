import './App.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Axios from "axios";
import { useState } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [showRecoveryForm, setShowRecoveryForm] = useState(false); // Estado para controlar a exibição do formulário de recuperação de senha

  const handleLostSenha = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch("http://localhost:3001/validate-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (data.valid) {
            setMessage("A senha será enviada para o seu e-mail.");
            setIsValidEmail(true);
        } else {
            setMessage("E-mail não encontrado!");
            setIsValidEmail(false);
        }
    } catch (error) {
        setMessage("Erro ao verificar e-mail!");
        setIsValidEmail(false);
    }
};

  const handleClickLogin = (values) => {
    Axios.post('http://localhost:3001/login', {
      email: values.email,
      password: values.password,
    }).then((response) => {
      setMessage(response.data.message);
    });
  };

  const validationLogin = yup.object().shape({
    email: yup
      .string()
      .email("Não é um email")
      .required("Este campo é obrigatório"),
    password: yup
      .string()
      .min(8)
      .required("Este campo é obrigatório"),
  });

  const handleClickRegister = (values) => {
    Axios.post('http://localhost:3001/register', {
      email: values.email,
      password: values.password,
    }).then((response) => {
      setMessage(response.data.message);
    });
  };

  const validationRegister = yup.object().shape({
    email: yup
      .string()
      .email("Não é um email")
      .required("Este campo é obrigatório"),
    password: yup
      .string()
      .min(8)
      .required("Este campo é obrigatório"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null])
      .min(8)
      .required("Este campo é obrigatório"),
  });

  return (
    <div className="container">
      <h1>Login</h1>
      <Formik initialValues={{ email: "", password: "", confirmPassword: "" }}
        onSubmit={handleClickLogin}
        validationSchema={validationLogin}
      >
        <Form className='login-form'>
          <div className="login-form-group">
            <Field name="email" className="form-field"
              placeholder="Email" />
            <ErrorMessage
              name="email"
              component="span"
              className="form-error" />
          </div>

          <div className="login-form-group">
            <Field name="password" className="form-field"
              placeholder="Senha" />
            <ErrorMessage
              name="password"
              component="span"
              className="form-error" />
          </div>
          <button type="submit" className="btn-button">Login</button>
        </Form>
      </Formik>

      <h1>Cadastro</h1>
      <Formik initialValues={{ email: "", password: "", confirmPassword: "" }}
        onSubmit={handleClickRegister}
        validationSchema={validationRegister}
      >
        <Form className='login-form'>
          <div className="login-form-group">
            <Field name="email" className="form-field"
              placeholder="Email" />
            <ErrorMessage
              name="email"
              component="span"
              className="form-error" />
          </div>

          <div className="login-form-group">
            <Field name="password" className="form-field"
              placeholder="Senha" />
            <ErrorMessage
              name="password"
              component="span"
              className="form-error" />
          </div>

          <div className="login-form-group">
            <Field name="confirmPassword" className="form-field"
              placeholder="Confirme sua Senha" />
            <ErrorMessage
              name="confirmPassword"
              component="span"
              className="form-error" />
          </div>
          <button type="submit" className="btn-button">Cadastrar</button>
        </Form>
      </Formik>

      <div>
        <p>
          <span
            className="recovery-link"
            onClick={() => setShowRecoveryForm(!showRecoveryForm)}
          >
            Esqueci minha senha
          </span>

        </p>

        {showRecoveryForm && (
          <div className="password-recovery-container">
            <h2>Recuperação de Senha</h2>
            <form onSubmit={handleLostSenha} className="password-recovery-form">
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Digite seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`form-input ${!isValidEmail ? 'error' : ''}`}
                />
              </div>
              <button type="submit" className="btn-submit">Recuperar Senha</button>
            </form>
          </div>
        )}
      </div>
      {message && <div className={`message ${isValidEmail ? 'success' : 'error'}`}>{message}</div>}
    </div>
  );
}

export default App;
