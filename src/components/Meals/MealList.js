import styles from './MealList.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import { useEffect, useState } from 'react';

const MealList = (prop) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();
  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      const responce = await fetch('https://react-course-http-5f79e-default-rtdb.firebaseio.com/meals.json');
      
      if (!responce.ok) {
        throw new Error("Что-то пошло не так");
      }
      
      const responceData = await responce.json();



      const loadedMeals = [];
      for (const key in responceData) {
        loadedMeals.push({
          id: key,
          name: responceData[key].name,
          description: responceData[key].description,
          price: responceData[key].price,
        })
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    }

      fetchMeals().catch(err => {
        setIsLoading(false);
        setHttpError(err.message);
      });

    
  }, [])

  if (isLoading) {
    return (
      <section className={styles.meals} >
        <p className={styles['is-loading']}>Идет загрузка данных с сервера...</p>
      </section>
    )
  }

  if (httpError) {
    return (    
      <section className={styles.meals} >
        <p className={styles['is-error']}>{httpError}</p>
      </section>)
  }
    const mealList = meals.map((meal) => (
      <MealItem
        id ={meal.id}
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    ));

    return (
        <section className={styles.meals}>
          <Card>
            <ul>
                {mealList}
            </ul>
          </Card>
        </section>
    )
}

export default MealList;