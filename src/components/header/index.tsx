import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import PositionedMenu from "./menu";
import React, { useState } from "react";
import { UserContext } from "../../App";

function ResponsiveAppBar({code, setUserContext, userContext}: {code : string,setUserContext: (x: any) => void, userContext: UserContext}) {
  const [color, setColor] = useState(code);
  return (
    <React.Fragment>
      <AppBar position="static" style={{ background: color }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: "center" }}>
            <PositionedMenu
              colors={[
                { name: "Red", code: "red" },
                { name: "Black", code: "black" },
                { name: "Blue", code: "blue" },
                { name: "Green", code: "green" },
              ]}
              setUserContext={setUserContext}
              userContext={userContext}
              setColor={setColor}
            />
          </Toolbar>
        </Container>
      </AppBar>
    </React.Fragment>
  );
}
export default ResponsiveAppBar;
