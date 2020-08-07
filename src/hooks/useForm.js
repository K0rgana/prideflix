/* eslint-disable linebreak-style */
import { useState } from 'react';

function useForm(initialValues) {
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

  function clearForm() {
    setValues(initialValues);
  }
  return {
    values,
    handleChange,
    clearForm,
  };
}

export default useForm;
