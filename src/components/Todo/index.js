import React from 'react'
import styles from './Todo.module.css'

export default function Todo({ title, onClick, ...props }) {
    return (
        <p className={styles.container} onClick={onClick}>
            {title}
        </p>
    )
}
