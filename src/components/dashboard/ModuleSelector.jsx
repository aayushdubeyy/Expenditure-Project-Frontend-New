export function ModuleSelector({ active_module, module_options, onSelect }) {
  return (
    <section className='module_selector'>
      {module_options.map((module_data) => (
        <button
          key={module_data.id}
          type='button'
          className={getButtonClassName(active_module, module_data.id)}
          onClick={() => onSelect(module_data.id)}
        >
          <span>{module_data.title}</span>
          <small>{module_data.subtitle}</small>
        </button>
      ))}
    </section>
  )
}

function getButtonClassName(active_module, module_id) {
  if (active_module === module_id) return 'module_button module_button_active'
  return 'module_button'
}
