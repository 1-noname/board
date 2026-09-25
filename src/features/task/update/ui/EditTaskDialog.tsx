import { Controller, useForm } from "react-hook-form";

import { useEditTaskMutation } from "../api/useEditTaskMutation";

import type { Task } from "@entities/task";
import { type TaskFormPayload, TaskFormSchema } from "@entities/task";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

interface EditTaskDialogProps {
  boardId: string;
  columnId: string;
  task: Task | null;
  open: boolean;
  onClose: () => void;
}

export const EditTaskDialog = ({
  boardId,
  columnId,
  task,
  open,
  onClose,
}: EditTaskDialogProps) => {
  const { mutate: editTask, isPending } = useEditTaskMutation(
    boardId,
    columnId,
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TaskFormPayload>({
    resolver: zodResolver(TaskFormSchema),
    values: task
      ? {
          title: task.title,
          description: task.description ?? "",
          priority: task.priority,
        }
      : undefined,
  });

  const onSubmit = (data: TaskFormPayload) => {
    if (!task) return;

    editTask(
      { taskId: task.id, payload: data },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Edit Task</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            {...register("title")}
            label="Task Title"
            error={Boolean(errors.title)}
            helperText={errors.title?.message}
            fullWidth
          />

          <TextField
            {...register("description")}
            label="Description"
            multiline
            rows={3}
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel id="edit-priority-label">Priority</InputLabel>
            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="edit-priority-label"
                  label="Priority"
                >
                  <MenuItem value="LOW">Low</MenuItem>
                  <MenuItem value="MEDIUM">Medium</MenuItem>
                  <MenuItem value="HIGH">High</MenuItem>
                  <MenuItem value="URGENT">Urgent</MenuItem>
                  <MenuItem value="CRITICAL">Critical</MenuItem>
                </Select>
              )}
            />
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={isPending}>
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
