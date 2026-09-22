import { Container, Typography } from "@mui/material";
import { useParams } from "@tanstack/react-router";

export const BoardPage = () => {
  const { boardId } = useParams({ from: "/boards/$boardId" });

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4">Board: {boardId}</Typography>
    </Container>
  );
};
