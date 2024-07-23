import dayjs from 'dayjs'
import React, { useState } from 'react'
import './test.css'

const daysInMonth = (month: number, year: number): number =>
  dayjs(new Date(year, month - 1)).daysInMonth()
const firstDayOfMonth = (month: number, year: number): number =>
  dayjs(new Date(year, month - 1, 1)).day()

const DateRangePicker: React.FC = () => {
  const [startDate, setStartDate] = useState<number | null>(null)
  const [endDate, setEndDate] = useState<number | null>(null)
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth() + 1)
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear())

  const handleDateClick = (day: number) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day)
      setEndDate(null)
    } else if (startDate && !endDate && day >= startDate) {
      setEndDate(day)
    } else if (startDate && !endDate && day < startDate) {
      setStartDate(day)
    }
  }

  const renderCalendar = (month: number, year: number) => {
    const days = []
    const daysInCurrentMonth = daysInMonth(month, year)
    const startDay = firstDayOfMonth(month, year)

    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className='day' />)
    }

    for (let day = 1; day <= daysInCurrentMonth; day++) {
      const inRange = startDate && endDate && day > startDate && day < endDate
      const selected = day === startDate || day === endDate
      days.push(
        <div
          key={day}
          className={`day ${selected ? 'selected' : ''} ${inRange ? 'in-range' : ''}`}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </div>,
      )
    }

    return days
  }

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentMonth(parseInt(event.target.value, 10))
  }

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentYear(parseInt(event.target.value, 10))
  }

  const yearOptions = Array.from({ length: 21 }, (_, index) => currentYear - 10 + index).map(
    (year) => (
      <option key={year} value={year}>
        {year}
      </option>
    ),
  )

  return (
    <div className='date-picker-wrapper'>
      <div className='calendar-header'>
        <div>{'<'}</div>
        <select value={currentMonth} onChange={handleMonthChange}>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i + 1}>
              {new Date(0, i).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>
        <select value={currentYear} onChange={handleYearChange}>
          {yearOptions}
        </select>
        <div>{'>'}</div>
      </div>
      <div className='calendar-body'>
        <div className='calendar-grid'>
          <div>Su</div>
          <div>Mo</div>
          <div>Tu</div>
          <div>We</div>
          <div>Th</div>
          <div>Fr</div>
          <div>Sa</div>
          {renderCalendar(currentMonth, currentYear)}
        </div>
      </div>
    </div>
  )
}

export default DateRangePicker
