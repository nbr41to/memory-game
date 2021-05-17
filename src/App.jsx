import { useState } from 'react';
import { Box } from '@fower/react';
import { Button } from './Button';
import { Block } from './Block';
import brain from './assets/body_brain_nou.png';
const pieceCharactor = [['A', 'B'], ['C', 'D']];

const App = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [level, setLevel] = useState(2);
  const [totalSolve, setTotalSolve] = useState(0);
  const [combo, setCombo] = useState(0);
  const [previousSolve, setPreviousSolve] = useState(true);
  const [pieces, setPieces] = useState([]);

  const createPiece = () => {
    const [dice1, dice2] = [Math.random(), Math.random()];
    const newPiece = { side: dice1 > 0.5 ? 'left' : 'right', char: pieceCharactor[dice1 > 0.5 ? 0 : 1][dice2 > 0.5 ? 0 : 1], initial: false };
    return newPiece;
  };

  const start = () => {
    let initialPieces = [];
    for (let i = 0; i < 7; i++) {
      initialPieces.push(createPiece());
      if (i < level) initialPieces[i].initial = true;
    }
    setIsStarted(true);
    setPieces(initialPieces);
  };
  const solve = (value, side) => {
    if (pieces[0].char === value) {
      setPreviousSolve(true);
      setTotalSolve(totalSolve + 1);
      if (previousSolve) setCombo(combo + 1);
    } else {
      setPreviousSolve(false);
      setCombo(0);
    }
    setPieces([...pieces.slice(1), createPiece()]);
  };
  return (
    <Box toCenter w='100%' h='100vh'>
      <Box toCenterX column px4 maxW={375} w='100%'>
        <Box textXL my2>★Memory Game★</Box>
        {!isStarted ?
          <Box w='100%' h='100%' column>
            <Box as='img' my20 mx4 src={brain} alt="脳" />
            <Box w='100%' toBetween mb3>
              <Button label='Level1' textLG px4 h16 bgRed400={level === 1} onClick={() => setLevel(1)} />
              <Button label='Level2' textLG px4 h16 bgRed400={level === 2} onClick={() => setLevel(2)} />
              <Button label='Level3' textLG px4 h16 bgRed400={level === 3} onClick={() => setLevel(3)} />
            </Box>
            <Box w='100%' mb8>
              <Button label='START' textXL px4 h16 bgCyan400 onClick={start} />
            </Box>
          </Box>
          :
          <Box w={375} px4>
            <Box flex flexDirection="column-reverse">
              {pieces.map((piece, index) => <Block piece={piece} hidden={!piece.initial && index < level} />)}
            </Box>
            <Box w='100%' bgGray400 h1 my4></Box>
            <Box w="100%" toBetween>
              {pieceCharactor[0].map(char => <Button key={char} label={char} square-80 mx1 textXL onClick={() => solve(char, 'left')} />)}
              {pieceCharactor[1].map(char => <Button key={char} label={char} square-80 mx1 textXL onClick={() => solve(char, 'right')} />)}
            </Box>
            <Box my4 toCenterX >
              <Box textXL fontBold w="100%" toCenter>
                solve: {totalSolve}
              </Box>
              <Box textXL fontBold w="100%" toCenter>
                combo: {combo}
              </Box>
            </Box>
          </Box>
        }
      </Box>
    </Box>
  );
};

export default App;
