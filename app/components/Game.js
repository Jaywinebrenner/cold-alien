"use client"
import React, { useState } from 'react';


const Game = () => {
    const [playerTurn, setPlayerTurn] = useState(1);
    const [player1Position, setPlayer1Position] = useState(1);
    const [player2Position, setPlayer2Position] = useState(1);
    const [winner, setWinner] = useState(null);
    const [currentRoll, setCurrentRoll] = useState(null);
    const [showSpecialTileModal, setShowSpecialTileModal] = useState(false);
    const [specialTileMessage, setSpecialTileMessage] = useState('');

    // Define special tile arrays
    const greenSpiderTiles = [6, 15, 21, 33, 45];
    const blackHoleTiles = [23, 49];
    const asteroidTiles = [5, 11, 24, 41];
    const redGalaxySucker = [9, 44];
    const purpleGalaxySucker = [25, 48];

    // Define messages for special tiles
    const specialTileMessages = {
        [greenSpiderTiles]: "You've landed on a Green Spider Tile. You get to roll again!",
        [blackHoleTiles]: "You've landed on a Black Hole. Unfortunately, you have to go back to the start!",
        [asteroidTiles]: "You've hit an asteroid! You go back 3 tiles.",
        [redGalaxySucker]: "You've hit a Red Galaxy Sucker! You move ahead 10 tiles!",
        [purpleGalaxySucker]: "You've hit a Purple Galaxy Sucker! You get sucked back 10 tiles."
    };

    const rollDice = () => {
        return Math.floor(Math.random() * 6) + 1; // Random number between 1 and 6
    };

    const handlePlayerTurn = () => {
        const diceRoll = rollDice();
        setCurrentRoll(diceRoll);

        const newPosition = playerTurn === 1 ? player1Position + diceRoll : player2Position + diceRoll;
        handleSpecialTile(newPosition);
        if (newPosition >= 50) {
            setWinner(playerTurn);
            return;
        }

        playerTurn === 1 ? setPlayer1Position(newPosition) : setPlayer2Position(newPosition);
        setPlayerTurn(playerTurn === 1 ? 2 : 1);
    };

    const handleSpecialTile = (position) => {
        if (greenSpiderTiles.includes(position)) {
            setSpecialTileMessage(specialTileMessages[greenSpiderTiles]);
            setShowSpecialTileModal(true);
        } else if (blackHoleTiles.includes(position)) {
            setSpecialTileMessage(specialTileMessages[blackHoleTiles]);
            setShowSpecialTileModal(true);
            if (playerTurn === 1) {
                setPlayer1Position(1);
            } else {
                setPlayer2Position(1);
            }
        } else if (asteroidTiles.includes(position)) {
            setSpecialTileMessage(specialTileMessages[asteroidTiles]);
            setShowSpecialTileModal(true);
            const newPosition = Math.max(playerTurn === 1 ? player1Position - 3 : player2Position - 3, 1);
            playerTurn === 1 ? setPlayer1Position(newPosition) : setPlayer2Position(newPosition);
        } else if (redGalaxySucker.includes(position)) {
            setSpecialTileMessage(specialTileMessages[redGalaxySucker]);
            setShowSpecialTileModal(true);
            const newPosition = Math.min(playerTurn === 1 ? player1Position + 10 : player2Position + 10, 50);
            playerTurn === 1 ? setPlayer1Position(newPosition) : setPlayer2Position(newPosition);
        } else if (purpleGalaxySucker.includes(position)) {
            setSpecialTileMessage(specialTileMessages[purpleGalaxySucker]);
            setShowSpecialTileModal(true);
            const newPosition = Math.max(playerTurn === 1 ? player1Position - 10 : player2Position - 10, 1);
            playerTurn === 1 ? setPlayer1Position(newPosition) : setPlayer2Position(newPosition);
        }
    };

    const resetGame = () => {
        setPlayerTurn(1);
        setPlayer1Position(1);
        setPlayer2Position(1);
        setWinner(null);
        setCurrentRoll(null);
        setShowSpecialTileModal(false);
        setSpecialTileMessage('');
    };

    return (
        <div>
            <h1>Game Board</h1>
            <div className="game-board">
                {[...Array(50)].map((_, index) => {
                    const tileNumber = index + 1;
                    const isPlayer1OnTile = player1Position === tileNumber;
                    const isPlayer2OnTile = player2Position === tileNumber;

                    let tileColor = 'black'; // Default tile color
                    let backgroundImage = 'url(/space.webp)'; // Background image URL

                    if (tileNumber === 1) {
                        backgroundImage = 'url(/pluto.png)';
                    } else if (tileNumber === 50) {
                        backgroundImage = 'url(/jupiter.png)';
                    }

                    return (
                        <div
                            key={index}
                            className="tile"
                            style={{
                                backgroundColor: tileColor,
                                backgroundImage: backgroundImage,
                            }}
                        >
                            {tileNumber}
                            {isPlayer1OnTile && <div className="player-marker">P1</div>}
                            {isPlayer2OnTile && <div className="player-marker">P2</div>}
                        </div>
                    );
                })}
            </div>
            <div className="game-info">
                {winner ? (
                    <div>
                        <h2>Player {winner} wins!</h2>
                        <button onClick={resetGame}>Play Again</button>
                    </div>
                ) : (
                    <div>
                        <h2>Player {playerTurn}'s Turn</h2>
                        <button onClick={handlePlayerTurn}>Roll Dice</button>
                        {currentRoll && <div>Last Roll: {currentRoll}</div>}
                    </div>
                )}
            </div>
            {showSpecialTileModal && (
                <div className="modal">
                    <h2>{specialTileMessage}</h2>
                    <button onClick={() => setShowSpecialTileModal(false)}>Close</button>
                </div>
            )}
        </div>
    );
};

export default Game;
