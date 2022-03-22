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
      <FeedbackButton text="good" handler={incrGood} />
      <FeedbackButton text="neutral" handler={incrNeutral} />
      <FeedbackButton text="bad" handler={incrBad} />
      <h1>statistics</h1>
      <DisplayFeedback text="good" score={good} />
      <DisplayFeedback text="neutral" score={neutral} />
      <DisplayFeedback text="bad" score={bad} />
      <DisplayFeedback text="all" score={sumScore()} />
      <DisplayFeedback text="average" score={avgScore()} />
      <DisplayFeedback text="positive" score={percent()} />
    </div>
  );
};

// accepts reference to function that updates state variable
const FeedbackButton = ({ text, handler }) => (
  <button onClick={handler}>{text}</button>
);

// accepts state variable as prop to display
const DisplayFeedback = ({ text, score }) => (
  <div>
    {text} {score}
  </div>
);

export default App;
