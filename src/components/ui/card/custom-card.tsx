import {ReactNode} from "react";

interface Props {
    children: ReactNode
    className?: string
    title?: string
}

export default function CustomCard(props: Props){
    
    function headerCard(): ReactNode{
        return !props.title? (<></>) :(
            <div className="flex justify-center items-center text-[13px] font-bold bg-dark3 text-white py-2.5 rounded-t border-b border-gray-200">{props.title}</div>
        );
    }
    
    function footerCard(): ReactNode{
        return !props.title? (<></>) :(
            <>
                <div className="h-10"></div>
                <div className="flex justify-center items-center text-[13px] font-bold bg-dark3 py-2.5 rounded-b absolute w-full bottom-0">آخرین بروزرسانی 10 ساعت پیش</div>
            </>
        );
    }
    
    return (
        <div className={`base-shadow rounded relative bg-dark2 text-white ${props.className??''}`}>
            {headerCard()}
            
            <div>
                {props.children}
            </div>
            
            {/*{footerCard()}*/}
        </div>
    );
}
