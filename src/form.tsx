import React, { Component } from 'react';
import blessed from 'blessed';
import { render } from 'react-blessed';
import { AnimatedBox } from './components/AnimatedBox';

class Form extends Component<any, any> {
    submit: any;
    cancel: any;
    constructor(props: any) {
        super(props);

        this.state = {
            name: ''
        };

        this.submit = (data: any) => this.setState((state: any) => ({ name: data }));
        this.cancel = () => console.log('Form canceled');
    }
    render() {
        return (
            //@ts-ignore
            <blessed-form
                keys
                vi
                focused
                onSubmit={this.submit}
                onReset={this.cancel}
                left="5%"
                top="5%"
                width="90%"
                height="90%"
                border={{ type: 'line' }}
                style={{ bg: 'cyan', border: { fg: 'blue' } }}>
                <blessed-box width={6} height={3}>
                    Name:{' '}
                </blessed-box>
                <blessed-textbox

                    left={6}
                    height={3}
                    keys
                    mouse
                    inputOnFocus
                    {
                    ...{
                        onSubmit: this.submit
                    }
                    }
                />
                <blessed-box top={3} height={3}>
                    {`Result: ${this.state.name}`}
                </blessed-box>
                <AnimatedBox />
                {/*@ts-ignore/** */}
            </blessed-form>
        );
    }
}

const screen = blessed.screen({
    autoPadding: true,
    // smartCSR: true,
    title: 'react-blessed form example'
});

screen.key(['escape', 'q', 'C-c'], function (ch, key) {
    return process.exit(0);
});

render(<Form />, screen, () => console.log('Rendered Form!'));
