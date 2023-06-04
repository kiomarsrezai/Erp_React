import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import BudgetMethodInput from "components/sections/inputs/budget-method-input";
import SectionGuard from "components/auth/section-guard";
import userStore from "hooks/store/user-store";
import LoadingButton from "@mui/lab/LoadingButton";
import PrintIcon from "@mui/icons-material/Print";
import IconButton from "@mui/material/IconButton";

import { FormEvent, ReactNode, useEffect, useState } from "react";
import { revenueChartFormConfig } from "config/features/revenue-chart-config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reactQueryKeys } from "config/react-query-keys-config";
import { accessNamesConfig } from "config/access-names-config";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import { checkHaveValue } from "helper/form-utils";
import { checkHavePermission, joinPermissions } from "helper/auth-utils";
import AreaInput from "components/sections/inputs/area-input";
import { ravandChartConfig } from "config/features/report/chart/ravand-chart-config";
import { ravandChartApi } from "api/report/ravand-chart-api";
import YearInput from "components/sections/inputs/year-input";
import { abstructBudgetConfig } from "config/features/report/budget/abstruct-budget-config";
import BudgetKindDeviationInput from "components/sections/inputs/budget-kind-deviation-input";
import { budgetDeviationConfig } from "config/features/budget/report/budget-deviation-config";
import { budgetDeviationApi } from "api/report/budget-deviation-api";
import { budgetDivationStimul } from "stimul/budget/report/divation/budget-divation-stimul";
import {
  getGeneralFieldItemArea,
  getGeneralFieldItemBudgetKindDeviation,
  getGeneralFieldItemProjectScale,
  getGeneralFieldItemYear,
} from "helper/export-utils";
import ProjectScaleInput from "components/sections/inputs/project-scale-input";
import { budgetProjectOprationConfig } from "config/features/budget/report/budget-project-opration-config";
import { budgetProjectOprationApi } from "api/report/budget-project-opration-api";
import { budgetProjectScaleStimul } from "stimul/budget/report/project-scale/budget-project-scale-stimul";
import BudgetSortKindInput from "components/sections/inputs/budget-sort-kind-input";
import { budgetReportShareStimul } from "stimul/budget/report/share/budget-share-stimul";

