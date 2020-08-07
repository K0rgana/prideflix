import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import useForm from '../../../hooks/useForm';
import Button from '../../../components/Button';
import videosRepository from '../../../repositories/videos';
import categoriasRepository from '../../../repositories/categorias';

function CadastroVideo() {
  const history = useHistory();
  const [categories, setCategories] = useState([]);
  const categoryTitles = categories.map(({ titulo }) => titulo);
  const { handleChange, values } = useForm({
    titulo: 'Video padrão',
    url: 'https://www.youtube.com/watch?v=TSNiPAFJsxo',
    categoria: 'B de Bisexual',
  });

  useEffect(() => {
    categoriasRepository
      .getAll()
      .then((categoriasFromServer) => {
        setCategories(categoriasFromServer);
      });
  }, []);

  return (
    <PageDefault>
      <h1>Cadastro de Video</h1>

      <form onSubmit={(evt) => {
        evt.preventDefault();

        const categoriaId = categories.find((categoria) => {
          return categoria.titulo === values.categoria;
        });

        videosRepository.create({
          titulo: values.titulo,
          url: values.url,
          categoriaId: categoriaId.id,
        })
          .then(() => {
            //criar uma tela para exibir acao
            console.log('Vídeo cadastrado com sucesso. [200]');
            history.push('/');
          });
      }}
      >

        <FormField
          label="Titulo do Vídeo"
          type="text"
          name="titulo"
          value={values.titulo}
          onChange={handleChange}
        />

        <FormField
          label="URL do Vídeo (YouTube)"
          type="text"
          name="url"
          value={values.url}
          onChange={handleChange}
        />

        <FormField
          label="Categoria"
          type="text"
          name="categoria"
          value={values.categoria}
          onChange={handleChange}
          suggestions={categoryTitles}
        />

        <Link to="/" className="BtnLink">
          Cancelar
        </Link>

        <Button type="submit">
          Cadastrar
        </Button>
      </form>

      <br />
      <br />
      <Link to="/cadastro/categoria"> Cadastrar Categoria</Link>
      <br />
      <br />
    </PageDefault>
  );
}
export default CadastroVideo;
