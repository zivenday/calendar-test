import React, { MouseEventHandler } from 'react'

import './index.css'
import useMergeController, { DataProps } from '../../hooks/useMergeController'
export default function Index(props: DataProps<Date>) {
  const { value, setStateValue } = useMergeController<Date>(new Date(), props)
  console.log('0000', value.toLocaleDateString())
  const handlePre = () => {
    const y = value?.getFullYear()
    const m = value?.getMonth()
    const d = value?.getDate()
    setStateValue(new Date(y, m - 1, d))
  }
  const handleAfter = () => {
    const y = value?.getFullYear()
    const m = value?.getMonth()
    const d = value?.getDate()
    setStateValue(new Date(y, m + 1, d))
  }

  const toChinese = (value: Date) => {
    const y = value?.getFullYear()
    const m = value?.getMonth()
    return `${y}年${m + 1}月`
  }

  const isSameDate = (num: number) => value.getDate() === num
  const isSameDay = (num: number) => {
    return isSameDate(num)
  }

  const daysOfMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const firstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const handleDayClick: MouseEventHandler = (e) => {
    const target = e.target as any
    console.log(new Date(value.getFullYear(), value.getMonth(), target?.tabIndex).toLocaleDateString())
    setStateValue(new Date(value.getFullYear(), value.getMonth(), target?.tabIndex))
  }

  const renderDates = (date: Date) => {
    console.log('9991', date.toLocaleDateString())
    const days = []

    const daysCount = daysOfMonth(date.getFullYear(), date.getMonth())
    const firstDay = firstDayOfMonth(date.getFullYear(), date.getMonth())

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="empty"></div>)
    }

    for (let i = 1; i <= daysCount; i++) {
      days.push(
        <div key={i} tabIndex={i} className={`day ${isSameDay(i) ? 'today' : ''}`} onClick={handleDayClick}>
          {i}
        </div>
      )
    }

    return days
  }

  return (
    <div>
      <div className="header flex justify-between">
        <button onClick={handlePre}>&lt;</button>
        <div>{toChinese(value)}</div>
        <button onClick={handleAfter}>&gt;</button>
      </div>
      <div className="days">
        <div className="dayT">日</div>
        <div className="dayT">一</div>
        <div className="dayT">二</div>
        <div className="dayT">三</div>
        <div className="dayT">四</div>
        <div className="dayT">五</div>
        <div className="dayT">六</div>
        {renderDates(value)}
      </div>
    </div>
  )
}
