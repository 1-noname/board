import type { Column } from "../model/schema";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Paper, Typography } from "@mui/material";

interface ColumnCardProps {
  column: Column;
  onEdit: (column: Column) => void;
  onDelete: (column: Column) => void;
}

export const ColumnCard = ({ column, onEdit, onDelete }: ColumnCardProps) => {
  const handleEditClick = () => {
    onEdit(column);
  };

  const handleDeleteClick = () => {
    onDelete(column);
  };

  return (
    <Paper
      elevation={1}
      sx={{
        width: 300,
        minWidth: 300,
        maxHeight: "calc(100vh - 200px)",
        display: "flex",
        flexDirection: "column",
        bgcolor: "action.hover",
        borderRadius: 2,
        p: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography
          variant="subtitle1"
          sx={(theme) => ({
            fontWeight: theme.typography.fontWeightBold,
          })}
        >
          {column.title}
        </Typography>

        <Box sx={{ display: "flex", gap: 0.5 }}>
          <IconButton
            aria-label="edit column"
            size="small"
            onClick={handleEditClick}
          >
            <EditIcon fontSize="small" />
          </IconButton>

          <IconButton
            aria-label="delete column"
            size="small"
            color="error"
            onClick={handleDeleteClick}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ flexGrow: 1, minHeight: 100 }}>
        <Typography variant="body2" color="text.secondary">
          No tasks yet
        </Typography>
      </Box>
    </Paper>
  );
};
