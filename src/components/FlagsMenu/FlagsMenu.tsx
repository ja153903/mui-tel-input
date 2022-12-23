import React from 'react'
import FlagsList from '@components/FlagsList/FlagsList'
import FlagsListAutoComplete from '@components/FlagsListAutoComplete/FlagsListAutoComplete'
import Menu, { MenuProps } from '@mui/material/Menu'
import type { MuiTelInputContinent } from '@shared/constants/continents'
import { MuiTelInputCountry } from '@shared/constants/countries'
import { DEFAULT_LANG } from '@shared/constants/lang'

export type FlagsMenuProps = Partial<MenuProps> & {
  isoCode: MuiTelInputCountry | null
  onlyCountries?: MuiTelInputCountry[]
  excludedCountries?: MuiTelInputCountry[]
  preferredCountries?: MuiTelInputCountry[]
  langOfCountryName?: string
  continents?: MuiTelInputContinent[]
  onSelectCountry: (isoCode: MuiTelInputCountry) => void
  searchCountries?: boolean
}

const FlagsMenu = (props: FlagsMenuProps) => {
  const {
    anchorEl,
    isoCode,
    onSelectCountry,
    excludedCountries,
    onlyCountries,
    langOfCountryName,
    continents,
    preferredCountries,
    className,
    searchCountries,
    ...rest
  } = props

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      id="select-country"
      className={`MuiTelInput-Menu ${className || ''}`}
      MenuListProps={{
        role: 'listbox',
        'aria-activedescendant': isoCode ? `country-${isoCode}` : '',
        'aria-labelledby': 'select-country'
      }}
      {...rest}
    >
      {searchCountries ? (
        <FlagsListAutoComplete
          onlyCountries={onlyCountries}
          excludedCountries={excludedCountries}
          preferredCountries={preferredCountries}
          continents={continents}
          isoCode={isoCode}
          langOfCountryName={langOfCountryName}
          onSelectCountry={onSelectCountry}
        />
      ) : (
        <FlagsList
          onlyCountries={onlyCountries}
          excludedCountries={excludedCountries}
          preferredCountries={preferredCountries}
          continents={continents}
          isoCode={isoCode}
          langOfCountryName={langOfCountryName}
          onSelectCountry={onSelectCountry}
        />
      )}
    </Menu>
  )
}

FlagsMenu.defaultProps = {
  onlyCountries: [],
  excludedCountries: [],
  continents: [],
  preferredCountries: [],
  langOfCountryName: DEFAULT_LANG,
  searchCountries: false
}

export default FlagsMenu
