/// <reference path="knight.ts" />

class GameAI {
    // Laat de AI een zet kiezen en update zowel de koning als de spelstatus.
    public static moveKnight(king: King, knights: Knight[], gameState: GameState) {
        let t0 = performance.now(); // Start de timer voor de minimax-algoritme.

        const searchDepth = 5; // Diepte van de zoektocht in de boom van mogelijke zetten.
        let minEval = +Infinity; // Initialiseer de minimale evaluatiewaarde als oneindig positief.
        let bestMove: [number, number] = [0, 0]; // Een array om de beste zet op te slaan als [rij, kolom].
        let indexKnight = 0; // Houdt bij welke ridder de beste zet heeft.

        //Hier worden de berekeningen gedaan voor de AI
        // Loop door elke ridder.
        for (let i = 0; i < knights.length; i++) {
            const knightLegalMoves = knights[i].getMoves(
                gameState.knightPositions[i] // Legale zetten voor de huidige positie van de ridder.
            );

            // Loop door alle mogelijke zetten van de geselecteerde ridder.
            for (let move of knightLegalMoves) {
                // Maak een kopie van de huidige spelstatus (zodat de zetten niet feitelijk worden uitgevoerd).
                const gameStateCopy = gameState.copy();
                // Voer de geselecteerde zet uit voor de geselecteerde ridder in de gekopieerde spelstatus.
                gameStateCopy.knightPositions[i] = move;

                // Neem de resulterende positie mee in de minimax-berekening.
                //Word door elke knight berekening geloopd
                const evaluation = this.miniMax(gameStateCopy, king, knights, searchDepth - 1, false);
                // Als de evaluatie kleiner is dan de minimale evaluatie tot nu toe.
                if (evaluation < minEval) {
                    // Update de minimale evaluatie met de nieuwe waarde.
                    minEval = evaluation;
                    // Bewaar de nieuwe beste zet.
                    bestMove = move;
                    // Bewaar de index van de ridder die deze zet heeft gemaakt.
                    indexKnight = i;
                }
            }
    }

        // Voer de beste gekozen zet uit.
        knights[indexKnight].setPosition(bestMove);
        // Werk de spelstatus bij zodat deze de laatst gekozen zet kent.
        gameState.knightPositions[indexKnight] = bestMove;

        // Registreer hoe lang het duurde om de zet te berekenen.
        let t1 = performance.now();
        console.log("AI-zet duurde " + (t1 - t0) + " milliseconden om te berekenen.");
    }

    public static miniMax(
        gameState: GameState,
        king: King,
        knights: Knight[],
        depth: number,
        maximizingPlayer: boolean
    ) {
        const score = gameState.getScore(); // Bepaal de huidige score van het spel.

        // Als de zoekdiepte 0 is of als er een winnende score is bereikt.
        if (depth === 0 || score[1]) {
            // Als diepte 0 is of het spel is afgelopen, retourneer de huidige score.
            return score[0]; // Als diepte 0 is, retourneer de eerste waarde in de score-array.
        }

        // Zet van de koning.
        if (maximizingPlayer) {
            let maxEval = -Infinity; // Initialiseer de maximale evaluatiewaarde als oneindig negatief.
            const gameStateCopy = gameState.copy(); // Maak een kopie van de huidige spelstatus.
            // Haal de mogelijke zetten op voor de koning vanuit de kopie.
            const kingLegalMoves = king.getMoves(gameStateCopy.kingPos);

            for (let move of kingLegalMoves) {
                // Loop door alle mogelijke posities die de koning kan bereiken met één zet.
                gameStateCopy.kingPos = move; // Doe alsof de zet wordt uitgevoerd.

                const currentEval = this.miniMax(gameStateCopy, king, knights, depth - 1, false); // 0, -100 of 100
                maxEval = Math.max(maxEval, currentEval); // Kies de hoogste waarde.
            }
            return maxEval; // Retourneer de maximale evaluatiewaarde.
        }

        // Zet van de ridders.
        else {
            let minEval = Infinity; // Initialiseer de minimale evaluatiewaarde als oneindig positief.

            for (let i = 0; i < knights.length; i++) {
                const gameStateCopy = gameState.copy(); // Maak een kopie van de huidige spelstatus.
                const knightLegalMoves = knights[i].getMoves(gameStateCopy.knightPositions[i]); // Mogelijke zetten voor de ridder in de kopie.

                for (let move of knightLegalMoves) {
                    // Loop door alle mogelijke zetten van de huidige ridder.
                    gameStateCopy.knightPositions[i] = move; // Doe alsof de zet wordt uitgevoerd.

                    const currentEval = this.miniMax(gameStateCopy, king, knights, depth - 1, true); // 0, -100 of 100
                    minEval = Math.min(minEval, currentEval); // Kies de laagste waarde.
                }
            }
            return minEval; // Retourneer de minimale evaluatiewaarde.
        }
    }
}
