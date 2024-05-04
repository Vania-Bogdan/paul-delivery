import Headers from './Headers/Headers';
import CurrentList from './CurrentList/CurrentList';

import styled from 'styled-components';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';

import React, { useState, useEffect } from 'react';

import { fetchContacts } from 'redux/contacts/contacts-operation';

import { visibleContacts } from '../../redux/selectors';

export default function MainPage() {
  const products = useSelector(visibleContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const [curGroup, setCurGroup] = useState('W1');

  const onEditProduct = (itemId, updatedData) => {
    // URL ресурсу, куди ви хочете відправити PUT запит
    const url =
      'https://631de489789612cd07b2575a.mockapi.io/contacts/' + itemId;

    // Відправляємо PUT запит за допомогою Axios
    axios
      .put(url, updatedData)
      .then(response => {
        console.log('Запит PUT виконаний успішно:', response.data);
        // Тут можна додати логіку для оновлення стану компонента або інші дії, що потрібно виконати після успішної відправки запиту
      })
      .catch(error => {
        console.error('Помилка під час виконання запиту PUT:', error);
        // Тут можна додати обробку помилки або інші дії, що потрібно виконати у випадку помилки
      });
  };

  return (
    <MainScreen>
      <Headers curGroup={curGroup} onGroupChange={setCurGroup} />
      <p>Current group is {curGroup}</p>
      <CurrentList
        products={products}
        curGroup={curGroup}
        onEditProduct={onEditProduct}
      />
    </MainScreen>
  );
}

const MainScreen = styled.div`
  margin-top: -16px;
  width: 100vw;
  height: 100vh;
  background-color: #ffe32aaa;
`;
