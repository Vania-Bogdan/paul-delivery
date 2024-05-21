import React, { useState, useEffect } from 'react';
import axios from 'axios';

import styled from 'styled-components';

const CurrentList = ({ products, curGroup }) => {
  const [productList, setProductList] = useState([]);
  let curUrl = 'https://631de489789612cd07b2575a.mockapi.io/';
  switch (curGroup) {
    case 'W1':
      curUrl += 'W1_products';
      break;
    case 'W2':
      curUrl += 'W2_products';
      break;
    default:
      curUrl += 'W2_products';
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(curUrl);
        return response.data;
      } catch (error) {
        console.error('Помилка під час виконання запиту GET:', error);
        return []; // Повертаємо порожній масив у випадку помилки
      }
    };

    const fetchData = async () => {
      const products = await fetchProducts();
      setProductList(products);
    };

    fetchData();
  }, [curGroup, curUrl]);

  const editProductQuantity = (id, q, isToAdd) => {
    const itemId = id;
    const newQ = isToAdd ? q + 1 : q - 1;

    const updatedData = {
      quantity: newQ,
    };

    const url = curUrl + '/' + itemId;

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

  // const handleReload = () => {
  //   window.location.reload();
  // };

  return (
    <>
      {/* <button onClick={handleReload}>Save</button> */}
      <Ul>
        {productList.map(({ name, quantity, id }) => (
          <ProductBox key={id}>
            <MainText>{id + '.' + name}</MainText>
            <ChangeQuantityBox>
              <ChangeQuantityBtn
                onClick={() => editProductQuantity(id, quantity, false)}
              >
                -
              </ChangeQuantityBtn>
              <QuantityText>{quantity}</QuantityText>
              <ChangeQuantityBtn
                onClick={() => editProductQuantity(id, quantity, true)}
              >
                +
              </ChangeQuantityBtn>
            </ChangeQuantityBox>
          </ProductBox>
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
  padding: 12px 12px 12px 12px;
  margin-top: 40px;
  li:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const ProductBox = styled.li`
  display: flex;
  justify-content: space-between;
`;

const MainText = styled.p`
  font-family: Verdana, Geneva, Tahoma, monospace;
  font-size: 20px;
  font-weight: 400;
  margin: 0;
`;

const ChangeQuantityBox = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityText = styled.p`
  font-family: Verdana, Geneva, Tahoma, monospace;
  font-size: 20px;
  font-weight: 400;
  margin: 0;
  width: 20px;
  display: flex;
  justify-content: center;
`;

const ChangeQuantityBtn = styled.button`
  font-family: Verdana, Geneva, Tahoma, monospace;
  font-size: 22px;
  font-weight: 500;
  margin: 0 3px;
  padding: 0 0 2px 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  border: 1px solid rgba(0, 0, 0);
  border-radius: 5px;
  color: #1c1c1c;
`;

export default CurrentList;
