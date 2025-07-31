import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import type { Media } from "../../types";

interface EditMediaPopupProps {
  open: boolean;
  media?: Media;
  onClose: (value: React.SetStateAction<boolean>) => void;
}

export function EditMediaPopup({ media, onClose, open }: EditMediaPopupProps) {
  const { register, watch } = useForm<Media>({
    defaultValues: media || ({} as Media),
  });
  const [title, type, genre, director, budget, location, duration, yearOrTime] =
    watch([
      "title",
      "type",
      "genre",
      "director",
      "budget",
      "location",
      "duration",
      "yearOrTime",
    ]);
  console.log("EditMediaPopup", { media });

  return (
    <Dialog open={open} onClose={() => onClose(false)}>
      <DialogTitle>
        {media ? `Edit Media ${media.title}` : "Add new Media"}
      </DialogTitle>
      <form>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                id="outlined-basic"
                {...register("title", {
                  value: title,
                  required: "Product Title is required !!",
                })}
                label="Title"
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                {...register("type", {
                  value: type,
                  required: "Product type is required !!",
                })}
                label="Type"
                variant="outlined"
              />
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                id="outlined-basic"
                {...register("genre", {
                  value: genre,
                  required: "Media Genre is required !!",
                })}
                label="Genre"
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                {...register("director", {
                  value: director,
                  required: "Media Director is required !!",
                })}
                label="Director"
                variant="outlined"
              />
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                id="outlined-basic"
                {...register("budget", {
                  value: budget,
                  required: "Media Budget is required !!",
                })}
                label="Budget"
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                {...register("location", {
                  value: location,
                  required: "Media Location is required !!",
                })}
                label="Location"
                variant="outlined"
              />
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                id="outlined-basic"
                {...register("duration", {
                  value: duration,
                  required: "Media Duration is required !!",
                })}
                label="Duration"
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                {...register("yearOrTime", {
                  value: yearOrTime,
                  required: "Media Year/Time is required !!",
                })}
                label="Year/Time"
                variant="outlined"
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ padding: 2 }}>
          <Button
            type="button"
            variant="outlined"
            onClick={() => onClose(false)}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
