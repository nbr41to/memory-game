import { useState } from 'react';
import { Box } from '@fower/react';
import { Button } from './Button';
import { Block } from './Block';
import brain from './assets/body_brain_nou.png';
const pieceCharactor = [['Z', 'X'], ['C', 'V']];

const App = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [level, setLevel] = useState(2);
  const [totalSolve, setTotalSolve] = useState(0);
  const [combo, setCombo] = useState(0);
  const [previousSolve, setPreviousSolve] = useState(true);
  const [pieces, setPieces] = useState([]);
  const [totalFeild, setTotalFeild] = useState(0);

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
  const solve = (value) => {
    if (pieces[0].char === value) {
      setPreviousSolve(true);
      setTotalSolve(totalSolve + 1);
      if (previousSolve) setCombo(combo + 1);
    } else {
      setTotalFeild(totalFeild + 1);
      setPreviousSolve(false);
      setCombo(0);
    }
    setPieces([...pieces.slice(1), createPiece()]);
  };

  const reset = () => {
    setIsStarted(false);
    setLevel(2);
    setTotalSolve(0);
    setCombo(0);
    setPreviousSolve(true);
    setTotalFeild(0);
    setPieces([]);
  };

  const end = () => {
    if (window.confirm('ゲームを終了しますか？')) {
      reset();
    }
  };

  const life = () => {
    if (totalFeild === 0) return '❤️❤️❤️';
    if (totalFeild === 1) return '❤️❤️';
    if (totalFeild === 2) return '❤️';
  };

  return (
    <Box toCenter w='100%' h='95vh' >
      <Box toCenterX column px4 w='100%' h='100%' maxW={375} maxH={800} relative>
        <Box toCenterX column mt1>
          <Box textXL my1>★ Memory Game ★</Box>
          <Box textLG my1>短期記憶を鍛えるゲーム</Box>
        </Box>
        {!isStarted ?
          <>
            <Box as='img' square-250 my20 src={brain} alt="脳" />
            <Box w='100%' column toCenter>
              <Box w='100%' toBetween mb3>
                <Button label='Level1' px4 h16 bgRed400={level === 1} onClick={() => setLevel(1)} />
                <Button label='Level2' px4 h16 bgRed400={level === 2} onClick={() => setLevel(2)} />
                <Button label='Level3' px4 h16 bgRed400={level === 3} onClick={() => setLevel(3)} />
              </Box>
              <Box w='100%' mb8>
                <Button label='START' textXL px4 h16 bgCyan400 onClick={start} />
              </Box>
            </Box>
          </>
          :
          <Box px2 mt2>
            <Box flex flexDirection="column-reverse">
              {pieces.map((piece, index) => <Block piece={piece} hidden={!piece.initial && index < level} />)}
            </Box>
            <Box bgGray400 h1 my4 />
            <Box toBetween>
              {pieceCharactor[0].map(char => <Button key={char} label={char} square-70 mx1 onClick={() => solve(char, 'left')} />)}
              {pieceCharactor[1].map(char => <Button key={char} label={char} square-70 mx1 onClick={() => solve(char, 'right')} />)}
            </Box>
            <Box mt6 toAround >
              <Box textXL fontBold green600={totalSolve > 50}>
                solve: {totalSolve}
              </Box>
              <Box textXL fontBold red600={combo > 30}>
                combo: {combo}
              </Box>
            </Box>
            <Box toCenter textLG fontBold mt2>LIFE: {life()}</Box>
            <Box absolute top2 right2>
              <Button label='✕' textL rounded={0} circle-60 bgGray400 onClick={end} />
            </Box>
          </Box>
        }
        {totalFeild > 2 &&
          <Box fixed bottom40 bgGray100 w='100%' py20 column toCenter opacity-90>
            <Box text3XL fontBold red600>GAME OVER</Box>
            <Box textXL fontBold my2 green600={totalSolve > 50}>
              solve: {totalSolve}
            </Box>
            <Box textXL fontBold my2 red600={combo > 30}>
              combo: {combo}
            </Box>
            <Button label='もう一度遊ぶ' textXL p4 mt2 bgGray400 onClick={reset} />
          </Box>
        }
      </Box>
    </Box>
  );
};

export default App;
