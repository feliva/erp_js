export abstract class Model {
  constructor(data?: any) {
    if (data) {
      Object.assign(this, data);
    }
  }
}