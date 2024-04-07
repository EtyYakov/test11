import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";

const ContextMenu=(props)=> {
  const [contextMenu, setContextMenu] = React.useState(null);
  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : 
          null,
    );
  };
  const goToToday=()=>{
    props.setWeekIndex(0);
    setContextMenu(null);

  }
  const handleClose = () => {
    setContextMenu(null);
  };
  const pass = () => {
    navigate(`/NewEvent/date ${props.d}`, {replace:false})
  };
  const ContextComponent = props.contextComponent;
  const navigate = useNavigate();
  return (
    <div onContextMenu={handleContextMenu} >
      <ContextComponent/>
      <Menu 
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={()=>{pass()}}>📝 New Event</MenuItem>
        <MenuItem onClick={goToToday}>📅 Go to today</MenuItem>
      </Menu>
    </div>
  );
}
export default ContextMenu;