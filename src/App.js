import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  AppBar,
  Toolbar,
} from "@mui/material";
import axios from "axios";

function App() {
  const [photos, setPhotos] = useState([]);
  const [filteredPhotos, setFilteredPhotos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/photos")
      .then((response) => {
        setPhotos(response.data);
        setFilteredPhotos(response.data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = photos.filter((photo) =>
      photo.title.toLowerCase().includes(term)
    );
    setFilteredPhotos(filtered);
  };

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Photo Gallery</Typography>
        </Toolbar>
      </AppBar>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={handleSearch}
      />
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {filteredPhotos.map((photo) => (
            <Grid item key={photo.id} xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardMedia
                  component="img"
                  alt={photo.title}
                  height="140"
                  image={photo.thumbnailUrl}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {photo.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default App;
