import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

interface NotificationsProps {
  anchorEl: any;
  onClose: () => void;
}

function Notifications(props: NotificationsProps) {
  const { anchorEl, onClose } = props;
  const items = [
    "lorem lorem lorem lorem loremloremloremlorem  lorem lorem  lorem lorem lorem lorem lorem lorem lorem lorem",
    "lorem lorem lorem lorem loremloremloremlorem  lorem lorem  lorem lorem lorem lorem lorem lorem lorem lorem",
    "lorem lorem lorem lorem loremloremloremlorem  lorem lorem  lorem lorem lorem lorem lorem lorem lorem lorem",
    "lorem lorem lorem lorem loremloremloremlorem  lorem lorem  lorem lorem lorem lorem lorem lorem lorem lorem",
    "lorem lorem lorem lorem loremloremloremlorem  lorem lorem  lorem lorem lorem lorem lorem lorem lorem lorem",
    "lorem lorem lorem lorem loremloremloremlorem  lorem lorem  lorem lorem lorem lorem lorem lorem lorem lorem",
    "lorem lorem lorem lorem loremloremloremlorem  lorem lorem  lorem lorem lorem lorem lorem lorem lorem lorem",
  ];
  return (
    <Popover
      open={!!anchorEl}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <List sx={{ maxWidth: 400, maxHeight: 400 }}>
        {items.map((item, i) => (
          <>
            <ListItem key={i}>
              <Typography variant="body2">{item}</Typography>
            </ListItem>

            <Divider component="li" />
          </>
        ))}
      </List>
    </Popover>
  );
}

export default Notifications;
