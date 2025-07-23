import { Grid } from "@chakra-ui/react";

const Home = (): JSX.Element => {
  return (
    <Grid
      templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
      gap={6}
      padding={4}
    >
      {/* Add your components or content here */}

      Some stuff ehre
    </Grid>
  );
};

export default Home;
