import React from 'react'

export default function RevisionNotes() {
    return (
        <div style={{padding: '0 10px'}}>
            <h1>Release Notes</h1>
            <a href='/'>Back</a>
            <hr/>

            <div>
                <h4>0.2.5 - May. 18th. 2022</h4>
                <p>Author: Keefer Gregoire</p>
                <ul>
                    <li>
                        Cleaned up the generated file.  Expanded the width table and reformatted the header.
                    </li>
                    <li>
                        Updated Generate File button to be disabled while a file is being generated so the user does not spam the button waiting for file to be generated.
                    </li>
                </ul>
            </div>    

            <div>
                <h4>0.2.4 - May. 12th. 2022</h4>
                <p>Author: Keefer Gregoire</p>
                <ul>
                    <li>
                        Added Cutout Panel to General.
                    </li>
                    <li>
                        Fixed bug on print-out where Software and Hardware data was flipped.
                    </li>
                    <li>
                        Updated signoff on the printout to include a section to print and sign names.
                    </li>
                </ul>
            </div>

            <div>
                <h4>0.2.3 - May. 9th. 2022</h4>
                <p>Author: Keefer Gregoire</p>
                <ul>
                    <li>
                        Updated Generate File functionality so that 1) The word document font is set to black by default 2) Added a 
                        sign off line for Technician and Tester.
                    </li>
                    <li>
                        Added new components to General: Remote Speed Sensor Module Assembly, ALC42 Comms Controller, ATC Interconnect Board, ACSES Interconnect Board,
                        12V Powersupply, and 32V Powersupply
                    </li>
                </ul>
            </div>

            <div>
                <h4>0.2.2 - Jan. 25th. 2022</h4>
                <p>Author: Keefer Gregoire</p>
                <ul>
                    <li>
                        Added functionality to move revisions from system to system
                    </li>
                    <li>
                        Added functionality to duplicate revisions.  This combined with the move functionality will allow any revision definition to be migrated to any existing system
                    </li>
                    <li>
                        Fixed a few bugs left over from deleting systems/revisions in which the RevisionEditor screen would continue to display the data of the deleted revision.
                    </li>
                </ul>
            </div>

            <div>
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
        </div>
    )
}
