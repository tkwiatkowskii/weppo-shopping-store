export function BindQueryParametersToModel<T>
  (req: any, model: T) {

  for (const key in model) {
    if (req.query[key]) {
      model[key] = req.query[key];
    }
  }

  return model;
}