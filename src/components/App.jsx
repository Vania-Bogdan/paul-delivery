import Phonebook from './Phonebook/Phonebook';
import MainPage from './MainPage/MainPage';

export const App = () => {
  return (
    // <Phonebook />
    <MainPage />
  );
};

// import React, { useState } from 'react';
// import axios from 'axios';

// export const App = () => {
//   // Масив зі списком продуктів
//   const initialProducts = [
//     { id: 1, name: 'Apple' },
//     { id: 2, name: 'Banana' },
//     { id: 3, name: 'Orange' },
//     { id: 4, name: 'Kiwi' },
//   ];

//   const [products, setProducts] = useState(initialProducts);
//   const [deliveryInfo, setDeliveryInfo] = useState({});

//   const handleQuantityChange = (productId, quantity) => {
//     setDeliveryInfo({
//       ...deliveryInfo,
//       [productId]: quantity,
//     });
//   };

//   const handleSubmitDelivery = async () => {
//     try {
//       // Надсилаємо інформацію про доставку на сервер
//       const response = await axios.post(
//         'https://631de489789612cd07b2575a.mockapi.io/contacts',
//         deliveryInfo
//       );
//       console.log('Delivery submitted successfully:', response.data);
//     } catch (error) {
//       console.error('Error submitting delivery:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Product List</h1>
//       <ul>
//         {products.map(product => (
//           <li key={product.id}>
//             {product.name}
//             <button
//               onClick={() =>
//                 handleQuantityChange(
//                   product.id,
//                   (deliveryInfo[product.id] || 0) + 1
//                 )
//               }
//             >
//               +
//             </button>
//             <span>{deliveryInfo[product.id] || 0}</span>
//             <button
//               onClick={() =>
//                 handleQuantityChange(
//                   product.id,
//                   Math.max(0, (deliveryInfo[product.id] || 0) - 1)
//                 )
//               }
//             >
//               -
//             </button>
//           </li>
//         ))}
//       </ul>
//       <button onClick={handleSubmitDelivery}>Submit Delivery</button>
//     </div>
//   );
// };
