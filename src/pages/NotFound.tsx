import { Component, ReactNode } from "react";

import { Typography } from "@mui/material";

import { Layout } from "../components/Layout";

class NotFound extends Component {
  render(): ReactNode {
    return <Layout>
      <Typography variant="h3">
        404. Not Found
      </Typography>
    </Layout>;
  }
}

export default NotFound;
