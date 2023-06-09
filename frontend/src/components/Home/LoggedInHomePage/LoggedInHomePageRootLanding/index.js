import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { updateGame, fetchSingleMostRecentGame } from "../../../../store/game";
import { fetchGetTopFriends } from "../../../../store/friends";
import LastGame from "./Last Game";
import TopFriends from "./Top Friends";
import './LoggedInHomePageRootLanding.css'

const LoggedInHomePageRootLanding = ({ game, sessionUser, sendMessage, friends }) => {
    const dispatch = useDispatch();

    const mostRecentGame = useSelector((state) => state.games?.mostRecentGame);

    const friendUserCurrentGame = game?.user1Id === sessionUser?.id ? game?.user2 : game?.user1;

    const topFriends = useSelector((state) => state.friends?.topFriends);

    const handleEndGame = () => {
        dispatch(updateGame(game?.id, true)).then((updatedGame) => {
            sendMessage("send-game-over-message", {
                gameId: updatedGame?.id,
                user1: updatedGame?.user1?.username,
                user2: updatedGame?.user2?.username,
            });
        });
    };

    useEffect(() => {
        dispatch(fetchSingleMostRecentGame(sessionUser?.id))
            .then((game) => {
            })
            .catch((err) => {
            });
        dispatch(fetchGetTopFriends())
            .then((friends) => {
            })
            .catch((err) => {
            });

    }, [dispatch, sessionUser?.id]);


    return (
        <div className="loggedInHomePageRootLandingDiv">
            <div className="previousOrCurrentGameDiv">
                {game?.gameOver === false && (
                    <div className="currentGameDiv">
                        <h2>In Progress game with {friendUserCurrentGame?.username}</h2>
                        <div className="currentGameButtons">
                            <NavLink to={`/gameplay/${game?.id}`}> Resume Game </NavLink>
                            <button onClick={handleEndGame}>End Game</button>
                        </div>
                    </div>
                )}

                {mostRecentGame?.id && game?.gameOver !== false && (
                    <LastGame mostRecentGame={mostRecentGame} sessionUser={sessionUser} />
                )}
            </div>
            <TopFriends topFriends={topFriends} />
        </div>
    );
};

export default LoggedInHomePageRootLanding;
