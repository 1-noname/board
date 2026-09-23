import type { Column } from "../model/schema";

import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Paper, Typography } from "@mui/material";

interface ColumnCardProps {
  column: Column;
  onEdit: (column: Column) => void;
}

export const ColumnCard = ({ column, onEdit }: ColumnCardProps) => {
  const handleEditClick = () => {
    onEdit(column);
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

        <IconButton
          size="small"
          onClick={handleEditClick}
          aria-label="edit column"
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box sx={{ flexGrow: 1, minHeight: 100 }}>
        <Typography variant="body2" color="text.secondary">
          No tasks yet
        </Typography>
      </Box>
    </Paper>
  );
};
