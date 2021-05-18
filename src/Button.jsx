import { Box } from '@fower/react';
import styled from 'styled-components';


const BaseButton = ({ label, onClick, ...props }) => {
  return (
    <Box
      toCenter bgGreen200 rounded={8} cursorPointer textLG fontBold
      style={{ userSelect: 'none' }}
      onClick={onClick}
      {...props}
    >
      {label}
    </Box>
  );
};

export const Button = styled(BaseButton)`
  box-shadow: 0 8px #333;
  &:active {
    position: relative;
    top: 4px;
    box-shadow: 0 4px #333;
  }
`;
