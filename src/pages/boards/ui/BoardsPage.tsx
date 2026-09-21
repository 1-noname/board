import { useState } from "react";

import { type Board, BoardCard, useBoardsQuery } from "@entities/board";
import {
  CreateBoardDialog,
  DeleteBoardDialog,
  EditBoardDialog,
} from "@features/board";
import AddIcon from "@mui/icons-material/Add";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useNavigate } from "@tanstack/react-router";

export const BoardsPage = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useBoardsQuery();

  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [editingBoard, setEditingBoard] = useState<Board | null>(null);
  const [deletingBoard, setDeletingBoard] = useState<Board | null>(null);

  const boards = data?.boards ?? [];

  const handleOpenCreate = () => {
    setIsCreateOpen(true);
  };

  const handleCloseCreate = () => {
    setIsCreateOpen(false);
  };

  const handleOpenEdit = (board: Board) => {
    setEditingBoard(board);
  };

  const handleCloseEdit = () => {
    setEditingBoard(null);
  };

  const handleOpenDelete = (board: Board) => {
    setDeletingBoard(board);
  };

  const handleCloseDelete = () => {
    setDeletingBoard(null);
  };

  const handleSelectBoard = (boardId: string) => {
    navigate({
      to: "/boards/$boardId",
      params: { boardId },
    });
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Box>
          <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
            My boards
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your kanban boards
          </Typography>
        </Box>

        {boards.length > 0 && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenCreate}
          >
            Create board
          </Button>
        )}
      </Box>

      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress size={48} />
        </Box>
      )}

      {!isLoading && boards.length === 0 && (
        <Paper
          elevation={0}
          sx={{
            p: 6,
            textAlign: "center",
            backgroundColor: "action.hover",
            borderRadius: 2,
            maxWidth: 480,
            mx: "auto",
            mt: 4,
          }}
        >
          <DashboardOutlinedIcon
            sx={{ fontSize: 64, color: "text.secondary", mb: 2 }}
          />
          <Typography variant="h6" sx={{ fontWeight: "bold" }} gutterBottom>
            No boards yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Create your first board to start organizing tasks in columns.
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenCreate}
          >
            Create board
          </Button>
        </Paper>
      )}

      {!isLoading && boards.length > 0 && (
        <Grid container spacing={3}>
          {boards.map((board) => (
            <Grid key={board.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <BoardCard
                board={board}
                onSelect={handleSelectBoard}
                onEdit={handleOpenEdit}
                onDelete={handleOpenDelete}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <CreateBoardDialog open={isCreateOpen} onClose={handleCloseCreate} />

      <EditBoardDialog
        board={editingBoard}
        open={!!editingBoard}
        onClose={handleCloseEdit}
      />

      <DeleteBoardDialog
        board={deletingBoard}
        open={!!deletingBoard}
        onClose={handleCloseDelete}
      />
    </Container>
  );
};
