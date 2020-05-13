import React from 'react'
import { Provider } from 'react-redux'
import { store } from './reduxThings/reduxThing.js'

import Container from './reactReduxThings/reactRedusThing.js'

class SomeThing extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Container />
            </Provider>
        )
    }
}

export default SomeThing 