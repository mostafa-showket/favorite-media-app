import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";

import { GetMedia } from "../../actions";
import { EditMediaPopup } from "./edit-media-popup.component";
import { MediaRow } from "./media-row.component";
import type { Media } from "../../types";

export function MediaTable() {
  const [openAdd, setOpenAdd] = useState(false);
  const [editableMedia, setEditableMedia] = useState<Media | undefined>(
    undefined
  );
  const { data, isLoading, error } = useQuery({
    queryKey: ["MediaListQuery"],
    queryFn: GetMedia,
  });

  if (isLoading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "20px" }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <Alert severity="error">Error loading media: {error.message}</Alert>;
  }

  const mediaList = data?.data || [];

  return (
    <TableContainer
      component={Paper}
      sx={{
        margin: "20px 0",
        boxShadow: 2,
        borderRadius: 2,
      }}
    >
      <Box
        sx={{ padding: 2, display: "flex", justifyContent: "space-between" }}
      >
        <Typography variant="h6">Media List</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenAdd(true)}
          size="large"
        >
          Add New
        </Button>
      </Box>
      <EditMediaPopup
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        media={editableMedia}
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Genre</TableCell>
            <TableCell>Director</TableCell>
            <TableCell>Budget</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Year/Time</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mediaList.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} align="center">
                No media items found
              </TableCell>
            </TableRow>
          ) : (
            mediaList.map((item: Media) => (
              <MediaRow
                key={item.id}
                item={item}
                onEdit={(media) => {
                  setEditableMedia(media);
                  setOpenAdd(true);
                }}
              />
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
