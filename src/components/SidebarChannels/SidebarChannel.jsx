import React from 'react'
import { Link } from 'react-router-dom'

const SidebarChannel = ({ channels }) => {
    return (
        <aside>
            <nav>
                {
                channels.length > 0
                ?channels.map((channel) => {
                    return (
                        <Link
                            key={channel._id}
                            to={`/workspace/${channel.workspace_id}/channel/${channel._id}`}
                        >
                            {channel.name}</Link>
                    )
                })
                : <p>No hay canales </p>
                }
            </nav>
        </aside>

    )
}

export default SidebarChannel