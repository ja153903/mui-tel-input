/* eslint-disable react/hook-use-state */
import React from 'react'
import FlagMenuItem from '@components/FlagMenuItem/FlagMenuItem'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import type { MuiTelInputContinent } from '@shared/constants/continents'
import { ISO_CODES, MuiTelInputCountry } from '@shared/constants/countries'
import { DEFAULT_LANG } from '@shared/constants/lang'
import {
  filterCountries,
  sortAlphabeticallyCountryCodes
} from '@shared/helpers/country'
import { getDisplayNames } from '@shared/helpers/intl'

export type FlagsListAutoCompleteProps = {
  isoCode: MuiTelInputCountry | null
  onlyCountries?: MuiTelInputCountry[]
  excludedCountries?: MuiTelInputCountry[]
  preferredCountries?: MuiTelInputCountry[]
  langOfCountryName?: string
  continents?: MuiTelInputContinent[]
  onSelectCountry: (isoCode: MuiTelInputCountry) => void
}

// While it's convenient to use existing components, we may want to
// optimize a bit more and create one from scratch before we decide to
// submit this for PR

const FlagsListAutoComplete = (props: FlagsListAutoCompleteProps) => {
  const {
    isoCode,
    onSelectCountry,
    excludedCountries,
    onlyCountries,
    langOfCountryName,
    continents,
    preferredCountries
  } = props

  // Idem for the translations
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

  const countriesFilteredWithDisplayName = React.useMemo(() => {
    return countriesFiltered.map((isoCodeItem) => {
      const displayName = displayNames.of(isoCodeItem) ?? isoCodeItem
      return {
        isoCodeItem,
        displayName
      }
    })
  }, [countriesFiltered, displayNames])

  return (
    <Autocomplete
      sx={{ width: 400 }}
      renderInput={(params) => {
        return <TextField {...params} size="small" />
      }}
      options={countriesFilteredWithDisplayName}
      getOptionLabel={(options) => {
        return options.displayName
      }}
      filterOptions={(options, { inputValue }) => {
        return options.filter((item) => {
          return (
            item.isoCodeItem.toLowerCase().includes(inputValue) ||
            item.displayName.toLowerCase().includes(inputValue)
          )
        })
      }}
      renderOption={(_props, option) => {
        return (
          <FlagMenuItem
            onSelectCountry={onSelectCountryMemo}
            key={option.isoCodeItem}
            isoCode={option.isoCodeItem}
            displayNames={displayNames}
            selected={option.isoCodeItem === isoCode}
            id={`country-${option.isoCodeItem}`}
          />
        )
      }}
    />
  )
}

FlagsListAutoComplete.defaultProps = {
  onlyCountries: [],
  excludedCountries: [],
  continents: [],
  preferredCountries: [],
  langOfCountryName: DEFAULT_LANG
}

// For performance reasons, we don't need to rerender all items when closing the list
export default FlagsListAutoComplete
