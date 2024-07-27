import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import defaultProfileImg from "assets/images/default-profile.png";
import useLayoutStore from "hooks/store/layout-store";
import userStore from "hooks/store/user-store";

function AdminSidenavProfile() {
    const normalize = useLayoutStore((state) => state.normalize);
    
    const {firstName, lastName, bio} = userStore((state) => state);
    
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
                padding={1}
            >
                <div className="flex flex-col items-center">
                    <img src={defaultProfileImg} className="h-20"/>
                    {!normalize && (
                        <div className="pt-4">
                            <Typography variant="body1" fontWeight="bold" color="GrayText" className="text-center">
                                {firstName} {lastName}
                            </Typography>
                            
                            <Typography variant="caption" color="GrayText" textAlign="left" className="text-center">
                                {bio}
                            </Typography>
                        </div>
                    )}
                </div>
            </Box>
        </>
    );
}

export default AdminSidenavProfile;
