const Header = (props) => {
  return(
    <h1>
      {props.course}
    </h1>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      <Part str={`${props.p1} ${props.ex1}`} />
      <Part str={`${props.p2} ${props.ex2}`} />
      <Part str={`${props.p3} ${props.ex3}`} />
    </div>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.str}
    </p>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.ex1 + props.ex2 + props.ex3}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <>
      <Header course={course} />
      <Content p1={part1} ex1={exercises1}  p2={part2} ex2={exercises2} p3={part3} ex3={exercises3}/>
      <Total ex1={exercises1} ex2={exercises2} ex3={exercises3}/>
    </>
  )
}

export default App
