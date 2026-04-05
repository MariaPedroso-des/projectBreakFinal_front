//aqui tienen que ir condicionales, si es tipo select.. X, si es range, otros campos. Tendría que hacer map por todos los filtros
import styles from './Filters.module.css'

const OvernightsFilters = ({ filters, handleFiltersChange, filtersConfig, resetFilters }) => {
  return (
    <section className={styles.filtersSec}>
      {filtersConfig.map((filter) => {
        if (filter.type === 'select') {
          return (
            <div key={filter.name} className={styles.filterItem}>
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
            </div>
          )
        }
        if(filter.type === 'range') {
          return (
            <div key={filter.name} className={styles.rangeWrap}>
              <label htmlFor={filter.name} className={styles.rangeLabel}>
                {filter.label}: <span className={styles.rangeValue}>{filters[filter.name]}</span>
              </label>
              <input
                className={styles.filterControl}
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
      <div className={styles.filtersActions}>
        <button type="button" onClick={resetFilters}>Limpiar filtros</button>
      </div>
  </section>
  )
}

export default OvernightsFilters