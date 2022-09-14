import React, { Component } from 'react';
import blessed from 'blessed';
import { render } from 'react-blessed';

class App extends Component {
    render() {
        return (
            <blessed-box
                label="react-blessed demo"
                border={{ type: 'line' }}
                style={{ border: { fg: 'cyan' } }}>
                <InnerBox position="left" />
                <InnerBox position="right" />
                <ProgressBar />
                Random text here...
            </blessed-box>
        );
    }
}

class InnerBox extends Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            hey: true
        };

        setInterval(() => {
            this.setState({ hey: !this.state.hey });
        }, 1000);
    }

    render() {
        const position = this.props.position;

        const left = position === 'left' ? '2%' : '53%';

        return (
            <blessed-box
                label={this.state.hey ? 'First step' : 'Second step'}
                ref="box"
                left={left}
                width="45%"
                height="70%"
                top="10%"
                border={{ type: 'line' }}
                style={{ border: { fg: 'green' } }}>
                {this.state.hey ? 'Hey...' : 'Ho...'}
            </blessed-box>
        );
    }
}

class ProgressBar extends Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = { completion: 0 };

        const interval: any = setInterval(() => {
            if (this.state.completion >= 100) return clearInterval(interval);

            this.setState({ completion: this.state.completion + 10 });
        }, 1000);
    }

    render() {
        return (
            <blessed-progressbar
                orientation="horizontal"
                filled={this.state.completion}
                top="80%"
                left="center"
                height="15%"
                width="80%"
                label="progress"
                border={{ type: 'line' }}
                style={{ border: { fg: 'red' }, bar: { bg: 'red' } }}
            />
        );
    }
}

const screen = blessed.screen({
    autoPadding: true,
    smartCSR: true,
    title: 'react-blessed demo app'
});

screen.key(['escape', 'q', 'C-c'], function (ch, key) {
    return process.exit(0);
});

const component = render(<App />, screen);
