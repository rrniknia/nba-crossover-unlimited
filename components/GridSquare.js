import { Card } from "react-bootstrap"
import { useEffect, useState } from "react";
import { Modal, FormControl, Button } from "react-bootstrap";
import styles from '/styles/GridSquare.module.css'
import { allPlayers } from '@/players/all_players'

export default function GridSquare(props) {
    const [showModal, setShowModal] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [playerImage, setPlayerImage] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [team1, setTeam1] = useState([]);
    const [team2, setTeam2] = useState([]);

    useEffect(() => {
        if (props.clear) {
            setSelectedPlayer(null)
            setPlayerImage(null);
            setDisabled(false);
        }

        if (props.team1 && props.team2) {
            // load team data from the proper .JSON file
            const getTeamData = async () => {
                try {
                    const team1data = await import(`@/players/${props.team1}.json`);
                    const team2data = await import(`@/players/${props.team2}.json`);

                    setTeam1(Object.values(team1data.default));     // need to convert from JSON data to array
                    setTeam2(Object.values(team2data.default));
                } catch (e) {
                    console.error(e);
                }
            }

            getTeamData();
        }

        console.log(`Gridsquare ${props.id} has teams ${props.team1} and ${props.team2}`);

    }, [props.clear, props.team1, props.team2, props.id])


    // modal functionality
    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSearchResults([]);   // so the previous search's results dont show up when the card is clicked again - in case of a wrong answer
    };

    const handleSearch = (e) => {
        const searchTerm = e.target.value       // regex filtering to remove periods
            .toLowerCase()
            .replace(/\./g, '')
            .trim()
            .split('')
            .join('.?');

        const regex = new RegExp(searchTerm, 'i');
        const results = allPlayers.filter((player) => {     // filter results so they return names with periods, eg. "PJ" -> "P.J."
            return regex.test(player);
        });

        setSearchResults(results.slice(0, 15));     // only show the first 15 results - improves performance
    };

    const handlePlayerSelect = (selectedOption) => {
        if (!props.usedPlayers.includes(selectedOption.target.value)) {     // check for duplicates first
            console.log(props.usedPlayers);
            // find the indexes of the selectedOption in both team1 and team2
            const isInTeam1 = team1.findIndex((player) => player.Player === selectedOption.target.value);
            const isInTeam2 = team2.findIndex((player) => player.Player === selectedOption.target.value);

            // this means the player is valid
            if (isInTeam1 > -1 && isInTeam2 > -1) {
                setSelectedPlayer(selectedOption.target.value);
                setPlayerImage(team1[isInTeam1].ImageURL);
                props.addPlayerToAnswerArr(selectedOption.target.value);
                setDisabled(true);
                console.log(`GridSquare ${props.id} is now disabled`);
            }
        }
        handleCloseModal();
    }

    return (
        <>
            <Card
                className={`${styles['grid-square']} 
                border-dark rounded
            ${disabled ? 'bg-success' : ''}`}
                onClick={!disabled ? handleOpenModal : undefined}>
                {playerImage &&
                    <Card.Img
                        src={`https://www.basketball-reference.com/req/202106291/images/headshots/${playerImage}.jpg`}
                        variant="top"
                        style={{ width: '100%', height: '70%', objectFit: 'scale-down' }}
                    />
                }
                <Card.Body style={{ fontSize: '14px' }} className='d-flex justify-content-center align-items-center text-center'>
                    {selectedPlayer}
                </Card.Body>
            </Card >
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Search Players</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormControl
                        type="search"
                        placeholder="Enter a player name..."
                        onChange={handleSearch}
                    />
                    <span id="searchResults">
                        <br />
                        {searchResults.map((player, index) => (
                            <Button
                                variant="light"
                                key={index}
                                onClick={() => handlePlayerSelect({ target: { value: player } })}
                                className={`${styles['player-span']} w-100 d-block`}
                                disabled={props.usedPlayers.includes(player)}
                            >
                                {player}
                            </Button>
                        ))}
                    </span>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}