import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Home as HomeIcon,
  Movie as MovieIcon,
  Tv as TvIcon,
  Book as BookIcon,
  MusicNote as MusicIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
} from "@mui/icons-material";

export function TopNavItemsList() {
  return (
    <List>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={"Dashboard"} />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <MovieIcon />
          </ListItemIcon>
          <ListItemText primary={"Movies"} />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <TvIcon />
          </ListItemIcon>
          <ListItemText primary={"TV Shows"} />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <BookIcon />
          </ListItemIcon>
          <ListItemText primary={"Books"} />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <MusicIcon />
          </ListItemIcon>
          <ListItemText primary={"Music"} />
        </ListItemButton>
      </ListItem>
    </List>
  );
}

export function BottomNavItemsList() {
  return (
    <List>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary={"Profile"} />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary={"Settings"} />
        </ListItemButton>
      </ListItem>
    </List>
  );
}
