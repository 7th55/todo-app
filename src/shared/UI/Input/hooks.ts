// Hooks
import { useState } from 'react';

export type UseForm = {
  [key: string]: {
    value: string;
    error: {
      message: string;
      isOpen: boolean;
    };
  };
};

export const useForm = (
  formInitialState: UseForm
): [
  form: UseForm,
  onChange: (
    inputName: keyof typeof formInitialState,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void,
  errorr: (inputName: keyof typeof formInitialState) => void
] => {
  const [form, setForm] = useState(formInitialState);

  const onChange = (
    inputName: keyof typeof formInitialState,
    e: React.ChangeEvent<HTMLInputElement>
  ) =>
    setForm({
      ...form,
      [inputName]: {
        value: e.target.value,
        error: {
          ...form[inputName].error,
          isOpen: false,
        },
      },
    });

  const error = (inputName: keyof typeof formInitialState) => {
    setForm(
      (f) =>
        (f = {
          ...f,
          [inputName]: {
            ...f[inputName],
            error: {
              ...f[inputName].error,
              isOpen: true,
            },
          },
        })
    );
  };

  return [form, onChange, error];
};
