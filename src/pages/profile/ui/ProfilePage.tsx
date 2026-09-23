import { useState } from "react";

import { useProfileQuery } from "@entities/user";
import { DeleteAccountDialog } from "@features/profile/delete";
import { EditProfileDialog } from "@features/profile/edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import { PageLoader } from "@shared/ui/page-loader";
import { useNavigate } from "@tanstack/react-router";

export const ProfilePage = () => {
  const navigate = useNavigate();
  const { data: user, isLoading, isError } = useProfileQuery();

  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);

  const handleBackToBoards = () => {
    navigate({ to: "/boards" });
  };

  const handleOpenEdit = () => {
    setIsEditOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditOpen(false);
  };

  const handleOpenDelete = () => {
    setIsDeleteOpen(true);
  };

  const handleCloseDelete = () => {
    setIsDeleteOpen(false);
  };

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError || !user) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography color="error">
          Failed to load profile information.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={handleBackToBoards}
        sx={{ mb: 3 }}
        color="inherit"
      >
        Back to boards
      </Button>

      <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar sx={{ width: 64, height: 64, fontSize: "1.75rem" }}>
              {user.name[0]?.toUpperCase() ?? "U"}
            </Avatar>
            <Box>
              <Typography
                variant="h5"
                sx={(theme) => ({
                  fontWeight: theme.typography.fontWeightBold,
                })}
              >
                {user.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Personal Account
              </Typography>
            </Box>
          </Box>

          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={handleOpenEdit}
          >
            Edit
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 4 }}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block" }}
          >
            Email address
          </Typography>
          <Typography variant="body1" sx={{ mt: 0.5 }}>
            {user.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box>
          <Typography
            variant="h6"
            color="error"
            sx={(theme) => ({
              fontWeight: theme.typography.fontWeightBold,
              mb: 1,
            })}
          >
            Danger Zone
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Once you delete your account, there is no going back. Please be
            certain.
          </Typography>
          <Button variant="contained" color="error" onClick={handleOpenDelete}>
            Delete account
          </Button>
        </Box>
      </Paper>

      <EditProfileDialog
        user={user}
        open={isEditOpen}
        onClose={handleCloseEdit}
      />

      <DeleteAccountDialog open={isDeleteOpen} onClose={handleCloseDelete} />
    </Container>
  );
};
