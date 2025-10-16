'use client'

import { useEffect, useState } from 'react'
import styles from './page.module.css'

interface Diet { _id: string; name: string; meals: string[] }

export default function Dieta() {
  const [diets, setDiets] = useState<Diet[]>([])
  const userId = localStorage.getItem('userId')

  useEffect(() => {
    if (!userId) return
    fetch(`http://localhost:4000/dietas?userId=${userId}`)
      .then(res => res.json())
      .then(data => setDiets(data))
  }, [userId])

  return (
    <div className={styles.page}>
      <div className={styles.sidebar}>
        <h2>Dietas</h2>
        <div className={styles.workoutList}>
          {diets.map(d => (
            <div key={d._id} className={styles.workoutItem}>{d.name}</div>
          ))}
        </div>
      </div>
      <div className={styles.main}>
        {diets.length > 0 ? (
          diets.map(d => (
            <div key={d._id} className={styles.exerciseList}>
              {d.meals.map((m, i) => <div key={i} className={styles.exerciseCard}>{m}</div>)}
            </div>
          ))
        ) : (
          <div className={styles.emptyState}>Nenhuma dieta encontrada</div>
        )}
      </div>
    </div>
  )
}
