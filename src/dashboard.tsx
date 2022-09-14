import React, { Component } from 'react';
import blessed from 'blessed';
import { render } from 'react-blessed';

/**
 * Stylesheet
 */
const stylesheet = {
  bordered: {
    border: {
      type: 'line'
    },
    style: {
      border: {
        fg: 'blue'
      }
    }
  }
};

/**
 * Top level component.
 */
class Dashboard extends Component {
  render() {
    return (
      <blessed-element>
        <Log />
        <Request />
        <Response />
        <Jobs />
        <Progress />
        <Stats />
      </blessed-element>
    );
  }
}

/**
 * Log component.
 */
class Log extends Component {
  render() {
    return (
      <blessed-box
        label="Log"
        class={stylesheet.bordered as any}
        width="60%"
        height="70%"
        draggable={true}>
        {'Hello World'}
      </blessed-box>
    );
  }
}

/**
 * Request component.
 */
class Request extends Component {
  render() {
    return (
      <blessed-box label="Request" class={stylesheet.bordered as any} top="70%" width="30%">
        {0}
      </blessed-box>
    );
  }
}

/**
 * Response component.
 */
class Response extends Component {
  render() {
    return (
      <blessed-box
        label="Response"
        class={stylesheet.bordered as any}
        top="70%"
        left="30%"
        width="30%"
      />
    );
  }
}

/**
 * Jobs component.
 */
class Jobs extends Component {
  render() {
    return (
      <blessed-box
        label="Jobs"
        class={stylesheet.bordered as any}
        left="60%"
        width="40%"
        height="60%"
      />
    );
  }
}

/**
 * Progress component.
 */
class Progress extends Component<any, any>{
  constructor(props: any) {
    super(props);

    this.state = { progress: 0, color: 'blue' };

    const interval: any = setInterval(() => {
      if (this.state.progress >= 100) return clearInterval(interval);

      this.setState({ progress: this.state.progress + 1 });
    }, 50);
  }

  render() {
    const { progress } = this.state,
      label = `Progress - ${progress}%`;

    return (
      <blessed-progressbar
        label={label}
        onComplete={() => this.setState({ color: 'green' })}
        class={stylesheet.bordered as any}
        filled={progress}
        top="60%"
        left="60%"
        width="40%"
        height="10%"
        style={{ bar: { bg: this.state.color } }}
      />
    );
  }
}

/**
 * Stats component.
 */
class Stats extends Component {
  render() {
    return (
      <blessed-box
        label="Stats"
        class={stylesheet.bordered as any}
        top="70%"
        left="60%"
        width="40%"
        height="31%">
        Some stats
      </blessed-box>
    );
  }
}

/**
 * Rendering the screen.
 */
const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: 'react-blessed dashboard'
});

screen.key(['escape', 'q', 'C-c'], function (ch, key) {
  return process.exit(0);
});

render(<Dashboard />, screen);