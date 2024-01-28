// import { isObject, isString } from '/@/utils/is';
// import dayjs from 'dayjs';

// const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm';

// export function formatRequestDate(params: Recordable) {
//   if (Object.prototype.toString.call(params) !== '[object Object]') {
//     return;
//   }

// for (const key in params) {
//   if (dayjs.isDayjs(params[key])) {
//     params[key] = params[key].format(DATE_TIME_FORMAT);
//   }
//   if (isString(key)) {
//     const value = params[key];
//     if (value) {
//       try {
//         params[key] = isString(value) ? value.trim() : value;
//       } catch (error) {
//         throw new Error(error);
//       }
//     }
//   }
//   if (isObject(params[key])) {
//     formatRequestDate(params[key]);
//   }
// }
// }
