// 导入 进入点的宿主 html 和 style 依赖
import './style.scss';
import 'mobile-responsive';


import compose from './compose';

function app(...args) {
  console.log(...args);
  text(...args);
}

function text(text) {
  console.log(text);
}

let obj = {
  name:'jina',
  age:10
}

let arr = [1,2,3,4];

console.log(...obj);