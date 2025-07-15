import { useEffect } from 'react'
import './GeneradorTabla.css' // Si tenías algún estilo

// 👇 Importa tus funciones aquí si están en otro archivo
// import { generarTabla } from '../utils/generarTabla'

function GeneradorTabla() {
  useEffect(() => {
    // Pega aquí directamente toda la lógica JS que mandaste
    function generarTabla() {
      const numVariables = parseInt(document.getElementById('variables').value)
      const numRestricciones = parseInt(document.getElementById('restricciones').value)
      const tablaContainer = document.getElementById('tablaContainer')
      tablaContainer.innerHTML = ''

      if (isNaN(numVariables) || isNaN(numRestricciones) || numVariables <= 0 || numRestricciones <= 0) {
        tablaContainer.innerHTML = '<p style="color:red;">Por favor, ingrese un número válido de variables y restricciones.</p>'
        return
      }

      let tabla = '<table class="table table-bordered"><thead><tr><th></th>'
      for (let i = 1; i <= numVariables; i++) {
        tabla += `<th>X<sub>${i}</sub></th>`
      }
      tabla += `<th>Relación</th><th>Resultado</th><th>Ecuación</th></tr></thead><tbody>`

      tabla += `<tr id="filaZ"><td id="tipoZLabel">Maximizar</td>`
      for (let i = 0; i < numVariables; i++) {
        tabla += `<td><input type="number" name="z[${i}]" class="zcoef" data-col="${i}" value="0" style="width: 50px;"></td>`
      }
      tabla += `<td colspan="2"></td><td><output id="eqZ" class="eq-output">Z = 0</output></td></tr>`

      for (let r = 0; r < numRestricciones; r++) {
        tabla += `<tr data-row="${r}"><td>R${r + 1}</td>`
        for (let v = 0; v < numVariables; v++) {
          tabla += `<td><input type="number" name="a[${r}][${v}]" class="coef" data-row="${r}" data-col="${v}" value="0" style="width: 50px;"></td>`
        }
        tabla += `
          <td>
            <select name="rel[${r}]" class="rel" data-row="${r}">
              <option value="<=">&le;</option>
              <option value="=">=</option>
              <option value=">=">&ge;</option>
            </select>
          </td>
          <td><input type="number" name="b[${r}]" class="res" data-row="${r}" value="0" style="width: 50px;"></td>
          <td><output id="eq${r}" class="eq-output">0</output></td>
        </tr>`
      }

      tabla += '</tbody></table>'
      tablaContainer.innerHTML = tabla

      document.querySelectorAll('.zcoef, input[name="tipoZ"]').forEach(input => {
        input.addEventListener('input', actualizarZ)
        input.addEventListener('change', actualizarZ)
      })

      tablaContainer.querySelectorAll('input.coef, select.rel, input.res').forEach(input => {
        input.addEventListener('input', actualizarEcuaciones)
      })

      actualizarZ()
      actualizarEcuaciones()
    }

    function actualizarZ() {
      const zInputs = document.querySelectorAll('.zcoef')
      const tipoZ = 'max' // Fijo, o haz que lea de radio si lo agregas
      document.getElementById('tipoZLabel').textContent = tipoZ === 'max' ? 'Maximizar' : 'Minimizar'

      let eqZ = ''
      zInputs.forEach((input, i) => {
        const val = parseFloat(input.value) || 0
        if (val !== 0) {
          const sign = (val > 0) ? (eqZ === '' ? '' : '+') : '-'
          const coefAbs = Math.abs(val)
          const coefDisplay = (coefAbs === 1) ? '' : coefAbs
          const term = `${coefDisplay}X<sub>${i + 1}</sub>`
          eqZ += `${sign}${term}`
        }
      })

      if (eqZ === '') eqZ = '0'
      if (eqZ.startsWith('+')) eqZ = eqZ.substring(1)
      document.getElementById('eqZ').innerHTML = `Z = ${eqZ}`
    }

    function actualizarEcuaciones() {
      const numRestricciones = parseInt(document.getElementById('restricciones').value) || 0
      for (let r = 0; r < numRestricciones; r++) {
        const row = document.querySelector(`#tablaContainer tr[data-row="${r}"]`)
        if (!row) continue

        const coefInputs = row.querySelectorAll(`input[name^="a[${r}]"]`)
        const relSelect = row.querySelector(`select[name="rel[${r}]"]`)
        const resultadoInput = row.querySelector(`input[name="b[${r}]"]`)
        const eqOutput = document.getElementById(`eq${r}`)

        if (!coefInputs.length || !relSelect || !resultadoInput || !eqOutput) continue

        const rel = relSelect.value.replace('<=', '&le;').replace('>=', '&ge;')
        const resultado = resultadoInput.value || 0

        let eq = ''
        coefInputs.forEach((input, index) => {
          const val = parseFloat(input.value) || 0
          if (val !== 0) {
            const sign = (val > 0) ? (eq === '' ? '' : '+') : '-'
            const coefAbs = Math.abs(val)
            const coefDisplay = (coefAbs === 1) ? '' : coefAbs
            const term = `${coefDisplay}X<sub>${index + 1}</sub>`
            eq += `${sign}${term}`
          }
        })

        if (eq === '') eq = '0'
        if (eq.startsWith('+')) eq = eq.substring(1)
        eqOutput.innerHTML = `${eq} ${rel} ${resultado}`
      }
    }

    // Ejecutamos al cargar
    generarTabla()
  }, [])

  return (
    <div className="container my-5">
      <h2>Generador de Tabla</h2>

      <div className="mb-3">
        <label>Número de variables:</label>
        <input type="number" id="variables" defaultValue={2} style={{ width: '60px', marginRight: '1rem' }} />

        <label>Número de restricciones:</label>
        <input type="number" id="restricciones" defaultValue={2} style={{ width: '60px' }} />
      </div>

      <div id="tablaContainer"></div>
    </div>
  )
}

export default GeneradorTabla
