import React from 'react';

import onlineIcon from '../../../Icons/onlineIcon.png';

import './TextContainer.css';

const TextContainer = ({ users }) => (
    <div>

        {
            users
                ? (
                    <div className="usersChat">
                        {users.map(({ name }) => (
                            <div key={name} className="activeItem">
                                {name}
                                <img alt="Online Icon" src={onlineIcon} />
                            </div>
                        ))}
                    </div>
                )
                : null
        }
    </div>
);

export default TextContainer;