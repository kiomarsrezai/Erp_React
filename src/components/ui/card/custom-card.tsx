import {ReactNode} from "react";

interface Props {
    children: ReactNode
    className?: string
    title?: string
}

export default function CustomCard(props: Props){
    
    function headerCard(): ReactNode{
        return !props.title? (<></>) :(
            <div className="flex justify-center items-center text-[13px] font-bold bg-gray-200 py-2.5 rounded-t">{props.title}</div>
        );
    }
    
    function footerCard(): ReactNode{
        return !props.title? (<></>) :(
            <div className="flex justify-center items-center text-[13px] font-bold bg-gray-200 py-2.5 rounded-b">آخرین بروزرسانی 10 ساعت پیش</div>
        );
    }
    
    return (
        <div className={`bg-white base-shadow rounded ${props.className??''}`}>
            {headerCard()}
            
            {props.children}
            
            {footerCard()}
        </div>
    );
}
