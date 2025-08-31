import "./SwitchBtn.css";

// MUI
import { FormControlLabel, Switch } from "@mui/material";

function SwitchBtn({ theme, toggleTheme }) {
  return (
    <div className='switch'>
      <FormControlLabel
        label={theme === "light" ? "Light Mode" : "Dark Mode"}
        control={<Switch checked={theme === "dark"} onChange={toggleTheme} />}
      />
    </div>
  );
}

export default SwitchBtn;
