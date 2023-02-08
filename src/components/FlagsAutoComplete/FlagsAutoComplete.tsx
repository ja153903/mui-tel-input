/* eslint-disable react/hook-use-state */
import React from 'react'
import type { AutocompleteProps } from '@mui/material/Autocomplete'
import Autocomplete from '@mui/material/Autocomplete'
import { MuiTelInputContinent } from '@shared/constants/continents'
import { ISO_CODES, MuiTelInputCountry } from '@shared/constants/countries'
import { DEFAULT_LANG } from '@shared/constants/lang'
import {
  filterCountries,
  sortAlphabeticallyCountryCodes
} from '@shared/helpers/country'
import { getDisplayNames } from '@shared/helpers/intl'
import FlagsAutocompleteInput from './FlagAutocompleteInput'
import FlagsAutocompleteOption from './FlagAutocompleteOption'

// NOTE: Not sure about the type here, but I assume we want to allow users to modify the autocomplete as well

export type FlagsAutocompleteProps<T> = {
  isoCode: MuiTelInputCountry | null
  onlyCountries?: MuiTelInputCountry[]
  excludedCountries?: MuiTelInputCountry[]
  preferredCountries?: MuiTelInputCountry[]
  langOfCountryName?: string
  continents?: MuiTelInputContinent[]
  onSelectCountry: (isoCode: MuiTelInputCountry) => void
} & AutocompleteProps<T, undefined, undefined, undefined>

const FlagsAutocomplete = (props: FlagsAutocompleteProps<unknown>) => {
  const {
    isoCode,
    onlyCountries,
    excludedCountries,
    preferredCountries,
    langOfCountryName,
    continents,
    onSelectCountry,
    ...autocompleteProps
  } = props

  const [displayNames] = React.useState(() => {
    return getDisplayNames(langOfCountryName)
  })

  // Don't need to refilter when the list is already displayed
  const [countriesFiltered] = React.useState(() => {
    const ISO_CODES_SORTED = sortAlphabeticallyCountryCodes(
      ISO_CODES,
      displayNames
    )

    return filterCountries(ISO_CODES_SORTED, {
      onlyCountries,
      excludedCountries,
      continents,
      preferredCountries
    })
  })

  // Same for the callback, we don't trust the parent for useCallback or not
  const [onSelectCountryMemo] = React.useState(() => {
    return onSelectCountry
  })

  // TODO: Figure out how to render the input (new component for FlagItem)
  // TODO: Figure out how to render each option
  // TODO: Figure out how to properly pass the options
  // TODO: Figure out how to do onSelect related stuff
  return (
    <Autocomplete
      {...autocompleteProps}
      disablePortal
      renderInput={(params) => {
        return <FlagsAutocompleteInput {...params} />
      }}
      renderOption={(optionProps, _option, _state) => {
        return <FlagsAutocompleteOption {...optionProps} />
      }}
      options={[]}
    />
  )
}

FlagsAutocomplete.defaultProps = {
  onlyCountries: [],
  excludedCountries: [],
  continents: [],
  preferredCountries: [],
  langOfCountryName: DEFAULT_LANG
}
export default FlagsAutocomplete
