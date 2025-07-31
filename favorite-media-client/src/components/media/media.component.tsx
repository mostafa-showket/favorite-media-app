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
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { GetMedia } from "../../actions";
import type { Media } from "../../types";
import { MediaRow } from "./media-row.component";

export function MediaTable() {
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
              <MediaRow key={item.id} item={item} />
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
