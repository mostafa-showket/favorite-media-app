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
      sx={{ maxWidth: 1200, margin: "20px auto" }}
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
          </TableRow>
        </TableHead>
        <TableBody>
          {mediaList.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} align="center">
                No media items found
              </TableCell>
            </TableRow>
          ) : (
            mediaList.map((item: Media) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.genre}</TableCell>
                <TableCell>{item.director}</TableCell>
                <TableCell>{item.budget}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>{item.duration}</TableCell>
                <TableCell>{item.yearOrTime}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
