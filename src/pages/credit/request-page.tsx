import AdminLayout from "components/layout/admin-layout";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { grey } from "@mui/material/colors";

function RequestCreditPage() {
  return (
    <AdminLayout>
      <Box padding={4}>
        <Grid container spacing={1} mb={2}>
          <Grid xs={3} xl={2}>
            <TextField
              id="user-input"
              label="کاربر"
              variant="outlined"
              fullWidth
              value="پت و مت"
            />
          </Grid>
          <Grid xs={3} xl={2}>
            <FormControl fullWidth>
              <InputLabel id="year-label">سال</InputLabel>
              <Select
                labelId="year-label"
                id="year-input"
                value={20}
                label="سال"
              >
                <MenuItem value={10}>1399</MenuItem>
                <MenuItem value={20}>1400</MenuItem>
                <MenuItem value={30}>1401</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={3} xl={2}>
            <FormControl fullWidth>
              <InputLabel id="state-label">منطقه</InputLabel>
              <Select
                labelId="state-label"
                id="state-input"
                value={10}
                label="منطقه"
              >
                <MenuItem value={10}>همه مناطق و مرکزی</MenuItem>
                <MenuItem value={20}>سازمان فناوری اطلاعات و ارتباطات</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={3} xl={2}>
            <FormControl fullWidth>
              <InputLabel id="witch-organ-label">واحد درخواست کننده</InputLabel>
              <Select
                labelId="witch-organ-label"
                id="witch-organ-input"
                value={20}
                label="واحد درخواست کننده"
              >
                <MenuItem value={10}>واحد فلان</MenuItem>
                <MenuItem value={20}>واحد بهمان</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid xs={3} xl={2}>
            <FormControl fullWidth>
              <InputLabel id="request-type-label">نوع درخواست</InputLabel>
              <Select
                labelId="request-type-label"
                id="request-type-input"
                value={20}
                label="نوع درخواست"
              >
                <MenuItem value={10}>ساده</MenuItem>
                <MenuItem value={20}>جدولی</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid xs={3} xl={2}>
            <ButtonGroup fullWidth sx={{ height: 1 }}>
              <Button
                sx={{
                  borderColor: grey[400],
                  color: grey[700],
                  "&:hover": { borderColor: grey[400] },
                }}
              >
                <AddIcon />
              </Button>
              <Button
                sx={{
                  borderColor: grey[400],
                  color: grey[700],
                  "&:hover": { borderColor: grey[400] },
                }}
              >
                <CheckIcon />
              </Button>
              <Button
                sx={{
                  borderColor: grey[400],
                  color: grey[700],
                  "&:hover": { borderColor: grey[400] },
                }}
              >
                <ClearIcon />
              </Button>
              <Button
                sx={{
                  borderColor: grey[400],
                  color: grey[700],
                  "&:hover": { borderColor: grey[400] },
                }}
              >
                <SearchIcon />
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  );
}

export default RequestCreditPage;
