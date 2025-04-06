import icons from "@/constants/icons";
import images from "@/constants/images";

const slides = [
  {
    id: 1,
    image: images.amicoPng,
    title: 'Hey! Why Does Everything Looks So Different?',
    titleHighlight: 'Everything',
    subtitle: "We've built a whole app to make managing your money simpler. All your finances all in one place, all with a fresh new look.",
  },
  {
    id: 2,
    image: images.amicoPng,
    title: "You've got other places you want to be, We get it",
    titleHighlight: 'places you want to be',
    subtitle: 'Sed sem lacinia mauris bibendum rhoncus vitae magna magna duis. Morbi donec et vel non vulputate.',
  },
  {
    id: 3,
    image: images.amicoPng,
    title: "Luckily, we're not the jealous type",
    titleHighlight: '',
    subtitle: 'Sed sem lacinia mauris bibendum rhoncus vitae magna magna duis. Morbi donec et vel non vulputate.',
  },
  {
    id: 4,
    image: images.amicoPng,
    title: 'Get your money moving with peace of mind',
    titleHighlight: 'with peace',
    subtitle: 'Sed sem lacinia mauris bibendum rhoncus vitae magna magna duis. Morbi donec et vel non vulputate.',
  },
  {
    id: 5,
    image: images.amicoPng,
    title: "It's Your account, so Own it",
    titleHighlight: 'Own',
    subtitle: 'Check out our menu to access some new features. Manage your personal details, welcome screen and preferred name.',
  },
  {
    id: 6,
    image: images.amicoPng,
    title: "It's Your account, so Own it",
    titleHighlight: 'Own',
    subtitle: 'Sed sem lacinia mauris bibendum rhoncus vitae magna magna duis. Morbi donec et vel non vulputate.',
  },
  {
    id: 7,
    image: images.SliderImage1,
    title: "Enough About Us, now It's All About You",
    titleHighlight: 'About',
    subtitle: "It's time to get stuck in.But we may check back in a while to see how you are getting on.",
  }
];

const bills = [
  {
    id: 1,
    title: "Bills",
    icon: icons.billsIcon,
    description: "Water, electricity, insurance, chamber of commerce etc"
  },
  {
    id: 2,
    title: "Taxes",
    icon: icons.tax,
    description: "Spanish Tax Administrative Agency"
  }
];

const latestBills = [
  {
    id: 1,
    date: '03 MAR',
    day: 'Friday',
    biller: 'Santander Generales',
    description: 'Gravida a cras id quam pellentesque',
    amount: '-$400.00',
    status: 'APPLIED',
  },
  {
    id: 2,
    date: '03 MAR',
    day: 'Friday',
    biller: 'Santander Generales',
    description: 'Gravida a cras id quam pellentesque',
    amount: '-$400.00',
    status: 'APPLIED',
  },
  {
    id: 3,
    date: '03 MAR',
    day: 'Friday',
    biller: 'Santander Generales',
    description: 'Gravida a cras id quam pellentesque',
    amount: '-$400.00',
    status: 'APPLIED',
  },
  {
    id: 4,
    date: '03 MAR',
    day: 'Friday',
    biller: 'Santander Generales',
    description: 'Gravida a cras id quam pellentesque',
    amount: '-$400.00',
    status: 'APPLIED',
  },
  {
    id: 5,
    date: '03 MAR',
    day: 'Friday',
    biller: 'Santander Generales',
    description: 'Gravida a cras id quam pellentesque',
    amount: '-$400.00',
    status: 'APPLIED',
  },
  {
    id: 6,
    date: '03 MAR',
    day: 'Friday',
    biller: 'Santander Generales',
    description: 'Gravida a cras id quam pellentesque',
    amount: '-$400.00',
    status: 'APPLIED',
  },
];
export {
  slides,
  bills,
  latestBills
}