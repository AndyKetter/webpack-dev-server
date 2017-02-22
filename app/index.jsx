import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import '../node_modules/bootstrap/scss/bootstrap.scss'

import Search from './components/search'
import Plist from './components/plist'
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = { "keyword": "" }
        this.refreshKeyword = this.refreshKeyword.bind(this)
    }
    refreshKeyword(name) {
        this.setState({ "keyword": name });
    }
    render() {
        return (
            <div className="container">
                <section className="jumbotron">
                    <h3 className="jumbotron-heading">Search Github Users mohan</h3>
                    <Search sendAction={this.refreshKeyword} />
                </section>
                <Plist keyword={this.state.keyword} />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('_react-content'))
