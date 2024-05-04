import React, { useState, useEffect } from 'react';
import axios from 'axios';

import styled from 'styled-components';

const CurrentList = ({ products, curGroup }) => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const filteredProducts = products.filter(({ group }) => group === curGroup);
    setProductList(filteredProducts);
  }, [products, curGroup]);

  const lalala = (id, q, boo) => {
    const itemId = id;
    const newQ = boo ? q + 1 : q - 1;

    const updatedData = {
      quantity: newQ,
    };

    const url =
      'https://631de489789612cd07b2575a.mockapi.io/contacts/' + itemId;

    axios
      .put(url, updatedData)
      .then(response => {
        console.log('Запит PUT виконаний успішно:', response.data);
        // Оновлення стану компонента після успішного виконання запиту
        setProductList(prevProducts =>
          prevProducts.map(product =>
            product.id === id ? { ...product, quantity: newQ } : product
          )
        );
      })
      .catch(error => {
        console.error('Помилка під час виконання запиту PUT:', error);
      });
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <>
      <button onClick={handleReload}>Save</button>
      <Ul>
        {productList.map(({ name, quantity, group, id }) => (
          <li key={id}>
            <button onClick={() => lalala(id, quantity, false)}>
              Зменшити кількість
            </button>
            <p>{id + '. ' + name + ': ' + quantity}</p>
            <button onClick={() => lalala(id, quantity, true)}>
              Збільшити кількість
            </button>
          </li>
        ))}
      </Ul>
    </>
  );
};

// ContactList.propTypes = {
//   contacts: PropTypes.arrayOf(
//     PropTypes.shape({
//       name: PropTypes.string.isRequired,
//       number: PropTypes.string.isRequired,
//       id: PropTypes.string.isRequired,
//     })
//   ),
// };

const Ul = styled.ul`
  padding: 0 0 0 10px;
`;

export default CurrentList;
