import type { Column } from "../model/schema";

import { Box, Paper, Typography } from "@mui/material";

interface ColumnCardProps {
  column: Column;
}

export const ColumnCard = ({ column }: ColumnCardProps) => {
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
      </Box>

      <Box sx={{ flexGrow: 1, minHeight: 100 }}>
        <Typography variant="body2" color="text.secondary">
          No tasks yet
        </Typography>
      </Box>
    </Paper>
  );
};
