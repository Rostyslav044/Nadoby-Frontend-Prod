


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '@/app/styles/NewRealty.module.scss';

const NewRealty = () => {
  const [apartments, setApartments] = useState([]);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/apartments');
        setApartments(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке квартир:', error);
      }
    };

    fetchApartments();

    const handleUpdate = (event) => {
      console.log('Получено событие apartmentAdded:', event.detail);
      if (event.detail) {
        setApartments((prev) => [event.detail, ...prev]); // Добавляем новую квартиру в начало списка
      } else {
        fetchApartments(); // Если нет detail, загружаем заново
      }
    };

    window.addEventListener('apartmentAdded', handleUpdate);

    return () => {
      window.removeEventListener('apartmentAdded', handleUpdate);
    };
  }, []);

  return (
    <div className={styles.container}>
      <h2>Новые объекты недвижимости</h2>
      <div className={styles.list}>
        {apartments.length > 0 ? (
          apartments.map((apt) => (
            <div key={apt.id} className={styles.card}>
              <img src={apt.photos[0]} alt="Фото квартиры" className={styles.image} />
              <h3>{apt.city}, {apt.district}</h3>
              <p>{apt.description}</p>
              <p>Цена: {apt.price} грн</p>
            </div>
          ))
        ) : (
          <p>Нет новых объектов</p>
        )}
      </div>
    </div>
  );
};

export default NewRealty;
