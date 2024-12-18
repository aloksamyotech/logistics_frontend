import { Container, Stack } from '@mui/material';

function Containerr() {
  return (
    <>
      <Container
        sx={{
          bgcolor: 'white',
          borderRadius: 2,
          height: 50,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 4
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}></Stack>
      </Container>
    </>
  );
}
export default Containerr;
