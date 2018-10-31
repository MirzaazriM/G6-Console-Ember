import { helper } from '@ember/component/helper';

export function getArrayItem(array) {
  // return first item of the array
  var image = array[0][0];
  return image;
}

export default helper(getArrayItem);
