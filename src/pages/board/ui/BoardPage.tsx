import { useState } from "react";

import { boardDetailRoute } from "@app/providers/router/routes/board.route";
import { type Column,ColumnCard, useColumnsQuery } from "@entities/column";
import { CreateColumnDialog } from "@features/column/create/ui/CreateColumnDialog";
import { EditColumnDialog } from "@features/column/edit";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, Container, Typography } from "@mui/material";
import { PageLoader } from "@shared/ui/page-loader";
import { useNavigate, useParams } from "@tanstack/react-router";

export const BoardPage = () => {
  const navigate = useNavigate();
  const { boardId } = useParams({ from: boardDetailRoute.id });

  const { data: columns, isLoading, isError } = useColumnsQuery(boardId);
  const [isCreateColumnOpen, setIsCreateColumnOpen] = useState<boolean>(false);
  const [editColumn, setEditColumn] = useState<Column | null>(null);

  const handleBackToBoards = () => {
    navigate({ to: "/boards" });
  };

  const handleOpenCreateColumn = () => {
    setIsCreateColumnOpen(true);
  };

  const handleCloseCreateColumn = () => {
    setIsCreateColumnOpen(false);
  };

  const handleOpenEdit = (column: Column) => {
    setEditColumn(column);
  };

  const handleCloseEdit = () => {
    setEditColumn(null);
  };

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError || !columns) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography color="error">
          Failed to load columns for this board.
        </Typography>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 4,
        height: "calc(100vh - 80px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBackToBoards}
          sx={{ mb: 1 }}
          color="inherit"
        >
          Back to boards
        </Button>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={(theme) => ({
              fontWeight: theme.typography.fontWeightBold,
            })}
          >
            Board
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenCreateColumn}
          >
            Add column
          </Button>
        </Box>
      </Box>

      {columns.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography color="text.secondary">
            No columns yet. Create your first column to start organizing tasks!
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "flex-start",
            overflowX: "auto",
            pb: 2,
            flexGrow: 1,
          }}
        >
          {columns.map((column) => (
            <ColumnCard
              key={column.id}
              column={column}
              onEdit={handleOpenEdit}
            />
          ))}
        </Box>
      )}

      <CreateColumnDialog
        boardId={boardId}
        open={isCreateColumnOpen}
        onClose={handleCloseCreateColumn}
      />

      <EditColumnDialog
        boardId={boardId}
        column={editColumn}
        open={!!editColumn}
        onClose={handleCloseEdit}
      />
    </Container>
  );
};
