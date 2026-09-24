import { useState } from "react";

import { boardDetailRoute } from "@app/providers/router/routes/board.route";
import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { type Column, ColumnCard, useColumnsQuery } from "@entities/column";
import { CreateColumnDialog } from "@features/column/create/ui/CreateColumnDialog";
import { DeleteColumnDialog } from "@features/column/delete";
import { EditColumnDialog } from "@features/column/edit";
import { useReorderColumnMutation } from "@features/column/reorder";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, Container, Typography } from "@mui/material";
import { PageLoader } from "@shared/ui/page-loader";
import { useNavigate, useParams } from "@tanstack/react-router";

export const BoardPage = () => {
  const navigate = useNavigate();
  const { boardId } = useParams({ from: boardDetailRoute.id });

  const { data: columns, isLoading, isError } = useColumnsQuery(boardId);
  const { mutate: reorderColumn } = useReorderColumnMutation(boardId);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const [isCreateColumnOpen, setIsCreateColumnOpen] = useState(false);
  const [editColumn, setEditColumn] = useState<Column | null>(null);
  const [deleteColumn, setDeleteColumn] = useState<Column | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const col = columns?.find((c) => c.id === event.active.id);
    if (col) {
      setActiveColumn(col);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveColumn(null);

    if (!over || active.id === over.id || !columns) return;

    const newIndex = columns.findIndex((col) => col.id === over.id);

    if (newIndex !== -1) {
      reorderColumn({
        columnId: String(active.id),
        newOrder: newIndex,
      });
    }
  };

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
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={columns.map((col) => col.id)}
            strategy={horizontalListSortingStrategy}
          >
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
                  onEdit={(col) => setEditColumn(col)}
                  onDelete={(col) => setDeleteColumn(col)}
                />
              ))}
            </Box>
          </SortableContext>

          <DragOverlay>
            {activeColumn ? (
              <ColumnCard
                column={activeColumn}
                onEdit={() => {}}
                onDelete={() => {}}
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      )}

      <CreateColumnDialog
        boardId={boardId}
        open={isCreateColumnOpen}
        onClose={() => setIsCreateColumnOpen(false)}
      />

      <EditColumnDialog
        boardId={boardId}
        column={editColumn}
        open={Boolean(editColumn)}
        onClose={() => setEditColumn(null)}
      />

      <DeleteColumnDialog
        boardId={boardId}
        column={deleteColumn}
        open={Boolean(deleteColumn)}
        onClose={() => setDeleteColumn(null)}
      />
    </Container>
  );
};
