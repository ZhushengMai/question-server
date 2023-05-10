// 非 0 正整数
export const regPositive = /^[1-9]\d*$/;
export const regMobileCN =
  /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;

// 非 0 正整数 或 空
export const regPositiveOrEmpty = /\s*|^[1-9]\d*$/;
