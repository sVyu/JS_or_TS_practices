import styled, { keyframes } from 'styled-components';

const rotateAnimation = keyframes`
  from{
    transform:rotate(0deg);
  }
  to{
    transform:rotate(360deg);
  }
`;

const Box = styled.div`
  background-color: orange;
  width: 100px;
  height: 100px;
  /* animation: ${rotateAnimation} 1s linear infinite; */
`;

const Circle = styled(Box)`
  background-color: blue;
`;

const Text = styled.span`
  color: tomato;
  font-size: ${(props) => props.size + 'px'};
`;

const Input = styled.input.attrs({ required: true })`
  width: 200px;
  height: 100px;
`;

const App = () => {
  return (
    <>
      <Box />
      <Box as="header">
        {new Array(5).fill(0).map(() => (
          <Text size={15}>hahaa?</Text>
        ))}
      </Box>
      <Circle />
      <Input />
    </>
  );
};

export default App;
