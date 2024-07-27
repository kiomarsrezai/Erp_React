import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import userStore from "hooks/store/user-store";
import FixedModal from "components/ui/modal/fixed-modal";
import ForgetPasswordModal from "components/auth/forget-password-modal";
import * as yup from "yup";

import {useState} from "react";
import {loginConfig} from "config/features/auth/auth-config";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {AuthApi} from "api/auth/auth-api";

function LoginForm() {
    const loginFormSchema = yup.object({
        [loginConfig.username]: yup.string().required(),
        [loginConfig.password]: yup.string().required().min(6),
    });
    
    const {
        register,
        handleSubmit,
        setError,
        formState: {errors},
    } = useForm({
        resolver: yupResolver(loginFormSchema),
    });
    
    // password
    const [showPasword, setShowPassword] = useState(false);
    const toggleSeePassword = () => {
        setShowPassword((prevState) => !prevState);
    };
    
    // submit
    const navigate = useNavigate();
    const chnageUserData = userStore((state) => state.chnageUserData);
    const [rememberMe, setRememberMe] = useState(true);
    
    const loginMutation = useMutation(AuthApi.login, {
        onSuccess: (data) => {
            if (data.data) {
                chnageUserData({
                    id: data.data.id,
                    firstName: data.data.firstName,
                    userName: data.data.userName,
                    lastName: data.data.lastName,
                    bio: data.data.bio,
                    permissions: data.data.lisence,
                    nowDate: data.data.dateNow,
                });
                if (rememberMe) {
                    localStorage.setItem("token-auth", data.data.token);
                }
                navigate("/wellcome");
            } else {
                const message = "نام کاربری یا رمز ورود اشتباه است";
                setError(loginConfig.username, {message});
                setError(loginConfig.password, {message});
            }
        },
        onError: () => {
            //enqueueSnackbar(globalConfig.ERROR_MESSAGE, {
            //variant: "error",
            //});
        },
    });
    
    const onSubmitHandler = (values: any) => {
        // @ts-ignore
        loginMutation.mutate(values);
    };
    
    // forget password modal
    const [isOpenForgetPasswordModal, setIsOpenForgetPasswordModal] =
        useState(false);
    
    return (
        <>
            <Box
                id="test"
                component="form"
                onSubmit={handleSubmit(onSubmitHandler)}
                textAlign="center"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Box>
                    <Stack spacing={3}>
                        <Stack spacing={2}>
                            <TextField
                                id="username-input"
                                label="نام کاربری"
                                variant="outlined"
                                {...register(loginConfig.username)}
                                error={!!errors[loginConfig.username]}
                                helperText={
                                    (errors[loginConfig.username]?.message || "") as any
                                }
                                fullWidth
                                autoComplete="off"
                            />
                            
                            <TextField
                                id="password-input"
                                label="رمز ورود"
                                variant="outlined"
                                {...register(loginConfig.password)}
                                error={!!errors[loginConfig.password]}
                                helperText={
                                    (errors[loginConfig.password]?.message || "") as any
                                }
                                fullWidth
                                type={showPasword ? "text" : "password"}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={toggleSeePassword}>
                                                {showPasword ? (
                                                    <RemoveRedEyeIcon/>
                                                ) : (
                                                    <VisibilityOffIcon/>
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                autoComplete="off"
                            />
                            
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={rememberMe}
                                            onChange={() => setRememberMe((state) => !state)}
                                        />
                                    }
                                    label={
                                        <Typography variant="body2">مرا به خاطر بسپار</Typography>
                                    }
                                />
                            </FormGroup>
                        </Stack>
                        
                        <Stack spacing={1}>
                            <LoadingButton
                                variant="contained"
                                size="large"
                                type="submit"
                                loading={loginMutation.isLoading}
                                fullWidth
                            >
                                ورود
                            </LoadingButton>
                            
                            <Box>
                                <Button
                                    variant="text"
                                    sx={{color: "grey.700", fontSize: 12}}
                                    size="small"
                                    onClick={() => setIsOpenForgetPasswordModal(true)}
                                >
                                    فراموشی رمز ورود
                                </Button>
                            </Box>
                        </Stack>
                    </Stack>
                </Box>
            </Box>
            
            <FixedModal
                open={isOpenForgetPasswordModal}
                maxWidth="400px"
                maxHeight="220px"
                minHeight="220px"
                isBig={false}
                handleClose={() => setIsOpenForgetPasswordModal(false)}
                title="فراموشی رمز ورود"
            >
                <ForgetPasswordModal/>
            </FixedModal>
        </>
    );
}

export default LoginForm;
