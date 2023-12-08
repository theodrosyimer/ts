const appFactory2 = (object) =>
  (methodName) =>
    (input) => {
      if (methodName == null) return 'You need to provide an existing method name from your object'

      if (!(object[methodName] instanceof Function)) return `${JSON.stringify(object)} must have methods`

      if (input == null) return 'You need to provide an input'

      if (typeof input !== 'number') return 'Your input must be an number'

      return object[methodName](input)
    }

const METRIC_TO_IMPERIAL_RATIO = 2.2046226218
const IMPERIAL_TO_METRIC_RATIO = 0.45359237

const CONVERSION_RATIOS = Object.freeze({
  metric: METRIC_TO_IMPERIAL_RATIO,
  imperial: IMPERIAL_TO_METRIC_RATIO
})

/**
@link [typescript - Element implicitly has an 'any' type because expression of type 'string' can't be used to index - Stack Overflow](https://stackoverflow.com/questions/57086672/element-implicitly-has-an-any-type-because-expression-of-type-string-cant-b)
*/
const convert = (type) => (n) => n * (CONVERSION_RATIOS[type])

/////////////////////////////////////////

const maintenanceFunctions = Object.freeze({
  metric: (n, type = 'metric') =>
    type === 'metric' ? Math.round(convert(type)(n) * 15) : n * 15,
  imperial: (n) => Math.round(n * 15)
})

const maintenanceApp = appFactory2(maintenanceFunctions)

export const getCaloriesToMaintainBodyweightFromMetricInput = maintenanceApp("metric")
export const getCaloriesToMaintainBodyweightFromImperialInput = maintenanceApp('imperial')

getCaloriesToMaintainBodyweightFromMetricInput(70)  /*?*/
getCaloriesToMaintainBodyweightFromImperialInput(154.324)  /*?*/

/////////////////////////////////////////

const MUSCLE_GROWTH_RATIO_PER_BODYWEIGHT = 0.1 /* 10% */

const getCaloriesToMuscleGrowth = (type) => (input) => {
  let r = 0
  if (type === 'metric') r = getCaloriesToMaintainBodyweightFromMetricInput(input)
  if (type === 'imperial') r = getCaloriesToMaintainBodyweightFromImperialInput(input)
  return r + (r * MUSCLE_GROWTH_RATIO_PER_BODYWEIGHT)
}

export const getCaloriesToMuscleGrowthFromMetriclInput = getCaloriesToMuscleGrowth('metric')
export const getCaloriesToMuscleGrowthFromImperialInput = getCaloriesToMuscleGrowth("imperial")

getCaloriesToMuscleGrowthFromMetriclInput(70)  /*?*/
getCaloriesToMuscleGrowthFromImperialInput(154.324)  /*?*/

/////////////////////////////////////////

const PROTEIN_INTAKE_PER_BODYWEIGHT = 1.6 /* for muscle growth, 0.8 to maintain muscle */

const proteinIntakeFunctions = Object.freeze({
  metric: (bodyweight) => Math.round(bodyweight * PROTEIN_INTAKE_PER_BODYWEIGHT),
  imperial: (bodyweight) => Math.round(convert('imperial')(bodyweight) * PROTEIN_INTAKE_PER_BODYWEIGHT),
})

const proteinIntakeApp = appFactory2(proteinIntakeFunctions)

export const getProteinIntakePerBodyweightFromMetricInput = proteinIntakeApp('metric')
export const getProteinIntakePerBodyweightFromImperialInput = proteinIntakeApp('imperial')

getProteinIntakePerBodyweightFromMetricInput(70)  /*?*/
getProteinIntakePerBodyweightFromImperialInput(154.324)  /*?*/

/////////////////////////////////////////

export {}
