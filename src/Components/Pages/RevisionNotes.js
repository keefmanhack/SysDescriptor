import React from 'react'

export default function RevisionNotes() {
    return (
        <div style={{padding: '0 10px'}}>
            <h1>Release Notes</h1>
            <a href='/'>Back</a>
            <hr/>

            <h4>0.2.1 - Jan. 19th. 2022</h4>
            <p>Author: Keefer Gregoire</p>
            <ul>
                <li>
                    Added password reset feature using FireBase password reset UI
                </li>
                <li>
                    Component names were updated from indexes to the hardware serial numbers for each component
                </li>
                <li>
                    ADU and Decel were moved to General tab instead of having seperate definitions in ACSES and ATC tabs
                </li>
                <li>
                    Added functionality to update Systems
                </li>
                <li>
                    Added functionality to delete revisions
                </li>
                <li>
                    Added serial number inputs to hardware section for every component
                </li>
                <li>
                    Added confirmation modals when attempting to delete revisions and systems
                </li>
            </ul>

        </div>
    )
}
