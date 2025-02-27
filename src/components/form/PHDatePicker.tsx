import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";

type TDatePickerProps = {
  name: string;
  label?: string;
};

const PHDatePicker = ({ name, label }: TDatePickerProps) => {
  // const { register } = useFormContext();

  return (
    <div style={{ marginBottom: "20px" }}>
      {/* {label ? label : null} */}
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <DatePicker
              {...field}
              id={name}
              size="large"
              style={{ width: "100%" }}
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHDatePicker;
