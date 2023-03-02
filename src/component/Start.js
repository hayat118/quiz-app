import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/index.css";
import { withRouter } from "../utils/withRouter";

class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      quiz: "",
      difficulty: "easy",
      category: "11",
    };
  }

  componentDidMount() {
    fetch(`https://opentdb.com/api_category.php`)
      .then((res) => res.json())
      .then((data) => this.setState({ data }));
  }

  handleCategory = (event) => {
    console.log(event.target.value, "cat");

    this.setState({
      category: event.target.value,
    });
  };

  handleDifficulty = (e) => {
    console.log(e.target.value, "dif");
    this.setState({
      difficulty: e.target.value,
    });
  };

  render() {
    if (!this.state.data) {
      return <h2>Loading...</h2>;
    }
    return (
      <>
        <div className="box">
          <section className="start-box">
            <h1>Quiz App</h1>
            <div>
              <label className="label" htmlFor="category">
                Choose Category :
              </label>
              <select
                onChange={this.handleCategory}
                name="category"
                id="category"
              >
                {this.state.data.trivia_categories.map((category, i) => {
                  return (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label htmlFor="difficulty">Choose Difficulty:</label>
              <select
                onChange={this.handleDifficulty}
                name="difficulty"
                id="difficulty"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div>
              <NavLink
                className="start"
                to={`/quiz?difficulty=${this.state.difficulty}&category=${this.state.category}`}
              >
                START
              </NavLink>
            </div>
          </section>
        </div>
      </>
    );
  }
}

export default withRouter(Start);
