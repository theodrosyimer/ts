// type AppFactory<TObj> = <T extends TObj, K extends keyof T>(
//   object: T
// ) => (methodName: K) => (input: number) => AppFactoryReturnType<T[K]>
// type AppFactoryReturnType<T,K extends keyof T> = T[K] extends (...args: any) => infer R ? R : never

type Metric = "metric";
type Imperial = "imperial";

type MeasurementSystem = Metric | Imperial;

type Converter = {
  metric: (n: number) => number;
  imperial: (n: number) => number;
};

const METRIC_TO_IMPERIAL_RATIO = 2.2046226218;
const IMPERIAL_TO_METRIC_RATIO = 0.45359237;

const CONVERSION_RATIOS = {
  metric: METRIC_TO_IMPERIAL_RATIO,
  imperial: IMPERIAL_TO_METRIC_RATIO,
} as const;

const appFactory =
  <T extends Converter, K extends keyof Converter>(type: K) =>
  (converter: T) =>
  (input: number) => {
    if (converter == null) throw new Error("You need to provide an object");

    if (type == null)
      throw new Error(
        "You need to provide an existing method name from your object"
      );

    if (!converter[type])
      throw new Error(`${JSON.stringify(converter)} must have methods`);

    if (input == null) throw new Error("You need to provide an input");

    if (typeof input !== "number")
      throw new Error("Your input must be an number");

    return converter[type](input); /* as AppFactoryReturnType<T,K> */
  };

/**
@link [typescript - Element implicitly has an 'any' type because expression of type 'string' can't be used to index - Stack Overflow](https://stackoverflow.com/questions/57086672/element-implicitly-has-an-any-type-because-expression-of-type-string-cant-b)
*/
const convertTo = (type: MeasurementSystem) => (n: number) =>
  n * CONVERSION_RATIOS[type];

const getResultFromMetricInput = appFactory("metric");
const getResultFromImperialInput = appFactory("imperial");

// ///////////////////////////////////////

const maintenanceFunctions = {
  metric: (n: number) => Math.round(convertTo("metric")(n) * 15),
  imperial: (n: number) => Math.round(n * 15),
} as const satisfies Converter;

export const getCaloriesToMaintainBodyweightFromMetricInput =
  getResultFromMetricInput(maintenanceFunctions);
export const getCaloriesToMaintainBodyweightFromImperialInput =
  getResultFromImperialInput(maintenanceFunctions);
// getCaloriesToMaintainBodyweightFromImperialInput(154.324) /*?*/

// ///////////////////////////////////////

/* 1.6 for muscle growth, 0.8 to maintain muscle */
const PROTEIN_INTAKE_PER_BODYWEIGHT_RATIO = 2 as const;

const proteinIntakeFunctions = {
  metric: (bodyweight: number) =>
    Math.round(bodyweight * PROTEIN_INTAKE_PER_BODYWEIGHT_RATIO),
  imperial: (bodyweight: number) =>
    Math.round(
      convertTo("imperial")(bodyweight) * PROTEIN_INTAKE_PER_BODYWEIGHT_RATIO
    ),
} as const satisfies Converter;

export const getProteinIntakePerBodyweightFromMetricInput =
  getResultFromMetricInput(proteinIntakeFunctions);

export const getProteinIntakePerBodyweightFromImperialInput =
  getResultFromImperialInput(proteinIntakeFunctions);
// getProteinIntakePerBodyweightFromImperialInput(154.324) /*?*/

// ///////////////////////////////////////

const MUSCLE_GROWTH_RATIO_PER_BODYWEIGHT = 0.1 as const; /* 10% */

const getCaloriesToMuscleGrowth =
  (type: MeasurementSystem) => (input: number) => {
    let result = 0;
    if (type === "metric")
      result = getCaloriesToMaintainBodyweightFromMetricInput(input);
    if (type === "imperial")
      result = getCaloriesToMaintainBodyweightFromImperialInput(input);
    return result + result * MUSCLE_GROWTH_RATIO_PER_BODYWEIGHT;
  };

export const getCaloriesToMuscleGrowthFromMetricInput =
  getCaloriesToMuscleGrowth("metric");
export const getCaloriesToMuscleGrowthFromImperialInput =
  getCaloriesToMuscleGrowth("imperial");

// getCaloriesToMuscleGrowthFromImperialInput(154.324) /*?*/

// ///////////////////////////////////////

getCaloriesToMaintainBodyweightFromMetricInput(69); /*?*/

getProteinIntakePerBodyweightFromMetricInput(69); /*?*/

getCaloriesToMuscleGrowthFromMetricInput(69); /*?*/
