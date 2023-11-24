import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";


const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        height: "100px",
      }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        bottom: "0",
        width: "100%",
      }}
      component="footer"
    >
      <Container maxWidth="sm">
        <Typography variant="body2" sx={{ color: "white" }} align="center">
          {"Copyright © "}
          React Hub 2023
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
