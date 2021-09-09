import React, { useCallback, useEffect, useRef, useState } from 'react'
import styles from './index.module.css'
import DateBlock from 'components/DateBlock'
import Menu from 'components/Menu'
import TodoBox from 'components/TodoBox'
import axios from 'axios'

export default function index() {
    const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const lastDayOfMonthList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    const [today, setToday] = useState(new Date())

    const [datas, setDatas] = useState([])

    const todos = useRef([])

    useEffect(() => {
        axios.get('http://localhost:3000/api/getDatas')
            // .then(res => res.json())
            .then(item => todos.current = item.data)
            .then(() => console.log(todos))
    }, [])

    const addTodo = async (data, index) => {

    }

    const deleteTodo = async data => {

    }

    class Data {
        date
        todos
        disable

        constructor({ date = { year, month, date, day }, todos = [], disable = false }) {
            this.date = { year: date.getFullYear(), month: date.getMonth(), date: date.getDate(), day: date.getDay() }
            this.todos = todos
            this.disable = disable
        }
    }

    const setCallender = () => {
        console.log(today + " dd")
        const month = today.getMonth()
        const datas = []
        let startDate
        let firstDate = new Date(today)
        firstDate.setDate(1)
        if (firstDate.getDay() == 0) {
            startDate = firstDate;
        } else {
            for (let i = lastDayOfMonthList[month - 1] - firstDate.getDay() + 1; i <= lastDayOfMonthList[month - 1]; i++) {
                let date = new Date();
                date.setMonth(month - 1);
                date.setDate(i);
                let data = new Data({ date: date, disable: true })
                datas.push(data)
            }
        }
        for (let i = 1; (i <= lastDayOfMonthList[month]) && (i <= 35); i++) {
            let date = new Date();
            date.setDate(i)
            let data = new Data({ date: date })
            datas.push(data)
        }
        let moreDate = 35 - datas.length
        if (datas.length < 35) {
            for (let i = 1; i <= moreDate; i++) {
                let date = new Date();
                date.setMonth(month + 1);
                date.setDate(i);
                let data = new Data({ date: date, disable: true })
                datas.push(data);
            }
        }
        setDatas(datas)
    }

    useEffect(() => {
        setCallender()
    }, [today])

    const [optionBoxPostion, setOptionBoxPostion] = useState({ x: null, y: null })

    const onContextMenu = e => {
        e.preventDefault();
        setOptionBoxPostion({ x: null, y: null })
        setTimeout(() => {
            setOptionBoxPostion({ x: e.clientX, y: e.clientY })
        }, 50);
    }

    const closeOptionBox = () => {
        setOptionBoxPostion({ x: null, y: null })
    }

    const changeYear = year => {
        console.log(today)
        let date = new Date(today.toJSON())
        date.setFullYear(year)
        setToday(date)
    }

    const changeMonth = month => {
        console.log(today)
        let date = new Date(today.toJSON())
        date.setMonth(month - 1)
        setToday(date)
    }


    return (
        <div className={styles.container} onClick={closeOptionBox}>
            <Menu />
            <TodoBox position={optionBoxPostion} />
            <div className={styles.backgroundSun} />
            <div className={styles.content}>
                <div className={styles.today}>
                    <h1 className={styles.year}>{today.getFullYear()}</h1>
                    <h1 className={styles.month}>{monthList[today.getMonth()]}</h1>
                    <h1 className={styles.day}>{today.getDate()}</h1>
                </div>
                <div className={styles.days}>
                    <h2>Sun</h2>
                    <h2>Mon</h2>
                    <h2>Tue</h2>
                    <h2>Wed</h2>
                    <h2>Thu</h2>
                    <h2>Fri</h2>
                    <h2>Sat</h2>
                </div>
                <div className={styles.callender}>
                    {
                        datas.map((data, index) => <DateBlock key={index} todoFunction={{ addTodo, deleteTodo }} onContextMenu={onContextMenu} date={data.date.date} day={data.date.day} disable={data.disable} todos={data.todos} />)
                    }
                </div>
            </div>
        </div>
    )
}
