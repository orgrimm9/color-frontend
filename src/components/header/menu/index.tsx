import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "../../../App";

type MenuProps = {
  colors: { name: string; code: string }[];
  setColor: (x: string) => void;
  setUserContext: (x: any) => void;
  userContext: UserContext
};

export default function PositionedMenu({ colors, setColor, setUserContext, userContext}: MenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const code = event.currentTarget.getAttribute("id");
    axios.put(`${process.env.REACT_APP_SERVICE_URI as string}/updateColor`, {
      "userName": userContext.userName,
      "color": {
        "code": code,
        "name": event.currentTarget.textContent
      }
    }, {withCredentials: true}).then(res => {
      setUserContext({...jwtDecode(res.data.accessToken), ...{isLoggedIn: true}})
      setColor(code as string);
    })
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Choose Color
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {colors.map((color) => {
          return (
            <MenuItem id={color.code} onClick={handleClose}>
              {color.name}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
