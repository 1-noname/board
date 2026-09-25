import { useState } from "react";

import { boardDetailRoute } from "@app/providers/router/routes/board.route";
import { useColumnsQuery } from "@entities/column";
import { CreateColumnDialog } from "@features/column/create/ui/CreateColumnDialog";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, Container, Typography } from "@mui/material";
import { PageLoader } from "@shared/ui/page-loader";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ColumnList } from "@widgets/column-list";
import { ColumnTaskList } from "@widgets/column-task-list";

export const BoardPage = () => {
  const navigate = useNavigate();
  const { boardId } = useParams({ from: boardDetailRoute.id });

  const { data: columns, isLoading, isError } = useColumnsQuery(boardId);

  const [isCreateColumnOpen, setIsCreateColumnOpen] = useState(false);

  if (isLoading) return <PageLoader />;

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
          onClick={() => navigate({ to: "/boards" })}
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
          <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
            Board
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setIsCreateColumnOpen(true)}
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
        <ColumnList
          boardId={boardId}
          columns={columns}
          renderTasks={(columnId) => (
            <ColumnTaskList boardId={boardId} columnId={columnId} />
          )}
        />
      )}

      <CreateColumnDialog
        boardId={boardId}
        open={isCreateColumnOpen}
        onClose={() => setIsCreateColumnOpen(false)}
      />
    </Container>
  );
};
