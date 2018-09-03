import React from "react";
import classNames from "classnames";
import {formatDate} from "./dateUtils";


const Calendar = ({tasks}) => {
  const start = new Date();
  start.setDate(1);
  
  while(start.getDay() !== 0){
    start.setDate(start.getDate() - 1);
  }
  
  const generateBody = () => {
    const currMonth = new Date();
    const currDayNum = currMonth.getDate();
    currMonth.setDate(1);
    currMonth.setMonth(currMonth.getMonth() + 1);
    currMonth.setDate(0);
    
    const daysInMonth = currMonth.getDate();
    const currMonthNum = currMonth.getMonth();
    let done = false;
    let first = true;
    const rows = [];
    
    const generateDates = () => {
      const dates = [];
      while(dates.length < 7){
        if(!first && start.getDate() === daysInMonth){
          done = true;
        }
        
        dates.push({
          date: start.getDate(),
          currMonth: start.getMonth() == currMonthNum,
          today: start.getMonth() == currMonthNum && start.getDate() === currDayNum,
          numTasks: countDate(formatDate(start))
        });
        start.setDate(start.getDate() + 1);
      }
      first = false;
      return dates;
    }
  const countDate = (date) => {
    return tasks.filter((data) => data.date === date).length;
  }
    
    while(!done){
      rows.push(
        <tr key={"row-" + start.getDate()}>
        {
          generateDates().map(({date, currMonth, today, numTasks}) => {
            const backgroundColor = ["#fff", "#fdd", "#fcc", "#fbb", "#faa", "#f99", "#f88"][Math.min(numTasks, 7)];
            return <td key={date} className={classNames({
              "current-month": currMonth,
              "today": today
            })}
            style={{backgroundColor}}>{date}</td>
          })
        }
        </tr>
      );
    }
    return rows;
  }
  
  return (
  <table id="calendar">
    <thead>
      <tr>
      {
        ["Sat", "Mon", "Tue", "Wed", "Thu", "Fri", "Sun"].map((name) => <th key={name}>{name}</th>)
      }
      </tr>
    </thead>
    <tbody>
    {
      generateBody()
    }
    </tbody>
  </table>
  );
}


export default Calendar;