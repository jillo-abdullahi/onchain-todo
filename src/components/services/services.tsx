import { Grid } from "@chakra-ui/react";

import Navbar from "./components/navbar";
import SomeImage from "./components/SomeImage";
import SomeText from "./components/SomeText";

const Services = () => {
  return (
    <Grid gap={4}>
      <SomeText />
      <SomeImage />
      <Navbar />
    </Grid>
  );
};

export default Services;
