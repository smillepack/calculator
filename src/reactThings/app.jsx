import React from 'react'
import style from 'Style/style.css'

class App extends React.Component {
    constructor(props) {
        super(props)

        this._str = '0123456789()*/-+=.'
        this._str2 = "Backspace"
        this._buttons

        this.click = this.click.bind(this)
        this.someFunc = this.someFunc.bind(this)
    }

    someFunc(e) {
        if (this._str.includes(e.key) || /^Backspace$/.test(e.key)) {
            if (e.key == 'Backspace') {
                this.props.determinant('DEL')

                this._buttons.forEach(el => {
                    if (el.innerHTML == 'DEL') {
                        el.style.border = '1px solid black'
    
                        setTimeout(() => el.style.border = '1px solid white', 500)
                    }
                })
            } else {
                this.props.determinant(e.key)
            }

            this._buttons.forEach(el => {
                if (el.innerHTML == e.key) {
                    el.style.border = '1px solid black'

                    setTimeout(() => el.style.border = '1px solid white', 500)
                }
            })
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.someFunc)

        this._buttons = document.querySelectorAll('button')
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.someFunc)
    }

    click(e) {
        if (!e.target.closest('button')) return ;
        
        this.props.determinant(e.target.innerHTML)
    }

    render() {
        return (
            <div className={'container'}>
                <div className={'output'}>
                    <div>{this.props.text}</div>
                </div>
        
                <div onClick={this.click} className={'actions'}>
                    <button>(</button>
                    <button>)</button>
                    <button>AC</button>
                    <button>DEL</button>

                    <button>7</button>
                    <button>8</button>
                    <button>9</button>
                    <button>/</button>

                    <button>4</button>
                    <button>5</button>
                    <button>6</button>
                    <button>*</button>

                    <button>1</button>
                    <button>2</button>
                    <button>3</button>
                    <button>+</button>

                    <button>0</button>
                    <button>.</button>
                    <button>=</button>
                    <button>-</button>
                </div>                
            </div>
        )
    }
}
import PropTypes from 'prop-types'

App.propTypes = {
    text: PropTypes.string.isRequired,
    determinant: PropTypes.func.isRequired
}

export default App