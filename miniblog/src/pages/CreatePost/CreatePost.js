import styles from './CreatePost.module.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from '../../Context/AuthContext';
import { useInsertDocument } from '../../Hooks/useInsertDocument';


const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState('');

  const { user } = useAuthValue();

  const { insertDocument, response } = useInsertDocument('posts');

  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    //validar image url 

    try {
      new URL(image);

    } catch (error) {
      setFormError('A imagem precisa ser uma url.')
      
    }
    //criar array de tags 

    const tagsArray = tags.split(',').map((tag) => tag.trim().toLowerCase());

    //checar todos os valores
    if(!title || !image || !tags || !body){
      setFormError('Por favor, preencha todos os campos')
    }
    
    if(formError) return;

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createBy: user.displayName,
    })

    //redirect to home page 

    navigate('/')

  }
  return (
    <div className={styles.create_post}>
      <h1>Crie um Post</h1>
      <p>Escreva sobre qualquer coisa </p>

      <form onSubmit={handleSubmit}>
        <label>
          {/*input titulo */}
          <span>Título:</span>
          <input type="text"
            name='title'
            required
            placeholder='Pense em um bom título...'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label>
          {/*input imagem */}
          <span>Url da imagem:</span>
          <input type="text"
            name='image'
            required
            placeholder='Insira sua foto...'
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </label>
        <label>
          {/*textearea descrição*/}
          <span>Descrição:</span>
          <textarea name="body"
            required
            placeholder='insira uma descrição'
            onChange={(e) => setBody(e.target.value)}
            value={body}
          ></textarea>
        </label>
        <label>
          {/*input tags */}
          <span>Tags:</span>
          <input type="text"
            name='tags'
            required
            placeholder='insira tags ...'
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>
        {/*botão submit  */}
        {!response.loading && <button className='btn'>Publicar</button>}
        {response.loading && <button className='btn' disabled>Carregando...</button>}

        {response.error && <p className='error'>{response.error}</p>}
        {formError && <p className='error'>{formError}</p>}

      </form>
    </div>
  );
};

export default CreatePost
