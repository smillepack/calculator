import { createStore } from 'redux'

// const
const 
    AC = 'AC',
    DEL = 'DEL',
    ACTION = 'ACTION'

//Action
const determinant = (action) => { 
    return  { type: ACTION, value: action } 
}

// reducer 
function calc(state = { text: '', allClear: false, countOpenLeftBracket: 0 }, action) {
    let returnObj = { ...state }

    //for eqally 
    if (returnObj.allClear && action.value !== '=') {
        returnObj.allClear = false
        returnObj.text = ''
    }

    switch(action.type) {
        case ACTION:
            switch(action.value) {
                case AC:
                    return {
                        ...returnObj,
                        text: ''
                    }
                case DEL:
                    return {
                        ...returnObj,
                        text: returnObj.text.slice(0, returnObj.text.length - 1)
                    }
                case '=':
                    if ( (/\d|\)/.test(returnObj.text[returnObj.text.length - 1])) && !returnObj.countOpenLeftBracket ) {
                        return {
                            ...returnObj,
                            allClear: true,
                            text:  eval(returnObj.text) + '='
                        }
                    } else if ((/\d|\)/.test(returnObj.text[returnObj.text.length - 2])) && !returnObj.countOpenLeftBracket) {
                        return {
                            ...returnObj,
                            allClear: true,
                            text:  eval(returnObj.text.slice(0, returnObj.text.length - 1)) + '='
                        }
                    }
                    
                case '(':
                    if ( !/\d$/.test(returnObj.text) && action.value === '(' ){
                        console.log('here (')
                        return {
                            ...returnObj,
                            countOpenLeftBracket : returnObj.countOpenLeftBracket + 1,
                            text: returnObj.text + '('                        
                        }
                    } else {
                        return returnObj
                    }
                case ')': 
                    if (returnObj.countOpenLeftBracket  && /\d$/.test(returnObj.text)) {
                        return {
                            ...returnObj,
                            countOpenLeftBracket: returnObj.countOpenLeftBracket - 1,
                            text: returnObj.text + ')'
                        }
                    } else {
                        return returnObj
                    }
                case '/':
                    if (/(\d|\))$/.test(returnObj.text)) {
                        return {
                            ...returnObj,
                            text: returnObj.text + '/'
                        }
                    } else if (/\d|\)/.test(returnObj.text[returnObj.text.length - 2])) {
                        return {
                            ...returnObj,
                            text: returnObj.text.slice(0, returnObj.text.length - 1) + '/'
                        }
                    }
                case '*':
                    if (/(\d|\))$/.test(returnObj.text)) {
                        return {
                            ...returnObj,
                            text: returnObj.text + '*'
                        }
                    } else if (/\d|\)/.test(returnObj.text[returnObj.text.length - 2])) {
                        return {
                            ...returnObj,
                            text: returnObj.text.slice(0, returnObj.text.length - 1) + '*'
                        }
                    }
                case '+':
                    if (/(\d|\))$/.test(returnObj.text)) {
                        return {
                            ...returnObj,
                            text: returnObj.text + '+'
                        }
                    } else if (/\d|\)/.test(returnObj.text[returnObj.text.length - 2])) {
                        return {
                            ...returnObj,
                            text: returnObj.text.slice(0, returnObj.text.length - 1) + '+'
                        }
                    }
                case '-': 
                    if (!returnObj.text.length || /(\(|\)|\d)$/.test(returnObj.text)) {
                        return {
                            ...returnObj,
                            text: returnObj.text + '-'
                        }
                    }  else if (/(\(|\)|\d)$/.test(returnObj.text[returnObj.text.length - 2])) {
                        return {
                            ...returnObj,
                            text: returnObj.text.slice(0, returnObj.text.length - 1) + '-'
                        }
                    }
                case '.':
                    if (/((\+|\*|\/)\d+)|(^\d+)$/.test(returnObj.text)) {
                        return {
                            ...returnObj,
                            text: returnObj.text + '.'
                        }
                    } else {
                        return returnObj
                    }
                default:            

                    return {
                        ...returnObj,
                        text: returnObj.text + action.value
                    }
            }
        default:
            return returnObj
    }
}

//store 
const store = createStore(calc, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export { store, determinant }