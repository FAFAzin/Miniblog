//CSS
import styles from './Home.module.css';

//Hooks 
import {useNavigate, Link} from 'react-router-dom';
import {useState} from 'react';

//components 

const Home = () => {

  const [query, setQuery] = useState('');
  const [posts] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
  }
  return (
    <div className={styles.home}>
        <h1>Publicações recentes</h1>
        <form onSubmit={handleSubmit} className={styles.search_form}>
          <input type="text" placeholder='Ou busque por tags' 
          onChange={(e) => setQuery(e.target.value)} />
          <button className='btn btn-dark'> Buscar </button>
        </form>
        <div>
          <h1>Posts...</h1>
          {posts && posts.length === 0 && (
            <div className={styles.noposts}>
              <p>Nenhum post foi encontrado!</p>
              <Link to='post/create' className='btn'>Criar Post</Link>
            </div>
          )}
        </div>
    </div>
  )
}

export default Home