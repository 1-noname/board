import type { ReactNode } from "react";

import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { Link } from "@tanstack/react-router";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  bottomText: string;
  bottomActionText: string;
  bottomActionTo: string;
}

export const AuthCard = ({
  title,
  subtitle,
  children,
  bottomText,
  bottomActionText,
  bottomActionTo,
}: AuthCardProps) => {
  return (
    <Card
      sx={{
        maxWidth: 440,
        width: "100%",
        p: 2,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          component="h1"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 3, mt: 0.5, textAlign: "center" }}
        >
          {subtitle}
        </Typography>

        {children}

        <Box
          sx={{
            mt: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 0.5,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {bottomText}
          </Typography>
          <Button
            component={Link}
            to={bottomActionTo}
            size="small"
            sx={{ textTransform: "none", fontWeight: 600 }}
          >
            {bottomActionText}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
