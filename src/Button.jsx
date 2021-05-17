import { Box } from '@fower/react';

export const Button = ({ label, onClick, ...props }) => {
  return (
    <Box
      toCenter bgGreen200 rounded={10} cursorPointer fontBold
      style={{ userSelect: 'none' }}
      onClick={onClick}
      {...props}
    >
      {label}
    </Box>
  );
};
