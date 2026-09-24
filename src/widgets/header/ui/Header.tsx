import { useLogoutMutation } from "@features/auth/logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "@tanstack/react-router";

export const Header = () => {
  const navigate = useNavigate();
  const { mutate: logout, isPending: isLoggingOut } = useLogoutMutation();

  const handleProfileClick = () => {
    navigate({ to: "/profile" });
  };

  const handleLogoutClick = () => {
    logout();
  };

  return (
    <AppBar position="static" elevation={1}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            component={Link}
            to="/boards"
            sx={(theme) => ({
              color: "inherit",
              textDecoration: "none",
              fontWeight: theme.typography.fontWeightBold,
            })}
          >
            Kanban Board
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              color="inherit"
              aria-label="account profile"
              onClick={handleProfileClick}
            >
              <AccountCircleIcon />
            </IconButton>

            <Button
              color="inherit"
              startIcon={<LogoutIcon />}
              onClick={handleLogoutClick}
              disabled={isLoggingOut}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
