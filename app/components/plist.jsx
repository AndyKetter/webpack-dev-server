import React from 'react'
import 'whatwg-fetch'

export default class Plist extends React.Component {
    constructor(props) {
        super(props)
        this.state = {"loading":false,"list":[]}
    }
    componentDidMount(){
        this.setState({"firstView": true})
    }
    componentWillReceiveProps(nextProps){
        let keyword = nextProps.keyword
        this.setState({"loading": true, 'firstView': false})
        let url = `https://api.github.com/search/users?q=${keyword}`;
        fetch(url).then(response => response.json())
        .then(data => {this.setState({"loading":false, "list": data.items})})
        .catch(e => console.log("Oops, error", e))
    }
    render(){
        const imgStyle = {
          width: '50px'
        }
        if (this.state.firstView) {
        return (
            <h2>Enter name to search</h2>
            )
        }
        if (this.state.loading) {
            return (
                <h2>Loading result...</h2>
              )
        } else {
            if (this.state.list.length === 0) {
                return (
                  <h2>No result.</h2>
                )
            } else {
                return(
                    <div className="row">
                        {this.state.list.map((people,index)=>{
                          return (
                            <div key={index} className="card col-md-4">
                              <img src={people.avatar_url} style={imgStyle}/>
                              <p className="card-text">
                                {people.login}
                              </p>
                            </div>
                          )
                        })}
                     </div>
                )
            }
        }
    }
}
