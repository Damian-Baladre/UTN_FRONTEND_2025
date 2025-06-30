import React from 'react'
import { Link } from 'react-router-dom'

const SidebarChannel = ({ channels }) => {
    return (
        <aside>
            <nav>
                {
                    channels.length > 0
                        ? channels.map((channel) => {
                            return (
                                <React.Fragment key={channel._id} >
                                <Link
                                 
                                    to={`/workspace/${channel.workspace_id}/channels/${channel._id}`}
                                >
                                    {channel.name}
                                    </Link>
                                    <br/>
                                    </React.Fragment>
                            )
                        })
                        : <p>No hay canales </p>
                }
            </nav>
        </aside>
    )
}

export default SidebarChannel