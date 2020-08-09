import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import useForm from '../../../hooks/useForm';
import Button from '../../../components/Button';
import Loading from '../../../components/Loading';
import './cadastro.css';

function CadastroCategoria() {
  const initialValues = {
    titulo: '',
    cor: '#7802aa',
    link_extra: {
      text: '',
      url: '',
    },
  };
  const { values, handleChange, clearForm } = useForm(initialValues);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const URL = window.location.hostname.includes('localhost')
      ? 'http://localhost:8080/categorias'
      : 'https://prideflix.herokuapp.com/categorias';
    fetch(URL)
      .then(async (respostaDoServidor) => {
        const resposta = await respostaDoServidor.json();
        setCategories([
          ...resposta,
        ]);
      });
  }, []);

  return (
    <PageDefault>
      <h1>
        Cadastro de Categoria:
        {' '}
        {values.titulo}
      </h1>
      <form onSubmit={function handleSubmit(infosDoEvento) {
        infosDoEvento.preventDefault();
        setCategories([
          ...categories,
          values,
        ]);

        clearForm();
      }}
      >

        <FormField
          label="Nome da Categoria"
          type="text"
          name="titulo"
          value={values.titulo}
          onChange={handleChange}
        />

        <FormField
          label="Link Extra (Título)"
          type="textarea"
          name="link_extra.text"
          value={values.link_extra.text}
          onChange={handleChange}
        />

        <FormField
          label="Link Extra (Url)"
          type="text"
          name="link_extra.url"
          value={values.link_extra.url}
          onChange={handleChange}
        />

        <FormField
          label="Cor"
          type="color"
          name="cor"
          value={values.cor}
          onChange={handleChange}
        />

        <Link to="/" className="BtnLink">
          Cancelar
        </Link>

        <Button className="ButtonLink">
          Cadastrar
        </Button>

      </form>

      {categories.length === 0 && (
        <Loading />
      )}

      <ul>
        {/* indice para manter o valor unico da key */}
        {categories.map((categoria) => (
          <li key={`${categoria.titulo}`}>
            {categoria.titulo}
            {' '}
            -
            {' '}
            {categoria.link_extra.text}
            {' '}
            -
            {' '}
            {categoria.cor}
          </li>
        ))}
      </ul>

    </PageDefault>
  );
}

export default CadastroCategoria;
