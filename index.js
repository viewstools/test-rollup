import App from './App.view'
import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { render } from 'react-dom'

const listOfStuff = [
  {
    label: 'hey',
    color: 'salmon',
  },
  {
    label: 'ho',
    color: 'red',
  },
]

class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isActive: false,
    }

    this.onClick = this.onClick.bind(this)
  }

  onClick() {
    this.setState(prevState => ({
      isActive: !prevState.isActive,
    }))
  }

  render() {
    const { props, state } = this

    return (
      <App
        isActive={state.isActive}
        listOfStuff={listOfStuff}
        onClick={this.onClick}
        time={new Date()}
        text="Click me 👻"
        width={360}
      />
    )
  }
}

render(
  <Router>
    <Route path="/" component={Home} />
  </Router>,
  document.getElementById('root')
)
