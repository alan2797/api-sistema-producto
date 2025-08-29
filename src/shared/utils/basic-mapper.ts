export class BasicMapper {
  static map<S extends object, T extends object>(source: S, target: T): T {
    Object.keys(target).forEach((key) => {
      if (key in source) {
        (target as any)[key] = (source as any)[key];
      }
    });
    return target;
  }
}
