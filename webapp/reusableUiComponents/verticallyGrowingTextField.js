import React from 'react'
import './verticallyGrowingTextField.less'

class VerticallyGrowingTextField extends React.Component {

  constructor (props) {
    super(props)
    this.state = {value: null}
  }

  componentDidMount () {
    this.mounted = true

    this.setFilledTextareaHeight()
  }

  setFilledTextareaHeight () {
    if (this.mounted) {
      const element = this.ghost

      this.setState({
        height: element.clientHeight,
      })
    }
  }

  setValue (event) {
    const {value} = event.target

    this.setState({value})
  }

  getExpandableField () {
    const {height, value} = this.state

    return (
      <div>
        <textarea
          className="vgtf__textarea"
          defaultValue={value}
          style={{height}}
          onChange={(evt) => this.setValue(evt)}
          onKeyUp={() => this.setFilledTextareaHeight()}
        />
      </div>
    )
  }

  getGhostField () {
    return (
      <div
        className="vgtf__textarea--ghost"
        ref={(c) => this.ghost = c}
        aria-hidden="true"
      >
        {/*
          Use 'x' as a placeholder to keep ghost field in right height even when
          there's no input or plain newline before any text in new row
         */}
        {this.state.value ? this.state.value.replace(/\n/g, '\nx') : 'x'}
      </div>
    )
  }

  render () {
    return (
      <div className="vgtf__container">
        {this.getExpandableField()}
        {this.getGhostField()}
      </div>
    )
  }
}

export default VerticallyGrowingTextField
