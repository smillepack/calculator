import { connect } from 'react-redux'
import { determinant } from 'ReduxThings/reduxThing.js'
import  App  from 'ReactThings/app.jsx'

// react-redux
const mapStateToProps = (state) => {
    return {
        text: state.text,
    }
}
const mapDispatchToProps = { determinant }

// react-redux finish
const Container = connect(mapStateToProps, mapDispatchToProps)(App)

export default Container