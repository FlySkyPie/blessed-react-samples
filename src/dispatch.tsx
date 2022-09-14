import React, { useReducer } from 'react';
import blessed from 'blessed';
import { render } from 'react-blessed';

const initialState = { count: 0 };

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

const App: React.FC = () => {
  const [demo, dispatch] = useReducer(reducer, initialState);
  return (
    <blessed-box
      label="react-blessed hooks demo"
      border={{ type: 'line' }}
      style={{ border: { fg: 'cyan' } }}>
      {demo.count}

      <blessed-button
        mouse
        border={{ type: 'line' }}
        height={3}
        width={3}
        top={2}
        left={4}
        {
        ...{
          onPress: (a: any) => dispatch({ type: 'increment' })
        }
        }>
        +
      </blessed-button>
      <blessed-button
        mouse
        border={{ type: 'line' }}
        height={3}
        width={3}
        top={2}
        {
        ...{
          onPress: (a: any) => dispatch({ type: 'decrement' })
        }
        }>
        -
      </blessed-button>
    </blessed-box>
  );
};

const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: 'react-blessed hooks demo'
});

screen.key(['escape', 'q', 'C-c'], function (ch, key) {
  return process.exit(0);
});

render(<App />, screen);