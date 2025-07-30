import { TableCell, TableRow } from "@mui/material";

import type { Media } from "../../types";

interface MediaRowProps {
  item: Media;
}

export function MediaRow({ item }: MediaRowProps) {
  return (
    <TableRow>
      <TableCell>{item.title}</TableCell>
      <TableCell>{item.type}</TableCell>
      <TableCell>{item.genre}</TableCell>
      <TableCell>{item.director}</TableCell>
      <TableCell>{item.budget}</TableCell>
      <TableCell>{item.location}</TableCell>
      <TableCell>{item.duration}</TableCell>
      <TableCell>{item.yearOrTime}</TableCell>
    </TableRow>
  );
}
