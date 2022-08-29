import styles from './Search.module.css';

//components 
import PostDetail from '../../components/PostDetail';

//hooks 
import { useFetchDocuments } from '../../Hooks/useFetchDocuments';
import { useQuery } from '../../Hooks/useQuery';

//rota 
import { Link } from 'react-router-dom';


const Search = () => {
  const query = useQuery();
  const search = query.get('q');

  const {documents: posts } = useFetchDocuments('posts', search);

  console.log(search)

  return (
    <div>
      <h2>Pesquisa</h2>
      <div>
        {posts && posts.length === 0 && (
          <>
          <p> Não foram encontrados resultados para a sua busca ...</p>
          <Link to='/' className = 'btn btn-dark'> Voltar </Link>
          </>
        )}
        {posts && posts.map((post) => {
          <PostDetail key={post.id} post={post} />
        })};
      </div>
    </div>
  )
}

export default Search