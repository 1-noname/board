export const taskKeys = {
  all: (boardId: string) => ["tasks", boardId] as const,
  list: (boardId: string, columnId: string) =>
    ["tasks", boardId, columnId] as const,
};
