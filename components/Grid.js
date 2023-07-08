import { Container } from 'react-bootstrap'
import GridSquare from '@/components/GridSquare'
import CategorySquare from '@/components/CategorySquare'
import { useState, useEffect } from 'react';

export default function Grid(props) {
    const [clearGridSquares, setClearGridSquares] = useState(false);
    const [usedPlayers, setUsedPlayers] = useState([]);
    const [gameWon, setGameWon] = useState(false);

    // this function will be sent to the GridSquare components and check to see if a player is already in the usedPlayers array,
    // preventing duplicates
    useEffect(() => {
        if (props.clear) {
            setClearGridSquares(true);
            setTimeout(() => {
                setClearGridSquares(false);
            }, 100)
            setUsedPlayers([]);
            setGameWon(false);
        }

        // if usedPlayers has 9 that means the grid is filled, player wins
        if (usedPlayers.length === 9) {
            setGameWon(true);
        }

    }, [props.clear, usedPlayers, props.id]);

    const addPlayer = (newPlayer) => {
        if (!usedPlayers.includes(newPlayer)) {
            setUsedPlayers((usedPlayers) => [...usedPlayers, newPlayer]);
        }
    }

    // render the grid only once teams are populated
    if (props.teams) {
        console.log(props.teams);
        return (
            <>
                <div className='d-flex align-items-center justify-content-center'>
                    <div>
                        <CategorySquare text='LOGO' />
                        <CategorySquare id="row1" team={props.teams[0]} />
                        <CategorySquare id="row2" team={props.teams[1]} />
                        <CategorySquare id="row3" team={props.teams[2]} />
                    </div>
                    <div>
                        <CategorySquare id="col1" team={props.teams[3]} />
                        <GridSquare id={1} clear={clearGridSquares} team1={props.teams[0]} team2={props.teams[3]} usedPlayers={usedPlayers} addPlayerToAnswerArr={addPlayer} />
                        <GridSquare id={2} clear={clearGridSquares} team1={props.teams[1]} team2={props.teams[3]} usedPlayers={usedPlayers} addPlayerToAnswerArr={addPlayer} />
                        <GridSquare id={3} clear={clearGridSquares} team1={props.teams[2]} team2={props.teams[3]} usedPlayers={usedPlayers} addPlayerToAnswerArr={addPlayer} />
                    </div>
                    <div>
                        <CategorySquare id="col2" team={props.teams[4]} />
                        <GridSquare id={4} clear={clearGridSquares} team1={props.teams[0]} team2={props.teams[4]} usedPlayers={usedPlayers} addPlayerToAnswerArr={addPlayer} />
                        <GridSquare id={5} clear={clearGridSquares} team1={props.teams[1]} team2={props.teams[4]} usedPlayers={usedPlayers} addPlayerToAnswerArr={addPlayer} />
                        <GridSquare id={6} clear={clearGridSquares} team1={props.teams[2]} team2={props.teams[4]} usedPlayers={usedPlayers} addPlayerToAnswerArr={addPlayer} />
                    </div>
                    <div>
                        <CategorySquare id="col3" team={props.teams[5]} />
                        <GridSquare id={7} clear={clearGridSquares} team1={props.teams[0]} team2={props.teams[5]} usedPlayers={usedPlayers} addPlayerToAnswerArr={addPlayer} />
                        <GridSquare id={8} clear={clearGridSquares} team1={props.teams[1]} team2={props.teams[5]} usedPlayers={usedPlayers} addPlayerToAnswerArr={addPlayer} />
                        <GridSquare id={9} clear={clearGridSquares} team1={props.teams[2]} team2={props.teams[5]} usedPlayers={usedPlayers} addPlayerToAnswerArr={addPlayer} />
                    </div>
                </div><br/>
                {gameWon &&
                <span className='d-flex text-primary align-items-center justify-content-center me-auto'>Grid filled! Nice work!</span>}
            </>
        )
    }
}