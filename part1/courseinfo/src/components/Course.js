import React from "react";

const Course = ({course}) => {
      
    const Header = ({name}) => <div><h1>{name}</h1></div>

      const Content = ({parts}) => {
        return parts.map(
          part => {
            return(
              <div key={part.exercises}>
                <p key={part.name}>{part.name} {part.exercises}</p>
              </div>
            )
          }
        )
      }

      const Total = ({parts}) => {
        
        const exercises = parts.map(part => part.exercises)
        const total = exercises.reduce((a, b) => a + b)

        return(
          <div>
            <p>
              <b>total of {total} exercises</b>
            </p>
          </div>
        )
      }
      return (
        <div>
        {course.map(n => {
          return(
            <div key={n.parts && n.name}>
              <Header name={n.name} />
              <Content parts={n.parts} />
              <Total parts={n.parts} />
            </div>
          )
        })}
        </div>
      )
  }

  export default Course;