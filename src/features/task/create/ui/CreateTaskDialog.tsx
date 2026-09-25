import { Controller, useForm } from "react-hook-form";

import { useCreateTaskMutation } from "../api/useCreateTaskMutation";

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

interface CreateTaskDialogProps {
  boardId: string;
  columnId: string;
  open: boolean;
  onClose: () => void;
}

export const CreateTaskDialog = ({
  boardId,
  columnId,
  open,
  onClose,
}: CreateTaskDialogProps) => {
  const { mutate: createTask, isPending } = useCreateTaskMutation(
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
    values: open
      ? { title: "", description: "", priority: "MEDIUM" }
      : undefined,
  });
  const onSubmit = (data: TaskFormPayload) => {
    createTask(data, {
      onSuccess: () => onClose(),
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Create New Task</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            {...register("title")}
            label="Task Title"
            error={Boolean(errors.title)}
            helperText={errors.title?.message}
            autoFocus
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
            <InputLabel id="priority-select-label">Priority</InputLabel>
            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="priority-select-label"
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
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
