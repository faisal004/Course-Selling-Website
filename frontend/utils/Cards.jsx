import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";

export default function MediaCard(props) {
  const location = useLocation();
  const isRouteActive = (path) => {
    return location.pathname === path;
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={props.image}
        title="green iguana"
      />
      <CardContent className="space-y-2">
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>

        <Typography variant="h5" color="text.secondary">
          ₹{props.price}
        </Typography>
      </CardContent>
      <CardActions>
        {isRouteActive("/HomeForAdmin") ? (
          <Button size="small">Edit</Button>
        ) : (
          <Button variant="contained">BUY NOW</Button>
        )}
      </CardActions>
    </Card>
  );
}
