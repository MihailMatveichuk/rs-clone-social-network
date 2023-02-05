import { useMemo } from 'react';
import { RE_DIGIT } from '../../constants';

export type Props = {
  value: string;
  valueLength: number;
  onChange: (value: string) => void;
};

export default function OtpInput({ value, valueLength, onChange }: Props) {
  const valueItems = useMemo(() => {
    const valueArray = value.split('');
    const items: Array<string> = [];

    for (let i = 0; i < valueLength; i++) {
      const char = valueArray[i];
      if (RE_DIGIT.test(char)) {
        items.push(char);
      } else {
        items.push('');
      }
    }

    return items;
  }, [value, valueLength]);

  const inputOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const target = e.target;
    let targetValue = target.value.trim();
    const isTargetValueDigit = RE_DIGIT.test(targetValue);

    if (!isTargetValueDigit && targetValue !== '') {
      return;
    }

    const nextInputEl = target.nextElementSibling as HTMLInputElement | null;
    if (!isTargetValueDigit && nextInputEl && nextInputEl.value !== '') {
      return;
    }

    targetValue = isTargetValueDigit ? targetValue : ' ';

    if (targetValue.length === 1) {
      const newValue =
        value.substring(0, idx) + targetValue + value.substring(idx + 1);
      onChange(newValue.substring(0, 6));

      if (!isTargetValueDigit) {
        return;
      }
      const nextElementSibling =
        target.nextElementSibling as HTMLInputElement | null;
      nextElementSibling?.focus();
    } else if (targetValue.length === valueLength) {
      onChange(targetValue);

      target.blur();
    }
  };

  const inputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (e.key !== 'Backspace' || target.value !== '') {
      return;
    }
    target.setSelectionRange(0, target.value.length);
    const previousElementSibling =
      target.previousElementSibling as HTMLInputElement | null;
    previousElementSibling?.focus();
  };

  const inputOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { target } = e;
    const prevInputEl =
      target.previousElementSibling as HTMLInputElement | null;

    if (prevInputEl && prevInputEl.value === '') {
      return prevInputEl.focus();
    }
    target.setSelectionRange(0, target.value.length);
  };
	return (
	  <div className="otp-group">
		{valueItems.map((digit, idx) => (
		  <input
			key={idx}
			type="text"
			inputMode="numeric"
			autoComplete="one-time-code"
			pattern="\d{1}"
			maxLength={valueLength}
			className="otp-input"
			value={digit}
			onChange={(e) => inputOnChange(e, idx)}
			onKeyDown={inputOnKeyDown}
			onFocus={inputOnFocus}
		  />
		))}
	  </div>
	);
  }