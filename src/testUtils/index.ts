import type { MuiTelInputCountry } from '@shared/constants/countries'
import {
  fireEvent,
  screen,
  waitForElementToBeRemoved,
  within
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

export function getInputElement(): HTMLInputElement {
  return screen.getByRole('textbox')
}

export function getButtonElement(): HTMLButtonElement {
  return screen.getByRole('button')
}

export function expectButtonIsFlagOf(isoCode: MuiTelInputCountry) {
  expect(within(getButtonElement()).getByTestId(isoCode)).toBeInTheDocument()
}

export function expectButtonNotIsFlagOf(isoCode: MuiTelInputCountry) {
  expect(within(getButtonElement()).queryByRole(isoCode)).toBeNull()
}

export function expectButtonContainsCallingCode(callingCode: string) {
  expect(screen.getByText(`+${callingCode}`)).toBeInTheDocument()
}

export async function typeInInputElement(
  value: string
): Promise<{ result: string }> {
  const inputElement = getInputElement()
  await userEvent.type(inputElement, value, { delay: 1 })

  return { result: inputElement.value }
}

export function selectCountry(isoCode: MuiTelInputCountry): void {
  fireEvent.click(getButtonElement())
  fireEvent.click(screen.getByTestId(`option-${isoCode}`))
}

export async function closeFlagsMenu(): Promise<void> {
  const backdrop = document.querySelector('.MuiBackdrop-root')

  if (backdrop) {
    fireEvent.click(backdrop)
    await waitForElementToBeRemoved(backdrop)
  }
}
