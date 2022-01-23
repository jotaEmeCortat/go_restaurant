
import React from "react";

import { IconBaseProps } from "react-icons/lib";
import { useField } from '@unform/core';

import { Container } from './styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

function Input({ name, icon: Icon, ...rest }: InputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = React.useState(false);
  const [isFilled, setIsFilled] = React.useState(false);

  const { fieldName, defaultValue, registerField } = useField(name);

  const handleInputFocus = React.useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = React.useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  React.useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <Container isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}

      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
    </Container>
  );
}

export default Input;
