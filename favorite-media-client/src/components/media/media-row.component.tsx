import { useState } from "react";

import { TableCell, TableRow, IconButton, Chip } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

import type { Media } from "../../types";
import { DeleteMediaDialog } from "./delete-media-dialog.component";

interface MediaRowProps {
  item: Media;
  onEdit: (media: Media | undefined) => void;
}

export function MediaRow({ item, onEdit }: MediaRowProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <TableRow hover>
        <TableCell>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 4,
                  objectFit: "cover",
                }}
              />
            )}
            <span style={{ fontWeight: 500 }}>{item.title}</span>
          </div>
        </TableCell>
        <TableCell>
          <Chip
            label={item.type}
            size="small"
            color="primary"
            variant="outlined"
          />
        </TableCell>
        <TableCell>{item.genre}</TableCell>
        <TableCell>{item.director}</TableCell>
        <TableCell>{item.budget}</TableCell>
        <TableCell>{item.location}</TableCell>
        <TableCell>{item.duration}</TableCell>
        <TableCell>{item.yearOrTime}</TableCell>
        <TableCell>
          <div style={{ display: "flex", gap: "4px" }}>
            <IconButton
              size="small"
              color="primary"
              onClick={() => onEdit(item)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" color="error" onClick={handleDeleteClick}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </div>
        </TableCell>
      </TableRow>

      <DeleteMediaDialog
        open={deleteDialogOpen}
        media={item}
        onClose={handleCloseDeleteDialog}
      />
    </>
  );
}
