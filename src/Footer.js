import React, { Component } from 'react'
import firebase from 'firebase'


class Footer extends Component {


    render() {
        return (
            <div>
                <h3>show task :</h3>
                <button className={'button'}>Waiting</button>
                <button className={'button'}>in progres</button>
                <button className={'button'}>done</button>
                <button className={'button'}>all</button>

            </div>

        )
    }

}
export default Footer