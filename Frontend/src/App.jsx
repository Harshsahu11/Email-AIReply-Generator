import React, { useState } from "react";
import axios from "axios";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

const App = () => {
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("");
  const [generatedReply, setGeneratedReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:8080/api/email/generate",
        {
          emailContent,
          tone,
        }
      );

      setGeneratedReply(response.data);

    } catch (error) {
      console.error("Error generating email reply:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedReply);
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 4,
        }}
      >
        {/* Heading */}
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          fontWeight="bold"
        >
          Email Reply Generator
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Generate AI-powered professional email replies instantly 🚀
        </Typography>

        {/* Email Input */}
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            label="Original Email Content"
            placeholder="Paste the original email here..."
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
          />
        </Box>

        {/* Tone Selector */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="tone-select-label">
            Tone (Optional)
          </InputLabel>

          <Select
            labelId="tone-select-label"
            value={tone}
            label="Tone (Optional)"
            onChange={(e) => setTone(e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="Professional">Professional</MenuItem>
            <MenuItem value="Friendly">Friendly</MenuItem>
            <MenuItem value="Polite">Polite</MenuItem>
            <MenuItem value="Formal">Formal</MenuItem>
            <MenuItem value="Casual">Casual</MenuItem>
          </Select>
        </FormControl>

        {/* Generate Button */}
        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={handleSubmit}
          disabled={!emailContent || loading}
          sx={{
            py: 1.5,
            fontSize: "16px",
            fontWeight: "bold",
            mb: 4,
          }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Generate Reply"
          )}
        </Button>

        {/* Generated Reply */}
        {generatedReply && (
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography
                variant="h5"
                fontWeight="bold"
              >
                Generated Reply
              </Typography>

              <Button
                variant="outlined"
                onClick={handleCopy}
              >
                Copy Reply
              </Button>
            </Box>

            <TextField
              fullWidth
              multiline
              rows={10}
              variant="outlined"
              value={generatedReply}
              InputProps={{
                readOnly: true,
              }}
            />
          </Box>
        )}

        {/* Snackbar */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <Alert
            severity="success"
            onClose={() => setOpenSnackbar(false)}
            sx={{ width: "100%" }}
          >
            Reply copied to clipboard!
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default App;