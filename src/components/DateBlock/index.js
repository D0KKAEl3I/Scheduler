import React from 'react'
import styles from './dateblock.module.css'

export default function DateBlock({ date, day, todos = [], disable, onContextMenu }) {
    return (
        <div className={`${styles.container} ${disable ? styles.disable : ""}`} onContextMenu={!disable ? onContextMenu : e => e.preventDefault()}>
            <p className={`${styles.date} ${disable ? styles.disable : ""}`}
                style={
                    day == 0 ?
                        { color: 'red', WebkitTextStrokeColor: 'red' }
                        :
                        day == 6 ?
                            { color: 'blue', WebkitTextStrokeColor: 'blue' }
                            :
                            {}}
            >{date}</p>
            <hr />
            <div className={styles.todos}>
                {
                    todos.map((todo, index) => (
                        <p className={styles.todo} key={index}>
                            {index + 1} {todo}
                        </p>
                    ))
                }
            </div>

        </div>
    )
}
