import styles from './Login.module.css';

//hooks
import { useState, useEffect } from 'react'
import { useAuthentication } from '../../Hooks/useAuthentication';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login, error: authError, loading } = useAuthentication();

  //função de submit
  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')

    const user = {
      email,
      password
    }


    const res = await login(user)

    setEmail('');
    setPassword('');



  };

  useEffect(() => {
    if (authError) {
      setError(authError)
    }
  }, [authError])
  return (
    <div className={styles.login}>
      <h1>Entrar</h1>
      <p>Entre para se conectar com todo o mundo</p>
      <form onSubmit={handleSubmit}>
        {/*input de email*/}
        <label>
          <span>E-mail:</span>
          <input type="email"
            name='email'
            required
            placeholder='insira seu email'
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </label>
        {/*input de senha  */}
        <label>
          <span>Senha:</span>
          <input type="password"
            name='password'
            required
            placeholder='insira sua senha'
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </label>

        {/*botão submit  */}
        {!loading && <button className='btn'>Cadastrar</button>}
        {loading && <button className='btn' disabled>Carregando...</button>}

        {error && <p className='error'>{error}</p>}
      </form>

    </div>
  )
}

export default Login