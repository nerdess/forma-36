import React, {
  Component,
  RefObject,
  FocusEvent,
  ChangeEventHandler,
  FocusEventHandler,
} from 'react';
import cn from 'classnames';
import CopyButton from '../CopyButton';
import styles from './TextInput.css';

export type TextInputProps = {
  width?: 'small' | 'medium' | 'large' | 'full';
  type?: 'text' | 'password' | 'email' | 'number' | 'search' | 'url';
  name?: string;
  id?: string;
  extraClassNames?: string;
  withCopyButton?: boolean;
  placeholder?: string;
  onChange?: ChangeEventHandler;
  disabled?: boolean;
  testId?: string;
  maxLength?: number;
  onBlur?: FocusEventHandler;
  onCopy?: (value: string) => void;
  value?: string;
  inputRef?: RefObject<HTMLInputElement>;
  error?: boolean;
  required?: boolean;
} & typeof defaultProps;

export interface TextInputState {
  value?: string;
}

const defaultProps = {
  withCopyButton: false,
  testId: 'cf-ui-text-input',
  disabled: false,
  required: false,
  width: 'full',
};

export class TextInput extends Component<TextInputProps, TextInputState> {
  static defaultProps = defaultProps;

  state = {
    value: this.props.value,
  };

  componentWillReceiveProps(nextProps: TextInputProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  handleFocus = (e: FocusEvent) => {
    if (this.props.disabled) {
      (e.target as HTMLInputElement).select();
    }
  };

  render() {
    const {
      extraClassNames,
      withCopyButton,
      placeholder,
      maxLength,
      disabled,
      required,
      onChange,
      testId,
      onBlur,
      onCopy,
      error,
      width,
      value,
      type,
      name,
      id,
      inputRef,
      ...otherProps
    } = this.props;

    const widthClass = `TextInput--${width}`;
    const classNames = cn(
      styles['TextInput'],
      extraClassNames,
      styles[widthClass],
      {
        [styles['TextInput--disabled']]: disabled,
        [styles['TextInput--negative']]: error,
      },
    );

    return (
      <div className={classNames}>
        <input
          aria-label={name}
          className={styles['TextInput__input']}
          id={id}
          name={name}
          required={required}
          placeholder={placeholder}
          maxLength={maxLength}
          data-test-id={testId}
          disabled={disabled}
          onBlur={onBlur}
          onFocus={this.handleFocus}
          onChange={e => {
            if (disabled) return;

            if (onChange) {
              onChange(e);
            }
            this.setState({ value: e.target.value });
          }}
          value={this.state.value}
          type={type}
          ref={inputRef}
          {...otherProps}
        />
        {withCopyButton && (
          <CopyButton
            onCopy={onCopy}
            copyValue={this.state.value}
            extraClassNames={styles['TextInput__copy-button']}
          />
        )}
      </div>
    );
  }
}

export default TextInput;
