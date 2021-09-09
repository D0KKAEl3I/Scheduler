import React from 'react'
import styles from './todobox.module.css'
import Todo from 'components/Todo'

export default function TodoBox({ position, todos = [], ...props }) {
    return (
        <div className={styles.container} style={{
            left: position.x ? position.x + 'px' : '',
            top: position.y ? position.y + 'px' : '',
            display: position.x && position.y ? 'block' : 'none',
            height: todos.length * 48 + 'px'
        }}>
            {
                todos.map(todo => <Todo title={""} />)
            }
        </div>
    )
}
