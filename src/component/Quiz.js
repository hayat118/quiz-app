import React from "react";
import { NavLink, Link } from "react-router-dom";
import { withRouter } from "../utils/withRouter";

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      index: 0,
      score: 0,
      showscore: false,
      isAnswered: false,
      correctAnswer: 0,
      incorrectAnswer: 0,
      random_number: Math.floor(Math.random() * 4),
    };
  }

  componentDidMount() {
    console.log(localStorage);

    // index update

    var currentQuestionIndex = JSON.parse(
      localStorage.getItem("currentQuestionIndex")
    );

    this.setState({ index: currentQuestionIndex || 0 });

    if (currentQuestionIndex !== 0) {
      var score = JSON.parse(localStorage.getItem("scoreObject"));
      this.setState({ ...score });
    }

    let search = this.props.router.location.search;
    fetch(`https://opentdb.com/api.php?amount=10&${search}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ data });
      });
  }

  handleNext = () => {
    let data = this.state.data;
    this.setState({
      isAnswered: false,
    });
    if (this.state.index < data.results.length - 1) {
      localStorage.setItem("currentQuestionIndex", this.state.index + 1);
      localStorage.setItem(
        "scoreObject",
        JSON.stringify({
          score: this.state.score,
          index: this.state.index + 1,
          correctAnswer: this.state.correctAnswer,
          incorrectAnswer: this.state.incorrectAnswer,
        })
      );
      this.setState({
        index: this.state.index + 1,
        random_number: Math.floor(Math.random() * 4),
      });
    }
  };

  handleClick = (result) => {
    this.setState({ isAnswered: true });

    let data = this.state.data;
    let correct = data.results[this.state.index];

    if (result === correct.correct_answer && this.state.index <= 9) {
      this.setState({
        score: this.state.score + 1,
        correctAnswer: this.state.correctAnswer + 1,
      });
    } else {
      this.setState({
        incorrectAnswer: this.state.incorrectAnswer + 1,
      });
    }
  };

  render() {
    let data = this.state.data;

    if (!this.state.data) {
      return <h2>Fetching</h2>;
    }

    if (this.state.showscore) {
      return (
        <>
          <div>
            <div className="score-box">
              <h3 className="score-top">Your Score is:{this.state.score}</h3>
              <hr />
              <h3>Correct Answer:{this.state.correctAnswer}</h3>
              <br />
              <h3>Incorrect Answer:{this.state.incorrectAnswer}</h3>
              <br />
            </div>
          </div>
          <div className="btn">
            <button>
              <Link to="/">Start Again</Link>
            </button>
          </div>
        </>
      );
    }

    var incorrect_answers = data.results[this.state.index].incorrect_answers;
    var random_number = this.state.random_number;

    return (
      <div className="box">
        <div>
          <div>
            <h2 className="score-top">Score:{this.state.score}</h2>
            <h2>Question:{this.state.index + 1}/10</h2>
          </div>
          <div>
            <h3 className="question">
              <span>Question{this.state.index + 1}</span>
              <br />
              <hr />
              {data.results[this.state.index].question}
            </h3>
            <ul>
              {incorrect_answers
                .slice(0, random_number)
                .concat(data.results[this.state.index].correct_answer)
                .concat(incorrect_answers.slice(random_number))
                .map((result, i) => {
                  return (
                    <li
                      key={i}
                      onClick={() => this.handleClick(result)}
                      className={`${
                        this.state.isAnswered ? "disable" : ""
                      } answer`}
                    >
                      {result}
                    </li>
                  );
                })}
            </ul>
            {this.state.index <= data.results.length - 2 ? (
              <NavLink className="next" to="" onClick={this.handleNext}>
                Next Question
              </NavLink>
            ) : (
              <button
                className="next"
                onClick={() => {
                  this.setState({
                    showscore: true,
                  });
                  localStorage.setItem("currentQuestionIndex", 0);
                  localStorage.setItem(
                    "scoreObject",
                    JSON.stringify({
                      score: 0,
                      index: 0,
                      correctAnswer: 0,
                      incorrectAnswer: 0,
                    })
                  );
                }}
              >
                Results
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Quiz);
