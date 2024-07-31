import AdminLayout from "components/layout/admin-layout";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import { globalConfig } from "config/global-config";

function WellcomePage() {
    return (
        <AdminLayout>
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="between"
                height={`calc(100vh - ${globalConfig.headerHeight}px)`}
            >
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                >
                    <Typography variant="body1" color="grey.700">
                        به
                        <Typography
                            variant="body1"
                            color="grey.700"
                            fontWeight="bold"
                            display="inline"
                        >
                            {" "}
                            سامانه ERP{" "}
                        </Typography>
                        خوش آمدید.
                    </Typography>
                </Box>
                <Card sx={{ bgcolor: "grey.200", textAlign: "center" }}>
                    <CardContent>
                        <Typography variant="caption" fontWeight="bold" color="grey.600">
                            کلیه حقوق مادی و معنوی این سامانه برای سازمان فن آوری اطلاعات و
                            ارتباطات{" "}
                            <Typography variant="caption" fontWeight="bold" color="grey.800">
                                شهرداری اهواز
                            </Typography>{" "}
                            محفوظ میباشد
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </AdminLayout>
    );
}

export default WellcomePage;
