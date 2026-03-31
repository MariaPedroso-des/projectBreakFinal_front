//aqui tienen que ir condicionales, si es tipo select.. X, si es range, otros campos. Tendría que hacer map por todos los filtros

const HikingFilters = ({ filters, handleFiltersChange, filtersConfig, resetfilters }) => {
  return (
    <section className="filtersSec">
      {filtersConfig.map((filter) => {
        if (filter.type === 'select') {
          return (
            <select
              key={filter.name} 
              name={filter.name}
              value={filters[filter.name]} 
              onChange={handleFiltersChange}
              >
                <option value="">{filter.defaultOption}</option>
                  {filter.options.map((option) => {
                    return (
                    <option key={option} value={option}>
                      {option}
                    </option>
                    )
                })}
            </select>
          )
        }
        if(filter.type === 'range') {
          return (
            <div key={filter.name}>
              <label htmlFor={filter.name}>
                {filter.label}: {filters[filter.name]} km
              </label>
              <input 
                type="range"
                id={filter.name}
                name={filter.name}
                min={filter.min}
                max={filter.max}
                step="1"
                value={filters[filter.name]}
                onChange={handleFiltersChange}
              />
            </div>
          )
        }
        return null
      })}
      <div>
        <button type="button" onClick={resetfilters}>Limpiar filtros</button>
      </div>
  </section>
  )
}

export default HikingFilters