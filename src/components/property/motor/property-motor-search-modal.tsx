import { IconButton } from "@mui/material";
import FixedTable from "components/data/table/fixed-table";
import { SearchPopertyMotorItemShape } from "types/data/property/motor/property-motor-type";
import { TableHeadShape } from "types/table-type";
import CheckIcon from "@mui/icons-material/Check";
import { useMutation } from "@tanstack/react-query";
import { propertyMotorApi } from "api/property/property-motor-api";
import { propertyMotorConfig } from "config/features/property/property-motor-config";

interface PropertyModalSearchModalProps {
  data: SearchPopertyMotorItemShape[];
  setFormData: any;
  onClose: () => void;
}

function PropertyModalSearchModal(props: PropertyModalSearchModalProps) {
  const { data, setFormData, onClose } = props;

  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "پلاک",
      name: "pelak",
    },
    {
      title: "رنگ",
      name: "color",
    },
    {
      title: "سال",
      name: "productYear",
    },
    {
      title: "تیپ",
      name: "tipeName",
    },
    {
      title: "سیستم",
      name: "systemName",
    },

    {
      title: "نوع",
      name: "kindName",
    },

    {
      title: "عملیات",
      name: "actions",
    },
  ];

  //   data
  const readMutation = useMutation(propertyMotorApi.getData, {
    onSuccess(data) {
      setFormData(() => ({
        id: data.data[0].id,
        [propertyMotorConfig.pelak]: data.data[0].pelak,
        [propertyMotorConfig.kind_motor]: data.data[0].kindMotorId,
        [propertyMotorConfig.kind]: data.data[0].kindId,
        [propertyMotorConfig.kind_name]: data.data[0].kindName,
        [propertyMotorConfig.system]: data.data[0].systemId,
        [propertyMotorConfig.system_name]: data.data[0].systemName,
        [propertyMotorConfig.tip]: data.data[0].tipeId,
        [propertyMotorConfig.tip_name]: data.data[0].tipeName,
        [propertyMotorConfig.year]: data.data[0].productYear,
        [propertyMotorConfig.color]: data.data[0].color,
      }));

      onClose();
    },
  });

  const handleClickCheckIcon = (item: SearchPopertyMotorItemShape) => {
    readMutation.mutate({
      id: item.id,
    });
  };
  const actionButtons = (row: SearchPopertyMotorItemShape) => (
    <IconButton
      color="primary"
      size="small"
      onClick={() => handleClickCheckIcon(row)}
    >
      <CheckIcon />
    </IconButton>
  );

  const formatTableData = (
    unFormatData: SearchPopertyMotorItemShape[]
  ): any[] => {
    const formatedData: any[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
      //   code: item.number,
      //   date: item.dates,
      actions: () => actionButtons(item),
    }));

    return formatedData;
  };

  const tableData = formatTableData(data);

  return <FixedTable heads={tableHeads} data={tableData} notFixed />;
}

export default PropertyModalSearchModal;
