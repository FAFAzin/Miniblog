//css
import styles from './Register.module.css';

//hooks
import {useState, useEffect} from 'react'
//hooks 
import { useAuthentication } from '../../Hooks/useAuthentication';

const Register = () => {
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const {createUser, error: authError, loading} = useAuthentication();

    //função de submit
    const handleSubmit = async (e) => {
        e.preventDefault()

        setError('')

        const user = {
            displayName, 
            email, 
            password
        }
        
        //verifica se a senha e a confirmação são iguais 
        if(password !== confirmPassword){
            setError('Senhas distintas!')
            return
        }

        const res = await createUser(user)

        setDisplayName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');


    };

    useEffect(() => {
        if(authError) {
            setError(authError)
        }
    }, [authError])
    
  return (
    <div className={styles.Register}>
        <h1>Cadastre-se</h1>
        {/*input de nome de usuário */}
        <form onSubmit={handleSubmit}>
            <label>
                <span>Nome:</span>
                <input type="text" 
                name='diplayName' 
                required 
                placeholder='Seu nome de usuário'
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                />
            </label>
        {/*input de email*/}
            <label>
                <span>E-mail:</span>
                <input type="email" 
                name='email' 
                required 
                placeholder='Seu melhor email'
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
            </label>
        {/*input de senha  */}
            <label>
                <span>Senha:</span>
                <input type="password" 
                name='password' 
                required 
                placeholder='Crie sua senha'
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
            </label>
        {/*input de confirmação de senha  */}
            <label>
                <span>Confirme a senha:</span>
                <input type="password" 
                name='confirmPassword' 
                required 
                placeholder='Confirme sua senha'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}/>
            </label>
        {/*botão submit  */}
            {!loading && <button className='btn'>Cadastrar</button>}
            {loading && <button className='btn' disabled>Carregando...</button>}

            {error && <p className='error'>{error}</p>}
    </form>
        

    
    </div>
  )
}

export default Register