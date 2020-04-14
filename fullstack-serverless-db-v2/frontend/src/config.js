import image0 from './assets/p1.jpg';
import image1 from './assets/p2.jpg';

const defaultPrizes = [
  {
    prizeId: '1',
    start: '09:00',
    title: '腾讯云公仔',
    unit: '枚',
    subtitle: '蓝色Q萌小公仔',
    value: 25,
    src: image0,
    started: false,
    empty: false,
  },
  {
    prizeId: '2',
    start: '12:00',
    title: '计算器笔记本',
    unit: '个',
    subtitle: '简单实用笔记本',
    value: 10,
    src: image1,
    started: false,
    empty: false,
  },
  {
    prizeId: '3',
    start: '14:00',
    title: '腾讯云公仔',
    unit: '枚',
    subtitle: '蓝色Q萌小公仔',
    value: 25,
    src: image0,
    started: false,
    empty: false,
  },
  {
    prizeId: 4,
    start: '17:00',
    title: '计算器笔记本',
    unit: '个',
    subtitle: '简单实用笔记本',
    value: 10,
    src: image1,
    started: false,
    empty: false,
  },
];

const defaultPrizeCounts = {
  '1': 0,
  '2': 0,
  '3': 0,
  '4': 0,
};

const prizeLimitMap = {
  '1': 10,
  '2': 10,
  '3': 10,
  '4': 10,
};

const UID_KEY = 'gmtc_uid';

export {
  defaultPrizes,
  defaultPrizeCounts,
  prizeLimitMap,
  UID_KEY,
};
