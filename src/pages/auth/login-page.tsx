import {Unstable_Grid2 as Grid} from "@mui/material";

import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

import logoImg from "assets/images/logos/fava.svg";
import Typography from "@mui/material/Typography";
import LoginForm from "../../components/auth/login-form";
import {globalConfig} from "../../config/global-config";


function LoginPage() {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token-auth");
        if (token) {
            navigate("/wellcome");
        }
    }, [navigate]);
    
    return (
        <Grid container spacing={0} overflow="hidden">
            <div className="bg-login w-full min-h-screen flex justify-center items-center">
                <div className="w-full px-8">
                    <div className="max-w-[960px] bg-white mx-auto grid md:grid-cols-2 grid-cols-1">
                        <div className="md:flex flex-col justify-between hidden items-center bg-[url('/images/bg_paper.webp')] bg-cover bg-center">
                            <div></div>
                            
                            <div className="w-[300px] mx-auto text-white">
                                <div className="bg-light rounded-md p-3.5">
                                    <p>شهرداری اهواز</p>
                                    <h1 className="py-[42px] font-bold text-[20px]">{globalConfig.siteTitle}</h1>
                                    <Typography variant="caption" fontWeight="bold">
                                        <p className="leading-7">کلیه حقوق مادی و معنوی این سامانه برای سازمان فن آوری اطلاعات و ارتباطات شهرداری اهواز محفوظ میباشد</p>
                                    </Typography>
                                </div>
                            </div>
                            
                            <div className="w-full text-white text-center">v {globalConfig.version}</div>
                        </div>
                        
                        <div className="flex flex-col py-[34px] px-6">
                            <div className="flex justify-center">
                                <img src={logoImg} alt="logo" className="h-36"/>
                            </div>
                            <p className="font-bold text-center text-[24px]">خوش آمدید</p>
                            <p className="text-center text-[13px]">برای ورود نام کاربری و رمز عبور خود را وارد نمایید</p>
                            
                            <div className="pt-14 flex flex-col gap-5">
                                <LoginForm/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Grid>
    );
}

export default LoginPage;
