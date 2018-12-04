// @flow
import "./Ticker.css";
import { Machine, actions } from "xstate";
import { interpret } from "xstate/lib/interpreter";
import React from "react";

const getDown = (down: TypeDown) => {
  switch (down) {
    case "first":
      return "second";
    case "second":
      return "third";
    case "third":
      return "fourth";
    case "fourth":
      return "first";
  }
};

const gameMachine = Machine(
  {
    id: "game",
    initial: "first",
    context: {
      yardsRemaining: 10,
      down: "first",
      possession: "team_1"
    },
    states: {
      first: {}
    },
    on: {
      PLAY: {
        actions: ["runPlay"]
      }
    }
  },
  {
    actions: {
      runPlay: actions.assign((context, event) => {
        const newYards = context.yardsRemaining - event.value;
        const possibleYardsRemaining = newYards > 0 ? newYards : 0;
        const isFirstDown = possibleYardsRemaining === 0;

        if (context.down === "fourth" && !isFirstDown) {
          return {
            down: "first",
            yardsRemaining: 10,
            possession: context.possession === "team_1" ? "team_2" : "team_1"
          };
        }

        const down = isFirstDown ? "first" : getDown(context.down);
        const yardsRemaining = isFirstDown ? 10 : possibleYardsRemaining;

        return { down, yardsRemaining };
      })
    }
  }
);

const downStateToView = {
  first: "1st",
  second: "2nd",
  third: "3rd",
  fourth: "4th"
};

const possessionStateToView = {
  team_1: "Cowboys",
  team_2: "Seahawks"
};

type TypeDown = "first" | "second" | "third" | "fourth";

type TypeState = {
  current: any,
  down: TypeDown,
  yardsRemaining: number,
  possession: "team_1" | "team_2",
  inputYards: number
};

export default class Ticker extends React.Component<{}, TypeState> {
  state = {
    current: gameMachine.initialState,
    down: "first",
    yardsRemaining: gameMachine.initialState.context,
    possession: "team_1",
    inputYards: Math.ceil(Math.random() * 10)
  };

  service = interpret(gameMachine).onTransition(state => {
    console.log(state.value, state.context);
    this.setState({
      current: state.value,
      ...state.context
    });
  });

  componentDidMount() {
    this.service.start();
  }

  componentWillUnmount() {
    this.service.stop();
  }

  recordPlay = () => {
    this.service.send({ type: "PLAY", value: this.state.inputYards });
    this.setState({ inputYards: Math.ceil(Math.random() * 10) });
  };

  render() {
    return (
      <div className="ticker">
        <Team
          name={possessionStateToView["team_1"]}
          hasPossession={this.state.possession === "team_1"}
        />
        <Team
          name={possessionStateToView["team_2"]}
          hasPossession={this.state.possession === "team_2"}
        />
        <DownInfo
          down={downStateToView[this.state.down]}
          yardsRemaining={this.state.yardsRemaining}
        />
        <div>
          <input
            type="number"
            value={this.state.inputYards}
            onChange={event =>
              this.setState({ inputYards: event.target.value })
            }
          />
          <button onClick={this.recordPlay}>Record Play</button>
        </div>
      </div>
    );
  }
}

const Team = ({
  name,
  hasPossession
}: {
  name: string,
  hasPossession: boolean
}) => (
  <div className={`team ${hasPossession ? "team--hasPossession" : ""}`}>
    <p className="team__name">{name}</p>
    <div className="team__score">0</div>
    <div>
      <div />
      <div />
      <div />
    </div>
  </div>
);

const DownInfo = ({
  down,
  yardsRemaining
}: {
  down: TypeDown,
  yardsRemaining: number
}) => <div className="ticker__down">{`${down} & ${yardsRemaining}`}</div>;
