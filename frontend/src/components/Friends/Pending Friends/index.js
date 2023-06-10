import React from "react";
import { useHistory } from "react-router-dom";
import AcceptedFriendItem from '../Accepted Friends/Accepted Friend Item';
import "./PendingFriends.css";


const PendingFriends = ({ friends, sessionUser }) => {
    const history = useHistory();

    const handleFriendItemClick = (friendId) => {
        history.push(`/friends/${friendId}`);
    };


    const pendingFriendRequestsReceived = friends?.filter((friend) => friend.status === "pending" && friend.friendId === sessionUser?.id);

    const pendingFriendRequestsReceivedMapped = pendingFriendRequestsReceived?.map((friend) => {
        return <AcceptedFriendItem friend={friend} sessionUser={sessionUser} handleFriendItemClick={handleFriendItemClick} />
    });

    return (
        <div className="friendsContainer">
            {pendingFriendRequestsReceivedMapped}
        </div>)
};

export default PendingFriends;
