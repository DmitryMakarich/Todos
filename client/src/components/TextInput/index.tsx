import { useRef, useState } from "react";
import { FieldHookConfig, useField } from "formik";

import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

import cx from "classnames";
import "./index.scss";

interface Props {
  placeholder: string;
  password?: boolean;
  className?: string;
  label?: string;
}

export default function TextInput({
  placeholder,
  password,
  className,
  label,
  value,
  ...props
}: FieldHookConfig<string> & Props) {
  const [field, meta] = useField(props);
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={cx("text-input", { [className as string]: className })}>
      {label && <label className="text-input_label">{label}</label>}
      <input
        onFocus={() => setIsFocused(false)}
        type={password && !isVisible ? "password" : "text"}
        placeholder={placeholder}
        {...field}
        onBlur={(e) => {
          field.onBlur(e);
          setIsFocused(true);
        }}
      />
      {password && !isVisible && (
        <BsFillEyeFill
          className="text-input_icon"
          onClick={() => setIsVisible(true)}
        />
      )}
      {password && isVisible && (
        <BsFillEyeSlashFill
          className="text-input_icon"
          onClick={() => setIsVisible(false)}
        />
      )}
      {meta.touched && meta.error && isFocused ? (
        <div className="text-input_error">{meta.error}</div>
      ) : null}
    </div>
  );
}
