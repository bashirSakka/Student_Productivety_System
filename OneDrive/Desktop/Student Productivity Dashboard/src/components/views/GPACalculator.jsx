

import { useState } from 'react'
export default function GPACalculator() {
const john = [
  { class: "Math", grade: "A", credits: 4 },
  { class: "English", grade: "B", credits: 3 },
  { class: "Physics", grade: "C", credits: 4 },
  { class: "History", grade: "A", credits: 3 },
  { class: "Computer Science", grade: "B", credits: 3 }
]

const letterGrades = [
  { name: "A", points: 4 },
  { name: "B", points: 3 },
  { name: "C", points: 2 },
  { name: "D", points: 1 },
  { name: "F", points: 0 }
]
let summation=0;
let credits=0;
    john.forEach((course) => {
  const grade = letterGrades.find((g) => g.name === course.grade)
  summation += grade.points * course.credits
  credits += course.credits
})
return(

  <h1>GPA: {(summation/credits).toFixed(2)}</h1>
)



}