import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';

function CadastroCategoria() {
  const initialValues = {
    nome: '',
    descricao: '',
    cor: '',
  };

  const [categories, setCategories] = useState([]);
  const [values, setValues] = useState(initialValues);

  function setValue(indice, valor) {
    // indice = nome, descricao
    setValues({
      ...values,
      [indice]: valor, // nome: 'valor'
    });
  }

  function handleChange(evt) {
    setValue(
      evt.target.getAttribute('name'),
      evt.target.value,
    );
  }
  // ============

  useEffect(() => {
    if (window.location.href.includes('localhost')) {
      const URL = 'http://localhost:8080/categorias';
      fetch(URL)
        .then(async (respostaDoServer) => {
          if (respostaDoServer.ok) {
            const resposta = await respostaDoServer.json();
            setCategories([...resposta]);
            return;
          }
          throw new Error('Não foi possível carregar os dados');
        });
    }
  }, []);

  return (
    <PageDefault>
      <h1>
        Cadastro de Categoria:
        {values.nome}
      </h1>

      <form onSubmit={function handleSubmit(infosDoEvento) {
        infosDoEvento.preventDefault();
        setCategories([
          ...categories,
          values,
        ]);

        setValues(initialValues);
      }}
      >

        <FormField
          label="Nome da Categoria"
          type="text"
          name="nome"
          value={values.nome}
          onChange={handleChange}
        />

        <FormField
          label="Descrição"
          type="textarea"
          name="descricao"
          value={values.descricao}
          onChange={handleChange}
        />

        <FormField
          label="Cor"
          type="color"
          name="cor"
          value={values.cor}
          onChange={handleChange}
        />

        <Button>
          Cadastrar
        </Button>
      </form>

      <ul>
        {/* indice para manter o valor unico da key */}
        {categories.map((categoria, indice) => (
          <li key={`${categoria.nome}`}>
            {indice}
            .
            {' '}
            {categoria.nome}
            {' '}
            -
            {' '}
            {categoria.descricao}
            {' '}
            -
            {' '}
            {categoria.cor}
          </li>
        ))}
      </ul>

      <Link to="/">
        Ir para home
      </Link>
    </PageDefault>
  );
}

export default CadastroCategoria;
