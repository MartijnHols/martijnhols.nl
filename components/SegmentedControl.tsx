import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ReactNode, useId } from 'react'

const visuallyHidden = css`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

const Container = styled.div`
  display: inline-flex;
  gap: 0.3em;
  background: var(--yellow50);
  padding: 0.3em 0.25em;
`
const Option = styled.div``
const Label = styled.label`
  padding: 0.25em 0.5em;

  input[type='radio']:checked + & {
    font-weight: bold;
    background: var(--yellow);
  }
  :hover {
    background: var(--yellow);
  }
  input[type='radio']:focus-visible + & {
    outline: var(--black) auto 1px;
  }
`

interface Props<TValue extends string | number | boolean = string> {
  name: string
  value: TValue
  onChange: (value: TValue) => void
  options: { value: TValue; label: ReactNode }[]
  className?: string
}

const SegmentedControl = <TValue extends string | number | boolean = string>({
  name,
  value,
  onChange,
  options,
  className,
}: Props<TValue>) => {
  const id = useId()

  return (
    <Container className={className}>
      {options.map((option) => (
        <Option key={String(option.value)}>
          <input
            type="radio"
            name={name}
            value={String(option.value)}
            onChange={(e) => {
              if (e.target.checked) {
                onChange(option.value)
              }
            }}
            checked={value === option.value}
            css={visuallyHidden}
            id={`${id}-${String(option.value)}`}
          />
          <Label htmlFor={`${id}-${String(option.value)}`}>
            {option.label}
          </Label>
        </Option>
      ))}
    </Container>
  )
}

export default SegmentedControl
