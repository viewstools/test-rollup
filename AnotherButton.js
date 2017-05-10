import Button from './Button.view'
import React from 'react'

const AnotherIcon = () => <div style={{ fontSize: 50 }}>😇</div>

export default class AnotherButton extends React.Component {
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
      <Button
        icon={AnotherIcon}
        isActive={state.isActive}
        margin={props.margin}
        onClick={this.onClick}
        text={props.text}
      />
    )
  }
}