const mockedData = [
  {
    Code: 40201000010009,
    Description: "زیرسازی ، تراش  ، روکش و بازیافت آسفالت در مناطق هشتگانه",
    Mosavab: 3384000000000,
    Expense: 3384000000000,
    AreaNameShort: "مرکز",
    Column6: 3384000000000,
    Share: 0.0778873301634028,
    shareSum: 0.0778873301634028,
  },
  {
    Code: 10201000010000,
    Description: "تعریض خیابان نهج البلاغه",
    Mosavab: 2000000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 5384000000000,
    Share: 0.04603270104220023,
    shareSum: 0.12392003120560302,
  },
  {
    Code: 40105000010000,
    Description:
      "محروميت زدايي مناطق کم برخوردار شامل زیرسازی و آسفالت، دفع آبهای سطحی و اجرای فضای سبز و ... و نظارت كارگاهي آن",
    Mosavab: 1500000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 6884000000000,
    Share: 0.034524525781650175,
    shareSum: 0.15844455698725318,
  },
  {
    Code: 20401000030000,
    Description: "پرداخت انتقالی به سازمان خدمات موتوری",
    Mosavab: 1419566365000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 8303566365000,
    Share: 0.032673237044803946,
    shareSum: 0.19111779403205714,
  },
  {
    Code: 40104000020003,
    Description:
      "احداث محور L400 تقاطع غیر همسطح میدان شهید بندر ( با احتساب ارزش افزوده )",
    Mosavab: 1240000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 9543566365000,
    Share: 0.028540274646164144,
    shareSum: 0.2196580686782213,
  },
  {
    Code: 40106000040004,
    Description: "بهسازی پلهای راهنمایی ، دغاغله ،علوی، استادیوم و ملاشیه",
    Mosavab: 1200000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 10743566365000,
    Share: 0.027619620625320137,
    shareSum: 0.2472776893035414,
  },
  {
    Code: 40207000010001,
    Description:
      "اجرای مسیر پیاده، همسطح سازی و بهسازی پیاده روها، کفپوش گذاری، جدولگذاری و اجرای بتن دکوراتیو و مناسب سازی معابر پیاده",
    Mosavab: 1174900000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 11918466365000,
    Share: 0.027041910227240524,
    shareSum: 0.27431959953078194,
  },
  {
    Code: 40301000020000,
    Description: "خرید اتوبوس و مینی بوس(اوراق مشارکت)",
    Mosavab: 1000000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 12918466365000,
    Share: 0.023016350521100116,
    shareSum: 0.29733595005188207,
  },
  {
    Code: 40602000020000,
    Description: "احداث قطار شهری (اوراق مشارکت)",
    Mosavab: 1000000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 13918466365000,
    Share: 0.023016350521100116,
    shareSum: 0.3203523005729822,
  },
  {
    Code: 40104000070001,
    Description:
      "تکمیل و تعدیل قرارداد 2100/8971 - 99/3/11 موضوع طراحی و ساخت  تقاطع های غیرهمسطح میدان جمهوری و میدان دانشگاه ( ترک تشریفات با قرارگاه خاتم الانبیا ) ",
    Mosavab: 1000000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 14918466365000,
    Share: 0.023016350521100116,
    shareSum: 0.3433686510940823,
  },
  {
    Code: 10201000010000,
    Description: "تملک اراضی و املاک  ",
    Mosavab: 1000000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 15918466365000,
    Share: 0.023016350521100116,
    shareSum: 0.3663850016151824,
  },
  {
    Code: 40208000010001,
    Description: "محوطه سازی و زیباسازی میادین شهری-ورودی ها",
    Mosavab: 980300000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 16898766365000,
    Share: 0.022562928415834443,
    shareSum: 0.38894793003101685,
  },
  {
    Code: 40501000010002,
    Description: "تکمیل پارکینگ طبقاتی طالقانی اهواز ",
    Mosavab: 890000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 17788766365000,
    Share: 0.020484551963779102,
    shareSum: 0.409432481994796,
  },
  {
    Code: 40106000020000,
    Description:
      " احداث  تقاطع غیر همسطح  18 متری چهارم کیان آباد و 45 متری کیانشهر با ریل آهن وتقاطع غیرهمسطح کیانپارس",
    Mosavab: 800000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 18588766365000,
    Share: 0.01841308041688009,
    shareSum: 0.42784556241167604,
  },
  {
    Code: 20102000120000,
    Description: "باز زنده سازی حاشیه رودخانه کارون",
    Mosavab: 647000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 19235766365000,
    Share: 0.014891578787151775,
    shareSum: 0.44273714119882784,
  },
  {
    Code: 40104000040000,
    Description: "احداث  رمپ و لوپ های پل های روی رودخانه کارون ( پل هفتم)",
    Mosavab: 500000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 19735766365000,
    Share: 0.011508175260550058,
    shareSum: 0.4542453164593779,
  },
  {
    Code: 40602000010000,
    Description: "احداث قطار شهری",
    Mosavab: 500000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 20235766365000,
    Share: 0.011508175260550058,
    shareSum: 0.4657534917199279,
  },
  {
    Code: 1030300005,
    Description: "پرداخت انتقالی به سازمان زیباسازی",
    Mosavab: 422122372000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 20657888737000,
    Share: 0.009715716476750217,
    shareSum: 0.47546920819667815,
  },
  {
    Code: 40301000040000,
    Description: "اجرا وتجهیز خط ویژه حمل و نقل عمومی و خطوط BRT ",
    Mosavab: 400000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 21057888737000,
    Share: 0.009206540208440046,
    shareSum: 0.4846757484051182,
  },
  {
    Code: 40106000040003,
    Description: "بهسازي، تعمير و نگهداري  پل ها و تقاطع هاي غير همسطح سطح شهر",
    Mosavab: 400000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 21457888737000,
    Share: 0.009206540208440046,
    shareSum: 0.49388228861355826,
  },
  {
    Code: 20102000140000,
    Description: "پرداخت انتقالی به سازمان پارکها",
    Mosavab: 364528104000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 21822416841000,
    Share: 0.008390106616456037,
    shareSum: 0.5022723952300143,
  },
  {
    Code: 20201000010001,
    Description: "توسعه، تجهیز و تامین زیرساخت های لازم جهت آرامستان باغ فردوس",
    Mosavab: 300000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 22122416841000,
    Share: 0.006904905156330034,
    shareSum: 0.5091773003863443,
  },
  {
    Code: 20102000010001,
    Description: " احداث و راه اندازی و بهسازی پارک شهروند",
    Mosavab: 300000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 22422416841000,
    Share: 0.006904905156330034,
    shareSum: 0.5160822055426744,
  },
  {
    Code: 40302000010003,
    Description:
      "احداث، تکمیل و تجهیز پایانه ها و توقفگاه های مرکزی  اتوبوس و تاکسی",
    Mosavab: 300000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 22722416841000,
    Share: 0.006904905156330034,
    shareSum: 0.5229871106990044,
  },
  {
    Code: 40301000060000,
    Description:
      "خرید  قطعات یدکی اتوبوس و مینی بوس و  بازسازی اتوبوس و مینی بوس",
    Mosavab: 300000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 23022416841000,
    Share: 0.006904905156330034,
    shareSum: 0.5298920158553344,
  },
  {
    Code: 50301000020000,
    Description: " احداث ساختمان شهرداري مركزي",
    Mosavab: 279000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 23301416841000,
    Share: 0.006421561795386932,
    shareSum: 0.5363135776507214,
  },
  {
    Code: 40201000030000,
    Description: "پرداخت انتقالی به سازمان عمران شهری",
    Mosavab: 242470466000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 23543887307000,
    Share: 0.005580785236470488,
    shareSum: 0.5418943628871918,
  },
  {
    Code: 20603000020000,
    Description:
      "پرداخت انتقالی سازمان ساماندهی مشاغل شهری و فرآورده های کشاورزی",
    Mosavab: 234095092000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 23777982399000,
    shareSum: 0.547282377579933,
  },
  {
    Code: 20301000030000,
    Description: "پرداخت انتقالی به سازمان پسماند",
    Mosavab: 211267682000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 23989250081000,
    shareSum: 0.5521449886026253,
  },
  {
    Code: 20702000010001,
    Description:
      "پروژه دفع آبهای سطحی کوی علوی ( تکمیل قرارداد 2100/12550 - 1400/3/19 )",
    Mosavab: 200000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 24189250081000,
    shareSum: 0.5567482587068454,
  },
  {
    Code: 40201000010009,
    Description:
      "خرید قیر و  لکه گیری ، ترمیم سطوح آسفالتی دستی و ماشینی  در مناطق هشتگانه",
    Mosavab: 200000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 24389250081000,
    shareSum: 0.5613515288110654,
  },
  {
    Code: 20102000010028,
    Description: "پارک حجاب  (منطقه چهار)",
    Mosavab: 200000000000,
    Expense: 0,
    AreaNameShort: 4,
    Column6: 24589250081000,
    shareSum: 0.5659547989152854,
  },
  {
    Code: 40201000010025,
    Description: "تراش و روکش آسفالت معابردر سطح منطقه 2 شهرداری (منطقه دو )",
    Mosavab: 200000000000,
    Expense: 0,
    AreaNameShort: 2,
    Column6: 24789250081000,
    shareSum: 0.5705580690195055,
  },
  {
    Code: 40201000010062,
    Description:
      "روکش آسفالت معابر فرسوده (کوی علوی،کمپلوی شمالی و جنوبی،کوی عین دو،مندلی) (منطقه شش )",
    Mosavab: 200000000000,
    Expense: 0,
    AreaNameShort: 6,
    Column6: 24989250081000,
    shareSum: 0.5751613391237255,
  },
  {
    Code: 40201000010012,
    Description:
      "لکه گیری و ترمیم و نوار حفاری خیابانهای سطح منطقه (منطقه یک )",
    Mosavab: 174000000000,
    Expense: 0,
    AreaNameShort: 1,
    Column6: 25163250081000,
    shareSum: 0.5791661841143969,
  },
  {
    Code: 103030101,
    Description: "ساماندهی راسته های غیر رسمی (معاونت شهرسازی)",
    Mosavab: 160000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 25323250081000,
    shareSum: 0.5828488001977729,
  },
  {
    Code: 20102000120000,
    Description: "باز زنده سازی حاشیه رودخانه کارون",
    Mosavab: 153000000000,
    Expense: 0,
    AreaNameShort: 2,
    Column6: 25476250081000,
    shareSum: 0.5863703018275012,
  },
  {
    Code: 40804000010001,
    Description:
      "خرید،نصب، پشتیبانی، تجهیز و اجرای چراغ های راهنمایی، تابلوهای انتظامی، راهنمای مسیر و تجهیزات ترافیکی معابر تندراهی ساحلی شرقی ، سلیمانی، نفت، جمهوری، بهبهانی",
    Mosavab: 150000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 25626250081000,
    shareSum: 0.5898227544056662,
  },
  {
    Code: 40804000010002,
    Description:
      "خرید،نصب، پشتیبانی، تجهیز و اجرای چراغ های راهنمایی، تابلوهای انتظامی، راهنمای مسیر و تجهیزات ترافیکی معابر تندراهی ساحلی  غربی، مدرس،  اکباتان، گلستان، هاشمی",
    Mosavab: 150000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 25776250081000,
    shareSum: 0.5932752069838313,
  },
  {
    Code: 60602000150000,
    Description:
      "تعهدات شهرداری در احداث باغ موزه دفاع مقدس (به استناد حکم شماره 19 بودجه)",
    Mosavab: 150000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 25926250081000,
    shareSum: 0.5967276595619962,
  },
  {
    Code: 40201000010009,
    Description: "خرید قیر و  لکه گیری ، ترمیم سطوح آسفالتی  در مناطق هشتگانه",
    Mosavab: 149990888000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 26076240969000,
    shareSum: 0.6001799024151754,
  },
  {
    Code: 40201000010006,
    Description:
      " تهیه قیر و آسفالت بعهده کارفرما برای اجرای لکه گیری و ترمیم سطوح آسفالتی با سطح بیش از 50 مترمربع به صورت ماشینی و بین 20 و 50 مترمربع به صورت دستی و ترمیم نوار حفاری طولی به صورت دستی در سطح مناطق هشتگانه ( صورتجلسه سازمان عمران )",
    Mosavab: 145000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 26221240969000,
    shareSum: 0.6035172732407349,
  },
  {
    Code: 40201000010008,
    Description:
      "تکمیل و تعدیل قرارداد 2100/8419 - 98/12/14 موضوع بهسازی ، قیرپاشی و آسفالت و همسان سازی درب منهولها در سطح مناطق 4 و 5 مورد اجرای شرکت همسان کارون ",
    Mosavab: 140000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 26361240969000,
    shareSum: 0.6067395623136889,
  },
  {
    Code: 40101000220000,
    Description: "بلوار 32 متری 153 هکتاری واقع در منطقه دو",
    Mosavab: 117000000000,
    Expense: 0,
    AreaNameShort: 2,
    Column6: 26478240969000,
    shareSum: 0.6094324753246576,
  },
  {
    Code: 40201000010010,
    Description:
      "روکش آسفالت در خیابان جمهوری،اتوبان بهبهانی،خیابان فاطمی زاده،باند کندرو جمهوری،خیابان های پادادشهر،زیبا شهر،بلوار ساحلی و خیابان شریعتی (منطقه یک )",
    Mosavab: 110000000000,
    Expense: 0,
    AreaNameShort: 1,
    Column6: 26588240969000,
    shareSum: 0.6119642738819786,
  },
  {
    Code: 40201000010005,
    Description:
      "تکمیل ردیف 25 صورتجلسه 101/17/13/15/9/12/4 - 1400/12/28 ( سازمان عمران  ) موضوع اجرای لکه گیری و ترمیم سطوح آسفالتی با سطح بیش از 50 مترمربع به صورت ماشینی و بین 20 و 50 مترمربع به صورت دستی و ترمیم نوار حفاری طولی به صورت دستی در سطح مناطق هشتگانه ( تهیه قیر و آسفالت بعهده کارفرما ) ابلاغی طی نامه 100/74983 - 1400/12/28 ",
    Mosavab: 108000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 26696240969000,
    shareSum: 0.6144500397382574,
  },
  {
    Code: 40101000160000,
    Description:
      "احداث مسیر امتداد خیابان 13 رشد حد فاصل دانشگاه پیام نور تا دیوار شرکت لوله سازی",
    Mosavab: 104000000000,
    Expense: 0,
    AreaNameShort: 5,
    Column6: 26800240969000,
    shareSum: 0.6168437401924518,
  },
  {
    Code: 40201000010057,
    Description: "بهسازی خیابان صنایع   (منطقه پنج)",
    Mosavab: 100000000000,
    Expense: 0,
    AreaNameShort: 5,
    Column6: 26900240969000,
    shareSum: 0.6191453752445618,
  },
  {
    Code: 40201000010040,
    Description:
      "آسفالت معابر زیرسازی شده و روکش آسفالت در منطقه 4 شهرداری  (منطقه چهار)",
    Mosavab: 100000000000,
    Expense: 0,
    AreaNameShort: 4,
    Column6: 27000240969000,
    shareSum: 0.6214470102966718,
  },
  {
    Code: 40203000010051,
    Description:
      "بهسازی جاده ساحلی غربی حد فاصل پالادیوم تا میدان شقایق در منطقه 4 (منطقه چهار)",
    Mosavab: 100000000000,
    Expense: 0,
    AreaNameShort: 4,
    Column6: 27100240969000,
    shareSum: 0.6237486453487818,
  },
  {
    Code: 40301000050000,
    Description: " ريل باس",
    Mosavab: 100000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 27200240969000,
    shareSum: 0.6260502804008918,
  },
  {
    Code: 40208000010003,
    Description: "ساماندهی ورودی ها  (اندیمشک  )",
    Mosavab: 100000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 27300240969000,
    shareSum: 0.6283519154530018,
  },
  {
    Code: 40801000030001,
    Description:
      "خرید، نصب و راه اندازی 20 سامانه چراغهای راهنمایی (تقاطع لشکر-آزادی، تقاطع فلسطین-مدنی، تقاطع زند-ادهم، تقاطع شهید مقیمی-شیخ نبهان، میدان کودک، میدان دلفین، تقاطع فروردین-اقبال، میدان قدس، تقاطع چمران-میهن، تقاطع شریعتی-شهید عظیم، تقاطع معلم، بهاران، تقاطع معلم-ناصح، میدان بنی هاشم، تقاطع شریعتی-فاضلی، تقاطع گلستان-مجاهد، تقاطع هاشمی-قدس)",
    Mosavab: 100000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 27400240969000,
    shareSum: 0.6306535505051118,
  },
  {
    Code: 5010200011,
    Description: "عکسبرداری هوایی رقومی و تهیه نقشه رقومی محدوده شهر و حریم ",
    Mosavab: 100000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 27500240969000,
    shareSum: 0.6329551855572219,
  },
  {
    Code: 20102000060000,
    Description: "توسعه کمربند سبز",
    Mosavab: 100000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 27600240969000,
    shareSum: 0.6352568206093319,
  },
  {
    Code: 10401000010000,
    Description: "اثرات مالی ناشی از معافیت‌ها و تخفیفات قانونی",
    Mosavab: 100000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 27700240969000,
    shareSum: 0.6375584556614419,
  },
  {
    Code: 20301000010006,
    Description:
      "احداث محوطه فرآوری و خرید و نصب تجهیزات کارخانه کمپوست( خرید خط تولید کود، دستگاه ترنر کود)",
    Mosavab: 100000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 27800240969000,
    shareSum: 0.6398600907135519,
  },
  {
    Code: 40101000180000,
    Description: "احداث مسیر دو باند حدفاصل میدان فولاد تا ورودی مسکن مهر",
    Mosavab: 100000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 27900240969000,
    shareSum: 0.6421617257656619,
  },
  {
    Code: 5010200007,
    Description: "خدمات بهره برداری و نگهداری محصولات پایگاه داده شهرداری ",
    Mosavab: 94324500000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 27994565469000,
    shareSum: 0.6443327315203895,
  },
  {
    Code: 40201000010011,
    Description: "اجرای طرح TOD  ایستگاه کارون (منطقه یک )",
    Mosavab: 93000000000,
    Expense: 0,
    AreaNameShort: 1,
    Column6: 28087565469000,
    shareSum: 0.6464732521188518,
  },
  {
    Code: 40201000010010,
    Description:
      "آسفالت معابر زیرسازی شده و روکش آسفالت در منطقه یک شهرداری  (منطقه یک )",
    Mosavab: 90000000000,
    Expense: 0,
    AreaNameShort: 1,
    Column6: 28177565469000,
    shareSum: 0.6485447236657508,
  },
  {
    Code: 40201000010035,
    Description: "اسفالت معابر زیرسازی شده و روکش اسفالت  (منطقه سه )",
    Mosavab: 90000000000,
    Expense: 0,
    AreaNameShort: 3,
    Column6: 28267565469000,
    shareSum: 0.6506161952126498,
  },
  {
    Code: 40201000010030,
    Description: "آسفالت خیابانهای خاکی کیانشهر  (منطقه دو )",
    Mosavab: 90000000000,
    Expense: 0,
    AreaNameShort: 2,
    Column6: 28357565469000,
    shareSum: 0.6526876667595488,
  },
  {
    Code: 10304000010001,
    Description:
      " خرید لوازم بازی و ورزشی و نیمکت و مبلمان پارکی به منظور نصب در پارکهای بلوار ساحلی،بلوار جمهوری،بلوار آیت ال.. بهبهانی (منطقه یک )",
    Mosavab: 90000000000,
    Expense: 0,
    AreaNameShort: 1,
    Column6: 28447565469000,
    shareSum: 0.6547591383064478,
  },
  {
    Code: 30201000010000,
    Description: "احداث ایستگاه آتش نشانی در محدوده منطقه 6 (کوی علو",
    Mosavab: 90000000000,
    Expense: 0,
    AreaNameShort: 6,
    Column6: 28537565469000,
    shareSum: 0.6568306098533468,
  },
  {
    Code: 50301000010011,
    Description: " احداث ساختمان اداری جدید منطقه در بلوار قدس  (منطقه شش )",
    Mosavab: 90000000000,
    Expense: 0,
    AreaNameShort: 6,
    Column6: 28627565469000,
    shareSum: 0.6589020814002459,
  },
  {
    Code: 5010200004,
    Description:
      "پشتیبانی،امنیت، نگهداری و بهره برداری از شبکه، زیرساخت و مرکز داده ",
    Mosavab: 87500000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 28715065469000,
    shareSum: 0.660916012070842,
  },
  {
    Code: 40201000010013,
    Description:
      "خرید آسفالت از سازمان عمران شهرداری برای عملیات ضروری لکه گیری (منطقه یک )",
    Mosavab: 87000000000,
    Expense: 0,
    AreaNameShort: 1,
    Column6: 28802065469000,
    shareSum: 0.6629184345661778,
  },
  {
    Code: 40207000020000,
    Description:
      "مناسب سازی معابر و مبلمان شهری جهت افراد ناتوان جسمی و حرکتی (معلولان، سالمندان و کودکان ",
    Mosavab: 86000000000,
    Expense: 0,
    AreaNameShort: 2,
    Column6: 28888065469000,
    shareSum: 0.6648978407109924,
  },
  {
    Code: 40201000010086,
    Description: "زیرسازی منازل جانبازان و نورد لوله کوی مهدیس (منطقه هشت )",
    Mosavab: 85000000000,
    Expense: 0,
    AreaNameShort: 8,
    Column6: 28973065469000,
    shareSum: 0.6668542305052859,
  },
  {
    Code: 40201000010001,
    Description:
      "تکمیل قرارداد 2100/15239 - 1400/11/17 موضوع لکه گیری و ترمیم سطوح آسفالتی غرب اهواز مورد اجرای شرکت نستوه عمران پارس ",
    Mosavab: 83000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 29056065469000,
    shareSum: 0.6687645875985372,
  },
  {
    Code: 40801000010005,
    Description:
      "نصب سامانه ثبت تخلف عبور از چراغ قرمز  تقاطع های هوشمند معابر بزرگراهی و شریانی(تقاطع پهلوان، تقاطع پاداد، میدان کارگر، میدان انقلاب)",
    Mosavab: 80000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 29136065469000,
    shareSum: 0.6706058956402252,
  },
  {
    Code: 40804000020000,
    Description:
      "تامین تجهیزات و امکانات مورد نیاز اداره راهنمایی و رانندگی شهر اهواز (به استناد و با رعایت حکم شماره 30 بودجه)",
    Mosavab: 80000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 29216065469000,
    shareSum: 0.6724472036819132,
  },
  {
    Code: 40207000010005,
    Description:
      "پیاده روسازی و استاندار سازی معابر جهت زیبا سازی همسان سازی پیاده روهای خیابان های شریعتی(کانیو،جدولگذاری ،جوی ،فلاورباکس،رفیوژ،مبلمان،مسیر دوچرخه،کفپوش،تایل نابینایان،رمپ معلولین،مانع سنگی و نورپردازی) (منطقه یک )",
    Mosavab: 80000000000,
    Expense: 0,
    AreaNameShort: 1,
    Column6: 29296065469000,
    shareSum: 0.6742885117236013,
  },
  {
    Code: 40201000010039,
    Description:
      "بهسازی اسفالت در معابر فرسوده کوی ملت و زیتون کارمندی  (منطقه سه )",
    Mosavab: 80000000000,
    Expense: 0,
    AreaNameShort: 3,
    Column6: 29376065469000,
    shareSum: 0.6761298197652893,
  },
  {
    Code: 103030114,
    Description: "تابلوهای نامگذاری معابر، میادین و...",
    Mosavab: 80000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 29456065469000,
    shareSum: 0.6779711278069772,
  },
  {
    Code: 6060200031,
    Description: "احداث و راه اندازی رصدخانه شهری",
    Mosavab: 80000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 29536065469000,
    shareSum: 0.6798124358486652,
  },
  {
    Code: 40201000010037,
    Description:
      "بهسازی اسفالت در معابر فرسوده کوی ملت و زیتون کارمندی  (منطقه سه )",
    Mosavab: 75000000000,
    Expense: 0,
    AreaNameShort: 3,
    Column6: 29611065469000,
    shareSum: 0.6815386621377478,
  },
  {
    Code: 40301000060000,
    Description: "پرداخت انتقالی به سازمان مدیریت و نظارت بر تاکسیرانی",
    Mosavab: 74000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 29685065469000,
    shareSum: 0.6832418720763092,
  },
  {
    Code: 40801000010007,
    Description:
      " خرید و اجرای  16 سامانه ثبت تخلف ( بلوار مدرس بین میدان شهید بندر و میدان 4 اسب ، میدان فلسطین تا میدان راه آهن ، بلوار گلستان بین میدان کارگر تا میدان کودک ، بلوار کارگر بین میدان کارگر تا میدان مالیات ، ساحلی غربی بین میدان مالیات  و میدان قوری ، بلوار شهید سلیمانی بین میدان فرودگاه تا میدان شهید بندر ، بلوار ایت ا... بهبهانی بین فلکه پاداد و میدان جمهوری  ، بلوار ساحلی شرقی حد فاصل پل چهارم تا پل پنجم  - هر ایستگاه 2 سامانه  )",
    Mosavab: 70000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 29755065469000,
    shareSum: 0.6848530166127862,
  },
  {
    Code: 40801000010004,
    Description:
      "نصب سامانه ثبت تخلف سرعت معابر بزرگراهی و شریانی(بلوار امام شرقی، بلوار فنی حرفه ای، بلوار شهید سردار سلیمانی، بلوار ساحلی شرقی)",
    Mosavab: 70000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 29825065469000,
    shareSum: 0.6864641611492632,
  },
  {
    Code: 40801000020000,
    Description: "توسعه و تجهيز مركز كنترل ترافيك",
    Mosavab: 70000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 29895065469000,
    shareSum: 0.6880753056857403,
  },
  {
    Code: 40301000010001,
    Description: "احداث، تکمیل، تجهیز و نوسازی ایستگاههای اتوبوس  و تاکسی",
    Mosavab: 70000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 29965065469000,
    shareSum: 0.6896864502222172,
  },
  {
    Code: 40203000010009,
    Description:
      "پروژه ساماندهی هسته مرکزی شهر(CBD)پایانه خسروی،پایانه ادهم،چهار راه نادری،کنترل هوشمند محدوده،گیت های بولارد هیدرولیکی،تامین خودروهای برقی،استاندارد سازی تقاطع پادادهشر ،چهارراه زند،شریعتی-رضایی (منطقه یک )",
    Mosavab: 70000000000,
    Expense: 0,
    AreaNameShort: 1,
    Column6: 30035065469000,
    shareSum: 0.6912975947586942,
  },
  {
    Code: 40101000120000,
    Description: "احداث مسیرادامه پل ولایت به سمت بلوار نفت ",
    Mosavab: 70000000000,
    Expense: 0,
    AreaNameShort: 3,
    Column6: 30105065469000,
    shareSum: 0.6929087392951713,
  },
  {
    Code: 20102000010004,
    Description:
      "بهسازی و نوسازی پارک های شهید هاشمی،حیدری نژاد،هفت تیر،ادهم،جواد الائمه،آهنگری،شماره 2،کودک،شهید دستغیب،شهید جیزان، صباغان،کارون (منطقه یک )",
    Mosavab: 70000000000,
    Expense: 0,
    AreaNameShort: 1,
    Column6: 30175065469000,
    shareSum: 0.6945198838316482,
  },
  {
    Code: 60602000300000,
    Description: "احداث کاروان های سیار فرهنگی ",
    Mosavab: 70000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 30245065469000,
    shareSum: 0.6961310283681252,
  },
  {
    Code: 40101000130001,
    Description: " مسیر ساحلی از استخر دریاچه نورتا زرگان",
    Mosavab: 65000000000,
    Expense: 0,
    AreaNameShort: 3,
    Column6: 30310065469000,
    shareSum: 0.6976270911519967,
  },
  {
    Code: 40203000010052,
    Description:
      "بهسازی جاده ساحلی غربی حد فاصل پارک قوری تا مپل پنجم در منطقه 4 (منطقه چهار)",
    Mosavab: 65000000000,
    Expense: 0,
    AreaNameShort: 4,
    Column6: 30375065469000,
    shareSum: 0.6991231539358683,
  },
  {
    Code: 40201000010044,
    Description:
      "خرید آسفالت از سازمان عمران شهرداری برای عملیات ضروری لکه گیری منطقه 4 (منطقه چهار)",
    Mosavab: 64000000000,
    Expense: 0,
    AreaNameShort: 4,
    Column6: 30439065469000,
    shareSum: 0.7005962003692187,
  },
  {
    Code: 60400100010000,
    Description:
      "بازسازی و بهسازی اردوگاه آسیب دیدگان اجتماعی(سامان سرای شکوفا)",
    Mosavab: 63000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 30502065469000,
    shareSum: 0.702046230452048,
  },
  {
    Code: 40201000010032,
    Description: "لکه گیری و ترمیم سطوح اسفالتی  (منطقه سه )",
    Mosavab: 62000000000,
    Expense: 0,
    AreaNameShort: 3,
    Column6: 30564065469000,
    shareSum: 0.7034732441843562,
  },
  {
    Code: 20502000010001,
    Description:
      " تکمیل و بازسازی و احداث سرویس بهداشتی و آبخوری های بازار امام خمینی،بازار کاوه ،پارک شهید هاشمی،پارک هفت تیر،خیابان سلمان فارسی (منطقه یک )",
    Mosavab: 62000000000,
    Expense: 0,
    AreaNameShort: 1,
    Column6: 30626065469000,
    shareSum: 0.7049002579166644,
  },
  {
    Code: 40201000020017,
    Description:
      "خرید و حمل مصالح مورد نياز، كرايه ماشين آلات خدمات شهری و اجراي عمليات عمراني خدمات شهری و انجام برخی پروژه‌ها و فعالیت ها بصورت امانی (به استناد حکم شماره 18 بودجه) (منطقه هفت )",
    Mosavab: 61000000000,
    Expense: 0,
    AreaNameShort: 7,
    Column6: 30687065469000,
    shareSum: 0.7063042552984515,
  },
  {
    Code: 60602000260003,
    Description: "سرای محله کوی جمهوری",
    Mosavab: 61000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 30748065469000,
    shareSum: 0.7077082526802386,
  },
  {
    Code: 60602000260007,
    Description: "سرای محله کوی پردیس ",
    Mosavab: 60000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 30808065469000,
    shareSum: 0.7090892337115047,
  },
  {
    Code: 60602000260008,
    Description: "سرای محله کوی ملاشیه ",
    Mosavab: 60000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 30868065469000,
    shareSum: 0.7104702147427706,
  },
  {
    Code: 60602000010019,
    Description: "استودیو شهر",
    Mosavab: 60000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
    Column6: 30928065469000,
    shareSum: 0.7118511957740367,
  },
  {
    Code: 40203000010036,
    Description:
      "ایمن سازی معابربرزگراهی و شریانی؛ بلوار سردار سلیمانی ، بلوار نفت، فرشید دو،پل نهم، پل ولایت  (منطقه سه )",
    Mosavab: 60000000000,
    Expense: 0,
    AreaNameShort: 3,
    Column6: 30988065469000,
    shareSum: 0.7132321768053026,
  },
  {
    Code: 40201000020016,
    Description:
      "كرايه ماشين آلات خدمات شهری و اجراي عمليات عمراني خدمات شهری   (منطقه شش )",
    Mosavab: 60000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 40201000010083,
    Description:
      "زیرسازی و اسفالت باندهای کندرو حدفاصل میدان سه هکتاری تا بازار آهن (منطقه هشت )",
    Mosavab: 60000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 40201000010078,
    Description:
      "زیرسازی و آسفالت خیابان های منازل پشت فنی حرفه ای بلوار مهاجرین آلصافی ،13حصیر آباد و راهبند زیباشهر (منطقه هفت )",
    Mosavab: 60000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40201000010021,
    Description:
      " زیر سازی و آسفالت، احداث دیوار و جدول گذاری زیر گذر جانباز    (منطقه دو )",
    Mosavab: 60000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20102000010073,
    Description: "احداث پارک 14 هکتاری مهدیس (منطقه هشت )",
    Mosavab: 60000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 5010200015,
    Description: "طراحی، تهیه، اجرا و توسعه شبکه های کامپیوتری",
    Mosavab: 60000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40206000010003,
    Description: "احداث 4 دهانه پل عابر پیاده در سطح شهر",
    Mosavab: 60000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 5010200003,
    Description: "پشتیبانی و نگهداری از سخت افزارهای کاربران ",
    Mosavab: 58000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 30101000010004,
    Description:
      "تهیه و اجرای نرده گذاری سنگی ساحل شرقی در حوزه خدماتی مناطق 3 و 7 حد فاصل پل سیاه تا پل شهید دقایقی ( صورتجلسه سازمان خدمات موتوری )",
    Mosavab: 55600000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 60603000010041,
    Description:
      "بهسازی و تجهیز زمین های ورزشی خاکی در سطح منطقه(نهضت آباد، چنیبه، بهارستان) (منطقه چهار)",
    Mosavab: 55000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 40201000010055,
    Description: "آسفالت معابر زیرسازی شده و روکش آسفالت   (منطقه پنج)",
    Mosavab: 55000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 40201000010056,
    Description:
      "زیرسازی تا حد لایه اساس خیابانهای خاکی  سطح منطقه  (منطقه پنج)",
    Mosavab: 55000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 30101000010001,
    Description:
      "تهیه و اجرای نرده گذاری سنگی در ساحل شرقی کارون حد فاصل پارک ربیع تا پل سیاه در حوزه خدماتی منطقه 1 ( صورتجلسه سازمان خدمات موتوری )",
    Mosavab: 54000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 30101000010002,
    Description:
      "تهیه و اجرای نرده گذاری سنگی ساحل غربی در حوزه خدماتی منطقه 4 حد فاصل پارک شقایق تا پل غدیر ( صورتجلسه سازمان خدمات موتوری ) ",
    Mosavab: 54000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 30101000010003,
    Description:
      "تکمیل صورتجلسه تهیه و اجرای نرده گذاری سنگی زون یک ساحل غربی در حوزه خدماتی منطقه 2حدفاصل پل غدیر تا پل هفتم",
    Mosavab: 54000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 30201000070004,
    Description:
      "خرید، تجهیزات، لوازم استراحتگاه، لباس آتش نشانی و امداد و نجات",
    Mosavab: 54000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40208000010002,
    Description: "محوطه سازی و زیباسازی میادین شهری-ورودی ها (معاونت شهرسازی)",
    Mosavab: 50700000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40801000010008,
    Description:
      "خرید، نصب و راه اندازی 10 ایستگاه دوربین ثبت تخلف عبور از چراغ قرمز محله ها(میدان قوری، میدان دلفین، میدان قدس، میدان بنی هاشم)",
    Mosavab: 50000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 30301000030000,
    Description:
      "حوادث غیر مترقبه و پدافند غیر عامل  (به استناد حکم شماره 24  بودجه)",
    Mosavab: 50000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 5010200001,
    Description: "ارتقاء و بروزرسانی تجهیزات مرکز داده",
    Mosavab: 50000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 20702000010002,
    Description: "کرایه ماشین آلات جهت پایگاه پشتیبانی آبهای سطحی",
    Mosavab: 50000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 20702000010003,
    Description: "لوله گذاری و خرید لوله جهت دفع آبهای سطحی",
    Mosavab: 50000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 20301000010007,
    Description: "احداث فاز دوم (لیفت 2) سلول دفن شماره 2 در سایت صفیره",
    Mosavab: 50000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 20301000010008,
    Description: "احداث سلول دفن پسماند عفونی در سایت صفیره",
    Mosavab: 50000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 20102000110000,
    Description: "توسعه و بهسازی تفرجگاه کوهساران",
    Mosavab: 50000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 20301000010004,
    Description:
      "تکمیل پروژه احداث  سلول  سوم دفن  بهداشتی در سایت مجتمع صفیره ",
    Mosavab: 50000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10202000180000,
    Description:
      "شناسایی، جانمایی، برداشت، تهیه نقشه و تک برگ نمودن اسناد املاک و مستغلات",
    Mosavab: 50000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10202000060007,
    Description:
      "مشاوره و انجام خدمات مهندسی در پروژه های عمرانی مناطق هشتگانه",
    Mosavab: 50000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40207000010007,
    Description:
      "بهسازی پیاده رو های خیابان چمران کوی کیانپارس واقع در منطقه 2   (منطقه دو )",
    Mosavab: 50000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40203000010046,
    Description:
      "احداث محور ارتباطی بلوار گلفام به بلوار شهید هاشمی  (منطقه پنج) ",
    Mosavab: 50000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 40201000010047,
    Description:
      "زیر سازی تا حد لایه اساس، جدولگذاری و آسفالت خیابان های خاکی گلستان و شهرک برق (منطقه چهار)",
    Mosavab: 50000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 40201000010026,
    Description: "آسفالت معابر زیرسازی شده و روکش آسفالت   (منطقه دو )",
    Mosavab: 50000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40201000010061,
    Description: "آسفالت معابر زیرسازی شده سطح منطقه   (منطقه شش )",
    Mosavab: 50000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 40201000020022,
    Description:
      "کرایه ماشین آلات خدمات شهری و اجرای عملیات عمرانی خدمات شهری مربط به سامانه 137  (منطقه هشت )",
    Mosavab: 50000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 20102000010025,
    Description: "پردیس خانوادگی حضرت ولیعصر (عج) (منطقه چهار)",
    Mosavab: 50000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 60602000100000,
    Description: "تکمیل پارک بانوان در پارک شهروند (پارک مشارکت های اجتماعی)",
    Mosavab: 50000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40201000010060,
    Description: "خرید آسفالت از سازمان عمران ( سامانه 137 )  (منطقه شش )",
    Mosavab: 48000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 20102000010044,
    Description:
      "احداث فضای سبز پردیس (پروژه احداث فضای سبز و مجموعه فرهنگی ورزشی پردیس)  (منطقه پنج)",
    Mosavab: 45000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 40207000010025,
    Description: "پیاده رو آیلند میانی بلوار کارگر (منطقه چهار)",
    Mosavab: 45000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 40207000010039,
    Description:
      "همسطح سازی و اصلاح پیاده روهای معابر اصلی سطح منطقه ( خ انقلاب ، امیر کبیر ، ناصر خسرو ، ولیعصر و شیخ بهاء )  (منطقه شش )",
    Mosavab: 45000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 40207000010040,
    Description:
      "تعویض جداول و جدول گذاری بلوار انقلاب قدس ، غزنوی ، و 68 متری کوی علوی )  (منطقه شش ) ",
    Mosavab: 45000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 40207000010041,
    Description:
      "تعویض جداول و جدول گذاری بلوارشهید هاشمی حدفاصل میدان انقلاب تا خیابان 22 بهمن   (منطقه شش )",
    Mosavab: 45000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 50301000010012,
    Description: "تجهیز ساحتمان اداری جدید منطقه در بلوار قدس  (منطقه شش )",
    Mosavab: 45000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 40201000010020,
    Description:
      "خرید آسفالت از سازمان عمران شهرداری برای عملیات ضروری لکه گیری  (منطقه دو )",
    Mosavab: 44000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40201000010033,
    Description:
      "تهیه قیر و اسفالت جهت لکه گیری و ترمیم سطوح اسفالتی معابر  (منطقه سه )",
    Mosavab: 43000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 40201000010034,
    Description:
      "خرید اسفالت از سازمان عمران شهرداری برای عملیات ضروری لکه گیری  (منطقه سه )",
    Mosavab: 42000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 20102000010075,
    Description: "تکمیل پارک انتهای بلوار امام شرقی (منطقه هشت )",
    Mosavab: 42000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 10302000010000,
    Description:
      "ساماندهی ، ساخت، خرید، تعمیر و نصب تابلوهای راهنمای معابرشهری و درب منازل (پایه دار  و دیوار کوب )، لمپوست و پایه لمپوست",
    Mosavab: 42000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40203000020001,
    Description:
      "خرید رنگ و اجراي خط كشي معابر، محوری، عابر پیاده و نقوش  ترافیکی معابر تندراهی و شریانی ساحلی شرقی ، سلیمانی،بهبهانی ،  نفت و جمهوری  ",
    Mosavab: 41500000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40203000020002,
    Description:
      "خرید رنگ و اجراي خط كشي معابر، محوری، عابر پیاده و نقوش  ترافیکی معابر تندراهی و شریانی ساحلی غربی، مدرس، اکباتان، گلستان، هاشمی",
    Mosavab: 41500000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 20102000010027,
    Description: "فاز دوم فضای سبز خیابان برهان (منطقه چهار)",
    Mosavab: 41000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 10202000060008,
    Description: "مطالعات نت عمرانی ( آسفالت معابر ، ساختمانها و . . . )",
    Mosavab: 40300000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 20702000020001,
    Description: "خرید دیزل ژنراتور تولید برق جهت ایستگاههای پمپاژ",
    Mosavab: 40000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 30201000080000,
    Description: "تعمیر و نگهداری خودروهای آتش نشانی",
    Mosavab: 40000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40801000010001,
    Description:
      "خرید، نصب و راه اندازی 10 دستگاه دوربین نظارت تصویری  (پل ششم، پل هشتم، پل نهم، میدان چمران، میدان شفا، میدان قوری، تقاطع فروردین-سعدی، تقاطع سردارسلیمانی-اقبال، تقاطع بلوار معلم-خیابان بهاران )",
    Mosavab: 40000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 5010200018,
    Description:
      "شهرداری الکترونیک(فرهنگسرای مجازی،پنجره واحد مجوزها،نظام پیشنهادات مردمی، اپ اهواز من)",
    Mosavab: 40000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40207000010003,
    Description:
      "بهسازی و جدول گذاری ،جداول فرسوده در خیابان شریعتی،بلوار ساحلی،خیابان کریم خان زند،اتوبان آایت ال..بهبهانی (منطقه یک )",
    Mosavab: 40000000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 20103000010010,
    Description: "تجهیز و بهسازی ایستگاه های شبکه اب خام زرگان  (منطقه سه )",
    Mosavab: 40000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 40202000010048,
    Description:
      "زیر سازی، جدولگذاری وآسفالت خیابان های کوی اکباتان و چنیبه علیا (منطقه چهار)",
    Mosavab: 40000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 40201000010045,
    Description: "زیر سازی بلوار خلیج فارس (منطقه چهار)",
    Mosavab: 40000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 40201000010046,
    Description: "زیر سازی بلوار 32 متری شهرک برق (منطقه چهار)",
    Mosavab: 40000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 40201000010073,
    Description: "تراش و روکش اسفالت خیابان های اصلی و فرعی (منطقه هفت )",
    Mosavab: 40000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40201000010084,
    Description: "قیرپاشی  وآسفالت و روکش معابر سطح منطقه (منطقه هشت )",
    Mosavab: 40000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 40201000010082,
    Description: "ساماندهی و بهسازی معابر اصلی و فرعی کوی مهدیس (منطقه هشت )",
    Mosavab: 40000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 40201000020002,
    Description:
      "كرايه ماشين آلات خدمات شهری و اجراي عمليات عمراني خدمات شهری و انجام برخی پروژه ها و فعالیت ها بصورت امانی (منطقه یک )",
    Mosavab: 40000000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 20604000010007,
    Description:
      "بازارچه جنب پارکینگ ماشین آلات سنگین واقع در کندرو شرقی بلوار سردار سلیمانی  (منطقه سه )",
    Mosavab: 40000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 30201000030000,
    Description: "تکمیل ایستگاه آتش نشانی کوی مهدیس",
    Mosavab: 40000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 40101000210000,
    Description:
      "احداث خیابان جنب مرکز دیالیز کوی نبوت در منطقه 8 ، احداث کانال دفع آبهای سطحی شهرک اکباتان در منطقه 4 ، احداث محوطه سازی پادگان معراج و بهسازی رمپ و لوپ پل ولایت در منطقه 7 و بهسازی خیابان ورودی آماد و پشتیبانی سپاه",
    Mosavab: 39000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 30101000010006,
    Description:
      "تکمیل و تعدیل قراردارد 2100/9221 - 99/4/7 موضوع احداث و مقاوم سازی دیوار ساحلی در محدوده پل سیاه ( ساحل شرقی و غربی ) مورد اجرای شرکت آریا سدر آب سامان- اعتباری",
    Mosavab: 38000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 20102000010022,
    Description: "پارک شماره 2 کوی اغاجاری  (منطقه سه )",
    Mosavab: 38000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 5010200006,
    Description: "زیرساخت خدمات بانکی ",
    Mosavab: 37000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 30201000070003,
    Description: "تجهیز و نصب کاربری خودرو آتش نشانی",
    Mosavab: 36000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 20702000030001,
    Description: "تعمیرات پمپ جهت دفع آبهای سطحی در سطح مناطق",
    Mosavab: 36000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 60603000010055,
    Description: "مجموعه ورزشی چند منظوره سرپوشیده سپیدار  (منطقه هفت )",
    Mosavab: 36000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40207000010026,
    Description: "بهسازی پیاده رو بلوار گلستان (منطقه چهار)",
    Mosavab: 36000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 40207000010027,
    Description: "احداث پیاده رو در ضلع شمالی بلوار فرودین (منطقه چهار)",
    Mosavab: 36000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 20702000010044,
    Description:
      "تکمیل شبکه دفع آبهای سطحی منطقه هفت (سپیدار ،کوی رمضان ، زیتون کارگری)(منطقه هفت )",
    Mosavab: 36000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40201000020014,
    Description:
      "كرايه ماشين آلات خدمات شهری و اجراي عمليات عمراني خدمات شهری و انجام برخی پروژه ها و فعالیت ها بصورت امانی توسط منطقه 5   (منطقه پنج)",
    Mosavab: 36000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 50102000130000,
    Description: "تعمیر و خرید رایانه ، پرینتر ، اسکنر و وسائل جانبی آن11",
    Mosavab: 35100000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 20702000010005,
    Description:
      "بازسازی و تعمیر و لوله گذاری سپتیک آب خام جهت دفع آبهای سطحی بلوار جمهوری (منطقه یک )",
    Mosavab: 35000000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 20102000010050,
    Description:
      "احداث پارک نواری ( مسیر سلامت ) جنب دیوار ارتش واقع در بلوار قدس   (منطقه شش )",
    Mosavab: 35000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 60501000010000,
    Description:
      "احیا و بازسازی بناها و بافت ها و محوطه های تاریخی و فرهنگی و بهسازی گورستان مسیحیان (به استناد حکم شماره 20 بودجه) (معاونت شهرسازی)",
    Mosavab: 35000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10301000010005,
    Description:
      "روشنایی و تجهیزات برقی پارک های بلوار جمهوری، بلوار ساحلی، بلوار آیت الله بهبهانی ،بلوار شریعتی، بلوار آزادگان(منطقه یک )",
    Mosavab: 34200000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 50301000010001,
    Description: "بازسازی ساختمان شماره 3 شهرداری اهواز ",
    Mosavab: 34000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10304000020005,
    Description:
      "خرید و نصب و سرویس و تعمیرات تجهیزات جانبی پمپ (پمپ های آب خام و پمپ های آبنما)  و هوشمند سازی ایستگاه های آب خام جنب پل پنجم ،کنار پل سیاه،پل سیاه تا پارک ربیع (منطقه یک )",
    Mosavab: 32000000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 10202000090009,
    Description:
      "مطالعات و طراحی بهسازی تقاطع های غیر هم سطح شهر اهواز ( پلهای راهنمایی و رانندگی ، لشکر ، علوی ، ششم ( فولاد ) ، کیان آباد ، صیاد شیرازی ، نادری ، پنجم ، غدیر و . . . )",
    Mosavab: 31200000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 20301000010001,
    Description: "هزینه دفن  پسماند در مجتمع صفیره",
    Mosavab: 30000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 20301000010002,
    Description:
      "خرید خاک جهت پوشش روزانه زباله های واقع در مجتمع صفیره(103/60839  - 1401/3/28)",
    Mosavab: 30000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 20301000010005,
    Description:
      "پروژه لوله گذاری جهت خروجی گاز متان در  سلول (سنتی)  و شماره 1 در سایت مجتمع صفیره ",
    Mosavab: 30000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 20301000010009,
    Description: "احداث دو سوله صنایع تبدیلی",
    Mosavab: 30000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 20301000010010,
    Description: "طراحی و استقرار ایستگاهای انتقال واسط",
    Mosavab: 30000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 20401000020000,
    Description: "خرید وسائط نقلیه اداری",
    Mosavab: 30000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 60603000010048,
    Description: "احداث مجموعه فرهنگی ورزشی سرپوشیده پردیس  (منطقه پنج)",
    Mosavab: 30000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 60603000010037,
    Description: "احداث زمین ورزشی سرپوشده  (منطقه سه )",
    Mosavab: 30000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 60603000010061,
    Description: "احداث سالن چند منظوره سرپوشیده (منطقه هشت )",
    Mosavab: 30000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 5010200010,
    Description: "اهواز کارت",
    Mosavab: 30000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 5010200001,
    Description: "خرید و توسعه سامانه ها",
    Mosavab: 30000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40801000030002,
    Description: "تکمیل خرید و اجرای سامانه چراغهای راهنمایی هوشمند",
    Mosavab: 30000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40104000020001,
    Description:
      "ساخت و نصب مانع دید محورهای L300 و L500 تقاطع غیرهمسطح میدان شهید بندر ( صورتجلسه سازمان عمران ) ",
    Mosavab: 30000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40104000020002,
    Description:
      "ادامه نظارت کارگاهی بر عملیات اجرایی تقاطع غیرهمسطح میدان شهید بندر اهواز",
    Mosavab: 30000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40201000010004,
    Description: "عملیات اجرای خیابان فرعی 22 بهمن",
    Mosavab: 30000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 50301000010004,
    Description: "بهسازی ساختمان های اداری منطقه1 (منطقه یک )",
    Mosavab: 30000000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 40208000010008,
    Description:
      "بهسازی سه میدان  ،میدان بلوار ایمان ،بلوار مهاجرین ابتدا و انتها  (منطقه هفت )",
    Mosavab: 30000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 20102000010039,
    Description:
      "پارک ورودی پردیس حد فاصل خیابان اصلی پردیس تا خیابان گلدسته   (منطقه پنج)",
    Mosavab: 30000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 20103000010003,
    Description:
      "احداث و تکمیل خطوط شبکه توزیع ایستگاه پمپاژ دغاغله (منطقه دو )",
    Mosavab: 30000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20103000010021,
    Description: "اجرای شبکه  فرعی سطح منطقه  (منطقه شش )",
    Mosavab: 30000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 20103000010027,
    Description: "تکمیل خط انتقال ایستگاه پل پنجم (منطقه هشت )",
    Mosavab: 30000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 20702000010014,
    Description: "خرید لوله جهت تکمیل شبکه دفع آبهای سطحی (منطقه دو )",
    Mosavab: 30000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20702000010027,
    Description:
      "همسان سازی درب منهولها بصورت پراکنده در سطح منطقه  (منطقه سه )",
    Mosavab: 30000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 40201000020009,
    Description:
      "کرایه ماشین الات خدمات شهری و اجرای عملیات عمرانی خدمات شهری و برخی پروژه ها بصورت امانی  (منطقه سه )",
    Mosavab: 30000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 40203000020011,
    Description:
      " كرايه ماشين آلات خدمات شهری و اجراي عمليات عمراني خدمات شهری و انجام برخی پروژه‌ها و فعالیت ها بصورت امانی (به استناد حکم شماره 19 بودجه) (منطقه چهار)",
    Mosavab: 30000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 40203000010004,
    Description:
      "اصلاح هندسی و ایمن سازی معابر شریانی و بزرگراهی و پل ها و تقاطع های غیر همسطح  در بلوار ساحلی، میدان ربیع،میدان جمهوری،خیابان آزادگان،خیابان امام،اتوبان آیت الله بهبهانی،پل چهارم،زیرگذر شریعتی (منطقه یک )",
    Mosavab: 30000000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 40201000010085,
    Description:
      "تکمیل زیرسازی باند دوم خیابان 40  متری رزمندگان و خیابانهای 10 و 11 رسالت (منطقه هشت )",
    Mosavab: 30000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 40201000010036,
    Description: "اجرای  زیرسازی تا حد لایه اساس معابر سطح منطقه  (منطقه سه )",
    Mosavab: 30000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 606020401,
    Description: "تکمیل فرهنگسرای نجوم و احداث آسمان نما ",
    Mosavab: 30000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 60604000010001,
    Description: "تجهیز و تکمیل کتابخانه های مشارکتی",
    Mosavab: 30000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 20102000010063,
    Description: "ساماندهی دو طرف پل ولایت  (منطقه هفت )",
    Mosavab: 28000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 20102000010023,
    Description: "پارک محله ای در خیابان 5 فاز 4 کوی ملت  (منطقه سه )",
    Mosavab: 28000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 20102000010051,
    Description: "احداث پارک نواری در کوی سادات  (منطقه شش )",
    Mosavab: 28000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 40801000030014,
    Description:
      "تکمیل تعمیر و نگهداری سامانه های ترافیکی هوشمند (چراغ های راهنمایی و دوربین های نظارت تصویری)",
    Mosavab: 28000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 30101000010005,
    Description:
      "تکمیل و تعدیل قراردارد 2100/9224 - 99/4/7 موضوع احداث و مقاوم سازی دیوار ساحلی در محدوده پل سوم ( ساحل شرقی و غربی ) مورد اجرای شرکت آریا سدر آب سامان- اعتباری ( با احتساب ارزش افزوده )",
    Mosavab: 28000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40207000010044,
    Description: "تعویض کفپوش فرسوده (زیتون کارگری و سپیدار ) (منطقه هفت )",
    Mosavab: 27000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40207000010045,
    Description:
      "تعویض جداول فرسوده (بلوار نواب ،بلوار شهید سلیمانی ، آلصافی ،منبع آب ،ایمان فنی و حرفه ای خیابان رازی و..) (منطقه هفت )",
    Mosavab: 27000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 60602000260009,
    Description:
      "  احداث سرای محله واقع در خیابان بهاران کمپلوی شمالی  (منطقه شش )",
    Mosavab: 27000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 40207000010017,
    Description:
      "جدولگذاری و پیاده رو سازی و خاکریزی نباتی در مجاورت دیوار پیش ساخته نفت ، بلوار شهید اهوازیان  (منطقه سه )",
    Mosavab: 27000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 10301000010007,
    Description:
      "خرید تجهیزات مورد نیاز جهت تعمیر روشنایی پارک ها و میادین (منطقه دو )",
    Mosavab: 27000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40201000010054,
    Description:
      "خرید آسفالت از سازمان عمران شهرداری برای عملیات ضروری لکه گیری   (منطقه پنج)",
    Mosavab: 27000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 40201000010072,
    Description: "خرید آسفالت از سازمان عمران (منطقه هفت )",
    Mosavab: 27000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40203000010037,
    Description:
      "ارام سازی و مدیریت ترافیک محله های زیتون کارمندی و کوی ملت  (منطقه سه )",
    Mosavab: 27000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 30101000010013,
    Description:
      "دیوار حائل خیابان 19 منبع آب (ادامه ی دیوار موجود از خ 31 تا 34) (منطقه هفت )",
    Mosavab: 27000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 20102000010054,
    Description: "تکمیل بهسازی پارک شهید سبحانی کمپلو شمالی   (منطقه شش )",
    Mosavab: 26000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 20102000010074,
    Description: "احداث پارک 3.5 هکتاری مهدیس (منطقه هشت )",
    Mosavab: 26000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 30101000010012,
    Description:
      "تخریب و بازسازی و احداث دیوار حائل نگهدارنده و جاده بالا دست ورودی منبع آب(کریم باوی) (منطقه هفت )",
    Mosavab: 25200000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40201000010038,
    Description:
      "جدولگذاری و پیاده رو سازی و زیرسازی اسفالت ورودی فدک  (منطقه سه )",
    Mosavab: 25000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 20102000010040,
    Description: "پارک گلفام کوی پردیس   (منطقه پنج)",
    Mosavab: 25000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 40203000020003,
    Description:
      "خرید رنگ و اجراي خط كشي معابر، محوری، عابر پیاده و نقوش  ترافیکی در بلوار آیت الله بهبهانی ،بلوار جمهوری،بلوار ساحلی،خیابان رستگاری،خیابان شریعتی،خیابان آزادگان،بلوار جوادالائمه،خیابان امام ،خیابان رضوی (منطقه یک )",
    Mosavab: 25000000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 5010200005,
    Description: "تأمین پهنای باند اینترنت",
    Mosavab: 25000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40101000140000,
    Description: "بهسازی و تعریض خیابان شهید علاف",
    Mosavab: 25000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 20102000010026,
    Description: "پارک محله ای شهرک الهیه (منطقه چهار) ",
    Mosavab: 24000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 40202000010001,
    Description:
      " جدولگذاری با جداول رتوش بلوار آیت الله بهبهانی، خیابان زند،خیابان جمهوری،جاده ساحلی،خیابان شریعتی (منطقه یک )",
    Mosavab: 24000000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 40201000010080,
    Description:
      "ترمیم نوارهای حفاری و لکه گیری معابر اصلی و فرعی (کوی باهنر،فاز یک،فاز دو،کوی صادقیه،فاز 5،بلوار امام ، فنی و حرفه ای ،بلوار شهید هاشمی، کوی رسالت،کوی فولاد شهر) (منطقه هشت )",
    Mosavab: 23000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 20604000010005,
    Description:
      "احداث بازار روز کرامت  واقع در کیانشهر ، بازار کوثر، سپیدار و ..",
    Mosavab: 23000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 50301000040000,
    Description: "خرید لوازم مصرف نشدنی",
    Mosavab: 23000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10301000010004,
    Description:
      "تهیه و نصب یا تعمیر تاسیسات برقی و روشنایی و تعویض موارد سرقتی و سوختگی کابلها  در منطقه 1 (منطقه یک )",
    Mosavab: 22500000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 60603000010032,
    Description:
      "احداث زمین ورزشی چمن مصنوعی  روباز در کوی سید خلف (منطقه دو )",
    Mosavab: 22000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40203000020029,
    Description:
      "خرید و اجرای رنگ دو جزئی عابر پیاده  شهرک دانشگاه ، فرهنگشهر ، بلوار کارگر ، میدان کارگر ، خیابان 22 بهمن  (منطقه پنج)",
    Mosavab: 22000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 40801000010003,
    Description:
      "تکمیل خرید و اجرای دوربین های نظارت تصویری  (میدان چمران ، میدان شهید بقایی ، ظلع شرقی میدان چهار اسب ، میدان کودک ، پل کریدور ، آیت الله بهبهانی نبش نهج البلاغه  ، فروردین نبش دی ، امام علی نبش فاطمی زاده ، میدان شفا ، میدان مالیات ، امام شرقی پل روگذر شهید هاشمی ، بهبهانی نبش رستگاری ، شریعتی نبش رستگاری ، انقلاب نبش تخت سلیمان ، پل برون  ، چمران نبش خیابان 13 )",
    Mosavab: 21400000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40302000010002,
    Description: "تکمیل و تجهیز پایانه آزادگان  - ابتدای خیابان 24 متری ",
    Mosavab: 21000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 60602000260001,
    Description: "تجهیز و راه اندازی سراهای محله مشارکتی و ....",
    Mosavab: 21000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 60602000260002,
    Description:
      "تجهیز مجموعه های فرهنگی در راستای برگزاری رویدادها در پارک ها بصورت مشارکتی",
    Mosavab: 21000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 103010102,
    Description: "نورپردازی عرشه پل سیاه-تکمیلی (معاونت شهرسازی)",
    Mosavab: 20700000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 103040201,
    Description:
      "خرید ، ساخت، بازسازی و نصب و نگهبانی المان ها، آبنما و آثار حجمی و پمپ های آبنما در سطح شهر (معاونت شهرسازی)",
    Mosavab: 20000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 102021101,
    Description: "مطالعات سطح دو باز آفرینی شهری اهواز (معاونت شهرسازی)",
    Mosavab: 20000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10202000110003,
    Description: "مطالعات موردی  شهرسازی وطراحی شهری (جدید) (معاونت شهرسازی)",
    Mosavab: 20000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 60603000010052,
    Description:
      "بهسازی و احداث زمین های فوتسال چمن مصنوعی در سطح محلات   (منطقه شش )",
    Mosavab: 20000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 10202000050001,
    Description: "مطالعات بازنگری طرح جامع حمل و نقل شهری اهواز و حومه",
    Mosavab: 20000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40302000010001,
    Description: "احداث، تکمیل و تجهیز پایانه ها و توقفگاه های شهید فهمیده ",
    Mosavab: 20000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40106000010000,
    Description: "تکمیل تقاطع غیر همسطح انتهای کوی پردیس",
    Mosavab: 20000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 5010200001,
    Description: " بهنگام سازی، برداشت، تکمیل و غنی سازی نقشه های پایه شهری ",
    Mosavab: 20000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 60400100030000,
    Description: "ایجاد بازارچه خوداشتغالی بانوان خودسرپرست ",
    Mosavab: 20000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40801000030009,
    Description:
      "پیاده سازی سامانه پردازش تصویر و هوش مصنوعی سیستم های نظارت تصویری ",
    Mosavab: 20000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40801000030011,
    Description:
      "تکمیل خرید تجهیزات مورد نیاز جهت پشتیبانی چراغ های راهنمایی و دوربین های نظارت تصویری",
    Mosavab: 20000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40801000030012,
    Description:
      "تکمیل پشتیبانی و نگهداری شبکه فیبرنوری 170 ایستگاه دوربینهای نظارت تصویری",
    Mosavab: 20000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 5010200001,
    Description: "سامانه جامع شبکه صنعتی",
    Mosavab: 20000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40206000010015,
    Description: "پل عابر پیاده مسیر شهید هاشمی( ملاشیه )  (منطقه پنج)",
    Mosavab: 20000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 40207000010004,
    Description:
      "بهسازی کفپوش های فرسوده در بلوار ساحلی از پل سیاه تا پل پنجم (منطقه یک )",
    Mosavab: 20000000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 40208000010006,
    Description:
      "احداث، تکمیل، تجهیز و بهسازی میادین و ساماندهی ورودی های شهر  (منطقه سه )",
    Mosavab: 20000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 40804000010019,
    Description:
      "خرید و نصب تابلو و تجهیزات ترافیکی بلوار گلستان، هاشمی و کارگر غربی ،خبینه و کریشان ، پردیس ، فرهنگشهر  (منطقه پنج)",
    Mosavab: 20000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 40101000080000,
    Description: "مسیر 44 متری ارتباطی حد فاصل بلوار قدس تا بلوار امام رضا ",
    Mosavab: 20000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40201000020001,
    Description:
      "خرید و حمل مصالح مورد نياز جهت اجراي عمليات عمراني خدمات شهری و انجام برخی پروژه ها و فعالیت ها بصورت امانی  (منطقه یک )",
    Mosavab: 20000000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 20102000010038,
    Description: "پارک پردیس پشت درمانگاه ولایت   (منطقه پنج)",
    Mosavab: 20000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 20102000010076,
    Description: "تکمیل پارک کودک ( الوند ) (منطقه هشت )",
    Mosavab: 20000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 20103000010025,
    Description:
      "تکمیل شبکه ی اب خام منطقه هفت (بلوار نواب ،کوی رمضان ،سپیدار ) (منطقه هفت )",
    Mosavab: 20000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 20103000010002,
    Description:
      "خرید،تعمیر و سیم پیچی پمپ و اتصالات آب خام مجاور پل پنجم،بلوار جمهوری،بلوار آیت الله بهبهانی،خیابان شریعتی،خیابان زند و شهبا،خیابان جواد الائمه،خیابان رضوی،بلوار ساحلی،خیابان سلمان فارسی (منطقه یک )",
    Mosavab: 20000000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 20103000010023,
    Description: "بهسازی استگاه پمپاژ پارک لاله  (منطقه هفت )",
    Mosavab: 20000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40201000010079,
    Description:
      " اسفالت دستی خیابان های فرعی(منبع آب ،حصیر آباد ،بیست متر شهرداری )(منطقه هفت ) ",
    Mosavab: 20000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40201000020004,
    Description:
      "خرید دیوار پیش ساخته جهت محصور نمودن زمین های 153 هکتاری واقع در  مهر شهر (منطقه دو ) ",
    Mosavab: 20000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40201000020005,
    Description:
      "كرايه ماشين آلات خدمات شهری و اجراي عمليات عمراني خدمات شهری   (منطقه دو )",
    Mosavab: 20000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40201000020006,
    Description: "انجام امور عمرانی خدمات شهری و سامانه 137 (منطقه دو )",
    Mosavab: 20000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40201000010066,
    Description: "بهسازی و زیرسازی معابر کوی سیاحی (منطقه شش )",
    Mosavab: 20000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 40201000010031,
    Description:
      "زیر سازی و آسفالت قسمتی از باند شمالی بلوار لاله  (منطقه دو )",
    Mosavab: 20000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40203000010049,
    Description:
      "زیر سازی، جدولگذاری وآسفالت خیابان های کوی چنیبه سید موسی (منطقه چهار)",
    Mosavab: 20000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 40201000020008,
    Description: "جمع اوری نخاله های ساختمانی سطح منطقه  (منطقه سه )",
    Mosavab: 20000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 20702000010010,
    Description: "دفع آبهای سطحی بلوار لشکر در سطح منطقه  (منطقه دو )",
    Mosavab: 20000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 60602000320000,
    Description: "بهسازی  فضاهای  حرم علی ابن مهزیار (ع) ",
    Mosavab: 20000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 60602000250002,
    Description:
      "احداث و تکمیل کتابخانه ، فرهنگسرا ، نگارخانه و تالار اجتماعات و ....1",
    Mosavab: 20000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 60601000010000,
    Description: "راه اندازی گرمخانه (به استناد حکم شماره 9 بودجه)",
    Mosavab: 20000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 60602000010005,
    Description: "خرید و نصب لمپوست  در سطح  شهر",
    Mosavab: 20000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 60602000070000,
    Description: "احداث و تجهیز مساجد در سطح شهر(به استناد حکم شماره 46 بودجه)",
    Mosavab: 20000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40801000030003,
    Description:
      "تکمیل خرید، نصب و راه اندازی تجهیزات شبکه و دیتای سامانه های حمل و نقل هوشمند (توسعه و تجهیز دیتاسنتر مرکز کنترل ترافیک)",
    Mosavab: 19000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 30201000070007,
    Description: "خرید تجهیزات ایستگاه غواصی",
    Mosavab: 18000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 103010101,
    Description: "نورپردازی پل سفید-تکمیلی (معاونت شهرسازی)",
    Mosavab: 18000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 30101000010007,
    Description:
      "تکمیل قراردارد 2100/9225 - 99/4/7 موضوع احداث و مقاوم سازی سیل بند جهت ساحل رودخانه در محدوده پل چهارم ( سلمان فارسی ) مورد اجرای شرکت فنی کاران کریم - اعتباری ",
    Mosavab: 18000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 30201000070001,
    Description: "تجهیز ایستگاه آتش نشانی کوی مهدیس",
    Mosavab: 18000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40207000020000,
    Description:
      "مناسب سازی معابر و مبلمان شهری جهت افراد ناتوان جسمی و حرکتی (معلولان، سالمندان و کودکان ",
    Mosavab: 18000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 40207000010046,
    Description: "احداث پیاده رو خیابان 68متری کوی رمضان  (منطقه هفت )",
    Mosavab: 18000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 50301000010018,
    Description: "احداث دیوار نرده ای دور ساختمان اداری (منطقه هشت )",
    Mosavab: 18000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 50301000010014,
    Description: "احداث بازسازی پارتیشن بندی ساختمان های اداری (منطقه هفت )",
    Mosavab: 18000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40207000010018,
    Description: "اجرای پیاده راه سازی بصورت پراکنده  (منطقه سه )",
    Mosavab: 18000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 40207000010019,
    Description:
      "جدولگذاری و پیاده روسازی ضلع شمالی مسیر علی اباد   (منطقه سه )",
    Mosavab: 18000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 40207000010016,
    Description:
      "اجرای مسیر پیاده، همسطح سازی و بهسازی پیاده روها، کفپوش گذاری، جدولگذاری و مناسب سازی معابر پیاده  (منطقه سه )",
    Mosavab: 18000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 40203000010096,
    Description: "آزادسازی ترافیک محلات (منطقه هشت )",
    Mosavab: 18000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 40203000010097,
    Description: "ایمن سازی محورهای بزرگراهی وشریانی (منطقه هشت )",
    Mosavab: 18000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 40203000010035,
    Description: "استاندارد سازی تقاطع ها  (منطقه سه )",
    Mosavab: 18000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 20702000010006,
    Description:
      "خرید و اجرا و همسان سازی درب منهول ، منهول پیش ساخته و دال و رینگ و دریچه در خیابان زند،خیابان ادهم ،کوی یوسفی،کوی پاداد،کوی ابوذر،خیابان سلمان فارسی (منطقه یک )",
    Mosavab: 18000000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 20702000010026,
    Description:
      "خرید و اجرای لوله گذاری جهت دفع ابهای سطحی منطقه  (منطقه سه )",
    Mosavab: 18000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 30101000010014,
    Description: "دیوار حائل خ 29 (12 متری دوم منبع آب ) (منطقه هفت )",
    Mosavab: 18000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 30101000010017,
    Description:
      "ساماندهی پایین دست و بالادست دیوار بتنی بلوار نواب  (منطقه هفت )",
    Mosavab: 18000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 30101000010010,
    Description:
      "اجرای دیوار سنگی با سنگ ورقه ای جاده بالادست بلوار نواب روبروی منازل شرکت نفت (منطقه هفت )",
    Mosavab: 18000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 30101000010011,
    Description:
      "ساماندهی دیوار حائل خیابان 6 حصیر آباد و 3 منبع آب  (منطقه هفت )",
    Mosavab: 18000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 20702000010042,
    Description:
      "لایروبی جوی های  روباز گلدشت ،سادات، سیاحی و گلبهار  (منطقه شش )",
    Mosavab: 18000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 40201000020013,
    Description:
      "خرید و حمل مصالح مورد نياز جهت اجراي عمليات عمراني خدمات شهری و انجام برخی پروژه ها و فعالیت ها بصورت امانی   (منطقه پنج)",
    Mosavab: 18000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 40202000010017,
    Description: "جدولگذاری  ،تخریب و تعویض چداول فرسوده   (منطقه سه )",
    Mosavab: 18000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 40201000010042,
    Description:
      "ترمیم و لکه گیری نوار حفاری به صورت دستی ( نهضت آباد ، بهارستان ، سعدی ، کوی سیلو ، معین زاده ) (منطقه چهار)",
    Mosavab: 18000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 40201000010071,
    Description: "لکه گیری آسفالت (منطقه هفت )",
    Mosavab: 18000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40201000010081,
    Description:
      "خرید آسفالت جهت عملیات لکه گیری سامانه 137 در منطقه (منطقه هشت )",
    Mosavab: 18000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 20102000010062,
    Description: "احداث پارک محله ای خیابان 4 خالدی  (منطقه هفت )",
    Mosavab: 18000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 20102000010017,
    Description: "طراحي و احداث پارک در محدوده شهرک اندیشه  (منطقه سه )",
    Mosavab: 18000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 10301000010008,
    Description:
      "خرید پایه روشنایی  جهت نصب در میادین و بلوار های اصلی کیانشهر  (منطقه دو )",
    Mosavab: 18000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 10301000010009,
    Description: "خرید تجهیزات جهت  تامین روشنایی پارک 42 هکتاری  (منطقه دو )",
    Mosavab: 18000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 10303000020007,
    Description:
      "خرید رنگ ، انجام نقاشی ، زیبا سازی و رنگ آمیزی  وسایل پارکی و کاشی کاری دیواره ها در جداره های شرقی بلوار ساحلی،خیابان شریعتی در کوی جمهوری (منطقه یک )",
    Mosavab: 18000000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 20102000010020,
    Description:
      "احداث پارک فرشید دو ملی راه ضلع غربی روبروی کوی مهاجرین  (منطقه سه )",
    Mosavab: 17000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 40201000010053,
    Description:
      "لکه گیری و سطوح آسفالتی و ترمیم نوارهای حفاری بصورت دستی   (منطقه پنج)",
    Mosavab: 17000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 40203000010011,
    Description: "اصلاح هندسی تعریض جاده دغاغله (منطقه دو )",
    Mosavab: 17000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20702000010038,
    Description:
      "بازسازی و احداث سپتیک روبروی سایپا ( مسجد الرحمن ) مسیر حد فاصل میدان انقلاب تا میدان سیاحی  (منطقه شش ) ",
    Mosavab: 17000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 60603000010027,
    Description:
      "نورپردازی ، احداث سکو و جدولگذاری زمین های خاکی بلوار ساحلی (منطقه یک )",
    Mosavab: 17000000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 60603000010028,
    Description:
      " احداث زمین ورزشی شهدا صائبین خیابان ادهم بین زند و رودکی (منطقه یک )",
    Mosavab: 17000000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 10202000050001,
    Description: "مطالعات  ورودی های سطح شهر (معاونت شهرسازی)",
    Mosavab: 16000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10202000110002,
    Description:
      "مطالعات طرح اجرایی باززنده سازی رودخانه کارون  (تکمیلی) (معاونت شهرسازی)",
    Mosavab: 16000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40206000010019,
    Description:
      "جدولگذاری و تعویض جداول فرسوده  بهارستان ، جاده ساحلی ، بلوار کارگر ، شهرک برق ، مجاهد  (منطقه چهار)",
    Mosavab: 16000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 20102000010041,
    Description: "پارک محله ای شهرک پیام   (منطقه پنج)",
    Mosavab: 16000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 10304000020004,
    Description:
      "خرید و تعمیر و ساخت المان و استخر آبنما در بلوار ساحلی،بلوار جمهوری،میدان شهدا ،تقاطع پادادشهر،میدان جمهوری (منطقه یک )",
    Mosavab: 16000000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 10303000010012,
    Description:
      "برچیدن املاک واقع در پهنه خطر و تعریض خیابان نهج البلاغه  (منطقه هفت )",
    Mosavab: 16000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 60602000120000,
    Description: "بهسازی، تجهیز و نگهداری تالار شهید جمالپور",
    Mosavab: 16000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10301000010006,
    Description:
      "خرید ریسه چراغی جهت مراسمات و مناسبات در سطح منطقه 1(منطقه یک )",
    Mosavab: 15300000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 10304000010006,
    Description:
      "خرید کفپوش زمین های بازی پارک های محله ای سطح منطقه  (منطقه دو )",
    Mosavab: 15000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20102000010011,
    Description: "بهسازی پارک های محله ای  (منطقه دو )",
    Mosavab: 15000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20103000010026,
    Description:
      "تکمیل خرید وسایل و لوازم برقی مورد نیاز جهت ایستگاههای آب خام (منطقه هشت )",
    Mosavab: 15000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 40203000020010,
    Description:
      "خرید و حمل مصالح مورد نياز، اجراي عمليات عمراني خدمات شهری و انجام برخی پروژه‌ها و فعالیت ها بصورت امانی (به استناد حکم شماره 19 بودجه) (منطقه چهار)",
    Mosavab: 15000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 40201000010091,
    Description:
      "تکمیل زیرسازی  منازل بهداشت ودرمان ، نورد  لوله و...(منطقه هشت )",
    Mosavab: 15000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 40201000010075,
    Description: "زیرسازی و بهسازی و آسفالت کوی خالدی (منطقه هفت )",
    Mosavab: 15000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40201000010021,
    Description: "بهسازي و روكش آسفالت معابر فرسوده كيانپارس  (منطقه دو )",
    Mosavab: 15000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40201000010022,
    Description: "بهسازي و روكش آسفالت معابر فرسوده كيان آباد  (منطقه دو )",
    Mosavab: 15000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40201000010023,
    Description: "بهسازي و روكش آسفالت معابر فرسوده کیانشهر (منطقه دو )",
    Mosavab: 15000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40201000010024,
    Description: "بهسازي و روكش آسفالت معابر فرسوده امانیه  (منطقه دو )",
    Mosavab: 15000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20702000010004,
    Description:
      "تهیه و حمل و نصب قطعات بتنی برای جوی های روباز و حوضچه های آبهای سطحی در امام خمینی شرقی،خیابان آزادگان،خیابان شریعتی،خیابان رستگاری (منطقه یک )",
    Mosavab: 15000000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 20103000010032,
    Description:
      "خرید لوله و اتصالات پلی اتیلن جهت بهسازی شبکه آب خام فضای سبز در سطح منطقه (منطقه هشت )",
    Mosavab: 15000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 40204000010001,
    Description: "احداث مسیر و ایستگاه های دوچرخه بلوار ساحلی غربی",
    Mosavab: 15000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40204000010002,
    Description: "احداث مسیر و ایستگاه های دوچرخه بلوار ساحلی شرقی",
    Mosavab: 15000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40206000010001,
    Description:
      "احداث و تکمیل، تجهیز و بهسازی پل های عابر پیاده معمولی و مکانیزه  بلوار گلستان روبروی درب غربی دانشگاه ",
    Mosavab: 15000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40206000010002,
    Description:
      "احداث و تکمیل، تجهیز و بهسازی پل های عابر پیاده معمولی و مکانیزه  روبروی استادیوم  تختی",
    Mosavab: 15000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40801000030015,
    Description: "بهره برداری، پشتیبانی و نگهداری  سامانه های ثبت تخلف",
    Mosavab: 15000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 50301000040000,
    Description: "خرید لوازم مصرف نشدنی",
    Mosavab: 15000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 50301000040000,
    Description: "خرید لوازم مصرف نشدنی",
    Mosavab: 15000000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 50301000040000,
    Description: "خرید لوازم مصرف نشدنی",
    Mosavab: 15000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 50102000130000,
    Description: "تعمیر و خرید رایانه ، پرینتر ، اسکنر و وسائل جانبی آن11",
    Mosavab: 15000000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 40804000010005,
    Description: "خرید تجهیزات ترافیکی  (منطقه یک )",
    Mosavab: 15000000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 40203000010056,
    Description:
      "اصلاح هندسی در بلوار شهید هاشمی روبه روی کوی مندلی  (منطقه شش )",
    Mosavab: 15000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 40206000010004,
    Description:
      "بهسازی ، تعمیر،نگهداری،رنگ آمیزی پل های عابر پیاده در بلوار جمهوری،بلوار آیت الله بهبهانی (منطقه یک )",
    Mosavab: 15000000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 40207000010013,
    Description:
      "کفپوش گذاری ادامه مسیر پیاده روی در فاز 4 پارک 42 هکتاری جنب پل طبیعت (منطقه دو )",
    Mosavab: 15000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 60603000010051,
    Description: "بهسازی زمین های خاکی فوتبال محلات  (منطقه شش )",
    Mosavab: 14200000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 5010200001,
    Description:
      "اسکن و بایگانی (آرشیو ) الکترونیکی (مدارک، اسناد، پرونده و ....) ",
    Mosavab: 14000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 50102000130000,
    Description: "تعمیر و خرید رایانه ، پرینتر ، اسکنر و وسائل جانبی آن11",
    Mosavab: 14000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20702000010007,
    Description:
      "لایروبی وصفحه کشی خطوط دفع آبهای سطحی و فاضلاب شهری در سطح  (منطقه یک )",
    Mosavab: 14000000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 20702000010045,
    Description: "همسطح سازی دریچه های منهول ها  (منطقه هفت )",
    Mosavab: 14000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40201000010041,
    Description:
      "ترمیم و لکه گیری سطوح آسفالتی به صورت دستی ( بهارستان ، نهضت آباد ، شهرک برق ، مجاهد ، گلستان ) (منطقه چهار) ",
    Mosavab: 14000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 40202000010002,
    Description:
      "تهیه و رنگ آمیزی جداول در اتوبان آیت ال... بهبهانی،بلوار جمهوری،خیابان آزادگان،بلوار ساحلی (منطقه یک )",
    Mosavab: 14000000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 10304000020044,
    Description:
      "احداث المان شهدای گمنام در فضای سبز بلوار صداقت شرقی (منطقه هشت )",
    Mosavab: 14000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 10304000010027,
    Description:
      "خرید مبلمان شهری پارکی(پارک ثامن الائمه،پارک شهید سبحانی،پارک پرنیا،پارک بهاران،پارک نشاط،پارک منازل سازمانی)  (منطقه شش )",
    Mosavab: 13500000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 10304000010030,
    Description:
      "خرید مجموعه بازی پلی اتیلن ( پارک کوی رمضان ،پارک 224 واحدی ،پارک 18هکتاری ساحلی پارک علامه )(منطقه هفت )",
    Mosavab: 13500000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 10304000010022,
    Description:
      "خرید ونصب وسایل پلی اتیلن پارکهای پردیس غدیر و اندیشه  (منطقه پنج)",
    Mosavab: 13500000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 30101000010016,
    Description: "فاز دوم دیوار حائل کوی مجاهدین  (منطقه هفت )",
    Mosavab: 13500000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40207000010034,
    Description: "ترمیم و احداث پیاده رو در بلوار گلشن پردیس",
    Mosavab: 13500000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 10304000010004,
    Description:
      "تعمیر و بهسازی وسایل بازی پارکهای محله ای در سطح منطقه  (منطقه دو )",
    Mosavab: 13300000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 10301000010038,
    Description: "خرید سان لایت بلوار انقلاب  (منطقه شش )",
    Mosavab: 13000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 20102000010005,
    Description:
      "خاکبرداری و خاکریزی پارک های خیابان جمهوری حد فاصل پل پنجم تا میدان جمهوری باند کندرو،خیابان امام خمینی شرقی از یوسفی تا پل مدافعین حرم،مسیر کوت عبدال... (منطقه یک )",
    Mosavab: 13000000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 10304000020019,
    Description:
      "خرید ، ساخت، بازسازی و نصب و نگهبانی المان ها، آبنما و آثار حجمی و پمپ های آبنما  (منطقه سه )",
    Mosavab: 13000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 20102000010053,
    Description:
      "احداث پارک محله ای خیابان صالحین ( صلاح الدین ) واقع در کوی سیاحی   (منطقه شش )",
    Mosavab: 13000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 20102000010077,
    Description: "احداث فاز دوم پارک مریم (منطقه هشت )",
    Mosavab: 13000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 20702000010034,
    Description:
      "تکمیل لوله گذاری با لوله پلی اتیلن جهت دفع آبهای سطحی خیابان اندیشه به کارگر   (منطقه پنج)",
    Mosavab: 13000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 20702000010035,
    Description:
      "لوله گذاری دفع آبهای سطحی شهرک رزمندگان و پردیس (گلفام به کریشان یک)  (منطقه پنج)",
    Mosavab: 13000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 40202000010015,
    Description: " جدولگذاری  معابر کیانشهر  (منطقه دو )",
    Mosavab: 13000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40202000010020,
    Description: "جدولگذاری و ترمیم جداول فرسوده پردیس و فرهنگشهر  (منطقه پنج)",
    Mosavab: 13000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 40202000010021,
    Description: "جدولگذاری و ترمیم جداول فرسوده بلوار گلستان  (منطقه پنج)",
    Mosavab: 13000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 40202000010022,
    Description: "تکمیل قرارداد ترمیم جداول فرسوده و جدولگذاری  (منطقه پنج)",
    Mosavab: 13000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 40203000010015,
    Description:
      " اصلاح هندسی بلوار مهر شهر ، دوربرگردان میدان صیاد شیرازی و دور برگردان ضلع شرقی میدان چمران   (منطقه دو )",
    Mosavab: 13000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40203000020030,
    Description:
      "خرید و اجرای رنگ سرد محوری  جهت خط کشی بلوار گلستان ، شهید هاشمی ، شهرک دانشگاه ، بلوار گلدیس  (منطقه پنج)",
    Mosavab: 13000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 40207000020000,
    Description:
      "مناسب سازی معابر و مبلمان شهری جهت افراد ناتوان جسمی و حرکتی (معلولان، سالمندان و کودکان ",
    Mosavab: 13000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 20102000020001,
    Description:
      "تامین گل، گیاه، بذر، نهال، هرس درختان و سم و لوازم باغبانی و هزینه ماشین آلات آبیاری و  فعالیت های استقبال از نوروزاحداث فرش گل،باغ صخره ای،المانهای فضای سبز و خرید گونه های جدید و …",
    Mosavab: 13000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40801000010009,
    Description:
      "خرید و اجرای دو ایستگاه ثبت تخلف سرعت  غیر مجاز بلوار هاشمی  (منطقه دو )",
    Mosavab: 12600000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40301000010020,
    Description: "خرید ایستگاه اتوبوس سطح منطقه  (منطقه هفت )",
    Mosavab: 12549000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 10304000010019,
    Description:
      "ایمن سازی ،بهسازی مبلمان و تجهیزات شهری ،پارکی،بازی و تندرستی  پارک مالک اشتر ، کاویان ، غدیر و شهرک پیام   (منطقه پنج)",
    Mosavab: 12500000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 40202000010023,
    Description: "خرید  رنگ  جدولی  (منطقه هفت )",
    Mosavab: 12000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 20702000010048,
    Description: "عملیات دفع آبهای سطحی پیچوار (منطقه هشت )",
    Mosavab: 12000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 20302000010000,
    Description:
      "احداث جایگاه و خرید و تعمیر گاری فان و مخازن پسماند و تفکیک زباله  (منطقه یک )",
    Mosavab: 12000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 20302000010000,
    Description:
      "احداث جایگاه و خرید و تعمیر گاری فان و مخازن پسماند و تفکیک زباله  (منطقه یک )",
    Mosavab: 12000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 20302000010000,
    Description:
      "احداث جایگاه و خرید و تعمیر گاری فان و مخازن پسماند و تفکیک زباله  (منطقه یک )",
    Mosavab: 12000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 20302000010000,
    Description:
      "احداث جایگاه و خرید و تعمیر گاری فان و مخازن پسماند و تفکیک زباله  (منطقه یک )",
    Mosavab: 12000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 20302000010000,
    Description:
      "احداث جایگاه و خرید و تعمیر گاری فان و مخازن پسماند و تفکیک زباله  (منطقه یک )",
    Mosavab: 12000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 20302000010000,
    Description:
      "احداث جایگاه و خرید و تعمیر گاری فان و مخازن پسماند و تفکیک زباله  (منطقه یک )",
    Mosavab: 12000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 20302000010000,
    Description:
      "احداث جایگاه و خرید و تعمیر گاری فان و مخازن پسماند و تفکیک زباله  (منطقه یک )",
    Mosavab: 12000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40207000010048,
    Description:
      "ترمیم پیاده روهای  فرسوده ( طرح استقبال از بهار) (منطقه هشت )",
    Mosavab: 12000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 40804000010027,
    Description:
      "خرید،نصب، پشتیبانی، تجهیز و اجرای چراغ های راهنمایی، تابلوهای انتظامی، راهنمای مسیر و تجهیزات ترافیکی معمولی و هوشمند (منطقه هشت )",
    Mosavab: 12000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 50301000010009,
    Description: "بهسازی ساختمان های اداری منطقه4 (منطقه چهار)",
    Mosavab: 12000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 40801000030013,
    Description:
      "تعمیر و نگهداری سامانه های ترافیکی هوشمند (چراغ های راهنمایی و دوربین های نظارت تصویری)",
    Mosavab: 12000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40106000040002,
    Description:
      "بهسازی و ترمیم بخش فولادی پل ششم ( فولاد ) با احتساب ارزش افزوده ( ترک تشریفات با شرکت عمران امید خوزستان )  ( قرارداد 2100/17419 - 1401/5/30 )",
    Mosavab: 12000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40801000010002,
    Description:
      "خرید و اجرای دوربین های نظارت تصویری (اعتباری - ماده 23 جرایم)",
    Mosavab: 12000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10304000010007,
    Description: "خرید نیمکت و سطل زباله جهت پارک 42 هکتاری  (منطقه دو )",
    Mosavab: 11600000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20101000010013,
    Description:
      "خرید تجهیزات جهت توسعه آب خام در گلستان و بهارستان در گلستان، بهارستان، شهرک برق ،مجاهد، معین زاده و اکباتان (منطقه چهار)",
    Mosavab: 11000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 20502000010011,
    Description: "احداث سرویس بهداشتی در پارک لاله  (منطقه هفت )",
    Mosavab: 11000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 20702000020007,
    Description:
      "نصب پمپ های ورتیکال الکترو پمپ و موتور پمپ  های اس پی جهت دفع ابهای سطحی  (منطقه سه )",
    Mosavab: 11000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 40203000010014,
    Description:
      "تکمیل قرارداد اصلاح هندسی بلوار ساحلی زیر پل سفید و میهن ، خیابان شهید چمران نبش سروش ، تقاطع وهابی – موحدین ، خرداد نبش خیابان 21 و کیانشهر (منطقه دو )",
    Mosavab: 11000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40303000010001,
    Description: "کمک به احداث و توسعه برون شهری سیاحت",
    Mosavab: 11000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10202000050016,
    Description: "مشاور معین ترافیک شرق اهواز",
    Mosavab: 11000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10202000050017,
    Description: "مشاور معین ترافیک غرب اهواز",
    Mosavab: 11000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10202000050018,
    Description: "مطالعات و طراحی مسیر اتصال بلوار قدس به جاده حمیدیه",
    Mosavab: 11000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40203000020036,
    Description: "خرید رنگ سرد محوری (منطقه هفت )",
    Mosavab: 11000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 20301000020000,
    Description:
      "جمع آوری، مبارزه و پناهگاه سگهای بلاصاحب و جانوران موذی  (منطقه یک )",
    Mosavab: 10800000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 20301000020000,
    Description:
      "جمع آوری، مبارزه و پناهگاه سگهای بلاصاحب و جانوران موذی  (منطقه یک )",
    Mosavab: 10800000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20301000020000,
    Description:
      "جمع آوری، مبارزه و پناهگاه سگهای بلاصاحب و جانوران موذی  (منطقه یک )",
    Mosavab: 10800000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 20301000020000,
    Description:
      "جمع آوری، مبارزه و پناهگاه سگهای بلاصاحب و جانوران موذی  (منطقه یک )",
    Mosavab: 10800000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 20301000020000,
    Description:
      "جمع آوری، مبارزه و پناهگاه سگهای بلاصاحب و جانوران موذی  (منطقه یک )",
    Mosavab: 10800000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 20301000020000,
    Description:
      "جمع آوری، مبارزه و پناهگاه سگهای بلاصاحب و جانوران موذی  (منطقه یک )",
    Mosavab: 10800000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 20301000020000,
    Description:
      "جمع آوری، مبارزه و پناهگاه سگهای بلاصاحب و جانوران موذی  (منطقه یک )",
    Mosavab: 10800000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 20302000020000,
    Description:
      "جمع آوری، مبارزه و پناهگاه سگهای بلاصاحب و جانوران موذی  (منطقه چهار)",
    Mosavab: 10800000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 20702000010008,
    Description:
      "تهیه و اجرای لوله گذاری بصورت پراکنده بمنظور دفع آبهای سطحی  (منطقه دو )",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20702000010011,
    Description: "احداث سپتیک بلوار ارتش کیانشهر  (منطقه دو )",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20702000010012,
    Description:
      "خرید لوله پلی اتیلن جهت دفع آبهای سطحی خیابان های 5،9،13 ، 17 و میهن شرقی کیانپارس  (منطقه دو )",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20702000010013,
    Description: "تعمیر و بهسازی شبکه دفع آبهای سطحی  (منطقه دو )",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20702000020011,
    Description:
      "خرید 9 دستگاه الکتروپمپ  لجن کش 6 اینچ 15 کیلووات جهت نصب ثابت به همراه گاید و زانویی(خیابان سروش نبش انقلاب، مسیر الرحمن، خیابان تراکتورسازی و خیابان الهادی روبه روی ناحیه سه خدمات )  (منطقه شش )",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 20702000020012,
    Description:
      "خرید تجهیزات ایستگاه های پمپاژ شبکه دفع آبهای سطحی (منطقه هفت ) ",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 20702000020015,
    Description: "خرید دو دستگاه پمپ لجن کش  (منطقه هشت )",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 20701000010033,
    Description:
      "اجرای عملیات لایروبی و صفحه کشی فاضلاب و آبهای سطحی  (منطقه چهار)",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 20702000020009,
    Description:
      "خرید پمپ لجن کش  به همراه اتصالات جهت نصب در انتهای شهرک دانشگاه ، 13 رشد و جنب دانشگاه آزاد    (منطقه پنج)",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 40203000010008,
    Description:
      "احداث پهلوگاه اتوبوس دربلوار آیت الله بهبهانی،بلوار جواد الائمه،خیابان زند،خیابان سلمان فارسی،خیابان شریعتی (منطقه یک )",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 40203000010010,
    Description:
      "مدیریت ترافیک محدوده کاربری های جاذب سفر در محدوده بیمارستان امام خمینی و بیمارستان فاطمه زهرا (منطقه یک )",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 40201000020020,
    Description:
      "اجرای عملیات و احکام صادره سامانه 137 بصورت پیمانی(منطقه هشت )",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 40201000020015,
    Description: "خرید و حمل مصالح مورد نياز  (منطقه شش )",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 40201000020003,
    Description:
      "خرید و حمل مصالح مورد نياز جهت اجراي عمليات عمراني خدمات شهری   (منطقه دو )",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40201000010027,
    Description: "تکمیل صورتجلسه زیرسازی قطعه 6 کیانشهر  (منطقه دو )",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40201000010028,
    Description:
      "زیرسازی فضای مجاور امتداد مسیر بلوار قدس به سمت میدان پلیس راه قدیم  (منطقه دو )",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40201000010076,
    Description: "تکمیل آسفالت دستی خیابان مشکات   (منطقه هفت )",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40201000010077,
    Description: " تکمیل آسفالت پتک طلایی (منطقه هفت )",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40201000010079,
    Description: "بهسازی و زیرسازی و آسفالت کوی ملاشیه  (منطقه پنج)",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 40201000010069,
    Description: "بهسازی و زیرسازی معابر پراکنده سطح منطقه   (منطقه شش )",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 40201000010063,
    Description: "تکمیل زیرسازی و آسفالت دستی کوچه های کم عرض  (منطقه شش )",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 40201000010064,
    Description: "بهسازی و زیرسازی معابر کوی سلیم آباد  (منطقه شش )",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 40201000010091,
    Description:
      "زیرسازی و آسفالت مسیر پل ششم حدفاصل میدان مهدیس تا اتوبان آیت اله بهبهانی (منطقه هشت )",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 40201000010090,
    Description: "زیرسازی منازل جانبازان 2 واقع در پشت کوی صادقیه (منطقه هشت )",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 40201000010087,
    Description: "تکمیل زیرسازی خیابانهای متفرقه در سطح منطقه (منطقه هشت )",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 20103000010011,
    Description:
      "سرویس  و تعمیرات ایستگاه های پمپاژ اب خام و پمپ های سیار  (منطقه سه )",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 20103000010007,
    Description:
      "توسعه و بروز رسانی ایستگاه پمپاژ و شبکه انتقال آب خام در سطح منطقه (منطقه دو )",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20103000010008,
    Description: "خرید 18 کیلومتر لوله پلی اتیلن  در سطح منطقه  (منطقه دو )",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20103000010009,
    Description:
      "خرید لوله پلی اتیلن جهت تعمیر و بهسازی خط آب خام فضای سبز (منطقه دو )",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20103000010004,
    Description: "تعمیر و بهسازی شبکه آب خام در سطح منطقه (منطقه دو )",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20103000010031,
    Description:
      "خرید و نصب و اجرای دو دستگاه  الکترو پمپ خنزیره و تابلو برق جهت ایستگاه آبگیری پل پنجم  (منطقه هشت )",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 20103000010024,
    Description:
      "تکمیل قرارداد لوله گذاری آب خام  ساحلی حد فاصل پل سوم تا پل هفتم  (منطقه هفت )",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 20103000010016,
    Description: "ایستگاه آب خام  کریشان   (منطقه پنج)",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 20103000010017,
    Description: "ایستگاه آب خام شهرک پیام   (منطقه پنج)",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 20103000010018,
    Description:
      "خرید لوله و اتصالات پلی اتیلن جهت فضای سبز اندیشه ، شهرک پیام و مسیر بقایی   (منطقه پنج)",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 20102000010078,
    Description: "تکمیل پارک سعادت فاز 2 پادادشهر (منطقه هشت )",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 20102000020017,
    Description:
      " تامین گل، گیاه، بذر، نهال، هرس درختان و سم و لوازم باغبانی و هزینه ماشین آلات آبیاری   (منطقه شش )",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 20102000010060,
    Description: " تکمیل پارک نواری مهاجرین (منطقه هفت )",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40101000090000,
    Description:
      " ادامه مسیر زیرگذر 18 متری چهارم کیان آباد تا میدان امام رضا (ع )",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40207000010014,
    Description: "ترمیم پیاده روهای باند کند روی ساحلی (منطقه دو )",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40207000010006,
    Description:
      "بهسازی پیاده رو با بتن دکوراتیو پارک 42 هکتاری حد فاصل خیابان سروش شرقی تا خیابان 17 شرقی کیانپارس  (منطقه دو )",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40203000010047,
    Description:
      "اصلاح هندسی بلوار گلستان نبش ورودی کوی فرهنگ شهر   (منطقه پنج)",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 40804000010028,
    Description:
      "مدیریت ترافیک جاذبه های سفر (ورزشگاه فولاد، بنکداران ،آهن فروشان)  (منطقه هشت )",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 40804000010023,
    Description: "خرید تجهیزات ترافیکی (منطقه هفت )",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 50301000040000,
    Description: "خرید لوازم مصرف نشدنی",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 60602000260001,
    Description:
      "تکمیل و تجهیز سرای محله برکت فرهنگیان و برکت کوی زوییه   (منطقه سه )",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 60602000260011,
    Description: "بهسازی سرای محله کوی آل صافی  (منطقه هفت )",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40208000010007,
    Description: "بازسازی میدان شهید بقایی  (منطقه پنج)",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 40801000030017,
    Description: "هوشمند سازی تقاطع خیابان شریعتی به فاضلی  (منطقه هفت )",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 10202000050002,
    Description: "مطالعات و طراحی 2 دستگاه پل عابر پیاده",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10202000050007,
    Description: "مطالعات تحلیل وضعیت ایمنی شبکه معابر",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10202000050010,
    Description: "طراحی باکس راه آهن",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10202000050013,
    Description: "تهیه طرح ایمن سازی معابر بزرگراهی و شریانی",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10202000070007,
    Description:
      "مطالعات و طراحی تفرجگاه  کوهساران تا پل ولایت در کوی آل صافی در منطقه 7",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10202000090002,
    Description: "مطالعات و طراحی تقاطع سه راه خرمشهر",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 60603000010047,
    Description: "احداث و بهسازی زمین چمن مصنوعی در سطح منطقه",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 60603000010049,
    Description: "زمین ورزشی مالک اشتر کوی فرهنگشهر   (منطقه پنج)",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 60603000010036,
    Description:
      "احداث زمین ورزشی روباز بلوار مدرس ضلع شمالی میدان چهاراسب   (منطقه سه )",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 60603000010059,
    Description:
      "تکمیل و بهسازی زمینهای ورزشی در سطح منطقه ( کوی صادقیه ، مهدیس ، امام شرقی ) (منطقه هشت )",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 10202000020001,
    Description: "مطالعات و مشاور آزمایشگاه و خدمات نقشه برداری",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10202000110004,
    Description: "مشاور راهبر (عامل چهارم ) (جدید) (معاونت شهرسازی)",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 30201000070002,
    Description: "خرید نردبان 52 متری",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 20401000010001,
    Description: "خرید و تعمیرات ماشین آلات عمرانی  و خدماتی ",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 20401000010002,
    Description: "وام جهت خرید ماشین آلات عمرانی خدماتی(سازمان موتوری)",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40303000010002,
    Description: "کمک به احداث و توسعه برون شهری شرق",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40501000010001,
    Description:
      "نظارت بر پروژه تکمیل پارکینگ طبقاتی خیابان طالقانی ( صورتجلسه سازمان بهسازی و نوسازی ) ",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 30301000060000,
    Description: "تجهیز پایگاه پشتیبانی از آبهای سطحی",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40201000010007,
    Description:
      "تعدیل قرارداد 1900/17202 - 98/2/10 موضوع بهسازی، قیرپاشی و آسفالت معابر سطح مناطق 3 و 7 شهرداری مورد اجرای شرکت قلعه ساز امید ",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40801000030004,
    Description:
      "تکمیل خرید تجهیزات مورد نیاز جهت پشتیبانی چراغ های راهنمایی و دوربین های نظارت تصویری",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40801000030005,
    Description:
      "خرید، نصب و راه اندازی 3 ایستگاه تابلوهای VMS (بلوار ساحلی غربی، بلوار شهید سردار سلیمانی)",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40801000030006,
    Description:
      "توسعه زیرساخت و بستر ارتباطی پروژه های هوشمند سازی حمل و نقل(برقراری ارتباط دوربین های ثبت تخلف سرعت توسط شبکه فیبرنوری)",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 5010200001,
    Description: "طرح مطالعات شبکه رادیویی",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 50102000120000,
    Description: " ممیزی جامع شهر ",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 5010200001,
    Description: "پیاده سازی و استقرار شبکه RTK",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 5010200001,
    Description: "پلاک کوبی املاک شهری مبتنی بر QR code (منطقه 2_پایلوت)",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 5010200001,
    Description: "تکمیل سایت B کارشناسان",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 60602000260013,
    Description: "احداث، تکمیل و تجهیز سرای های محله کوی نبوت",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 60602000010004,
    Description: "احداث ، تکمیل و تجهیز یادمان شهدای غواص در پارک جزیره",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 60602000010001,
    Description:
      "ساخت و نصب بیلبورد آموزش شهروندی و تابلوهای روان (هوشمند و قابل برنامه ریزی )",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 60602000010002,
    Description: "احداث ، ترمیم و بازسازی و نشان گذاری هویتی شهر اهواز",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 2030100004,
    Description:
      "تامین مصالح و تجهیزات به منظور محرومیت زدایی در مناطق حاشیه ای و کم برخوردار شهر اهواز با همکاری مؤسسات و گروه های جهادی و بسیج شهرداری",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 50102000020000,
    Description: "خرید نرم افزار ، تجهیزات و اجرای دوربین های مدار بسته1",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 302010201,
    Description: "تکمیل ایستگاه آتش نشانی جنب انبار هلالی1",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 60604000010002,
    Description: "تجهیز و تکمیل کتابخانه شهید دلفی",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 60604000010003,
    Description: "تجهیز و تکمیل کتابخانه مولوی",
    Mosavab: 10000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 30201000070005,
    Description: "تجهیز سالن ورزش",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 30201000070006,
    Description: "تجهیز اتاق فرماندهی( مانیتورینگ)",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 103030206,
    Description:
      "تکمیل انجام نقاشی دیواری افقی در استقبال از بهار 1402 (معاونت شهرسازی)",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40207000010037,
    Description: "ترمیم و احداث پیاده رو در شهرک رزمندگان  (منطقه پنج)",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 40207000010038,
    Description:
      " تکمیل قرارداد ترمیم و احداث پیاده رو در خیابان اصلی فرهنگشهر  (منطقه پنج)",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 40207000020000,
    Description:
      "مناسب سازی معابر و مبلمان شهری جهت افراد ناتوان جسمی و حرکتی (معلولان، سالمندان و کودکان ",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 40207000010033,
    Description:
      "ترمیم بهسازی پیاده رو های فرسوده  بلوار کارگر ، بهارستان ، نهضت آباد ، جاده ساحلی ، گلستان  (منطقه چهار)",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 40207000020000,
    Description:
      "مناسب سازی معابر و مبلمان شهری جهت افراد ناتوان جسمی و حرکتی (معلولان، سالمندان و کودکان ",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 40203000010045,
    Description:
      "اصلاح هندسی اتوبان گلستان، سه راه خبینه و سه راه گروه ملی   (منطقه پنج)",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 40203000010095,
    Description: "استاندارد سازی تقاطع های بلوار معلم  (منطقه هشت )",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 40207000010035,
    Description: "ترمیم و احداث پیاده رو در ملاشیه  (منطقه پنج)",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 40207000010028,
    Description: "احداث پیاده رو در بلوار آریا (منطقه چهار)",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 40207000010029,
    Description: "پیاده رو بلوار نخلستان (منطقه چهار)",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 40207000010020,
    Description:
      "جدولگذاری و پیاده روسازی  باند شمالی بلوار اصلی کوی فرهنگیان و محوطه داخلی پارک فرهنگیان یک  (منطقه سه )",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 40207000010021,
    Description:
      "جدولگذاری و پیاده روسازی باند شمالی بلوار ساحلی کوی ملت از استخر موج به سمت 32 متری ذوالفقاری  (منطقه سه )",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 40207000010022,
    Description:
      "جدولگذاری و پیاده روسازی  ضلع غربی خیابان فرشید 2 ملی راه  (منطقه سه )",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 40207000010023,
    Description:
      "جدولگذاری و پیاده روسازی ایلند میانی بلوار ایلیما در شهرک اغاجاری  (منطقه سه )",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 40207000010024,
    Description:
      "جدولگذاری و پیاده روسازی دو سمت ورودی خیابان اصلی جواهری از سمت بلوار شهید دغاغله  (منطقه سه )",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 10301000010010,
    Description:
      "خرید و نصب فونداسیون پایه های روشنایی  پارک 42 هکتاری  (منطقه دو )",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 10301000010011,
    Description: "خرید تجهیزات جهت نورپردازی پل طبیعت  (منطقه دو )",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 10303000010030,
    Description:
      "خرید پروژکتور پارکهای ( یاسمن ، الحدید ، خلیج  فارس ، گلها ، سعدی ، مالیات ، ولایت ) (منطقه چهار)",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 10301000010037,
    Description: "خرید ریسه بلوطی و شلنگی و سوزنی  (منطقه پنج)",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 10301000010043,
    Description: "بهسازی و تکمیل روشنایی پارکها  (منطقه هفت )",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 10301000010044,
    Description: "ریسه بندی و آذین بندی (منطقه هفت )",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 10301000010027,
    Description:
      "خرید ریسه های ال ای دی  جهت نصب در میدان فرودگاه، میدان اقبال، مسیر سردار سلیمانی  (منطقه سه )",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 10301000010032,
    Description:
      "ترمیم و بهسازی روشنایی فضاهای بازی کودکان پارک  های 9 رشد ، اندیشه ، شهرک پیام و مالک اشتر ، کاویان    (منطقه پنج)",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 10301000010033,
    Description: "تهیه و تجهیز روشنایی در سطح منطقه  (منطقه پنج)",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 10301000010017,
    Description: "خرید پرژکتور smd  و پایه روشنایی جهت جاده ساحلی  (منطقه دو )",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 10301000010023,
    Description:
      "ترمیم و بهسازی روشنایی فضاهای بازی کودکان پارک  زیتون ، کوی ملت، فرشید دو، پارک مینا  (منطقه سه )",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 10301000010024,
    Description:
      "خرید پروژکتور مورد نیاز روشنایی مسیر صوتگیر در بلوار بسیج و پارک ولایت (منطقه سه )",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 10301000010025,
    Description:
      "خرید تجهیزات و بهسازی روشنایی  پارک کوی اغاجاری و منابع طبیعی  و پارک مینا و شهرک اندیشه  (منطقه سه )",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 10303000020019,
    Description: "رنگ آمیزی دیوارهای فرسوده  (منطقه پنج)",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 10304000020010,
    Description: "خرید تجهیزات و اجرای آبنمای میدان چمران  (منطقه دو )",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20102000010058,
    Description: "بهسازی فاز 1 پارک ثامن رو به روی کوی سیاحی  (منطقه شش ) ",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 20102000010030,
    Description: "فضای سبز خیابان کوکب (منطقه چهار)",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 20102000010042,
    Description:
      "جدول گذاری قطعات فضای سبز شهرک دانشگاه و فرهنگشهر(محصور کردن)  (منطقه پنج)",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 20102000010043,
    Description: "فضای سبز جنب بیمارستان بقایی   (منطقه پنج)",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 20102000010021,
    Description:
      "بهسازی پارک محله ای خیابان مجاور بانک صادرات کوی فرهنگیان و زرگان  (منطقه سه )",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 20102000010014,
    Description:
      "اجرای عملیات  خاکبرداری و خاکریزی نباتی لوپ های زیر گذر جانباز و مثلثی پل نهم  (منطقه دو )",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 10304000020026,
    Description:
      " خرید و نصب المانهای بلوار کارگر ، میدان کودک ، پارک جوان ،  پارک بعثت  و المان  شهدای گمنام   (منطقه پنج)",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 10304000020027,
    Description: "تعمیرات و نگهداری از ایستگاه های پمپاژ   (منطقه پنج)",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 20102000010010,
    Description: "بهسازی پارک محله ای فردوس (منطقه دو )",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20102000020003,
    Description: "خرید نهاده های فضای سبز  (منطقه یک )",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 20103000010022,
    Description:
      "خرید جزئی و تعمیر و جوشکاری اتصالات پلی اتیلن آب خام سطح منطقه (منطقه هفت )",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40201000020007,
    Description:
      "خریدو حمل مصالح مورد نیاز جهت اجرای عملیات عمرانی خدمات شهری و انجام برخی پروژه ها بصورت امانی  (منطقه سه )",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 40201000010070,
    Description: "ترمیم نوارهای حفاری (منطقه هفت )",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40201000010058,
    Description:
      "لکه گیری و ترمیم نوارهای حفاری نقاط پراکنده(کوی علوی،کمپلوی شمالی و جنوبی،کوی عین دو،مندلی)  (منطقه شش )",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 40201000010059,
    Description:
      "تهیه قیر و لکه گیری و ترمیم سطوح آسفالتی(کوی علوی،کمپلوی شمالی و جنوبی،کوی عین دو،مندلی) (منطقه شش )",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 40201000020018,
    Description: "مصالح و سامانه 137 (منطقه هفت )",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40202000010016,
    Description:
      "ترمیم جداول فرسوده کوی کیانپارس و امانیه واقع در منطقه 2   (منطقه دو )",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40203000010018,
    Description:
      "خرید رنگ جدولی( بلوار ساحلی غربی،گلستان،کارگر،فروردین،دی، رفیش، علوی،اکباتان) (منطقه چهار)",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 40203000010005,
    Description:
      " اجرای گذرگاه عابر پیاده رو در آیلند خیابان شریعتی،خیابان جواد الائمه،خیابان زند (منطقه یک )",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 20702000010047,
    Description:
      "تهیه لوله جهت اجرای عملیات لوله گذاری در بلوار سپهر ، بلوار بعثت ، باباطاهر ، بلوار دانش و... (منطقه هشت )",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 20702000010036,
    Description:
      "تکمیل قرارداد همسان سازی دریچه های فاضلاب در سطح منطقه  (منطقه پنج)",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 20702000010037,
    Description: "لایروبی و صفحه کشی شبکه فاضلاب و آبهای سطحی   (منطقه پنج)",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 20702000010040,
    Description: "همسطح سازی درب منهول ها   (منطقه شش )",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 20701000020008,
    Description: "خرید  پمپ لجن کش  ، پمپ sp  (منطقه چهار)",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 20604000010006,
    Description:
      "احداث،تکمیل،تعمیر بازارچه های صدف،سلطانی،یوسفی،نادری (منطقه یک )",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 20701000010031,
    Description:
      "تکمیل تعمیر و اورهال کردن پمپ های دفع آبهای سطحی  (منطقه چهار)",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 20701000010032,
    Description:
      "همسان سازی درب منهول های خطوط فاضلاب شهری در سطح منطقه4 (منطقه چهار)",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 20702000010028,
    Description:
      "لایروبی شبکه اصلی و فرعی لوله های فاضلاب و خطوط دفع ابهای سطحی  (منطقه سه )",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 20702000010029,
    Description:
      "لوله گذاری دفع آبهای سطحی در خیابان ولیعصر واقع در کوی گلستان (منطقه چهار)",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 20302000010000,
    Description:
      "احداث جایگاه و خرید و تعمیر گاری فان و مخازن پسماند و تفکیک زباله  (منطقه یک )",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 20103000010035,
    Description:
      "خرید چهار دستگاه الکترو موتور جهت تقویت فشار آب در انتهای خط آب خام جاده ماهشهر ، پارک صداقت ، مسیر پل ششم ، مسیر بنکداران  (منطقه هشت )",
    Mosavab: 9000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 20502000010007,
    Description:
      "بازسازی و بهسازی سرویس های بهداشتی  پارک ولایت، هفت جام نرگس، بلوار مدرس، پارک فرشید دو و ساحلی کوی ملت  (منطقه سه )",
    Mosavab: 8500000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 20102000020022,
    Description:
      " تامین گل، گیاه، بذر، نهال، هرس درختان و سم و لوازم باغبانی و هزینه ماشین آلات آبیاری  (منطقه هفت )",
    Mosavab: 8500000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40207000010030,
    Description: "پیاده رو خیابان خوش (منطقه چهار)",
    Mosavab: 8500000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 10301000010013,
    Description:
      "خرید طرح نوری پرده نمایش جهت نصب در جاده ساحلی نبش خیابان 9 شرقی در منطقه 2  (منطقه دو )",
    Mosavab: 8100000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 10302000020000,
    Description: "ساخت و نصب تابلوهای میادین ",
    Mosavab: 8000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10304000010018,
    Description:
      "تجهیز پارکها به مبلمان شهری متناسب با کودکان پارک مالک اشتر ، کاویان ، غدیر و شهرک پیام (منطقه پنج)",
    Mosavab: 8000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 20102000020009,
    Description: "تامین نهال و خرید انواع گونه های جدید  (منطقه دو )",
    Mosavab: 8000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20103000020012,
    Description: "خرید گل فصلی  (منطقه چهار)",
    Mosavab: 8000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 20102000010080,
    Description: "خاکبرداری وخاکریزی نباتی در سطح منطقه (منطقه هشت )",
    Mosavab: 8000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 20102000020031,
    Description: "تامین سم و لوازم باغبانی و ماشین آلات آبیاری (منطقه هشت )",
    Mosavab: 8000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 20102000010002,
    Description:
      "تکمیل پارک صباغان جهت معلولان ، سالمندان و کودکان  (منطقه یک )",
    Mosavab: 8000000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 20102000010016,
    Description: "چمن کاری در سطح منطقه (منطقه دو )",
    Mosavab: 8000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20102000010046,
    Description: "خاکبرداری و خاکریزی نباتی در منطقه    (منطقه پنج)",
    Mosavab: 8000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 20102000010057,
    Description: "بهسازی پارک نشاط واقع در بلوار قدس   (منطقه شش )",
    Mosavab: 8000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 20102000010055,
    Description: "بهسازی پارک آلاله واقع در خیابان انقلاب   (منطقه شش )",
    Mosavab: 8000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 20401000010004,
    Description: "خرید و تعمیرات ماشین آلات عمرانی  و خدماتی   (منطقه سه )",
    Mosavab: 8000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 30101000010009,
    Description:
      "خرید دیوار و پایه پیش ساخته بتنی جهت سیل بند روبروی هتل پارس و انتهای جاده ساحلی شرقی (منطقه یک )",
    Mosavab: 8000000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 40203000010028,
    Description: "تهیه و اجرای گاردیل (منطقه دو )",
    Mosavab: 8000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40201000010019,
    Description:
      "ترمیم نوار حفاری  فیبر نوری و بازیافت سرد سطوح آسفالتی (منطقه دو )",
    Mosavab: 8000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40203000020033,
    Description: "خرید رنگ و اجرای رنگ آمیزی جداول (منطقه شش )",
    Mosavab: 8000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 40203000020034,
    Description:
      "خرید و اجرای رنک دو جزئی در بلوار حاج قاسم سلیمانی  و بلوار فنی حرفه ای  (منطقه هفت )",
    Mosavab: 8000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40203000020035,
    Description: "خرید رنگ و اجرای خط کشی عابر پیاده  (منطقه هفت )",
    Mosavab: 8000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40203000020025,
    Description: "خرید رنگ و رنگ امیزی جداول بتنی سطح منطقه  (منطقه سه )",
    Mosavab: 8000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 40206000010005,
    Description: "پل عابر پیاده میدان شهید چمران (منطقه دو )",
    Mosavab: 8000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40203000020039,
    Description:
      "خرید رنگ سرد محوری بلوار معلم ، امام شرقی ، سردار هاشمی و فنی و حرفه ای (منطقه هشت )",
    Mosavab: 8000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 40301000010019,
    Description: "تعمیر و بازسازی ایستگاه اتوبوس معمولی  (منطقه هفت )",
    Mosavab: 8000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40804000010020,
    Description:
      "خرید و نصب پایه دکورانیو چراغ فرمان در خیابان انقلاب (منطقه شش )",
    Mosavab: 8000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 60602000270000,
    Description: "طرح استقبال از مهر (بازگشایی مدارس)",
    Mosavab: 8000000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 50301000040000,
    Description: "خرید لوازم مصرف نشدنی",
    Mosavab: 8000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 40804000010017,
    Description:
      "خرید و نصب تجهیزات ترافیکی در بلوار سردار سلیمانی؛ بلوار نفت،بلوار مدرس و خیابان شهید علاف  (منطقه سه )",
    Mosavab: 8000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 50102000130000,
    Description: "تعمیر و خرید رایانه ، پرینتر ، اسکنر و وسائل جانبی آن11",
    Mosavab: 8000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 60603000010056,
    Description: "بهسازی  زمین ورزشی چهارصد دستگاه  (منطقه هفت )",
    Mosavab: 8000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40801000030016,
    Description:
      "تکمیل پشتیبانی و نگهداری دوربینهای ثبت تخلف و تابلوهای VMS(پشتیبانی و نگهداری 32سامانه ثبت تخلف سرعت)",
    Mosavab: 8000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40206000010003,
    Description:
      "احداث و تکمیل، تجهیز و بهسازی پل های عابر پیاده معمولی و مکانیزه روبروی درب شمالی دانشگاه ",
    Mosavab: 8000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40203000010001,
    Description: "ايمن سازي و اصلاح هندسي معابر بلوار های  ساحلی شرقی  و غربی ",
    Mosavab: 8000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40203000010002,
    Description:
      "ايمن سازي و اصلاح هندسي معابر تندراهی و شریانی بلوار های هاشمی ، گلستان ، اکباتان ، مدرس  ،قدس  ، کارگر ، امام شرقی ، پاسداران  و ...",
    Mosavab: 8000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40801000010006,
    Description: "خرید و اجرای دوربین های ثبت تخلف (اعتباری - ماده 23 جرایم)",
    Mosavab: 8000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10301000010029,
    Description:
      "خرید پایه روشنایی ( مسیر جاده ساحلی حد فاصل میدان شقایق تا فاز 2 خلیج فارس ، زمینهای خاکی فوتبال علوی  ، پارک مالیات ، پارک سلامت ) (منطقه چهار)",
    Mosavab: 7650000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 20102000020026,
    Description: "خرید نهال ، درخت و درختچه (منطقه هشت )",
    Mosavab: 7500000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 20102000010071,
    Description:
      "توسعه فضای سبز در بلوار الوند و انتهای منازل کوی ستایش (منطقه هشت )",
    Mosavab: 7500000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 20102000010072,
    Description: "توسعه فضای سبز در بلوار  صداقت شرقی (منطقه هشت )",
    Mosavab: 7500000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 20702000030009,
    Description:
      "تعمیر و نگهداری  از ایستگاه های پمپاژ شبکه دفع آبهای سطحی منطقه (منطقه شش )",
    Mosavab: 7500000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 10304000020020,
    Description: "المان شهدای گمنام ( پارک گلها)(منطقه چهار)",
    Mosavab: 7200000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 10301000010014,
    Description:
      "خرید سانلایت جهت نصب در بلوار های ساحلی ، سپاه ، انقلاب و مدرس (منطقه دو )",
    Mosavab: 7200000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 10301000010012,
    Description:
      "خرید چراغ خیابانی 100 وات led  جهت تامین روشنایی پارک جزیره  (منطقه دو )",
    Mosavab: 7200000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 10304000010020,
    Description:
      "ترمیم ،تعویض و خرید کفپوشهای گرانولی در محوطه ها و زمین های بازی کودکان   پارک مالک اشتر ، کاویان ، غدیر و شهرک پیام   (منطقه پنج)",
    Mosavab: 7200000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 10304000010011,
    Description:
      "خرید ، ترمیم و تعویض کفپوشهای گرانولی در محوطه های زمین های بازی پارک ولایت، پارک شهرک اندیشه، پارک مینا  (منطقه سه )",
    Mosavab: 7200000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 10304000010016,
    Description:
      "خرید ست بازی کودکان ( مادر نیلوفر ، گلها ، شقایق ، سلامت ) (منطقه چهار)",
    Mosavab: 7200000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 10303000020022,
    Description:
      "نقاشی دیواری (نهج البلاغه ، بلوار ساحلی ،بلوار نواب ،بلوار فنی حرفه ای، کارون (منطقه هفت )",
    Mosavab: 7200000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 103030204,
    Description:
      "تکمیل انجام نقاشی دیواری عمودی غرب کارون در استقبال از بهار 1402 (معاونت شهرسازی)",
    Mosavab: 7200000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 103030205,
    Description:
      "تکمیل انجام نقاشی دیواری عمودی شرق کارون در استقبال از بهار 1402 (معاونت شهرسازی)",
    Mosavab: 7200000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 50301000010003,
    Description: "بهسازی ساختمان های اداری معاونت فرهنگی و اجتماعی",
    Mosavab: 7000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40804000010018,
    Description:
      "خرید و نصب تجهیزات ترافیکی  بلوار اکباتان ، بلوار ساحلی ، فروردین ، آریا ، علوی ، نور ، انقلاب ، جمهوری ، گلستان و رفیش  (منطقه چهار)",
    Mosavab: 7000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 50301000010006,
    Description:
      " ساختمان ناحیه 4 خدمات شهری منطقه 2 واقع در کیانشهر  (منطقه دو )",
    Mosavab: 7000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 50301000040000,
    Description: "خرید لوازم مصرف نشدنی",
    Mosavab: 7000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 60602000260010,
    Description: "بهسازی سرای محله کوی علوی  (منطقه شش )",
    Mosavab: 7000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 40804000010021,
    Description:
      "خرید تابلوها و تجهیزات ترافیکی(جاده اهواز حمیدیه ،بلوار قدس،بلوار انقلاب،بلوار شهید هاشمی جنوبی،خ 68 متری،بلوار الهادی،شیخ بهای جنوبی،میدان پانزده خرداد،خ داغری،امیرکبیر شمالی)  (منطقه شش )",
    Mosavab: 7000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 40801000030018,
    Description: "استاندارد سازی تقاطع زیتون کارگری  (منطقه هفت )",
    Mosavab: 7000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40501000010006,
    Description:
      "احداث پارکینگ روبروی مجتمع شهید ابراهیمی واقع در منطقه 2 (منطقه دو )",
    Mosavab: 7000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40207000010047,
    Description: "ترمیم جداول فرسوده ( طرح استقبال از بهار) (منطقه هشت )",
    Mosavab: 7000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 40301000010013,
    Description:
      "بهسازی ایستگاه های اتوبوس مکانیزه و معمولی سطح منطقه  (منطقه سه )",
    Mosavab: 7000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 40206000010016,
    Description:
      "بهسازی ، تعمیر و رنگ  آمیزی پلهای عابر پیاده  بلوار گلستان نبش اندیشه ، نبش امنیت و بعد از میدان کودک  (منطقه پنج)",
    Mosavab: 7000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 40206000010012,
    Description:
      "بهسازی ، مسقف سازی  پل های عابر پیاده بلوار سردار سلیمانی حد فاصل تقاطع شهید کجباف تا زرگان  5 پل عابر پیاده  (منطقه سه )",
    Mosavab: 7000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 40203000020026,
    Description:
      "خرید و اجرای رنگ جهت اجرای خط کشی محوری ( بلوار ساحلی ، بلوار گلستان ، بلوار فروردین ، بلوار علوی ، بلوار جمهوری ،  بلوار انقلاب ، بلوار کارگر ، مسیر اکباتان ) (منطقه چهار)",
    Mosavab: 7000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 40203000020037,
    Description:
      "خرید و اجرای رنگ آمیزی جداول امام شرقی ، فنی وحرفه ای ، بلوار سپهر ، سردار هاشمی (منطقه هشت )",
    Mosavab: 7000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 40203000020038,
    Description:
      "خرید و اجرای رنگ دوجزیی بلوار معلم ، امام شرقی ، سردار هاشمی و فنی و حرفه ای (منطقه هشت )",
    Mosavab: 7000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 40203000010090,
    Description:
      "اصلاح هندسی دوربرگردان بلوار فنی و حرفه ای روبروی راکتور ساز (منطقه هشت )",
    Mosavab: 7000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 40203000010069,
    Description: "دوربرگردان زیر پل شهید کجباف ضلع شرقی  (منطقه هفت )",
    Mosavab: 7000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40203000010054,
    Description: "اصلاح هندسی ورودی کوی مندلی و خیابان 68 متری  (منطقه شش )",
    Mosavab: 7000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 40203000010061,
    Description:
      "خرید مصالح جهت پروژه های اصلاح هندسی  به صورت امانی  (منطقه هفت )",
    Mosavab: 7000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 10304000020031,
    Description: "خرید ، ساخت و نصب المان ها ی شهری  (منطقه شش )",
    Mosavab: 7000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 20102000020023,
    Description: "خرید گل بهاره  (منطقه هشت )",
    Mosavab: 7000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 20103000010019,
    Description: "لوله گذاری آب خام  اتوبان شهید بقایی  (منطقه پنج)",
    Mosavab: 7000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 20702000030007,
    Description:
      "بازسازی و بهینه سازی پمپ های ورتیکال الکترو پمپ و موتور پمپ های اس پی جهت دفع ابهای سطحی  (منطقه سه )",
    Mosavab: 7000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 40201000010011,
    Description:
      "زیر سازی و آسفالت کوچه های منتهی به خیابان خسروی کوی آخر آسفالت در منطقه 1 (منطقه یک )",
    Mosavab: 7000000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 20702000010051,
    Description:
      "لایروبی مسیرها و خطوط دفع آبهای سطحی و فاضلاب  شرق و غرب بلوار معلم ، کوی باهنر ، کوی ترابری ، مخزن ساز و... (منطقه هشت )",
    Mosavab: 7000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 20702000020002,
    Description:
      "خرید و نصب دستگاه پمپ های لجن کش بلوار آیت الله بهبهانی،کوی یوسفی،بلوار جمهوری،خیابان شریعتی،بلوار ساحلی،خیابان ادهم،خیابان رستگاری (منطقه یک )",
    Mosavab: 7000000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 20702000010043,
    Description: " لایروبی،  اصلاح و احداث سیستم دفع آبهای سطحی  (منطقه هفت )",
    Mosavab: 7000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40101000250000,
    Description: "تعریض مسیر شمال به جنوب زیر پل پنجم در جاده ساحلی غربی",
    Mosavab: 7000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 60602000250002,
    Description:
      "احداث و تکمیل کتابخانه ، فرهنگسرا ، نگارخانه و تالار اجتماعات و ....1",
    Mosavab: 7000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 20502000010014,
    Description:
      "احداث و تکمیل سرویس بهداشتی چهار چشمه  پارک سوسن مجاور مقبره شهدای گمنام (منطقه هشت )",
    Mosavab: 6500000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 20102000020027,
    Description: "خرید چمن جهت توسعه فضای سبز در سطح منطقه (منطقه هشت )",
    Mosavab: 6500000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 10303000010013,
    Description: "احیای پیاده راه  بافت تاریخی عامری (منطقه هفت )",
    Mosavab: 6500000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 10303000010002,
    Description:
      "هزینه اجرای بند 14 ماده 55 رفع خطر از ساختمانهای فرسوده و پر خطر خیابان کاوه،بازار عبدالحمید،خیابان امام ،خیابان طالقانی،خیابان شریعتی،کوی یوسفی(منطقه یک )",
    Mosavab: 6400000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 10301000010026,
    Description: "تهیه و تجهیز روشنایی پارکها سطح منطقه موردی  (منطقه سه )",
    Mosavab: 6300000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 10301000010016,
    Description: "خرید و نصب هرم نوری در میدان پلیس راه قدیم   (منطقه دو )",
    Mosavab: 6300000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 10304000010009,
    Description:
      "خرید مبلمان شهری و پارکی  جهت نصب در پارک یاس زوییه، پارک فدک، پارک کوی نیرو،شهرک شاهد  (منطقه سه )",
    Mosavab: 6200000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 10304000010013,
    Description:
      "خرید و نصب مجموعه وسایل بازی پلی اتیلن کودکان جهت نصب در پارک شهرک اندیشه، پارک مینا، پارک بیمه  (منطقه سه )",
    Mosavab: 6200000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 20102000010012,
    Description:
      "تهیه لوله و اتصالات جهت بهسازی سیستم آبیاری شبکه آب خام  (منطقه چهار)",
    Mosavab: 6000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 20102000010014,
    Description:
      "تهیه ،تعمیر و راه اندازی پمپ های  الکترو موتور ایستگاههای پمپاژ آب خام فضای سبز (منطقه چهار)",
    Mosavab: 6000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 20102000020025,
    Description: "خرید گل پاییزه (منطقه هشت )",
    Mosavab: 6000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 10304000020029,
    Description:
      "خرید پمپ و تجهیزات جانبی پمپ جهت استفاده در سطح پارکهای اندیشه،بعثت،ملاشیه،شهرک دانشگاه،چکاوک و آبنماهای پارک دانشجو ،شکوفه و .. در منطقه   (منطقه پنج)",
    Mosavab: 6000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 10304000020030,
    Description:
      "خرید پمپ آبنما میدان فردوس ، پارک  پردیس و فرهنگشهر   (منطقه پنج)",
    Mosavab: 6000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 20102000010013,
    Description: "خاکریزی نباتی   (منطقه دو )",
    Mosavab: 6000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 10304000020038,
    Description: "خرید و بازسازی آبنما و آثار حجمی (منطقه هفت )",
    Mosavab: 6000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 20102000010037,
    Description: "تهیه و کاشت چمن (منطقه چهار)",
    Mosavab: 6000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 20102000010045,
    Description: "پارک پردیس جنب تعاونی کارکنان دانشگاه آزاد   (منطقه پنج)",
    Mosavab: 6000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 20502000010015,
    Description:
      "احداث و تکمیل سریس بهداشتی چهار چشمه  پارک سعادت  (منطقه هشت )",
    Mosavab: 6000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 20502000010012,
    Description:
      "، تکمیل، بازسازی و تعمیر  سرویس  های بهداشتی و آبخوری (منطقه هفت )",
    Mosavab: 6000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 30301000050000,
    Description: "هزینه اجرای بند 14 ماده 55 قانون شهرداریها (منطقه دو )",
    Mosavab: 6000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 20702000030010,
    Description:
      " تعمیر و نگهداری از ایستگاه های پمپاژ شبکه دفع آبهای سطحی  (منطقه هفت )",
    Mosavab: 6000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40201000010089,
    Description:
      "تکمیل قرارداد زیرسازی و جدولگذاری باند دوم بلوار اصلی مهدیس حدفاص میدان مادر تا بنکداران (منطقه هشت )",
    Mosavab: 6000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 40207000010042,
    Description:
      "اجرای سرعتکاه آسفالتی بلوار کارگر شرقی، خیابان رفیش،  کوی سعدی، کوی مجاهد (منطقه چهار)",
    Mosavab: 6000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 40203000010034,
    Description: "احداث سرعتکاه اسفالتی در سطح منطقه  (منطقه سه )",
    Mosavab: 6000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 40202000010025,
    Description:
      "اجرا و ترمیم و تعویض جداول فرسوده و رنگ آمیزی جداول خیابان های منطقه (منطقه هشت )",
    Mosavab: 6000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 40203000010065,
    Description:
      "اصلاح هندسی خرد محلات بستن تقاطع های سپیدار و کوی سلطانمنش (منطقه هفت )",
    Mosavab: 6000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40203000020031,
    Description:
      "خرید رنگ سرد ترافیکی ( محوری) به همراه تینر مخصوص(بلوار لشکر،بلوار قدس رفت و برگشت،بلوار شهید هاشمی شمالی و جنوبی،میدان انقلاب،جاده اهواز حمیدیه رفت و برگشت،بلوار انقلاب،خ شهید داغری،شیخ بهای شمالی و جنوبی،تقاطع انقلاب فراهانی،تقاطع انقلاب شیخ بها و تقاطع انقلاب امیرکبیر)  (منطقه شش )",
    Mosavab: 6000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 40203000020032,
    Description:
      "خرید رنگ دو جزئی و اجرای خط کشی عابر پیاده و ترسیم نقوش(بلوار قدس مسیر رفت و برگشت،بلوار شهید هاشمی جنوبی،جاده اهواز-حمیدیه،کوی علوی،خ 68 متری،کوی 15خرداد،خ امیرکبیر شمالی،خ آزادی،کوی مندلی،خ فرامرزپور،جلوی درب مدارس و مرازکز آموزشی)  (منطقه شش )",
    Mosavab: 6000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 40206000010018,
    Description:
      "مسقف سازی پلهای عابر پیاده بلوار نواب و بلوار سپهبد شهید قاسم سلیمانی (منطقه هفت )",
    Mosavab: 6000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40206000010019,
    Description: "رنگ آمیزی پلهای عابر پیاده  (منطقه هفت )",
    Mosavab: 6000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40207000010012,
    Description: "پیاده روسازی بلوار ارتش (منطقه دو )",
    Mosavab: 6000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40301000010003,
    Description: "نرده گذاری ایستگاه های تاکسی هسته مرکز شهر (منطقه یک )",
    Mosavab: 6000000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 40804000010003,
    Description: "خرید، تعمیر و بازسازی تابلوهای راهنمای مسیر  (منطقه یک )",
    Mosavab: 6000000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 40801000010014,
    Description:
      "خرید، نصب و راه اندازي دوربين  نظارت تصويري و ثبت تخلف تقاطع غیر همسطح شهید کجباف (منطقه هفت )",
    Mosavab: 6000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40801000010011,
    Description:
      "خرید، نصب و راه اندازي دوربين نظارت تصويري و ثبت تخلف بلوار سردار سلیمانی مسیر رفت و برگشت  (منطقه هفت )",
    Mosavab: 6000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40801000010012,
    Description:
      "خرید، نصب و راه اندازي دوربين  نظارت تصويري و ثبت تخلف بلوار نواب مسیر رفت و برگشت (منطقه هفت )",
    Mosavab: 6000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 50301000030000,
    Description:
      " مناسب سازی ساختمان های شهرداري جهت افراد ناتوان جسمی و حرکتی(معلولان، سالمندان و ...) (منطقه دو )",
    Mosavab: 6000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 60602000280003,
    Description: "نماز خانه پارک 42 هکتاری جنب یادمان بین الحرمین  (منطقه دو )",
    Mosavab: 6000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 50301000010005,
    Description:
      "تکمیل صورتجلسه احداث ساختمان اداری منطقه 2 واقع در کیانشهر  (منطقه دو )",
    Mosavab: 6000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 50301000010010,
    Description:
      "احداث، تکمیل، تعمیر، تجهیز و بازسازی ساختمانها و محوطه های اداری   (منطقه پنج)",
    Mosavab: 6000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 50301000010002,
    Description:
      "تکمیل بهسازی ساختمان شماره 3 شهرداری ( شرکت عمران کارون خاورمیانه )",
    Mosavab: 6000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10301000010028,
    Description:
      "خرید لوازم برقی  جهت روشنایی پارکها ی (صدف 2و1 سلامت ، حجاب ، نیلوفر ، نسترن ، جاده ساحلی  ، مادر ، میثاق  ) (منطقه چهار)",
    Mosavab: 5850000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 20502000010010,
    Description:
      " تعمیر  سرویس  های بهداشتی(پارک سبحانی،پارک ثامن)  (منطقه شش )",
    Mosavab: 5500000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 20103000010034,
    Description:
      "خرید لوله و اتصالات پلی اتیلن جهت بهسازی شبکه آب خام بلوارهای دعبل خزاعی ، قطعات جدید ، منازل کوی ستایش ، بلوار الوند ، بلوار بعثت ، سیصد دستگاه و ترمیم عیوب بلوار فنی و حرفه ای و قطعات مجاور (منطقه هشت )",
    Mosavab: 5500000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 10301000010034,
    Description:
      "بهسازی و تکمیل روشنایی پارکهای اندیشه|،پردیس،بعثت،دانشجو ،جوان و گلزار   (منطقه پنج)",
    Mosavab: 5400000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 10301000010035,
    Description:
      "بهسازی وتکمیل روشنایی پارک کاویان،مالک اشتر،شکوفه، ملاشیه،رشد  (منطقه پنج)",
    Mosavab: 5400000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 10304000010031,
    Description:
      "خرید مبلمان شهری(صندلی پارکی ، سطل زباله ،باربکیو و ست سلامت ) (منطقه هفت )",
    Mosavab: 5400000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 10303000020017,
    Description:
      "نقاشی ، زیباسازی، بدنه سازی و مناسب سازی سیمای شهری  (منطقه سه )",
    Mosavab: 5400000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 10301000010039,
    Description: "خرید ریسه بلوطی جهت میادین  (منطقه شش )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 10301000010041,
    Description:
      "ریسه بندی فضاهای عمومی، ساحلی ، میادین شهری و  آب نما و بناها و پل ها  (منطقه شش )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 40101000150000,
    Description:
      "مسير پل ششم در غرب رودخانه حد فاصل بلوار آريا و اتوبان گلستان",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 20102000010047,
    Description: " چمن کاری   (منطقه پنج)",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 20102000010056,
    Description:
      "بهسازی پارک خیابان تیر منازل سازمانی کمپلو شمالی   (منطقه شش )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 20102000010015,
    Description:
      "اجرای عملیات خاکبرداری و خاکریزی بلوار امام رضا (ع) (منطقه دو )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 10304000020034,
    Description: "تکمیل احداث المان شهدای پارک شهید سبحانی  (منطقه شش )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 10304000020035,
    Description:
      "بهسازی آبنماهای میدان 15خرداد ،توپ و پارک سبحانی  (منطقه شش )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 10304000020036,
    Description: "بهسازی آبنماهای میدان انقلاب  (منطقه شش )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 10304000020037,
    Description:
      "خرید وتعمیر پمپ های سیار،ایستگاههای پمپاژ و پمپ های ابنما  (منطقه شش )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 20102000010012,
    Description: "خاکبرداری و خاکریزی خیابانهای بلوار ارتش (منطقه دو )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20102000010003,
    Description: "تکمیل پارک شهدای صائبین جهت پارک دوست دار کودک (منطقه یک )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 20102000020028,
    Description: "خرید بذر جهت گلهای فصلی  (منطقه هشت )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 20103000010005,
    Description: "خرید پمپهای شبکه آب خام در سطح منطقه  (منطقه دو )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20103000010006,
    Description: "تعمیرات پمپهای شبکه آب خام سطح منطقه  (منطقه دو )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20103000010020,
    Description:
      "خرید پمپ جهت نصب در سطح فضای سبز اندیشه ، شهرک پیام و مسیر بقایی   (منطقه پنج)",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 20103000010030,
    Description:
      "توسعه شبکه آب خام در فاز دو  پاداد  جهت پارک  انتهای بلوار امام شرقی ( لوله سازی ) (منطقه هشت )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 20604000010014,
    Description: "احداث بازارچه محله ای کوی سیصد دستگاه (منطقه هشت )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 20702000010030,
    Description:
      "لوله گذاری دفع آبهای سطحی در نقاط بحرانی سطح منطقه4(فواصل کوتاه) (منطقه چهار)",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 20702000010052,
    Description:
      "لایروبی کانالهای روباز آبهای سطحی با بیل مکانیکی و ماشین آلات (منطقه هشت )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 20702000020013,
    Description: "خرید دودستگاه پمپ خود مکش 6 اینچ (منطقه هشت )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 20702000020014,
    Description: "خرید دوستگاه الکترو موتور لجن کش 4و 6 اینچ (منطقه هشت )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 40202000010024,
    Description: "تکمیل قرارداد خرید  رنگ  جدولی  (منطقه هفت )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40203000010013,
    Description:
      "تکمیل صورتجلسه اصلاح هندسی دوربرگردان بلوار هاشمی  روبروی ستاد راهیان نور (منطقه دو )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40201000020019,
    Description:
      "خرید و حمل مصالح مورد نیاز جهت علیات عمرانی خدمات شهری و انجام فعالیتهای امانی (منطقه هشت )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 40201000010091,
    Description:
      "بازیافت سرد آسفالت ضلع غربی جاده فولاد حدفاصل درب 2 شرکت فولاد تا میدان فولاد ( باند قدیم )  (منطقه هشت )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 40201000010029,
    Description:
      "زیرسازی و آسفالت جاده دسترسی اطراف بازار بار فروشان  (منطقه دو )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40201000010043,
    Description: "تکمیل قرار داد لکه گیری و ترمیم نوار حفاری  (منطقه چهار)",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 5010200009,
    Description:
      "خرید، نصب ، پشتیبانی، تعمیر و تجهیز و راه اندازی سیستم برنامه و بودجه و مدیریت پروژه",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 50301000060000,
    Description: "تجهیز ساختمان اداری به مولد  و تابلو برق اضطراری",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 5010200001,
    Description: "مدل بومی اهواز هوشمند",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 5010200001,
    Description: " نظارت هوشمند بر ساخت و ساز",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 5010200001,
    Description:
      "سامانه مدیریت و نظارت بر قراردادهای خدمات شهری مبتنی بر داده های اطلاعات مکانی",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 5010200001,
    Description: "سامانه مدیریت شبکه فیبر نوری",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40801000030008,
    Description: "خرید و اجرای سیستم های هوشمند پارکینگ و پارکبان",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 5010200001,
    Description: " مرکز عملیات امنیت( SOC )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 5010200001,
    Description: "خرید سامانه یکپارچه مالی (ستاد مناطق و سازمانها)",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 5010200001,
    Description: "خرید خدمات مشاوره زیر ساخت",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 5010200001,
    Description: "مقاوم سازی و اصلاح دکل ها",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 5010200001,
    Description: "بهبود و توسعه API های سامانه ها",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40303000010003,
    Description: "کمک به احداث و توسعه برون شهری خلیج فارس",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40207000010002,
    Description:
      "تکمیل قرارداد 2100/11965 - 99/12/9 موضوع پیاده روسازی و احداث وضوخانه روبروی شرکت فولاد خوزستان در منطقه 8 ( ترک تشریفات با قرارگاه منطقه ای جنوب کربلا ( نیروی زمینی سپاه ) )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40203000010003,
    Description:
      "تکمیل اصلاح هندسی و اصلاح هندسی معابر ( موتوری، قراردادهای مرکز)",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40203000010003,
    Description: "اصلاح هندسی بلوار گلستان حدفاصل میدان کارگر پمپ بنزین سیاحی",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40203000010003,
    Description: "تکمیل اصلاح هندسی و اصلاح هندسی معابر سطح شهر",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40106000040001,
    Description:
      "احداث دیوار کوله ، دستک و دال دسترسی پل ششم ( فولاد ) با احتساب ارزش افزوده ( ترک تشریفات با شرکت تدبیر سویل صنعت پارس ) ( قرارداد 2100/17420 - 1401/5/30 ) ",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40105000020000,
    Description:
      "بهسازی و بازسازی معابر حاشیه ای و کم برخوردار شرق اهواز (تفاهم نامه با قرارگاه منطقه ای کربلا)",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 20102000080001,
    Description: "احداث نیروگاه خورشیدی در ساختمان  اداری ",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 20604000010004,
    Description:
      "هزینه اجرای پروژه تکمیل 31 غرفه میدان الغدیر ( تکمیل قرارداد 104/2130 - 93/11/26 )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 60603000010050,
    Description: "تکمیل زمین ورزشی ثامن یک ( روبروی کوی سیاحی )   (منطقه شش )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 60603000010040,
    Description: "بازسازی و تجهیز زمین های ورزشی سطح منطقه  (منطقه سه )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 60603000010046,
    Description:
      "احداث سکو  ، نورپردازی ، تکمیل، ایمن سازی و بازسازی و بهسازی زمین های ورزشی و خاکی  (منطقه پنج)",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 60603000010038,
    Description:
      "احداث رختکن و سکوی تماشاچیان و..... زمین های ورزشی سطح منطقه  (منطقه سه )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 60603000010035,
    Description: "ایمن سازی و بهسازی زمین های ورزشی سطح منطقه  (منطقه سه )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 10202000020002,
    Description:
      "بکارگیری آزمایشگاه فنی مکانیک خاک استان جهت نمونه برداری از پروژه پارکینگ طبقاتی طالقانی ",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 60603000010060,
    Description: "احداث زمین چمن مصنوعی روباز(منطقه هشت )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 10202000050014,
    Description: "طرح اصلاح هندسی معابر و محله ها",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10202000050015,
    Description: "طراحی خط 2 سامانه اتوبوس تندرو (BRT)",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10202000050012,
    Description: "مطالعات مدیریت ترافیک کاربری های جاذب سفر",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10202000050008,
    Description:
      "مطالعه و طراحی واریانت ساحلی شرقی ، حدفاصل پل نهم تا استخر موج",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10202000050009,
    Description: "طراحی پایانه شرق",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10202000050003,
    Description: "مطالعات و طراحی تابلوهای راهنمای مسیر ",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10202000050004,
    Description: "مطالعات و طراحی پارک آموزش ترافیک ",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10202000050005,
    Description: "مطالعات عارضه سنجی بیمارستانها",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 50301000010013,
    Description: "بهسازی سایت اداری   (منطقه شش )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 50102000130000,
    Description: "تعمیر و خرید رایانه ، پرینتر ، اسکنر و وسائل جانبی آن11",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 50102000130000,
    Description: "تعمیر و خرید رایانه ، پرینتر ، اسکنر و وسائل جانبی آن11",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 50102000130000,
    Description: "تعمیر و خرید رایانه ، پرینتر ، اسکنر و وسائل جانبی آن11",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 40804000010026,
    Description: "تهیه و نصب تابلوهای راهنمای مسیر (منطقه هفت )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 60602000260012,
    Description:
      "تکمیل و تجهیز سرای محله کوی رمضان(خرید یک باب آسانسور) (منطقه هفت )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 60603000010029,
    Description: "زمین ورزشی چمن مصنوعی در ساحلی غربی   (منطقه دو )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 60603000010030,
    Description: "تکمیل و تجهیز سوله ورزشی مهرشهر  (منطقه دو )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 60603000010031,
    Description: "تکمیل و تجهیز زمین های ورزشی  (منطقه دو )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 60602000260004,
    Description: "خرید تجهیزات مورد نیاز  سرای محله کیانشهر  (منطقه دو )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40804000010008,
    Description:
      "خرید و اجرای تابلوهای اطلاعاتی و اخباری در منطقه  (منطقه دو )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40804000010015,
    Description: "خرید و نصب تابلو vms بلوار مدرس  (منطقه دو )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40801000010010,
    Description:
      "خرید، نصب و راه اندازي دوربين  نظارت تصويري و ثبت تخلف بلوار بسیج (منطقه هفت )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40301000010017,
    Description:
      "نصب ایستگاه اتوبوس در محلات کم برخوردار(کوی سلیم آباد،کوی سیاحی،کوی علوی،خ 68 متری،کوی 15 خرداد)  (منطقه شش )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 40301000010018,
    Description:
      " احداث  ،ترمیم وبهسازی ایستگاه های اتوبوس(بیمارستان ارتش،میدان توپ،بلوار قدس،خ داغری،خ انقلاب،بنی هاشم ) (منطقه شش )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 40301000010014,
    Description:
      "ساماندهی و بهسازی و رنگ آمیزی ایستگاههای  اتوبوس در کوی مجاهد ، شهرک برق و گلستان  (منطقه چهار)",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 40301000010015,
    Description:
      "تعمیر و بهسازی ایستگاه اتوبوس بلوار هاشمی ،خبینه و کریشان   (منطقه پنج)",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 40206000010014,
    Description:
      "بهسازی پل های عابر پیاده بلوار گلستان روبروی اداره آب و خاک و  پل جنب خوابگاه حضرت معصومه (س) (منطقه چهار)",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 40206000010017,
    Description:
      "تجهیز و بهسازی پل های عابر پیاده بلوار شهید هاشمی جنوبی  (منطقه شش )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 40203000020027,
    Description:
      "خرید و اجرای رنگ دو جزیی سرعتگاه آسفالتی ( بلوار کارگر ، بهارستان ، مجاهد ، بلوار آریا ، بلوار نور ، بلوار ساحلی غربی ) (منطقه چهار)",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 40203000020028,
    Description:
      "خرید و اجرای رنگ جهت اجرای خط کشی عابر پیاده (مجاهد ، بهارستان ، گلستان ، بلوار گلستان ، خیابان رفیش ، کوی نهضت آباد ، بلوار انقلاب ) (منطقه چهار)",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 40203000020022,
    Description: "خرید  و اجرای رنگ سرد محوری و ترافیکی  (منطقه سه )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 40203000020023,
    Description: "خرید و اجرای رنگ آمیزی سرعتکا ه های آسفالتی  (منطقه سه )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 40203000020024,
    Description:
      "خرید رنگ و اجرای خط کشی معابر پیاده با رنگ دوجزیی  (منطقه سه )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 40203000010066,
    Description: "اصلاح هندسی خیابان فاضلی به شریعتی  (منطقه هفت )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40203000010067,
    Description: "دوربرگردان ضلع شمالی میدان ولایت  (منطقه هفت )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40203000010068,
    Description: "اصلاح هندسی آیلند خیابان علامه  (منطقه هفت )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40203000010062,
    Description: "اصلاح هندسی پیچ کارون  (منطقه هفت )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40203000010063,
    Description: "کرایه ماشین آلات جهت اجرای پروژه های امانی  (منطقه هفت )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40203000010064,
    Description: "اصلاح هندسی آیلند خیابان کارون تا خیابان 9  (منطقه هفت )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40203000010058,
    Description:
      "احداث سرعتکاه  روبروی مدارس و نقاط حادثه خیز(بلوار قدس مسیر رفت و برگشت،بلوار شهید هاشمی جنوبی،جاده اهواز-حمیدیه،کوی علوی،خ 68 متری،کوی 15خرداد،خ امیرکبیر شمالی،خ آزادی،کوی مندلی،خ فرامرزپور،جلوی درب مدارس و مرازکز آموزشی) (منطقه شش )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 40203000010060,
    Description: "نرده گذاری خروجی  دهانه L100 (منطقه هفت )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40203000010050,
    Description: "تهیه و نصب گارد ریل پل نورد و سطح منطقه  (منطقه پنج)",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 40203000010051,
    Description:
      "اجرای سرعتکاه آسفالتی بلوار گلبهار  ، دلارام ، شهرک دانشگاه و فرهنگشهر   (منطقه پنج)",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 40203000010052,
    Description:
      "احداث پهلوگاه اتوبوس در بلوار گلستان ، پردیس ، بلوار هاشمی ، بلوار کارگر ...  (منطقه پنج)",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 40203000010053,
    Description:
      "اجرای دور برگردان در شهرک دانشگاه ، شهرک رزمندگان ، فرهنگشهر ، پردیس و...  (منطقه پنج)",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 40203000020004,
    Description: "خرید رنگ دو جزئی و اجرای خط کشی عابر پیاده (منطقه دو )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40203000020005,
    Description: "خرید رنگ سرد محوری  (منطقه دو )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 401012401,
    Description:
      "تعریض باند تندرو از سمت میدان خلیج فارس به سوی میدان شهید بندر",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 30201000060001,
    Description: "تعمیر ، بازسازی و بهسازی ایستگاه های آتش نشانی کوی ملت",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 60602000010003,
    Description: "ساخت و تکمیل و تجهیز تابلوی مصور شهدا",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 60603000010003,
    Description: "ساخت زمین ورزشی چمن مصنوعی روباز در زیبا شهر",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 60603000010004,
    Description:
      "احداث ، تکمیل ، ایمن سازی و بازسازی زمین های چمن طبیعی(واقع در آخر آسفالت)",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 60603000010005,
    Description: "ساخت زمین ورزشی چمن مصنوعی روباز پارک 42 هکتاری",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 60603000010006,
    Description: "ساخت زمین ورزشی چمن مصنوعی روباز در زرگان",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 60603000010007,
    Description: "بازسازی زمین ورزشی چمن مصنوعی واقع در کوی فرهنگیان",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 60603000010008,
    Description: "بازسازی زمین ورزشی چمن مصنوعی واقع در کوی فدک",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 60603000010009,
    Description: "ساخت زمین ورزشی چمن مصنوعی روباز در گلستان",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 60603000010010,
    Description:
      "احداث ، تکمیل ، ایمن سازی و بازسازی زمین های چمن طبیعی(واقع در رفیش آباد )",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 60603000010011,
    Description: "بازسازی زمین ورزشی چمن مصنوعی واقع در شهرک برق",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 60603000010012,
    Description: "ساخت زمین ورزشی چمن مصنوعی روباز در گلفام",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 60603000010013,
    Description: "بازسازی زمین ورزشی چمن مصنوعی واقع در فرهنگ شهر",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 60603000010014,
    Description: "بازسازی زمین ورزشی چمن مصنوعی واقع در شهرک پیام",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 60603000010015,
    Description:
      "بازسازی زمین ورزشی چمن مصنوعی واقع در پردیس روبروی بیمارستان بقایی",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 60603000010016,
    Description: "ساخت زمین ورزشی چمن مصنوعی روباز در کوی سیاحی",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 60603000010017,
    Description: "بازسازی زمین ورزشی چمن مصنوعی واقع در غزنوی شمالی",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 60603000010018,
    Description: "بازسازی زمین های ورزشی چمن مصنوعی زمینهای واقع در کوی علوی",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 60603000010019,
    Description: "ساخت زمین ورزشی چمن مصنوعی روباز در کوی سپیدار",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 60603000010020,
    Description: "بازسازی زمین های ورزشی چمن مصنوعی زمینهای واقع در سپیدار",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 60603000010021,
    Description: "بازسازی زمین ورزشی چمن مصنوعی واقع در کوی رمضان",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 60603000010022,
    Description: "بازسازی زمین  ورزشی چمن مصنوعی واقع در پارک علامه",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 60603000010023,
    Description: "بازسازی زمین ورزشی چمن مصنوعی واقع درآسیه آباد",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 60603000010024,
    Description: "بازسازی زمین ورزشی چمن مصنوعی واقع درکوی صادقیه",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 60603000010025,
    Description: "بازسازی زمین ورزشی چمن مصنوعی واقع درکوی مهدیس",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 60603000010026,
    Description: "ساخت زمین ورزشی چمن مصنوعی روباز در کوی رسالت",
    Mosavab: 5000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 50301000010008,
    Description: "بهسازی ساختمان های اداری منطقه  (منطقه سه )",
    Mosavab: 4650000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 50301000040000,
    Description: "خرید لوازم مصرف نشدنی",
    Mosavab: 4500000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 40208000010004,
    Description:
      "بهسازی جداول و پیاده روهای میدان امام خمینی (ره) واقع در بلوار امام رضا (ع) کیانشهر   (منطقه دو )",
    Mosavab: 4500000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40208000010005,
    Description: "بهسازی میدان شهید بهنام محمدی واقع در کیانشهر  (منطقه دو )",
    Mosavab: 4500000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40207000010042,
    Description:
      "پیاده رو سازی و تعویض پیاده روهای فرسوده پراکنده در سطح منطقه   (منطقه شش )",
    Mosavab: 4500000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 40207000010043,
    Description:
      "جدولگذاری و تعویض جداول فرسوده معابر پراکنده در سطح منطقه   (منطقه شش )",
    Mosavab: 4500000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 40207000010031,
    Description: "احداث پیاده رو قطعات سیز (منطقه چهار)",
    Mosavab: 4500000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 40207000010032,
    Description: "تکمیل قرار داد پیاده رو سازی و جدول گذاری  (منطقه چهار)",
    Mosavab: 4500000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 10202000110005,
    Description:
      "مطالعات تهیه سند پهنه بندی حریم با هدف حفاظت از حریم شهر( جدید) (معاونت شهرسازی)",
    Mosavab: 4500000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 20702000010049,
    Description:
      "عملیات دفع آبهای سطحی در ایستگاههای شرکت کربن و لوله سازی واقع در بلوار شهید هاشمی (منطقه هشت )",
    Mosavab: 4500000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 20702000010050,
    Description:
      "تکمیل و همسان سازی دریچه های فاضلاب نواحی پنجگانه خدمات شهری (منطقه هشت )",
    Mosavab: 4500000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 20502000010009,
    Description:
      "احداث، تکمیل، بازسازی و تعمیر  سرویس  های بهداشتی و آبخوری پارک بعثت ، اندیشه ، دانشجو و کاوه و پردیس   (منطقه پنج)",
    Mosavab: 4500000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 20502000010013,
    Description: "احداث سرویس بهداشتی در ضلع غربی پارک شهداء (منطقه هشت )",
    Mosavab: 4500000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 20103000010029,
    Description:
      "توسعه شبکه آب خام در فاز یک پاداد  جهت پارک گوهر (منطقه هشت )",
    Mosavab: 4500000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 20102000010067,
    Description: "توسعه فضای سبز در بلوار دعبل خزاعی (منطقه هشت )",
    Mosavab: 4500000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 20102000010068,
    Description: "توسعه فضای سبز در بلوار سپهر (منطقه هشت )",
    Mosavab: 4500000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 20102000010069,
    Description: "توسعه فضای سبز در بلوار هاتف (منطقه هشت )",
    Mosavab: 4500000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 20102000010070,
    Description: "توسعه فضای سبز در بلوار  زاگرس (منطقه هشت )",
    Mosavab: 4500000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 10304000020025,
    Description:
      "بازسازی آبنماها و آثار حجمی در پارکهای اندیشه، شکوفه، پردیس، بعثت، ملاشیه، لادن و میدان فردوس  (منطقه پنج)",
    Mosavab: 4500000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 10304000020021,
    Description: "خرید هفت سین برای استقبال از بهار (منطقه چهار)",
    Mosavab: 4500000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 10304000020016,
    Description:
      "خرید پمپ های مورد نیاز آبنما ها و ایستگاههای پمپاژ سطح منطقه (منطقه دو )",
    Mosavab: 4500000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 10304000020017,
    Description:
      "تعمیر پمپ های سیار ، ایستگاه های پمپاژ و پمپ های آبنماهای سطح منطقه (منطقه دو )",
    Mosavab: 4500000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20102000010059,
    Description: "خاکبرداری و. خاکریزی نباتی  در سطح منطقه   (منطقه شش )",
    Mosavab: 4500000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 10303000010031,
    Description:
      "ریسه بندی به مناسبت نوروز و دهه فجر ( حد فاصل پل تختی تا تقاطع 22 بهمن در بلوار گلستان ، بلوار فروردین ، بلوار آبان ، بلوار ساحلی )  (منطقه چهار)",
    Mosavab: 4500000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 10301000010036,
    Description: "احداث فونداسیون پایه روشنایی  (منطقه پنج)",
    Mosavab: 4500000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 10304000020018,
    Description:
      "نقاشی دیوارهای فرسوده ( خیابان پویش ، بلوار کارگر نرسیده به میدان مالیات ، خیابان انقلاب حد فاصل مسجد آذربایجان تا پل امانیه بلوار علوی  (منطقه چهار)",
    Mosavab: 4500000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 10303000020014,
    Description: "اجرای نقاشی دیواری در محدوده جاده ساحلی  (منطقه دو )",
    Mosavab: 4500000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 10304000010010,
    Description:
      "ایمن سازی ، بهسازی مبلمان و تجهیزات شهری ،پارکها ،بازی و تندرستی در پارک های بهزاد شهر، پارک گلها ، پارک هفده شهریور  (منطقه سه )",
    Mosavab: 4500000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 10303000020009,
    Description:
      "بهسازی و رنگ آمیزی پایه های روشنایی موجود در پارک ها ی 42 هکتاری ، جزیره ؛ دولت . جاده  ساحلی واقع در منطقه دو  (منطقه دو )",
    Mosavab: 4500000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 10304000010028,
    Description: "خرید مجموعه بازی کودکان جهت پارکها  (منطقه شش )",
    Mosavab: 4500000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 10304000010036,
    Description:
      "احداث  زمینهای  بازی کودکان با کفپوشهای گرانولی در پارکهای سعادت ، بهاران ، شهدا، صداقت ، رشد ، اقاقیا و نواری (منطقه هشت )",
    Mosavab: 4500000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 10304000020012,
    Description: "تعمیر و بهسازی آبنماهای موجود در سطح منطقه  (منطقه دو )",
    Mosavab: 4500000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 10304000010012,
    Description:
      "تجهیز وسایل بازی پارکی برای کودکان معلول و کم توان در محدوده پارکها سطح منطقه  (منطقه سه )",
    Mosavab: 4500000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 10304000010026,
    Description:
      "ترمیم ،تعویض و خرید کفپوشهای گرانولی در محوطه ها و زمین های بازی کودکان در سطح پارکها  (منطقه شش )",
    Mosavab: 4500000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 10304000010023,
    Description: "خرید نیمکت بتونی پارکی   (منطقه پنج)",
    Mosavab: 4500000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 10301000010054,
    Description:
      "خرید و نصب  المانهای نوری شامل وال واشر و متعلقات مربوطه متحرک جهت بلوار هجرت ، خیابان دانش ، بلوار معلم ، بلوار امام شرقی (منطقه هشت )",
    Mosavab: 4050000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 10301000010042,
    Description: "بهسازی روشنایی مسیر پیاده روی پارک شهید سبحانی  (منطقه شش )",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 20102000010018,
    Description: "خاکریزی و خاکبرداری  (منطقه سه )",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 20102000010024,
    Description: "پارک مینا (فاز 3 کوی ملت)  (منطقه سه )",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 20102000020008,
    Description: "خرید بذر و گل  (منطقه دو )",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20102000020011,
    Description: "خرید گل و گیاه وبذر و سموم   (منطقه سه )",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 20102000020024,
    Description: "خرید گل تابستانه (منطقه هشت )",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 20103000020013,
    Description: "خرید نهال  (منطقه چهار)",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 20102000020029,
    Description:
      "خرید نهال و گیاه پوششی مورد نیاز جهت کاشت در سطح منطقه (منطقه هشت )",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 20102000020030,
    Description:
      "خرید کود کمپوست و کودهای شیمیایی و کودهای تقویتی (منطقه هشت )",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 20104000010015,
    Description: "خرید تابلو برق جهت ایستگاه پمپاژ (منطقه چهار)",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 20401000010006,
    Description: "خرید و تعمیرات ماشین آلات عمرانی  و خدماتی  (منطقه هفت )",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 20302000010000,
    Description:
      "احداث جایگاه و خرید و تعمیر گاری فان و مخازن پسماند و تفکیک زباله  (منطقه یک )",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 20103000010033,
    Description:
      " لوله کشی آب خام جهت بلوارهای دانش ، هاتف ، بلوار هجرت ، بلوار سپهر ، پارک فردوس ، پارک شهدا و مسیر امام شرقی (منطقه هشت )",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 20401000010003,
    Description: "خرید و تعمیرات ماشین آلات عمرانی  و خدماتی  (منطقه یک )",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 20702000010020,
    Description: "خرید رینگ و دریچه چدنی جهت دریچه های فاضلاب (منطقه دو )",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20604000010012,
    Description: "احداث بازارچه محله ای کوی مهدیس (منطقه هشت )",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 20604000010013,
    Description: "احداث بازارچه محله ای کوی 254 دستگاه (منطقه هشت )",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 20702000010039,
    Description: "خرید لوله پلی اتیلن جهت دفع آبهای سطحی  (منطقه شش )",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 20702000030002,
    Description:
      "خرید و تعمیر و نصب دستگاه پمپ های لجن کش بلوار آیت الله بهبهانی،کوی یوسفی،بلوار جمهوری،خیابان شریعتی،بلوار ساحلی،خیابان ادهم،خیابان رستگاری (منطقه یک )",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 40201000010014,
    Description: "ترمیم نوارهای حفاری معابرامانیه (منطقه دو )",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40201000010015,
    Description: "ترمیم نوارهای حفاری در سطح  معابر کیان آباد (منطقه دو )",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40201000010016,
    Description: "ترمیم نوارهای حفاری در سطح  معابر سید خلف  (منطقه دو )",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40201000010017,
    Description: "ترمیم نوارهای حفاری در سطح  معابر کیانشهر  (منطقه دو )",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40201000010088,
    Description:
      "اصلاح ورودی ها و انحراف کانال دفع آبهای سطحی ورودی کوی طلاب 3 (منطقه هشت )",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 40202000010010,
    Description: "ترمیم جداول فرسوده معابر سید خلف  (منطقه دو )",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40202000010011,
    Description: "ترمیم جداول فرسوده معابر کیانپارس (منطقه دو )",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40202000010012,
    Description: "ترمیم جداول فرسوده معابر امانیه  (منطقه دو )",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40202000010013,
    Description: "ترمیم جداول فرسوده معابر کیان آباد (منطقه دو )",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40202000010014,
    Description: "تعویض جداول فرسوده خیابان پهلوان  (منطقه دو )",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40201000020021,
    Description:
      "کرایه ماشین آلات  جهت حمل نخاله های موجود در سطح منطقه (منطقه هشت )",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 40203000010033,
    Description: "احداث گذرگاه های عابر پیاده در سطح منطقه  (منطقه سه )",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 40203000010006,
    Description:
      "تهیه و بهسازی نرده های جدا کننده زیر پلهای عابر پیاده در بلوار جمهوری،بلوار آیت الله بهبهانی (منطقه یک )",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 10202000050006,
    Description: "مطالعات پارکینگ ها",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10202000060001,
    Description:
      "مطالعات و طراحی فاز یک و دو پل عابر پیاده شهید سردار سلیمانی در منطقه 3 واقع در بلوار پاسداران نبش زیتون کارمندی",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10202000090001,
    Description: "مطالعات و طراحی مرحله اول و دوم رمپ و لوپ پل پنجم ",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 60603000010054,
    Description: "بازسازی  زمین فوتبال ساحلی  (منطقه هفت )",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 60603000010034,
    Description: "نورپردازی ، احداث سکو و جدولگذاری زمین های خاکی(منطقه دو )",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 60603000010039,
    Description:
      "تهیه و نصب وسایل سرگرمی و ورزشی در سطح پارهای سطح منطقه  (منطقه سه )",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 40201000010002,
    Description: "زیرسازی و آسفالت کوی شهید نیاکی در منطقه 2 ( اعتباری ) ",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40303000010004,
    Description: "کمک به احداث و توسعه برون شهری زاگرس",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 5010200001,
    Description: "لایسنس های محصولات امنیتی مرکز داده و کاربران",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40801000040003,
    Description: "توسعه خدمات سامانه های هوشمند AVL و AFC ناوگان تاکسیرانی",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40801000040001,
    Description: "توسعه خدمات سامانه های هوشمند AVL و AFC ناوگان اتوبوسرانی",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40207000010008,
    Description: "ترمیم پیاده رو های فرسوده سید خلف  (منطقه دو )",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40207000010009,
    Description: "ترمیم پیاده رو های فرسوده امانیه (منطقه دو )",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40207000010010,
    Description: "ترمیم پیاده رو های فرسوده  کیان آباد  (منطقه دو )",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40207000010011,
    Description: "ترمیم پیاده رو های فرسوده  کیانپارس (منطقه دو )",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40206000010020,
    Description: "تعمیر و بازسازی پل های عابر پیاده  (منطقه هفت )",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40203000020013,
    Description: "خرید رنگ و اجرای خط کشی محوری کیانشهر  (منطقه دو )",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40203000010083,
    Description:
      "احداث سرعتکاه آسفالتی کوی مهدیس ، کوی باهنر و ایثار (منطقه هشت )",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 40203000010087,
    Description: "احداث میدان زیر پل سردار هاشمی (منطقه هشت )",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 40203000010092,
    Description: "اصلاح هندسی میدان بعثت (منطقه هشت )",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 40203000010049,
    Description: "نرده گذاری زیر پلهای عابر پیاده(زیر پل گلستان)  (منطقه پنج)",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 40804000010004,
    Description: "تابلو اسامی میادین سطح منطقه (منطقه یک )",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 40804000010007,
    Description:
      "خرید تجهیزات ترافیکی جهت نصب در معابر کیانپارس ، کیان آباد ، امانیه و کیانشهر در منطقه 2  (منطقه دو )",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40804000010022,
    Description:
      "نصب تابلوها و تجهیزات ترافیکی (جاده اهواز حمیدیه ،بلوار قدس،بلوار انقلاب،بلوار شهید هاشمی جنوبی،خ 68 متری،بلوار الهادی،شیخ بهای جنوبی،میدان پانزده خرداد،خ داغری،امیرکبیر شمالی) (منطقه شش )",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 50102000130000,
    Description: "تعمیر و خرید رایانه ، پرینتر ، اسکنر و وسائل جانبی آن11",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 50301000010007,
    Description: "تعمیر ساختمان خدمات شهری منطقه 2  (منطقه دو )",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 50301000010015,
    Description: "تکمیل خرید و نصب ساندویچ پنل  (منطقه هفت )",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 50102000140000,
    Description:
      "خرید ، تجهیز ، تکمیل ، تعمیر ، پشتیبانی و راه اندازی نوبت دهی مکانیزه برای شهروندان12",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 50102000140000,
    Description:
      "خرید ، تجهیز ، تکمیل ، تعمیر ، پشتیبانی و راه اندازی نوبت دهی مکانیزه برای شهروندان12",
    Mosavab: 4000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40207000010036,
    Description: "ترمیم و احداث پیاده رو   (منطقه پنج)",
    Mosavab: 3600000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 103040203,
    Description: " طراحی و ساخت المان  کودک-تکمیلی (معاونت شهرسازی)",
    Mosavab: 3600000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 20502000010008,
    Description:
      "احداث، تکمیل، بازسازی و تعمیر  سرویس  های بهداشتی و آبخوری (منطقه چهار)",
    Mosavab: 3600000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 10304000010035,
    Description:
      "تکمیل ، ترمیم و خرید کفپوشهای گرانولی معیوب در پارک رشد ، اقاقیا ، وحدت ، پامچال ، فردوس ، مینا و...(منطقه هشت )",
    Mosavab: 3600000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 10304000020015,
    Description:
      "پیکر تراشی و اجرای المان های چوبی بر روی درختان خشکیده بوستان ها (منطقه دو )",
    Mosavab: 3600000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 10301000010045,
    Description:
      "تکمیل خرید جزیی وسایل برقی و روشنایی کوی باهنر ، فولادشهر ، مستقلات ، ترابری و...(منطقه هشت )",
    Mosavab: 3600000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 10301000010018,
    Description: "خرید ریسه برقی جهت نورپردازی معابر کیانپارس  (منطقه دو )",
    Mosavab: 3600000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 10301000010019,
    Description: "خرید ریسه برقی جهت نورپردازی معابر امانیه (منطقه دو )",
    Mosavab: 3600000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 10301000010020,
    Description: "خرید ریسه برقی جهت نورپردازی معابر کیان آباد  (منطقه دو )",
    Mosavab: 3600000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 10301000010021,
    Description: "خرید ریسه برقی جهت نورپردازی معابر کیانشهر (منطقه دو )",
    Mosavab: 3600000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 10301000010022,
    Description:
      "خرید ریسه سوزنی رنگی جهت نورپردازی درختان نخل کاشته شده در جاده ساحلی  (منطقه دو )",
    Mosavab: 3600000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 10301000010015,
    Description:
      "خرید فونداسیون پایه های روشنایی جهت پارک های 42 هکتاری ، ایثار ، زردشت ، کیانشهر و لوپ پل سوم و لوپ پل کیان آباد  (منطقه دو )",
    Mosavab: 3600000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 10304000010015,
    Description:
      "خرید مبلمان پارکی (  پامچال ، صدف 1و 2 ، مادر ، نیلوفر، گلها و ....) (منطقه چهار)",
    Mosavab: 3600000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 10304000010024,
    Description: "خرید و نصب وسایل بازی پلی اتیلن در پارک شکوفه  (منطقه پنج)",
    Mosavab: 3600000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 10304000010025,
    Description:
      "ایمن سازی ، بهسازی مبلمان و تجهیزات شهری ، پارکی ، بازی وتندرستی  (منطقه شش )",
    Mosavab: 3600000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 10303000020010,
    Description: " اجرای نقاشی دیواری در محدوده امانیه  (منطقه دو )",
    Mosavab: 3600000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 10303000020008,
    Description:
      "طراحی و اجرای سفال کاری زیر گذر دغاغله  واقع در کیان آباد  (منطقه دو )",
    Mosavab: 3600000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 10301000010053,
    Description:
      "ریسه بندی شلنگی فضاهای عمومی شامل ، خیابان امام ، بلوار سپهر ، بلوار قایم ، ناصح شرقی ، بلوار هاتف و طلاییه و...(منطقه هشت )",
    Mosavab: 3600000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 10304000020043,
    Description:
      "خرید و تعمیر پمپهای آبنمای پارکهای اقاقیا ، سبحان و... (منطقه هشت )",
    Mosavab: 3500000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 40201000010018,
    Description: "ترمیم نوارهای حفاری معابر کیانپارس  (منطقه دو )",
    Mosavab: 3500000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40203000010084,
    Description:
      "احداث دوربرگردان های ضلع شمالی و جنوبی بلوار هجرت (منطقه هشت )",
    Mosavab: 3500000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 10303000010009,
    Description: "ساماندهی، بهسازی و نوسازی خیابان های سطح منطقه (منطقه دو )",
    Mosavab: 3200000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 10303000010010,
    Description:
      "ساماندهی، بهسازی و نوسازی خیابان های سطح منطقه 3  (منطقه سه )",
    Mosavab: 3200000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 10303000010011,
    Description: "بدنه سازی و بهسازی بافت فرسوده ( نقاشی دیواری)  (منطقه پنج)",
    Mosavab: 3200000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 10301000010052,
    Description:
      "ریسه بندی بلوطی فضاهای عمومی  میدان شفا ، سه راه نگهبانی ، میدان صداقت ، میدان الوند ، خیابان دماوندو..(منطقه هشت )",
    Mosavab: 3150000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 10304000010037,
    Description:
      "خرید و نصب ست های بازی در پارکهای میخک ، انتهای امام شرقی ، رضوان ، قیام ، نسترن ، پامچال ، گوهر ، شهداء و... (منطقه هشت )",
    Mosavab: 3150000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 40106000020008,
    Description:
      "تهیه و اجرای درزهای انبساطی پلهای هفتم، سفید و شهید صیاد شیرازی در منطقه 2 ",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 10301000010040,
    Description:
      "خرید پروژکتور 150 وات ال ای دی جهت پارک های سطح منطقه  (منطقه شش )",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 10304000020039,
    Description: "خرید پمپ آبنما و پمپ های سیار (منطقه هفت )",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 10304000020040,
    Description:
      "تکمیل ، تعمیرات و نگهداری از ایستگاه های پمپ های سیار (منطقه هفت )",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 10304000020028,
    Description: "تعمیر  یک دستگاه پمپ دیزلی ایستگاه کارگر   (منطقه پنج)",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 10302000020022,
    Description: "خریدالمانهای مناسبتی  (منطقه چهار)",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 10302000020023,
    Description: "بهسازی آبنماهای  پارک میثاق ، قوری ، ...   (منطقه چهار)",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 10302000020024,
    Description:
      "خرید و تعمیر پمپ های سیار ، ایستگاه های پمپاژ و پمپ های آبنما  (منطقه چهار)",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 20103000010028,
    Description:
      "تکمیل ، احداث خط انتقال آب خام از پل مدافع شهدای حرم به سمت کوی مدرس و مهدیس (منطقه هشت )",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 20102000020014,
    Description: "خرید نهال در منطقه    (منطقه پنج)",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 20102000020010,
    Description: "خرید نخل مثمر ( رقم زاهدی )جهت کاشت (منطقه دو )",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20102000020016,
    Description: "خرید گل فصلی بهار  (منطقه پنج)",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 20102000020002,
    Description: "هرس درختان سطح منطقه (منطقه یک )",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 20702000010053,
    Description:
      "لایروبی و صفحه کشی شبکه فاضلاب و آبهای سطحی نواحی 1و3 (منطقه هشت )",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 20702000020003,
    Description:
      "تجهیز  تاسیسات وایستگاه های پمپاژ شبکه دفع آبهای سطحی  کیانپارس (منطقه دو )",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20702000020004,
    Description:
      "تجهیز تاسیسات وایستگاه های پمپاژ شبکه دفع آبهای سطحی امانیه  (منطقه دو )",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20702000020005,
    Description:
      "تجهیز تاسیسات وایستگاه های پمپاژ شبکه دفع آبهای سطحی کیان آباد   (منطقه دو )",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20702000020006,
    Description:
      "تجهیز  تاسیسات وایستگاه های پمپاژ شبکه دفع آبهای سطحی کیانشهر   (منطقه دو )",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20702000010046,
    Description:
      "تکمیل هم سطح سازی دریچه ی منهول ها( اروند پیشتازان) (منطقه هفت )",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 20401000010005,
    Description: "تعمیرات ماشین آلات عمرانی  و خدماتی   (منطقه شش )",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 20702000010021,
    Description:
      "لايروبي خطوط دفع آبهای سطحی و فاضلاب  معابر كيانپارس  (منطقه دو )",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20702000010015,
    Description:
      "تکمیل قرارداد همسان سازی درب منهول بصورت پراکنده  (منطقه دو )",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20702000010016,
    Description: "همسطح سازی دریچه های فاضلاب معابر کیانشهر (منطقه دو )",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20702000010017,
    Description: "همسان سازی درب منهولها معابر امانیه (منطقه دو )",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20702000010018,
    Description: "همسطح سازی دریچه های فاضلاب معابر کیانپارس  (منطقه دو )",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20702000010019,
    Description: "همسطح سازی دریچه های فاضلاب معابر کیان آباد  (منطقه دو )",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40203000010030,
    Description: "آرام سازی جلوی درب مدارس و دانشگاه ها  (منطقه دو )",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40203000010031,
    Description: "احداث سرعتکاه آسفالتی   (منطقه دو )",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40203000020012,
    Description:
      "سامانه 137 جهت  اجراي عمليات عمراني خدمات شهری و انجام برخی پروژه‌ها و فعالیت ها بصورت امانی (به استناد حکم شماره 18 بودجه) (منطقه چهار)",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 40202000010003,
    Description: "خرید رنگ و رنگ آمیزی جداول کیان آباد   (منطقه دو )",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40202000010004,
    Description: "خرید رنگ و رنگ آمیزی جداول کیانپارس   (منطقه دو )",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40202000010005,
    Description: "خرید رنگ و رنگ آمیزی جداول امانیه  (منطقه دو )",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40202000010006,
    Description: "خرید رنگ و رنگ آمیزی جداول بلوار ساحلی  (منطقه دو )",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40202000010007,
    Description: "خرید رنگ و رنگ آمیزی جداول کیانشهر   (منطقه دو )",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40202000010008,
    Description: "رنگ آمیزی جداول بلوار مدرس  (منطقه دو )",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40203000010050,
    Description:
      "تکمیل قرار داد زیر سازی بخش جنوبی خیابان ولیعصر  (منطقه چهار)",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 40203000010052,
    Description:
      "بهسازی جاده ساحلی غربی حد فاصل میدان شقایق تا میدان مالیات در منطقه 4 (منطقه چهار)",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 40203000010070,
    Description: "اصلاح هندسی آیلند محلاتی  (منطقه هفت )",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40203000010082,
    Description:
      "اجرای گذرگاه عابر پیاده بلوار امام ، معلم و سعادت (منطقه هشت )",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 40203000020017,
    Description: "خرید رنگ و اجرای خط کشی محوری جاده ساحلی  (منطقه دو )",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40203000020018,
    Description:
      "خرید رنگ و اجرای نقوش و خط کشی عابر پیاده رنگی امانیه (منطقه دو )",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40203000020019,
    Description:
      "خرید رنگ و اجرای نقوش و خط کشی عابر پیاده رنگی کیانپارس (منطقه دو )",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40203000010048,
    Description: "اجرای گذرگاه عابر پیاده شهرک دانشگاه و پردیس   (منطقه پنج)",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 40207000010015,
    Description: "سیلر کردن پیاده روهای دکوراتیو (منطقه دو )",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40206000010007,
    Description: " پل عابر پیاده پهلوان شرقی بعد از پل هفتم  (منطقه دو )",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 50301000030000,
    Description:
      " مناسب سازی ساختمان های شهرداري جهت افراد ناتوان جسمی و حرکتی(معلولان، سالمندان و ...) (منطقه دو )",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 50301000010019,
    Description:
      "احداث و ساخت ساختمانهای مورد نیاز معاونت خدمات شهری ( شامل تکمیل انبارها ی معاونت و احداث ناحیه 1 ) (منطقه هشت )",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 50301000030000,
    Description:
      " مناسب سازی ساختمان های شهرداري جهت افراد ناتوان جسمی و حرکتی(معلولان، سالمندان و ...) (منطقه دو )",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40804000010025,
    Description: "احداث فندانسیون تابلوهای راهنمای مسیر (منطقه هفت )",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 60602000026005,
    Description:
      "خرید و نصب آسانسور در سرای محله کیانشهر واقع در منطقه 2 (منطقه دو )",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 60602000270000,
    Description: "طرح استقبال از مهر (بازگشایی مدارس)",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 60602000280007,
    Description: "احداث نمازخانه در ورودی شهرک طاهر (منطقه هشت )",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 60603000010033,
    Description:
      "بازسازی و تکمیل زمین والیبال پارک 42 هکتاری روبروی خیابان 17(منطقه دو )",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40801000010013,
    Description:
      "خرید، نصب و راه اندازي دوربين نظارت تصويري و ثبت تخلف ساحلی  (منطقه هفت )",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40501000010005,
    Description: "بهسازی پارکینگ های جاده ساحلی  (منطقه دو )",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40301000010021,
    Description:
      "خرید ونصب  ایستگاه اتوبوس کوی باهنر ، کوی مهدیس ، رسالت و نبوت (منطقه هشت )",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 20604000010002,
    Description:
      "احداث آیلند در فضای وسط و اصلاح کانال های دفع آبهای سطحی میدان الغدیر ( تکمیل قرارداد 104/30980 - 98/11/13)",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 20604000010003,
    Description:
      "خرید و نصب پکیج تصفیه خانه با گنجایش 100 متر مکعب در شبانه روز جهت استقرار در میدان الغدیر ( تکمیل قرارداد 104/1467 - 97/12/28 )",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10202000030002,
    Description: "تجهیز واحد نقشه برداری ",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10202000050011,
    Description: "نقشه برداری  نقاط اصلاح هندسی",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40801000030007,
    Description:
      "طراحی و اجرای سیستمهای اطلاع رسانی، نظارت و مدیریت حمل و نقل و ترافیک",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40801000030010,
    Description:
      "طراحی، خرید، نصب و  بهره برداری از سامانه بانک اطلاعاتی جامع معاونت حمل و نقل و ترافیک و سازمان های مربوطه",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 5010200001,
    Description: "ارزیابی امنیتی سامانه ها",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 5010200001,
    Description: "سامانه جامع حقوقی",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 5010200001,
    Description: "خرید خدمات کارشناسی وطرح های پژوهشی اهواز هوشمند",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 5010200001,
    Description: "سامانه باشگاه شهروندی",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 5010200001,
    Description: "مرکز تماس امور شهروندی",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 5030100005,
    Description:
      "خرید، تعمیر، نگهداری و راه اندازی تجهیزات پزشکی و ... جهت درمانگاه شهرداری",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 606020106,
    Description: "اجرای تابلو های روان در بلوار چمران",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 606020107,
    Description: "نصب تابلو شهدا در خیابان شهید وهابی",
    Mosavab: 3000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20502000010006,
    Description: "تعمیر و بهسازی سرویس بهداشتی های پارک 42 هکتاری  (منطقه دو )",
    Mosavab: 2900000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 10304000020006,
    Description: "خرید پایه پرچم جهت نصب   (منطقه دو )",
    Mosavab: 2800000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 10304000020007,
    Description:
      "اجرای المان میدان امام خمینی (ره ) روبروی ساختمان اداری (منطقه دو )",
    Mosavab: 2700000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 10304000020008,
    Description:
      "اجرای المان میدان شهید بهنام محمدی  واقع در کیانشهر  (منطقه دو )",
    Mosavab: 2700000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 10304000020009,
    Description: "بهسازی آبنمای پل لشکر  (منطقه دو )",
    Mosavab: 2700000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 10304000010033,
    Description:
      "خرید صندلی پارکی جهت پارکهای  میخک ، نسترن ، اقاقیا ، لادن ، لاله ، تلاش ، رشد ، سوسن، سعادت ، نسترن و... (منطقه هشت )",
    Mosavab: 2700000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 10304000010034,
    Description:
      "تکمیل و خرید ونصب و ایمن سازی مبلمان و تجهیزات شهری پارکهای شهدائ، مینا ، میخک ، کوکب ، سعادت ، گوهر (منطقه هشت )",
    Mosavab: 2700000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 10304000010021,
    Description:
      "تجهیز وسایل بازی پارکی برای کودکان معلول و کم توان  پارک پردیس غدیر و اندیشه  (منطقه پنج)",
    Mosavab: 2700000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 10304000010008,
    Description: "خرید میزپینگ پنگ و شطرنج جهت پارکهای سطح منطقه  (منطقه دو )",
    Mosavab: 2700000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 10304000010005,
    Description: "تعمیر و بهسازی وسایل تندرستی موجود در سطح منطقه  (منطقه دو )",
    Mosavab: 2700000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 10304000010003,
    Description: "رنگ آمیزی و تعمیر آلاچیق های موجود در پارک ساحلی (منطقه دو )",
    Mosavab: 2700000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 10303000020020,
    Description:
      "بدنه سازی و بهسازی بافت های فرسوده ( نقاشی های دیواری )(خیابان های ناصرخسرو جنوبی،شیخ بهای جنوبی،انقلاب،امیرکبیر شمالی،داغری،ولی عصر ، منازل راه آهن،کوی عین دو،کوی سیاحی و کوی گلدشت)  (منطقه شش )",
    Mosavab: 2700000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 10301000010046,
    Description:
      "تکمیل ، ترمیم و بهسازی روشنایی فضای بازی کودکان در سطح پارکهای نسترن ، رشد ، وحدت ، اقاقیا ، مریم ، صداقت و...(منطقه هشت )",
    Mosavab: 2700000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 10301000010048,
    Description:
      "تکمیل خرید وسایل و لوازم برقی جهت میادین ، تاسیسات و تابلو برقهای پارکهای وحدت ، بهاران ، نیلوفر ، سوسن ، شهداء، باغ گلها ، تلاش و... (منطقه هشت )",
    Mosavab: 2700000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 10301000010050,
    Description:
      "خرید پایه برق روشنایی 9 متری و 12 متری با هدر جهت پارکها گوهر ، کوی طلاب ، لاله ، اطلسی ، نبوت ، کودک و... (منطقه هشت )",
    Mosavab: 2700000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 10301000010051,
    Description:
      "خرید و نصب لمپوست جهت پایه های برق  بلوار معلم ، فنی و حرفه ای ، بلوار بعثت ، بلوار سعادت ، بلوار جوادالایمه و هجرت (منطقه هشت )",
    Mosavab: 2700000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 20102000010065,
    Description: "خاکبرداری و خاکریزی (فضای سبز ) (منطقه هفت )",
    Mosavab: 2700000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 20102000010066,
    Description: "چمن کاری  (منطقه هفت )",
    Mosavab: 2700000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 30101000010015,
    Description: "دیوار سنگی خالدی  (منطقه هفت )",
    Mosavab: 2700000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 103040202,
    Description:
      "ساخت پایه مجسمه ،جابجایی و نصب المان های سنگی نخستین سمپوزیوم بین المللی سنگ اهواز در گذر بلوار ساحل شرقی حد فاصل پارک لاله تا پل هفتم-تکمیلی(معاونت شهرسازی)",
    Mosavab: 2700000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 103030201,
    Description:
      " پروژه ساماندهی نما و محیط پیرامونی مساجد-تکمیلی (معاونت شهرسازی)",
    Mosavab: 2700000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 103030202,
    Description:
      "تکمیل اجرای نقاشی دیواری عمودی در مناطق 1, 3, 7,8 (معاونت شهرسازی)",
    Mosavab: 2700000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 103030203,
    Description:
      "تکمیل اجرای نقاشی دیواری عمودی در مناطق 2, 4, 5,7 (معاونت شهرسازی)",
    Mosavab: 2700000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 60602000270000,
    Description: "طرح استقبال از مهر (بازگشایی مدارس)",
    Mosavab: 2500000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 50301000040000,
    Description: "خرید لوازم مصرف نشدنی",
    Mosavab: 2500000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 50301000010017,
    Description: "خرید و نصب پارتیشن و کانتر سایت جدید  اداری (منطقه هشت )",
    Mosavab: 2500000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 40203000010088,
    Description: "اصلاح هندسی میدان فردوس (منطقه هشت )",
    Mosavab: 2500000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 40203000010091,
    Description: "اصلاح هندسی بلوار دماوند و یک رسالت (منطقه هشت )",
    Mosavab: 2500000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 20702000030008,
    Description:
      "تعمیر و نگهداری از ایستگاه های پمپاژ دفع آبهای سطحی   (منطقه پنج)",
    Mosavab: 2500000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 10202000010005,
    Description: "مطالعات و طراحي ساختمانهای اداری  (منطقه شش )",
    Mosavab: 2500000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 10301000010049,
    Description:
      "خرید نور افکن led جهت کمبود روشنایی وضع موجود پارکهای لادن ، لاله ، ترابری 2 ، سوسن ، فردوس ، مینا ، سعادت ، میخک و...(منطقه هشت )",
    Mosavab: 2250000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 10301000010047,
    Description:
      "تکمیل ، تجهیز روشنایی کندرو فضای سبز بلوار سپهر ، جمهوری ، سردار هاشمی ، کوی پلیس ، کوی نبوت و...(منطقه هشت )",
    Mosavab: 2250000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 10304000010032,
    Description: "بازسازی و تعمیرات بازی کودکان و مبلمان شهری (منطقه هفت )",
    Mosavab: 2250000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 10304000020013,
    Description: "تعمیر آبنمای میدان فلسطین   (منطقه دو )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 10304000020014,
    Description: "نرمیم و بهسازی المان های موجود در سطح منطقه (منطقه دو )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 10202000030003,
    Description: "تجهیز واحد نقشه برداری   (منطقه پنج)",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 10202000040004,
    Description:
      "انجام عملیات نقشه برداری و برداشت پروژه های عمرانی (منطقه دو )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40101000100000,
    Description: " باند جنوب به شمال جاده ساحلی در محدوده زیر پل هلالی",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 10202000060009,
    Description:
      "مطالعات و طراحی پروژه های حوزه  فنی و عمرانی در منطقه (منطقه هفت )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 20102000020015,
    Description: "خرید کود حیوانی و مایع   (منطقه پنج)",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 20102000100001,
    Description: "احداث پارک ترافیک در منطقه 3  (منطقه سه )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 20101000100002,
    Description: "احداث پارک ترافیک در منطقه 4 (منطقه چهار)",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 10304000020041,
    Description:
      "بهسازی و رفع معایب آبنمای پارک شهداء ،بنفشه،نیلوفر (منطقه هشت )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 10304000020042,
    Description:
      "خرید و تعمیر پمپهای سیار ایستگاههای پمپاژ و پمپهای آبنمای  اقاقیا ، شهدا، رشد ، سه راه نگهبانی ، نیلوفر ، بازارچه ومیدان صداقت (منطقه هشت )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 30301000050000,
    Description: "هزینه اجرای بند 14 ماده 55 قانون شهرداریها (منطقه دو )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 30301000050000,
    Description: "هزینه اجرای بند 14 ماده 55 قانون شهرداریها (منطقه دو )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 30301000050000,
    Description: "هزینه اجرای بند 14 ماده 55 قانون شهرداریها (منطقه دو )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 20702000030003,
    Description:
      " تعمیر و نگهداری از تاسیسات وایستگاه های پمپاژ شبکه دفع آبهای سطحی  کیانپارس (منطقه دو )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20702000030004,
    Description:
      " تعمیر و نگهداری از تاسیسات وایستگاه های پمپاژ شبکه دفع آبهای سطحی امانیه   (منطقه دو )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20702000030005,
    Description:
      " تعمیر و نگهداری از تاسیسات وایستگاه های پمپاژ شبکه دفع آبهای سطحی کیان آباد   (منطقه دو ) ",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20702000300006,
    Description:
      " تعمیر و نگهداری از تاسیسات وایستگاه های پمپاژ شبکه دفع آبهای سطحی کیانشهر   (منطقه دو )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20502000010003,
    Description: "تعمیر و بهسازی سرویس بهداشتی پارک ساحلی  (منطقه دو )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20702000010022,
    Description:
      "لايروبي خطوط دفع آبهای سطحی و فاضلاب  معابر كیان آباد   (منطقه دو )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20702000010023,
    Description:
      "لايروبي خطوط دفع آبهای سطحی و فاضلاب  معابر امانیه  (منطقه دو )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20702000010024,
    Description:
      "لايروبي خطوط دفع آبهای سطحی و فاضلاب  معابر کیانشهر (منطقه دو )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20702000010025,
    Description:
      "تکمیل قرارداد لایروبی و صفحه کشی شبکه آب های سطحی و فاضلاب (منطقه دو )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20604000010010,
    Description: "احداث بازارچه کوی رزمندگان   (منطقه پنج)",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 20604000010011,
    Description: "ساماندهی دستفروشان بازارچه  24 متری در پردیس   (منطقه پنج)",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 40202000010009,
    Description:
      "تکمیل قرارداد جدولگذاری بصورت پرکنده در خیابان های لاله و لادن ، بلوار هاشمی و بلوار امام رضا (ع) حد فاصل خیابان های مریم و نرگس و سید خلف روبروی نمایشگاه بین الملل (منطقه دو )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40203000010032,
    Description: "احداث پهلوگاه ایستگاه اتوبوس (منطقه دو )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40203000010044,
    Description: "خرید و نصب گاردریل در بلوار ساحلی غربی  (منطقه چهار)",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 40203000010029,
    Description: "شستشو و رنگ آمیزی گاردریل های پل دغاغله (منطقه دو )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40203000010016,
    Description: "اصلاح هندسی میدان میوه تره بار الغدیر (منطقه دو )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40203000010017,
    Description:
      "اصلاح هندسی جاده ساحلی دسترسی های  تندرو به کندرو (منطقه دو )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40203000010018,
    Description: "ترمیم گذرگاه های عابر پیاده کیانشهر (منطقه دو )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40203000010019,
    Description: "ترمیم گذرگاه های عابر پیاده کیان آباد (منطقه دو )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40203000010020,
    Description: "ترمیم گذرگاه های عابر پیاده امانیه  (منطقه دو )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40203000010021,
    Description: "ترمیم گذرگاه های عابر پیاده  کیانپارس (منطقه دو )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40203000010089,
    Description: "اصلاح هندسی  ورودی منازل 2000 واحدنفت (منطقه هشت )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 40203000010093,
    Description: "اصلاح وروردی پارکینگ داد گستری (منطقه هشت )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 40203000010085,
    Description:
      "اجرای دور برگردان در بلوار دعبل خزاعی قیل از میدان قانا (منطقه هشت )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 40203000010086,
    Description:
      "احداث دور برگردان در بلوار دانش زیر پل مدافعان حرم (منطقه هشت )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 40203000200020,
    Description:
      "خرید رنگ و اجرای نقوش و خط کشی عابر پیاده رنگی جاده ساحلی  (منطقه دو )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40203000200021,
    Description:
      "خرید رنگ و اجرای نقوش و خط کشی عابر پیاده رنگی کیان آباد (منطقه دو )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40203000020014,
    Description: "خرید رنگ و اجرای خط کشی محوری کوی سید خلف (منطقه دو )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40203000020015,
    Description: "خرید رنگ و اجرای خط کشی محوری کیانپارس (منطقه دو )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40203000020016,
    Description: "خرید رنگ و اجرای خط کشی محوری امانیه  (منطقه دو )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40203000020006,
    Description: "خرید رنگ و اجرای خط کشی عابر پیاده سفید سید خلف  (منطقه دو )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40203000020007,
    Description: "خرید رنگ و اجرای خط کشی عابر پیاده سفید امانیه  (منطقه دو )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40203000020008,
    Description: "خرید رنگ و اجرای خط کشی عابر پیاده سفید کیانپارس (منطقه دو )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40203000020009,
    Description: "خرید رنگ و اجرای خط کشی عابر پیاده سفید کیانشهر (منطقه دو )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40203000020010,
    Description:
      "خرید رنگ و اجرای خط کشی عابر پیاده سفید کیان آباد (منطقه دو )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40203000020011,
    Description:
      "خرید رنگ و اجرای خط کشی عابر پیاده سفید جاده ساحلی  (منطقه دو )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40203000020012,
    Description: "خرید رنگ و اجرای خط کشی محوری کیان آباد  (منطقه دو )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40203000010059,
    Description: "خرید و نصب  سرعت گیر لاستیکی  (منطقه شش )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 40203000010055,
    Description:
      "احداث ورودی تندرو به کندرو و بستن بریدگی های حادثه خیز  (منطقه شش )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 40203000010074,
    Description: "اجرای گذرگاه عابر پیاده بلوار نواب (منطقه هفت )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40206000010006,
    Description:
      "تکمیل قرارداد  مسقف سازی پل های عابر پیاده بلوار مدرس روبروی زردشت و بلوار چمران نبش خیابان موحدین   (منطقه دو )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40206000010021,
    Description:
      "خرید تجهیزات و تعمیر و بهسازی نرده های پل عابر پیاده (منطقه هشت )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 40206000010022,
    Description:
      "رنگ امیزی پلهای عابر پیاده بلوار  امام و بلوار سعادت و فنی و حرفه ای (منطقه هشت )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 40206000010023,
    Description: "رنگ امیزی نرده های پل سردار هاشمی (منطقه هشت )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 40206000010026,
    Description:
      "مسقف سازی پلهای عابر پیاده بلوار  امام و بلوار سعادت و فنی و حرفه ای (منطقه هشت )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 50301000030000,
    Description:
      " مناسب سازی ساختمان های شهرداري جهت افراد ناتوان جسمی و حرکتی(معلولان، سالمندان و ...) (منطقه دو )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 50301000030000,
    Description:
      " مناسب سازی ساختمان های شهرداري جهت افراد ناتوان جسمی و حرکتی(معلولان، سالمندان و ...) (منطقه دو )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 50301000030000,
    Description:
      " مناسب سازی ساختمان های شهرداري جهت افراد ناتوان جسمی و حرکتی(معلولان، سالمندان و ...) (منطقه دو )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 50102000130000,
    Description: "تعمیر و خرید رایانه ، پرینتر ، اسکنر و وسائل جانبی آن11",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 60602000270000,
    Description: "طرح استقبال از مهر (بازگشایی مدارس)",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 60602000280004,
    Description: "تعمیر نمازخانه های پارک42 هکتاری  (منطقه دو )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 60602000280005,
    Description: "تعمیر نمازخانه پارک جزیره  (منطقه دو )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40301000010022,
    Description:
      "رنگ امیزی ایستگاههای اتوبوس کوی باهنر ، کوی مهدیس ، رسالت و نبوت (منطقه هشت )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 40804000010006,
    Description:
      "تکمیل قرارداد خرید و اجرای تابلوهای اطلاعاتی و اخباری  جهت نصب در معابر کیانشهر ، مهر شهر و بلوار مدرس   (منطقه دو )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40804000010009,
    Description:
      "نصب ، تعمیر و نگهداری تجهیزات ترافیکی کوی سید خلف (منطقه دو )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40804000010010,
    Description:
      "خرید ، نصب ، تعمیر و نگهداری تجهیزات ترافیکی کیان آباد  (منطقه دو )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40804000010011,
    Description: "نصب ، تعمیر و نگهداری تجهیزات ترافیکی  زردشت  (منطقه دو )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40804000010012,
    Description: "نصب ، تعمیر و نگهداری تجهیزات ترافیکی  کیانشهر  (منطقه دو )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40804000010013,
    Description: "نصب ، تعمیر و نگهداری تجهیزات ترافیکی  کیانپارس  (منطقه دو )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40804000010014,
    Description: "نصب ، تعمیر و نگهداری تجهیزات ترافیکی  امانیه  (منطقه دو )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40804000010016,
    Description: "نصب ، تعمیر و نگهداری تجهیزات ترافیکی  ساحلی  (منطقه دو )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40207000010049,
    Description: "احداث پیاده رو دور ساختمان اداری و سیصد دستگاه (منطقه هشت )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 40301000010004,
    Description:
      "تکمیل قرارداد   بهسازی ایستگاههای اتوبوس امانیه ، کیانپارس ، کیان آباد ، کوی سید خلف ، مهر شهر ، کیانشهر و زردشت   (منطقه دو )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40301000010005,
    Description: "احداث ایستگاه اتوبوس معمولی واقع در کیانشهر  (منطقه دو )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40301000010007,
    Description: "احداث ایستگاه اتوبوس معمولی واقع در سید خلف  (منطقه دو )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40301000010008,
    Description:
      "خرید تجهیزات و تعمیر ایستگاه های اتوبوس مکانیزه امانیه  (منطقه دو )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 10202000160003,
    Description:
      "مصالعات آب خام فضای سبز شهر اهواز ( تکمیل قرارداد 112/68169 )",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10202000070006,
    Description: "مطالعات و طراحی فاز یک و دو پارک کوهساران در منطقه 7",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10202000090007,
    Description: "مطالعات تقاطع غیر همسطح محدوده انتهای کوی پردیس ",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10202000070001,
    Description:
      "مطالعات و طراحی پارکهای مناطق 1 و 2 (پارک ایستگاه کارون، پارک آخر آسفالت، پارک بلوار جمهوری نبش خیابان شریعتی، پارک مصلی بزرگ اهواز، پارک انتهای خیابان شریعتی کوی مشعلی و پارک محله ای کوی فرهنگیان واقع در کیانشهر) ",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10202000070002,
    Description:
      "مطالعات و طراحی پارکهای مناطق 3 و 8 (پارک محله ای گلدیس بلوار شهید عباسپور کوی ملت، پارک محله ای کوی پیروزی حدفاصل خیابان های 1 و 2، پارک نگارستان بلوار مدرس جنب ورودی کوی نیرو، پارک محله ای کوی فرهنگیان 2 پشت مسجد صاحب الزمان، بلوار امام خمینی نبش خیابان 25 تا 27 فاز دو پاداد، بلوار سپهر فاز دو پاداد جنب مسجد خاتم الانبیاء، بلوار امام خمینی نبش خیابان 54 تا 57 فاز دو پاداد، بلوار هجرت حد فاصل پارک فردوس تا بلوار هاتف و پارک بلوار معلم کوی مستغلات نبش خیابان شهید رجایی)",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 60400100020000,
    Description: "ساماندهی کودکان کار",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 5010200001,
    Description: "تعمیرات و فضا سازی ساختمان",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 5010200001,
    Description: "ممیزی دکلهای ارتباطی ",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 5010200001,
    Description: "اپلیکیشن و وب سایت شهروندی اهواز",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 5010200001,
    Description: "سامانه جامع منابع انسانی و حقوق دستمزد",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40801000040002,
    Description: "طراحی، خرید و اجرای سامانه و تجهیزات هوشمند سازی پایانه ها",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 50102000020000,
    Description: "خرید نرم افزار ، تجهیزات و اجرای دوربین های مدار بسته1",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 50102000020000,
    Description: "خرید نرم افزار ، تجهیزات و اجرای دوربین های مدار بسته1",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 50102000020000,
    Description: "خرید نرم افزار ، تجهیزات و اجرای دوربین های مدار بسته1",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 50102000140000,
    Description:
      "خرید ، تجهیز ، تکمیل ، تعمیر ، پشتیبانی و راه اندازی نوبت دهی مکانیزه برای شهروندان12",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 50102000140000,
    Description:
      "خرید ، تجهیز ، تکمیل ، تعمیر ، پشتیبانی و راه اندازی نوبت دهی مکانیزه برای شهروندان12",
    Mosavab: 2000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 10304000010029,
    Description:
      "خرید میز پینگ پنگ و فوتبال دستی جهت پارک های سطح منطقه (منطقه شش )",
    Mosavab: 1800000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 10304000010038,
    Description:
      "خربد آهن آلات جهت ایمن سازی پارکها شهداء نبوت ، ارغوان ، مریم ، کوی طاهر و...  (منطقه هشت )",
    Mosavab: 1800000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 10304000010017,
    Description:
      "خرید پرچم ساتن جمهوری اسلامی ، مشکی  مناسبتی جهت استفاده در پارک مالیات  (منطقه چهار)",
    Mosavab: 1800000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 10304000010014,
    Description:
      "خرید ست تندرستی ( پامچال ، صدف 1و 2 ، مادر ، نیلوفر، گلها و ....) (منطقه چهار)",
    Mosavab: 1800000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 10303000020021,
    Description:
      "رنگ آمیزی دیوارهای فرسوده(خیابان های ناصرخسرو جنوبی،شیخ بهای جنوبی،انقلاب،امیرکبیر شمالی،داغری،ولی عصر ، منازل راه آهن،کوی عین دو،کوی سیاحی و کوی گلدشت)  (منطقه شش )",
    Mosavab: 1800000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 10303000020023,
    Description:
      "خرید رنگ و رنگ آمیزی دیوارهای فرسوده بلوار فنی و حرفه ای ، بلوار معلم ، هجرت ، دانش ، حجمهوری و...(منطقه هشت )",
    Mosavab: 1800000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 10303000020024,
    Description:
      "بدنه سازی و بهسازی بافتهای فرسوده ( نقاشی دیوار افقی و عمودی ) کوی طاهر ، داهبویه ، کوی امام ، سیصد دستگاه و کوی بعثت (منطقه هشت )",
    Mosavab: 1800000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 10303000020011,
    Description: " رنگ آمیزی دیوارهای فرسوده امانیه  (منطقه دو )",
    Mosavab: 1800000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 10303000020012,
    Description: " رنگ آمیزی دیوارهای فرسوده کیان آباد  (منطقه دو )",
    Mosavab: 1800000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 10303000020013,
    Description: "رنگ آمیزی دیوارهای فرسوده کیانپارس  (منطقه دو )",
    Mosavab: 1800000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 10202000040008,
    Description: "انجام عملیات نقشه برداری و برداشت خیابان (منطقه شش )",
    Mosavab: 1500000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 10202000040009,
    Description: "انجام عملیات نقشه برداری و برداشت خیابان منطقه (منطقه هفت )",
    Mosavab: 1500000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40101000020000,
    Description:
      "تکمیل ساماندهي و بهسازي  و احداث دیوار و پیاده روسازی  ناحيه صنعتي كارون",
    Mosavab: 1500000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10202000070005,
    Description:
      "مطالعات و طراحی پارکهای منطقه 7 (پارکهای بلوار نبوت کوی سلطانمنش جنب ورزشگاه، پارک کوی مهاجرین، پارک کوی الصافی یک، پارک کوی الصافی دو، پارک پشت فنی و حرفه ای و پارک کوی انصار)",
    Mosavab: 1500000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10202000110006,
    Description:
      "مطالعات همسان سازی 100 کیلومتر پیاده رو در سطح شهر اهواز(تکمیلی) (معاونت شهرسازی)",
    Mosavab: 1500000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40207000010050,
    Description: "جدولگذاری و پیاده روسازی(منطقه هشت )",
    Mosavab: 1500000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 40206000010025,
    Description:
      "خرید و تعمیر نرده های پلهای سردار هاشمی و مدافعان حرم  (منطقه هشت )",
    Mosavab: 1500000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 40203000010057,
    Description:
      "اجرای گذرگاه عابر پیاده(بلوار قدس،میدان انقلاب،بلوار هاشمی جنوبی)  (منطقه شش )",
    Mosavab: 1500000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 50102000140000,
    Description:
      "خرید ، تجهیز ، تکمیل ، تعمیر ، پشتیبانی و راه اندازی نوبت دهی مکانیزه برای شهروندان12",
    Mosavab: 1500000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 10303000020015,
    Description: "بهسازی و رنگ آمیزی جعبه های برق و مخابرات  (منطقه دو )",
    Mosavab: 1350000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 10303000020016,
    Description: "رنگ آمیزی و بهسازی تابلوهای پارکها و میادین (منطقه دو )",
    Mosavab: 1350000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 10202000040007,
    Description:
      "انجام عملیات نقشه برداری و برداشت خیابان های منطقه5  (منطقه پنج)",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 40101000030000,
    Description:
      "زیرسازی و آسفالت معابر و احداث کانال کوی علی آباد و کوی اندیشه ",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 10202000040005,
    Description: "عملیات نقشه برداری  منطقه 3 (منطقه سه )",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 10304000020018,
    Description: "خرید سه مجموعه سفره هفت سین   (منطقه سه )",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: 3,
  },
  {
    Code: 10304000020032,
    Description:
      "تعمیر و بهسازی آبنمای چهار باند واقع در بلوار قدس  (منطقه شش )",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 10304000020033,
    Description:
      "ترمیم و بهسازی روشنایی فضاهای بازی کودکان در سطح پارکها  (منطقه شش )",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 40203000010022,
    Description: "تعمیر نرده های زیر پل های عابر پیاده کیانپارس (منطقه دو )",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40203000010023,
    Description: "تعمیر نرده های زیر پل های عابر پیاده جاده ساحلی  (منطقه دو )",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40203000010024,
    Description: "تعمیر نرده جان پناه پل غدیر  (منطقه دو )",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40203000010025,
    Description: "تعمیر نرده جان پناه پل هفتم  (منطقه دو )",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20502000010004,
    Description: "تعمیر و بهسازی سرویس بهداشتی پارک ایثار  (منطقه دو )",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20502000010005,
    Description: "مرمت و بازسازی سرویس بهداشتی پارک دولت  (منطقه دو )",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20702000010041,
    Description: "لایروبی و صفحه کشی شبکه فاضلاب و آبهای سطحی  (منطقه شش )",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 30301000050000,
    Description: "هزینه اجرای بند 14 ماده 55 قانون شهرداریها (منطقه دو )",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 30301000050000,
    Description: "هزینه اجرای بند 14 ماده 55 قانون شهرداریها (منطقه دو )",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 30202000010000,
    Description: "ایمن سازی ساحل کارون(نجات غریق) (منطقه یک )",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 30201000010000,
    Description: "ایمن سازی ساحل کارون(نجات غریق) (منطقه چهار)",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 20702000020010,
    Description: "خرید پمپ خودمکش 6 اینچ sp  (سیار)  (منطقه پنج)",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 40203000010075,
    Description:
      "احداث سرعتکاه آسفالتی  کوی سلطانمنش  و زیتون کارگری  (منطقه هفت )",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40203000010076,
    Description: "احداث سرعتکاه آسفالتی  بلوار عامری و آسیاباد  (منطقه هفت )",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40203000010077,
    Description: "اجرای سرعتکاه آسفالتی کوی رمضان  (منطقه هفت )",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40203000010078,
    Description: "اجرای سرعتکاه آسفالتی کوی سپیدار (منطقه هفت )",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40203000010079,
    Description: "احداث سرعتکاه آسفالتی حصیرآباد (منطقه هفت )",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40203000010080,
    Description: "احداث پهلوگاه اتوبوس  کوی سپیدار (منطقه هفت )",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40203000010081,
    Description: "احداث پهلوگاه اتوبوس کوی رمضان  (منطقه هفت )",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40203000010071,
    Description: " اجرای گذرگاه عابر پیاده سلطانمنش  (منطقه هفت )",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40203000010072,
    Description: "اجرای گذرگاه عابر پیاده کوی رمضان  (منطقه هفت )",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40203000010073,
    Description:
      "اجرای گذرگاه عابر پیاده بلوار شهید قاسم سلیمانی  (منطقه هفت )",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 40203000020040,
    Description: "اجرای نقوش ترافیکی بلوار معلم و امام شرقی (منطقه هشت )",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 40206000010008,
    Description: "تعمیر پل عابر پیاده جاده ساحلی نبش خیابان 13 (منطقه دو )",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40206000010009,
    Description:
      "تعمیر و بهسازی پل عابر پیاده جاده ساحلی نبش خیابان 6  (منطقه دو )",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40206000010010,
    Description: "تعمیر پل عابر پیاده بلوار چمران مقابل آبفا  (منطقه دو )",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40206000010011,
    Description: "تعمیر و بهسازی پل عابر پیاده امانیه  (منطقه دو )",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40301000010006,
    Description: "احداث ایستگاه اتوبوس معمولی واقع در مهر شهر  (منطقه دو )",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 60602000280006,
    Description: "احداث، تکمیل، تعمیر و بازسازی نمازخانه   (منطقه پنج)",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 60602000270000,
    Description: "طرح استقبال از مهر (بازگشایی مدارس)",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 60602000270000,
    Description: "طرح استقبال از مهر (بازگشایی مدارس)",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 60602000270000,
    Description: "طرح استقبال از مهر (بازگشایی مدارس)",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 40804000010024,
    Description: "نصب تجهیزات ترافیکی (منطقه هفت )",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 10202000160001,
    Description: "مطالعات پراکندگی جانوران شهری",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10202000160002,
    Description: "مطالعات مشاغل آلاینده و مزاحم",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10202000160004,
    Description: "مطالعات پارک گلها و گیاه شناسی در محدوده پارک شهروند",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10202000070003,
    Description:
      "مطالعات و طراحی پارکهای منطقه 4 (پارک محله ای در کوی شهرک برق انتهای خیابان 2 و 3 ملاصدرا جنب 32 متری شهرک برق، پارک محله ای در کوی بهارستان شهرک الهیه منازل نیروی انتظامی، پارک محله ای در کوی بهارستان بلوار آریا بین خیابان های 2 و 3 خلیج فارس، پارک محله ای در کوی بهارستان بین خیابان 13 شمشاد و منازل صدا و سیما، پارک محله ای کوی نهضت آباد خیابان 10 متری جنب دبستان عفت، پارک محله ای انتهای بلوار 30 متری تقاطع خیابان 8 کارمندی در شهرک برق و پارک محله ای در خیابان رفیش انتهای خیابان 3 شهرداری در کوی نهضت آباد)) ",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10202000070004,
    Description:
      "مطالعات و طراحی پارکهای مناطق 5 و 6 ( پارک محله ای ملاشیه، پارک محله ای خیابان 13 رشد فرهنگ شهر، پارک محله ای نسترن، پارک محله ای 45 متری شهرک پیام، پارک محله ای دامون در کوی پردیس و پارک نواری شهدای 31 شهریور واقع در بلوار قدس، پارک حاشیه اتوبان قدس رو به روی دادگاه و پارک نبش اتوبان قدس و اتوبان اندیمشک)",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10202000090005,
    Description:
      "مطالعات و طراحی بهسازی و تعریض پل راهنمایی، اتصال کنارگذر پل معلق و رمپ و لوپهای پل نادری ",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10202000090006,
    Description:
      "مطالعات و طراحی مراحل اول و دوم تقاطع غیر همسطح ریل راه آهن و خیابان 18 متری چهارم کیان آباد",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10202000060002,
    Description: "مطالعات و طراحی فاز یک  و دو میدان فرودگاه",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10202000060003,
    Description: "مطالعات و طراحی پل پیاده گذر بلوار ساحلی کیانپارس ",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10202000060004,
    Description:
      "طراحی مرحله اول و دوم المان ورودی اهواز از سمت حمیدیه ( قرارداد 1900/16494 -97/10/16 )",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10202000040002,
    Description:
      "مطالعات خدمات نقشه برداری و مدلسازی سه بعدی پل هفتم و پل طبیعت ",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10202000040003,
    Description:
      "نقشه‏برداری و تهیه مقاطع طولی و عرضی گذرها به منظور دفع آبهای سطحی در محدوده مناطق 4 و 5 ",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10202000010001,
    Description:
      "مطالعات و طراحی ساختمان جدید شهرداری مرکز (ساختمان هفت طبقه) ",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40201000010003,
    Description:
      "ترمیم نوار حفاری پراکنده در اتوبان گلستان در منطقه 4 ( صورتجلسه سازمان عمران )",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 5010200001,
    Description: "متمرکز سازی وب سرورها",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 5010200001,
    Description: "مدیریت سیاست های امنیتی سازمان ها (Cisco ISE)",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 5010200001,
    Description: "زیر ساخت دسکتاپ مجازی (فاز اول)",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 5010200001,
    Description: "تولید محتوای آموزشی نرم افزار ها",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 50102000140000,
    Description:
      "خرید ، تجهیز ، تکمیل ، تعمیر ، پشتیبانی و راه اندازی نوبت دهی مکانیزه برای شهروندان12",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 50102000140000,
    Description:
      "خرید ، تجهیز ، تکمیل ، تعمیر ، پشتیبانی و راه اندازی نوبت دهی مکانیزه برای شهروندان12",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 50102000020000,
    Description: "خرید نرم افزار ، تجهیزات و اجرای دوربین های مدار بسته1",
    Mosavab: 1000000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 60603000010053,
    Description:
      "خاکریزی ، تسطیح و کلاژ زمین ورزشی خاکی آهن افشار   (منطقه شش )",
    Mosavab: 800000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 40301000010011,
    Description:
      "تعمیر و بهسازی ایستگاه های اتوبوس معمولی کیان آباد  (منطقه دو )",
    Mosavab: 700000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40301000010012,
    Description:
      "تعمیر و بهسازی ایستگاه های اتوبوس معمولی سید خلف  (منطقه دو )",
    Mosavab: 700000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 50102000020000,
    Description: "خرید نرم افزار ، تجهیزات و اجرای دوربین های مدار بسته1",
    Mosavab: 700000000,
    Expense: 0,
    AreaNameShort: 6,
  },
  {
    Code: 40301000010010,
    Description:
      "تعمیر و بهسازی ایستگاه های اتوبوس معمولی کیاانپارس (منطقه دو )",
    Mosavab: 600000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40301000010009,
    Description:
      "تعمیر و بهسازی ایستگاه های اتوبوس معمولی کیانشهر  (منطقه دو )",
    Mosavab: 500000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40206000010024,
    Description: "خرید و بهسازی نرده های زیر پل عابر پیاده  (منطقه هشت )",
    Mosavab: 500000000,
    Expense: 0,
    AreaNameShort: 8,
  },
  {
    Code: 10202000010002,
    Description:
      "مطالعات و طراحی فاز اول ساختمان شهرداری مرکزی و ساختمان شورای اسلامی شهر اهواز و ساختمانهای اداری",
    Mosavab: 500000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10202000010003,
    Description: "مطالعات و طراحي ساختمانهای اداری  ",
    Mosavab: 500000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10202000040001,
    Description:
      "مطالعات خدمات نقشه برداری و مدلسازی سه بعدی پل معلق و پل سیاه",
    Mosavab: 500000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10202000060005,
    Description: "مطالعات و طراحی مرحله اول و دوم باغ موزه ایران زمین",
    Mosavab: 500000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10202000090003,
    Description: "مطالعات بهسازی و تعریض پل گورستان باغ فردوس اهواز",
    Mosavab: 500000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40501000010003,
    Description: "پروژه مشارکتی تجاری-اداری و پارکینگ طبقاتي",
    Mosavab: 500000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40203000010026,
    Description: "تعمیر نرده پل صیاد شیرازی  (منطقه دو )",
    Mosavab: 500000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 40203000010027,
    Description: "تعمیر نرده پل شهید سوداگر  (منطقه دو )",
    Mosavab: 500000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20102000020004,
    Description: "خرید کود، سم (منطقه دو )",
    Mosavab: 500000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20102000020005,
    Description: "خرید لوازم باغبانی  (منطقه دو )",
    Mosavab: 500000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20102000020006,
    Description: "هرس درختان  (منطقه دو )",
    Mosavab: 500000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 20102000020007,
    Description: "کرایه ماشین آلات آبیاری  (منطقه دو )",
    Mosavab: 500000000,
    Expense: 0,
    AreaNameShort: 2,
  },
  {
    Code: 10201000040006,
    Description: "عملیات نقشه برداری (منطقه چهار)",
    Mosavab: 500000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 10202000010004,
    Description: "مطالعات و طراحي ساختمانهای اداری  (منطقه چهار)",
    Mosavab: 500000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 10202000070008,
    Description: "مطالعه و طراحی آب خام و  پارک ها و فضای سبز (منطقه هفت )",
    Mosavab: 500000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 10201000080000,
    Description: " طراحي و مطالعات پروژه هاي دفع آبهاي سطحي(منطقه چهار)",
    Mosavab: 500000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 10202000080000,
    Description: " طراحي و مطالعات پروژه هاي دفع آبهاي سطحي (منطقه هفت )",
    Mosavab: 500000000,
    Expense: 0,
    AreaNameShort: 7,
  },
  {
    Code: 10201000120001,
    Description: "مطالعات و طراحی اماکن فرهنگی، اجتماعی، ورزشی و درمانی",
    Mosavab: 500000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 40207000010019,
    Description: "جدولگذاری در خیابانهای نیلوفر در کوی بهارستان  (منطقه چهار)",
    Mosavab: 200000000,
    Expense: 0,
    AreaNameShort: 4,
  },
  {
    Code: 10202000090008,
    Description:
      "مطالعات مرحله اول و دوم سازه تقاطع غیرهمسطح خیابان توحید-چمران کیانپارس اهواز",
    Mosavab: 200000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10202000060006,
    Description: "مطالعات و طراحی مجموعه فرهنگی ورزشی مهرشهر واقع در منطقه دو ",
    Mosavab: 200000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 10202000090004,
    Description: "مطالعات و بهسازی تعریض پل کیان آباد",
    Mosavab: 100000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 20604000010001,
    Description: "احداث بازار آبزیان (مشارکتی)",
    Mosavab: 10000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 40301000010016,
    Description:
      "تکمیل قرارداد احداث سکوی ریل باس جنب دانشگاه آزاد و پیام نور (منطقه پنج)",
    Mosavab: 10000000,
    Expense: 0,
    AreaNameShort: 5,
  },
  {
    Code: 10303000010004,
    Description: "بهسازی و بازسازی و بدنه سازی خیابان سلمان فارسی (منطقه یک )",
    Mosavab: 10000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 10303000010007,
    Description:
      "بهسازی خیابان امام حد فاصل خیابان علم الهدی تا خیابان خوانساری (منطقه یک )",
    Mosavab: 10000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 10303000010008,
    Description:
      "بهسازی و بازسازی خیابان امام خمینی حد فاصل شریعتی تا علم الهدی زون یک (منطقه یک )",
    Mosavab: 10000000,
    Expense: 0,
    AreaNameShort: 1,
  },
  {
    Code: 60603000010001,
    Description: "احداث ، تکمیل و تجهیز زمین های ورزشی بصورت مشارکتی ",
    Mosavab: 10000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 60603000010002,
    Description:
      "تجهیز و راه اندازی سالن های  سرپوشیده ورزشی با اولویت بانوان بصورت مشارکتی",
    Mosavab: 10000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 60602000030000,
    Description:
      "احداث، تکمیل و تجهیز پلاتوهای جنب تالار آفتاب (سالن های تئاتر)",
    Mosavab: 10000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 60602000050000,
    Description: "احداث موزه شهرداری و کتابخانه تخصصی مدیریت شهری",
    Mosavab: 10000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 60602000290000,
    Description: "پردیس فرهنگی سینمایی (بصورت مشارکتی )",
    Mosavab: 10000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
  {
    Code: 60602000200000,
    Description:
      "بازسازی و تکمیل پارک آبی کیانشهر (پیشنهادی حوزه سرمایه گذاری و مشارکت مردمی  )",
    Mosavab: 10000000,
    Expense: 0,
    AreaNameShort: "مرکز",
  },
];

interface BudgetReportProjectSortFormProps {
  tabRender?: ReactNode;
  formData: any;
  setFormData: any;
  printData: {
    data: any[];
    footer: any[];
  };
}

function BudgetReportProjectSortForm(props: BudgetReportProjectSortFormProps) {
  const { tabRender, formData, setFormData, printData } = props;

  const [haveSubmitedForm, setHaveSubmitedForm] = useState(false);

  const queryClient = useQueryClient();
  const submitMutation = useMutation(budgetProjectOprationApi.getData, {
    onSuccess: (data) => {
      queryClient.setQueryData(reactQueryKeys.budget.projectOpration, data);
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // permission
    // const havePermission = checkHavePermission(
    //   userLicenses,
    //   [accessNamesConfig.FIELD_AREA, accessNamesConfig.FIELD_YEAR],
    //   joinPermissions([
    //     accessNamesConfig.BUDGET__REPORT_PAGE,
    //     accessNamesConfig.BUDGET__REPORT_PAGE_DEVIATION,
    //   ])
    // );

    // if (!havePermission) {
    //   return enqueueSnackbar(globalConfig.PERMISSION_ERROR_MESSAGE, {
    //     variant: "error",
    //   });
    // }

    // setHaveSubmitedForm(true);

    // if (
    //   checkHaveValue(formData, [
    //     budgetDeviationConfig.area,
    //     budgetDeviationConfig.year,
    //   ])
    // ) {
    // submitMutation.mutate(formData);
    queryClient.setQueryData(reactQueryKeys.budget.sort.getData, {
      data: mockedData,
    });

    // }
  };

  // print
  const handlePrintForm = () => {
    if (printData.data.length) {
      const yearLabel = getGeneralFieldItemYear(formData, 1);
      const areaLabel = getGeneralFieldItemArea(formData, 3);
      const budgetKindLabel = getGeneralFieldItemProjectScale(formData);
      budgetReportShareStimul({
        data: printData.data,
        footer: printData.footer,
        year: yearLabel,
        area: areaLabel,
        kind: budgetKindLabel,
        numberShow: "ریال",
      });
    }
  };

  return (
    <Box
      component="form"
      padding={1}
      onSubmit={handleSubmit}
      sx={{ bgcolor: "grey.200" }}
    >
      <Grid container spacing={2}>
        {tabRender && <Grid xs={12}>{tabRender}</Grid>}

        {/* <SectionGuard
          permission={joinPermissions([
            accessNamesConfig.BUDGET__REPORT_PAGE,
            accessNamesConfig.BUDGET__REPORT_PAGE_PROJECT_SCALE,
            accessNamesConfig.FIELD_YEAR,
          ])}
        > */}
        <Grid xs={2}>
          <YearInput
            setter={setFormData}
            value={formData[budgetDeviationConfig.year] as number}
            // permissionForm={joinPermissions([
            //   accessNamesConfig.BUDGET__REPORT_PAGE,
            //   accessNamesConfig.BUDGET__REPORT_PAGE_PROJECT_SCALE,
            // ])}
            showError={false}
          />
        </Grid>
        {/* </SectionGuard> */}

        {/* <SectionGuard
          permission={joinPermissions([
            accessNamesConfig.BUDGET__REPORT_PAGE,
            accessNamesConfig.BUDGET__REPORT_PAGE_PROJECT_SCALE,
            accessNamesConfig.FIELD_AREA,
          ])}
        > */}
        <Grid lg={2}>
          <AreaInput
            setter={setFormData}
            value={formData[budgetDeviationConfig.area]}
            // permissionForm={joinPermissions([
            //   accessNamesConfig.BUDGET__REPORT_PAGE,
            //   accessNamesConfig.BUDGET__REPORT_PAGE_PROJECT_SCALE,
            // ])}
            level={3}
            showError={haveSubmitedForm}
          />
        </Grid>
        {/* </SectionGuard> */}

        <Grid xs={2}>
          <BudgetSortKindInput
            setter={setFormData}
            value={formData["kind"] as any}
          />
        </Grid>

        <Grid xs={2}>
          <LoadingButton
            variant="contained"
            type="submit"
            loading={submitMutation.isLoading}
            sx={{ mr: 1 }}
          >
            نمایش
          </LoadingButton>

          <IconButton color="primary" onClick={handlePrintForm}>
            <PrintIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
}

export default BudgetReportProjectSortForm;
