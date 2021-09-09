import React, { useCallback, useEffect, useRef, useState } from 'react'
import styles from './index.module.css'
import DateBlock from 'components/DateBlock'
import Menu from 'components/Menu'

export default function index() {
    const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const lastDayOfMonthList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    const [today, setToday] = useState(new Date())
    const [dates, setDates] = useState([])

    const setCallender = () => {
        console.log(today + " dd")
        const year = today.getFullYear()
        const month = today.getMonth()
        const date = today.getDate()
        const dates = []
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
                date.disable = true;
                dates.push(date)
            }
        }
        for (let i = 1; (i <= lastDayOfMonthList[month]) && (i <= 35); i++) {
            let date = new Date();
            date.setDate(i)
            date.disable = false
            dates.push(date)
        }
        let moreDate = 35 - dates.length
        if (dates.length < 35) {
            for (let i = 1; i <= moreDate; i++) {
                let date = new Date();
                date.setMonth(month + 1);
                date.setDate(i);
                date.disable = true;
                dates.push(date);
            }
        }
        setDates(dates)
    }

    useEffect(() => {
        setCallender()
    }, [today])

    const changeYear = year => {
        console.log(today)
        let date = new Date(today.toJSON())
        date.setFullYear(year)
        // console.log(date)
        setToday(date)
    }

    const changeMonth = month => {
        console.log(today)
        let date = new Date(today.toJSON())
        date.setMonth(month - 1)
        // console.log(date)
        setToday(date)
    }

    useEffect(() => {
        //     fetch('http://192.168.43.91:3000/api/hello')
        //         .then(res => res.json())
        //         .then(item => console.log(item))

    }, [])

    return (
        <div className={styles.container}>
            <Menu />
            <div className={styles.today}>
                <h1 className={styles.year}>{today.getFullYear()}</h1>
                <h1 className={styles.month}>{monthList[today.getMonth()]}</h1>
                <h1 className={styles.day}>{today.getDate()}</h1>
            </div>
            {/* <div className={styles.days}>
                <h2>Sun</h2>
                <h2>Mon</h2>
                <h2>Tue</h2>
                <h2>Wed</h2>
                <h2>Thu</h2>
                <h2>Fri</h2> 
                <h2>Sat</h2>
            </div> */}
            <div className={styles.callender}>

                {
                    dates.map(date => <DateBlock date={date.getDate()} day={date.getDay()} disable={date.disable} todos={["밥묵자", "놀자", "머하냐", "숙제하자"]} />)
                }
            </div>
            <div className={styles.backgroundSun} />
        </div>
    )
}
