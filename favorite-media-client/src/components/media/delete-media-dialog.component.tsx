import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Box,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { Media } from "../../types";
import { DeleteMedia } from "../../actions";

interface DeleteMediaDialogProps {
  open: boolean;
  media: Media | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export function DeleteMediaDialog({
  open,
  media,
  onClose,
  onSuccess,
}: DeleteMediaDialogProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (id: number) => DeleteMedia(id),
    onSuccess: () => {
      onClose();
      queryClient.invalidateQueries({ queryKey: ["MediaListQuery"] });
      onSuccess?.();
    },
    onError: (error) => {
      console.error("Delete error:", error);
    },
  });

  const handleConfirmDelete = () => {
    if (media?.id) {
      mutate(media.id);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  if (!media) return null;

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle>{isPending ? "Deleting..." : "Confirm Delete"}</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error?.message || "An error occurred while deleting the media"}
          </Alert>
        )}
        <Typography>
          Are you sure you want to delete "{media.title}"? This action cannot be
          undone.
        </Typography>
        {isPending && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <CircularProgress size={24} />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} disabled={isPending} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={handleConfirmDelete}
          color="error"
          variant="contained"
          disabled={isPending}
          startIcon={isPending ? <CircularProgress size={16} /> : undefined}
        >
          {isPending ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
