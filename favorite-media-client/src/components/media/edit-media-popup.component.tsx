import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { Media } from "../../types";
import { CreateMedia, UpdateMedia } from "../../actions";

// Zod schema for validation
const mediaSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, "Title is required"),
  type: z.string().min(1, "Type is required"),
  genre: z.string().optional(),
  director: z.string().optional(),
  budget: z.string().optional(),
  location: z.string().optional(),
  duration: z.string().optional(),
  yearOrTime: z.string().optional(),
  image: z.string().optional().nullable(),
  createdAt: z.string().optional(),
});

type MediaFormData = z.infer<typeof mediaSchema>;

interface EditMediaPopupProps {
  open: boolean;
  media?: Media;
  onClose: (value: React.SetStateAction<boolean>) => void;
}

export function EditMediaPopup({ media, onClose, open }: EditMediaPopupProps) {
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitted },
    reset,
  } = useForm<MediaFormData>({
    resolver: zodResolver(mediaSchema),
    defaultValues: media || ({} as Media),
  });

  const [title, type] = watch(["title", "type"]);

  useEffect(() => {
    if (media) {
      reset(media);
    } else {
      reset({});
    }
  }, [media, reset]);

  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: Media) => {
      return media ? UpdateMedia(data) : CreateMedia(data);
    },
    onSuccess: (response) => {
      if (response.success) {
        onClose(false);
        reset();
        queryClient.invalidateQueries({ queryKey: ["MediaListQuery"] });
      }
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  const onSubmit = (data: MediaFormData) => {
    const submitData = media ? { ...data, id: media.id } : data;
    mutate(submitData as Media);
  };

  const handleClose = () => {
    onClose(false);
    reset();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {media ? `Edit Media ${media.title}` : "Add new Media"}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error.message || "An error occurred while saving the media"}
            </Alert>
          )}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Box sx={{ flex: 1 }}>
                <TextField
                  id="title"
                  {...register("title")}
                  label="Title"
                  variant="outlined"
                  fullWidth
                  error={!!errors.title}
                  helperText={
                    errors.title?.message ||
                    (isSubmitted && !title ? "Title is required" : "")
                  }
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <TextField
                  id="type"
                  {...register("type")}
                  label="Type"
                  variant="outlined"
                  fullWidth
                  error={!!errors.type}
                  helperText={
                    errors.type?.message ||
                    (isSubmitted && !type ? "Type is required" : "")
                  }
                />
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Box sx={{ flex: 1 }}>
                <TextField
                  id="genre"
                  {...register("genre")}
                  label="Genre"
                  variant="outlined"
                  fullWidth
                  error={!!errors.genre}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <TextField
                  id="director"
                  {...register("director")}
                  label="Director"
                  variant="outlined"
                  fullWidth
                  error={!!errors.director}
                />
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Box sx={{ flex: 1 }}>
                <TextField
                  id="budget"
                  {...register("budget")}
                  label="Budget"
                  variant="outlined"
                  fullWidth
                  error={!!errors.budget}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <TextField
                  id="location"
                  {...register("location")}
                  label="Location"
                  variant="outlined"
                  fullWidth
                  error={!!errors.location}
                />
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Box sx={{ flex: 1 }}>
                <TextField
                  id="duration"
                  {...register("duration")}
                  label="Duration"
                  variant="outlined"
                  fullWidth
                  error={!!errors.duration}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <TextField
                  id="yearOrTime"
                  {...register("yearOrTime")}
                  label="Year/Time"
                  variant="outlined"
                  fullWidth
                  error={!!errors.yearOrTime}
                />
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ padding: 2 }}>
          <Button
            type="button"
            variant="outlined"
            onClick={handleClose}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isPending}
            startIcon={isPending ? <CircularProgress size={20} /> : undefined}
          >
            {isPending ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
