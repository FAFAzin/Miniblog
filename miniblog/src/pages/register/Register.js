import styles from './Register.module.css'

const Register = () => {
  return (
    <div>
        <h1>Cadastre-se</h1>
        {/*input de nome de usuário */}
        <form>
            <label>
                <span>Nome:</span>
                <input type="text" 
                name='diplayName' 
                required 
                placeholder='Seu nome de usuário' />
            </label>
        </form>
        {/*input de email*/}
        <form>
            <label>
                <span>E-mail:</span>
                <input type="email" 
                name='email' 
                required 
                placeholder='Seu melhor email' />
            </label>
        </form>
        {/*input de senha  */}
        <form>
            <label>
                <span>Senha:</span>
                <input type="password" 
                name='password' 
                required 
                placeholder='Crie sua senha' />
            </label>
        </form>
        {/*input de confirmação de senha  */}
        <form>
            <label>
                <span>Confirme a senha:</span>
                <input type="password" 
                name='confirmPassword' 
                required 
                placeholder='Confirme sua senha' />
            </label>
        </form>
        {/*botão submit  */}
        <button className='btn'>Cadastrar</button>
    </div>
  )
}

export default Register