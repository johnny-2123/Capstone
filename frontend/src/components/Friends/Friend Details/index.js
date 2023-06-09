import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchGamesBetweenFriends, fetchFriendDetails, fetchWordsBetweenFriends, fetchDeleteFriendship } from "../../../store/friends";
import GameResults from "../../GameResults";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./FriendDetails.css";

const FriendDetails = ({ sendMessage, sessionUser }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { friendId } = useParams();

    const friend = useSelector((state) => state.friends.currentFriend);

    const games = useSelector((state) => state.friends.gamesBetweenFriends);

    const gamesMapped = games?.map((game) => {
        return <GameResults game={game} sessionUser={sessionUser} key={game.id} sendMessage={sendMessage} />
    });



    const numGamesWon = games?.reduce((acc, game) => {
        let lastRound = game.Round[game?.Round?.length - 1];
        const lastRoundWords = lastRound?.Words;
        if (lastRound?.user1Agrees && lastRound?.user2Agrees) {
            return acc + 1;
        } else if (lastRoundWords && lastRoundWords.length >= 2 && lastRoundWords[0].wordText === lastRoundWords[1].wordText) {
            return acc + 1;
        } else {
            return acc;
        }
    }, 0);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
        ],
    };

    useEffect(() => {
        dispatch(fetchFriendDetails(friendId))
        dispatch(fetchWordsBetweenFriends(friendId))
        dispatch(fetchGamesBetweenFriends(friendId))
            .then((games) => {
            })
            .catch((err) => {
                console.log("error fetching games: ", err)
            });
    }, [dispatch]);

    const handleDeleteFriend = () => {
        dispatch(fetchDeleteFriendship(friendId))
            .then((data) => {
                console.log('data', data);
                history.push('/friends/accepted');
            })
            .catch((err) => {
                console.log('error deleting friendship', err);
            })
    }

    const handleSendGameInvite = (e) => {
        e.stopPropagation();
        sendMessage("send-game-invite", {
            recipient: friend?.username,
            user1Id: friend?.id,
            user2Id: friend?.id,
        });
    };


    return (
        <div className="mainFriendDetailsDiv">
            <div className="friendDetailsTopDiv">
                <div className="friendDetailsTopLeftDiv">
                    <h1>{friend?.username}</h1>
                    <button
                        onClick={handleSendGameInvite}
                        className="friendDetailsButton">New Game</button>
                    <button
                        onClick={handleDeleteFriend}
                        className="friendDetailsButton">Remove Friend</button>
                </div>
                <div className="friendDetailsTopRightDiv">
                    <h2>Games Played: {games?.length}</h2>
                    <h2>Games Won: {numGamesWon}</h2>
                </div>
            </div>
            <h2 className="pastGamesTitle">Past Games</h2>
            <Slider className="gamesForFriendSlider"  {...settings}>{gamesMapped}</Slider>
        </div>
    )

}

export default FriendDetails;
