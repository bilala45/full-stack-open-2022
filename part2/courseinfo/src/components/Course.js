import React from "react";

// renders the components of a course
const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

// renders course name
const Header = ({ name }) => {
  return <h2>{name}</h2>;
};

// renders parts of the course
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

// renders information about each part
const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

// renders total number of exercises
const Total = ({ parts }) => {
  // sums total number of exercises
  const total = parts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises,
    0
  );

  return <p>Total of {total} exercises</p>;
};

export default Course;
