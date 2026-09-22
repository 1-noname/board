import type { MouseEvent } from "react";

import type { Board } from "../model/schema";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";

interface BoardCardProps {
  board: Board;
  onSelect: (id: string) => void;
  onEdit: (board: Board) => void;
  onDelete: (board: Board) => void;
}

export const BoardCard = ({
  board,
  onSelect,
  onEdit,
  onDelete,
}: BoardCardProps) => {
  const handleCardClick = () => {
    onSelect(board.id);
  };

  const handleEditClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onEdit(board);
  };

  const handleDeleteClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onDelete(board);
  };

  return (
    <Card
      elevation={2}
      onClick={handleCardClick}
      sx={{
        cursor: "pointer",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h3" noWrap>
          {board.title}
        </Typography>
        <Typography
          variant="body2"
          color={board.description ? "text.secondary" : "text.disabled"}
          sx={{
            mt: 1,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            wordBreak: "break-word",
          }}
        >
          {board.description || "No description"}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: "flex-end", pt: 0, px: 1, pb: 1 }}>
        <IconButton
          aria-label="edit board"
          size="small"
          onClick={handleEditClick}
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton
          aria-label="delete board"
          size="small"
          color="error"
          onClick={handleDeleteClick}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </CardActions>
    </Card>
  );
};
