import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Audio } from 'react-loader-spinner';

const CurrentList = ({ products, curGroup }) => {
  const [productList, setProductList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let curUrl = '';
  switch (curGroup) {
    case 'W1':
      curUrl = 'https://631de489789612cd07b2575a.mockapi.io/W1_products';
      break;
    case 'W2':
      curUrl = 'https://631de489789612cd07b2575a.mockapi.io/W2_products';
      break;
    case 'So':
      curUrl = 'https://664ce9a3ede9a2b55652113d.mockapi.io/so_coffee';
      break;
    case 'Costa':
      curUrl = 'https://664ce9a3ede9a2b55652113d.mockapi.io/costa_coffee';
      break;
    default:
      curUrl = 'https://631de489789612cd07b2575a.mockapi.io/W1_products';
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

    const url = `${curUrl}/${itemId}`;

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

  const cancelAllProducts = async () => {
    try {
      const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

      setIsLoading(true);

      // Проходимо через всі продукти з асинхронною затримкою
      for (const pro of productList) {
        if (pro.quantity !== 0) {
          await axios.put(`${curUrl}/${pro.id}`, { quantity: 0 });
          console.log(`${pro.name} анульовано`);
          await delay(100);
        }
      }

      console.log('Всі продукти анульовано');

      // Оновлюємо стан продуктів
      setProductList(prevProducts =>
        prevProducts.map(pro => ({ ...pro, quantity: 0 }))
      );
      setIsLoading(false);
    } catch (error) {
      console.error('Помилка під час анулювання всіх продуктів:', error);
    }

    setShowModal(false);
  };

  let allNeeded = 0;

  productList.forEach(product => {
    if (product.quantity > 0) {
      allNeeded++;
    }
  });

  return (
    <>
      {isLoading && (
        <LoaderBox>
          <Audio
            height="100"
            radius="20"
            color="darkslategray"
            ariaLabel="loading"
            wrapperStyle
            wrapperClass
          />
        </LoaderBox>
      )}
      <AllNeededBox>
        <AllNeededText>{allNeeded}</AllNeededText>
        <CancelAllBtn onClick={() => setShowModal(true)}>
          Wyzeruj wszystko
        </CancelAllBtn>
        {showModal && (
          <Modal>
            <ModalContent>
              <p>Czy na pewno chcesz wyzerować wszystkie produkty?</p>
              <ChoiseOfCancelling>
                <button onClick={cancelAllProducts}>Tak, wyzeruj</button>
                <button onClick={() => setShowModal(false)}>Cofnij</button>
              </ChoiseOfCancelling>
            </ModalContent>
          </Modal>
        )}
      </AllNeededBox>
      <Ul>
        {productList.map(({ name, quantity, id }) => (
          <ProductBox key={id}>
            <MainText>{id + '.' + name}</MainText>
            <ChangeQuantityBox>
              <ChangeQuantityBtn
                onClick={() => editProductQuantity(id, quantity, false)}
                disabled={quantity === 0}
              >
                -
              </ChangeQuantityBtn>
              <QuantityText>{quantity}</QuantityText>
              <ChangeQuantityBtn
                onClick={() => editProductQuantity(id, quantity, true)}
              >
                +
              </ChangeQuantityBtn>
              {quantity > 0 && <IsNeeded />}
            </ChangeQuantityBox>
          </ProductBox>
        ))}
      </Ul>
    </>
  );
};

const Ul = styled.ul`
  padding: 12px;
  margin-top: 0;
  z-index: 20;
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
  border: 1px solid #1c1c1c;
  border-radius: 5px;
  color: #1c1c1c;
`;

const IsNeeded = styled.div`
  height: 25px;
  width: 5px;
  background-color: #00c300;
  position: absolute;
  right: 5px;
  z-index: 1;
`;

const AllNeededBox = styled.div`
  margin-top: 50px;
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const AllNeededText = styled.p`
  font-size: 26px;
  margin-left: 70px;
`;

const CancelAllBtn = styled.button`
  font-family: Verdana, Geneva, Tahoma, monospace;
  font-size: 14px;
  font-weight: 400;
  /* width: 40%; */
  border: 1px solid #1c1c1c;
  border-radius: 5px;
  color: #bc0000;
  padding: 5px;
  margin-left: auto;
  margin-right: 12px;
`;

const Modal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 15px;
  border: 1px solid #888;
  border-radius: 20px;
  width: 80%;
  max-width: 400px;
  text-align: center;
`;

const ChoiseOfCancelling = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const LoaderBox = styled.div`
  position: absolute;
  right: 40%;
  left: 40%;
  bottom: 20%;
`;

export default CurrentList;
