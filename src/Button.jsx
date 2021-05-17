import { Box } from '@fower/react';

export const Button = ({ label, onClick, ...props }) => {
  return (
    <Box
      toCenter bgGreen200 rounded={8} cursorPointer fontBold shadow
      style={{ userSelect: 'none' }}
      onClick={onClick}
      {...props}
    >
      {label}
    </Box>
  );
};
