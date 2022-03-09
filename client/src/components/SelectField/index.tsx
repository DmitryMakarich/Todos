import React from "react";
import { FieldHookConfig, useField } from "formik";
import Option from "../../model/Option";

import cx from "classnames";
import "./index.scss";

interface Props {
  placeholder: string;
  className?: string;
  options: Array<Option>;
}

export default function SelectField({
  placeholder,
  className,
  options,
  ...props
}: FieldHookConfig<string> & Props) {
  const [field, meta] = useField(props);

  return (
    <>
      <select
        {...field}
        className={cx("select-field", { [className as string]: className })}
      >
        <option value="default" hidden>
          Choose tag
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {meta.touched && meta.error && (
        <div className="select-field_error">{meta.error}</div>
      )}
    </>
  );
}
