import React, { useState } from 'react'
import styles from './menu.module.css'

export default function Menu() {

    const [open, setOpen] = useState(false)
    const toggle = () => {
        setOpen(!open)
    }

    return (
        <>
            <div className={`${styles.container} ${open ? styles.open : ""}`}>
                <button className={styles.button} onClick={toggle}>
                    <img src={"/images/menu_black.svg"}></img>
                </button>
                <div className={styles.profile}>
                    <div className={styles.icon}>
                        <img src={"/favicon.ico"} />
                    </div>
                    <h2 className={styles.username}>UserName</h2>
                </div>
                <ul className={styles.menus}>
                    <li>
                        <img src={"/images/home.svg"} /><p>Home</p>
                    </li>
                    <li>
                        <img src={"/images/setting.svg"} /><p>Setting</p>
                    </li>
                    <li>
                        <img src={"/images/logout.svg"} /><p>Log out</p>
                    </li>
                </ul>
            </div>
            <div className={`${styles.filter} ${open ? styles.on : ""}`} onClick={open ? toggle : null} />
        </>
    )
}
