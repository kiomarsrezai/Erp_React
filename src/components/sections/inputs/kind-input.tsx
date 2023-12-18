import FlotingLabelSelect from "components/ui/inputs/floting-label-select";

interface KindInputProps {
    setter: (prevData: any) => void;
    value: number | undefined;
    permissionForm?: string;
    disabled?: boolean;
    showError?: boolean;
}

export default function KindInput(props: KindInputProps) {
    const { setter, value, disabled, showError } = props;
    
    return (
        <FlotingLabelSelect
            label="نوع"
            name="kind"
            items={[
                {label: 'راکت', value: 1},
                {label: 'بدون ثبت هزینه', value: 2},
                {label: 'در پایان', value: 3},
                {label: 'بیشتر از اعتبار', value: 4},
            ]}
            value={value}
            setter={setter}
            disabled={disabled}
            showError={showError}
        />
    );
}
