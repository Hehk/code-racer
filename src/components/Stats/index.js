import React from 'react';
import './style.css';

class Stats extends React.Component {
  state = { timer: 0 }
  timer = undefined
  interval = 0.25

  componentDidMount() {
    this.timer = setInterval(this.tick, this.interval * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick = () => {
    this.setState({ timer: this.state.timer + this.interval });
  }

  handleOutlier = (val) => {
    if (isNaN(val)) {
      return 0;
    } else {
      return val;
    }
  }

  render() {
    const { timer } = this.state
        , { charactersFinished, errorCount } = this.props
        , cpm = Math.floor(charactersFinished / timer * 60)
        , accuracyRatio = charactersFinished / (charactersFinished + errorCount)
        , formatPerc = (num) => Math.round(num * 10000) / 100;

    return (
      <div className="stats__wrapper">
        <div className="stats__left">
          <div className="stats__cpm">
            CPM: <span className="stats__highlight">{this.handleOutlier(cpm)}</span>
          </div>
          <div className="stats__errRatio">
            ACC: <span className="stats__highlight">{`${formatPerc(this.handleOutlier(accuracyRatio))}%`}</span>
          </div>
        </div>
        <div className="stats__right">
        </div>
      </div>
    );
  }
}

export default Stats;
