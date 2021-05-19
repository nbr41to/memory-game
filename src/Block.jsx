import { Box } from '@fower/react';
import styled from 'styled-components';

const BaseBlock = ({ children, ...props }) => (
  <Box
    w='50%'
    textLG
    fontBold
    white
    h={50}
    toCenter
    shadowMD
    {...props}
  >
    {children}
  </Box>
);

export const Block = ({ piece, hidden }) => {
  return (
    <Box w='100%' my2 toLeft={piece.side === 'left'} toRight={piece.side === 'right'}>
      {!hidden && piece.side === 'left' &&
        <BaseBlock bgOrange400 roundedL-8>
          {piece.char}
        </BaseBlock>
      }
      {!hidden && piece.side === 'right' &&
        <BaseBlock bgBlue400 roundedR-8>
          {piece.char}
        </BaseBlock>
      }
      {!piece.initial && hidden &&
        <>
          <BaseBlock bgOrange400 roundedL-8></BaseBlock>
          <BaseBlock bgBlue400 roundedR-8></BaseBlock>
        </>
      }
    </Box>
  );
};
