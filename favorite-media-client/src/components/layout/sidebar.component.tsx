import { Drawer, Divider, Box, Typography } from "@mui/material";

import {
  BottomNavItemsList,
  TopNavItemsList,
} from "./nav-items-list.component";

const drawerWidth = 240;

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <Box sx={{ overflow: "auto" }}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" color="primary">
              Media Library
            </Typography>
          </Box>
          <Divider />
          <TopNavItemsList />
          <Divider />
          <BottomNavItemsList />
        </Box>
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        <Box sx={{ overflow: "auto" }}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" color="primary">
              Media Library
            </Typography>
          </Box>
          <Divider />
          <TopNavItemsList />
          <Divider />
          <BottomNavItemsList />
        </Box>
      </Drawer>
    </Box>
  );
}
