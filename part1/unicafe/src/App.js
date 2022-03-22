import { useState } from "react";

const App = () => {
  // set state variables
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // functions to increment state variables
  // state variables don't need to be passed in because they're global variables (within the scope of App)
  const incrGood = () => setGood(good + 1);
  const incrNeutral = () => setNeutral(neutral + 1);
  const incrBad = () => setBad(bad + 1);

  const sumScore = () => good + neutral + bad;
  const avgScore = () => (good + bad * -1) / sumScore();
  const percent = () => (good / sumScore()) * 100;

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handler={incrGood} />
      <Button text="neutral" handler={incrNeutral} />
      <Button text="bad" handler={incrBad} />
      <h1>statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        sumScore={sumScore()}
        avgScore={avgScore()}
        percent={percent()}
      />
    </div>
  );
};

// accepts reference to function that updates state variable
const Button = ({ text, handler }) => <button onClick={handler}>{text}</button>;

const Statistics = (props) => {
  const { good, neutral, bad, sumScore, avgScore, percent } = props;

  if (sumScore > 0) {
    return (
      <table>
        <tbody>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="all" value={sumScore} />
          <StatisticsLine text="average" value={avgScore} />
          <StatisticsLine text="positive" value={percent} />
        </tbody>
      </table>
    );
  } else {
    return <p>No feedback given</p>;
  }
};

// accepts state variable as prop to display
const StatisticsLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

export default App;
