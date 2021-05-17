import { Box } from '@fower/react';

export const Block = ({ piece, hidden }) => {
  return (
    <Box w='100%' my2 toLeft={piece.side === 'left'} toRight={piece.side === 'right'}>
      {!hidden && piece.side === 'left' &&
        <Box w='50%' textXL fontBold white h='8vh' bgOrange400 toCenter roundedL-8>
          {piece.char}
        </Box>
      }
      {!hidden && piece.side === 'right' &&
        <Box w='50%' textXL fontBold white h='8vh' bgBlue400 toCenter roundedR-8>
          {piece.char}
        </Box>
      }
      {!piece.initial && hidden &&
        <>
          <Box w='100%' textXL fontBold white h='8vh' bgOrange400 toCenter roundedL-8></Box>
          <Box w='100%' textXL fontBold white h='8vh' bgBlue400 toCenter roundedR-8></Box>
        </>
      }
    </Box>
  );
};
