class StringUtil {

  static isBlank(value: string | null): boolean {
    return value?.trim() ? false : true;
  }

  static cleanString(value: string) {
    return value.trim().replace(/\s{2,}/g, " ");
  }
}

export default StringUtil;
