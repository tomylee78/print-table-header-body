## 快速使用

1. 引用 print_header_body.js 進專案內
2. 附掛 style.css 裡的內容進專案內
3. 錨定一個 dom 元素，為其加上 class `.print-container`，使用 `append()` 將 `print_table_header_body()` 的渲染結果放進去
4. 確認有預設表頭表身出來後，在根據需求，傳入標題的 title_setting、表頭的項目 navbar_setting，表身的項目 table_setting，實際資料包 data 等內容

## DEMO

- 下載檔案後，使用 live server 直接執行 `index.html` 查看效果

## 需求

- 當觸發列印功能，若表身超過兩頁時，每頁的起頭都必須要有表頭，而表頭與表頭之間必定在不同分頁上

## 實作

<aside>
🔖 表頭表身列印函式 ⇒ `print_table_header_body()` 參數說明

</aside>

```
/**
 *  表頭表身列印功能
 *  類似報價單的外部主項目和內部羅列的子項目
 * @param {Object} [obj={}] - 包含列印所需資訊的物件。
 *      @prop {String} [obj.title_setting] - 表單標題。
 *      @typedef {Array<{Object}>} [obj.navbar_setting] - 表頭主項目，內部由 標題 與 data schema 組成物件陣列。
 *          @prop {String} obj.navbar_setting[].title - 表頭主項目標題。
 *          @prop {String} obj.navbar_setting[].schema - 表頭主項目對應的 data schema。
 *      @typedef {Array<{Object}>} [obj.table_setting] - 表身 table 的 th，內部由 標題 與 data schema 組成物件陣列。
 *          @prop {String} obj.table_setting[].title - 表身 th 標題。
 *          @prop {String} obj.table_setting[].schema - 表身子項目 td 對應的 data schema。
 *          @prop {Number} obj.table_setting[].width - 設定欄位的寬度 (px)。
 *          @prop {Boolean} obj.table_setting[].is_main - 設定此欄位是否把剩餘的寬度都佔滿。
 *      @typedef {Array<{obj.navbar_setting[].schema, item_data}>} [obj.data] - 完整的表頭表身資料。
 *          @prop {String} obj.data[].[obj.navbar_setting[].schema] - 表頭主項目的資料。
 *          @typedef {Array<Object>} [obj.data[].item_data] - 表身子項目 table 的 td 資料。
 *              @prop {String} obj.data[].item_data[].[obj.table_setting[].schema] - 表身子項目的資料。
 * @return 完整的列印 dom 元素
 */
export default function print_table_header_body(obj = {}) {
	...
}
```

---

- 瀏覽器的畫面顯示分為常態顯示與列印顯示兩種，可以透過工具區的算繪功能來調整，列印顯示等同於瀏覽器上按右鍵選列印時跳出的預覽列印

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/8b22471b-b0b4-4116-96af-75d1dcc0586f/7325f303-e58f-4351-930d-a1e499dafdd1/Untitled.png)

- 因顯示模式的不同，CSS 也能對應模式做不同的 CSS 渲染，具體指令是透過 `@media print` 來區隔當列印時要額外跑哪些 CSS
- 而針對列印時的列印設定，可使用 `@page` 來實作，例如紙張大小設定、邊界設定等等
- 比較常見的手法是在 dom 元素內事先埋點，當進行列印時，觸發埋點的 `class` 設定樣式，進而隱藏或調整當前的畫面渲染，以下為範例

```css
/* 列印模式 */
@media print{
    * {
        color-adjust: exact!important;  
        -webkit-print-color-adjust: exact!important;
        
    }
    div, tr{
        page-break-inside: avoid;
    }
}

@page { 
    size: A4 portrait;
    margin: 1cm 1cm 1cm 1cm; 
}
```

- 列印的顯示設定，採用模組化處裡，各個顯示區域有屬於自己的設定檔，只要格式符合便可以動態的設定列印時的表頭與表身標題，主要包含標題的 title_setting，表頭的項目 navbar_setting，表身的項目 table_setting，並將其依依映射進傳入的 data 資料包，以下為範例

```jsx
const {
		// 標題
    title_setting = '<h3 class="text-center text-secondary flex-fill fw-bold no-wrap">💠原神影幻杯亞洲公開賽💠</h3><h3 class="text-center text-secondary flex-fill fw-bold no-wrap">七聖召喚角色卡牌採購單</h3>',
		// 表頭項目
    navbar_setting = [
        { title: "顧客姓名", schema: "th_title_1" },
        { title: "會員編號", schema: "th_title_2" },
        { title: "收貨地址", schema: "th_title_3" },
    ],
		// 表身項目
    table_setting = [
        { title: "角色名稱", schema: "td_data_1", width: 130, is_main: true },
        { title: "屬性", schema: "td_data_2" , width: 60 },
        { title: "陣營", schema: "td_data_3" , width: 60 },
        { title: "血量", schema: "td_data_4" , width: 60 },
        { title: "普攻傷害", schema: "td_data_5" , width: 100 },
        { title: "元素戰技傷害", schema: "td_data_6" , width: 150 },
        { title: "元素爆發傷害", schema: "td_data_7", width: 150 },
    ],
		// 實際傳入陣列資料
    data = [
        {
            th_title_1: "賽諾",
            th_title_2: "808529882",
            th_title_3: "須彌城教令院",
            item_data: [
                { td_data_1: "宵宮", td_data_2: "火", td_data_3: "稻妻", td_data_4: "10", td_data_5: "2", td_data_6: "0", td_data_7: "3" },
                { td_data_1: "可莉", td_data_2: "火", td_data_3: "蒙德", td_data_4: "10", td_data_5: "1", td_data_6: "3", td_data_7: "3" },
                { td_data_1: "胡桃", td_data_2: "火", td_data_3: "璃月", td_data_4: "10", td_data_5: "2", td_data_6: "0", td_data_7: "4" },
            ],
        },
        {
            th_title_1: "刻師傅",
            th_title_2: "135764843",
            th_title_3: "璃月港總務司",
            item_data: [
                { td_data_1: "甘雨", td_data_2: "冰", td_data_3: "璃月", td_data_4: "10", td_data_5: "1", td_data_6: "1", td_data_7: "2" },
            ],
        },

    ],
} = obj;
```

- 與其相對的，使用自定義 CSS 為其設定渲染內容，其中 `.print-container` 所處的 DOM 元素為 `print_table_header_body()` 渲染後 `append()` 的位置
    - `$(".print-container").append(print_table_header_body());`

```jsx
// 包裹整個列印區的外框
.print-container {
    margin: auto;
    max-height: 100% !important;
    min-height: 100% !important;
    height: 100% !important;
    max-width: 90% !important;
    min-width: 90% !important;
    width: 90% !important;
}

.print-navbar-setting{
    color: #727e8b;
}

.print-thead-setting{
    color: #495057 !important;
    background-color: #e9ecef !important;
    border: 2px solid #dee2e6;
    padding: 0.5rem!important;
    font-size: 16px;
}

.print-tbody-setting{
    border-top: 1.5px solid #dee2e6;
    font-size: 14px;
}
```

- 而核心渲染框架如下，本質上即是透過傳入的資料包和設定檔，動態的渲染列印畫面

```jsx
let dom_string = "";
data.forEach((obj1, index1) => {
    dom_string += `
        <div class="mb-5" ${index1 < data.length - 1 ? 'style="page-break-after: always;"' : ""}>
            <table id="print-header-body-table-${index1}" class="table table-hover m-0 text-center">
                <thead class="thead-light">
                    <tr>
                        <th class="bg-transparent border-0" colspan="${colum_length}">
                            ${title_setting}
                            <div>
                                <div class="container my-2">
                                    <div class="row fs-5 print-navbar-setting">
                                        ${navbar_setting.reduce((dom_string, item) => 
                                            dom_string += `<div class="col-6 text-start"><div>${item.title}：${obj1[item.schema]}</div></div>`, "")
                                        }
                                    </div>
                                </div>
                            </div>
                        </th>
                    </tr>
                    <tr>
                        ${table_setting.reduce((dom_string, item) => 
                            dom_string += 
                                `<th class="text-center print-thead-setting"
                                    ${item.width !== undefined ? `style="${item.is_main ? "" : `max-width: ${item.width}px; width: ${item.width}px;`} min-width: ${item.width}px;"` : ""}
                                >${item.title}</th>`, "")
                        }
                    </tr>
                </thead>

                <tbody id="print-header-body-tbody-${index1}">
                    ${obj1.item_data.reduce((dom_string, item1) => dom_string += `<tr class="print-tbody-setting">
                        ${table_setting.reduce((dom_string, item2) => dom_string += `<td>${item1[item2.schema]}</td>`, "")}
                    </tr>`, "")}
                </tbody>
            </table>
        </div>
    `;
});
```

## 完整內容

<aside>
🔖 核心為 style.css、print_table_header_body，index.html 為 DEMO 使用

</aside>

### style.css

```jsx
@media print{
    * {
        color-adjust: exact!important;  
        -webkit-print-color-adjust: exact!important;
        
    }
    div, tr{
        page-break-inside: avoid;
    }
    @page { 
        size: A4 portrait;
        margin: 1cm 1cm 1cm 1cm; 
    }
}

.print-container {
    margin: auto;
    max-height: 100% !important;
    min-height: 100% !important;
    height: 100% !important;
    max-width: 90% !important;
    min-width: 90% !important;
    width: 90% !important;
}

.print-navbar-setting{
    color: #727e8b;
}

.print-thead-setting{
    color: #495057 !important;
    background-color: #e9ecef !important;
    border: 2px solid #dee2e6;
    padding: 0.5rem!important;
    font-size: 16px;
}

.print-tbody-setting{
    border-top: 1.5px solid #dee2e6;
    font-size: 14px;
}
```

### index.html

```jsx
<!doctype html>
<html lang="zh-tw">

<head>
    <title>表頭表身列印功能</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link href="style.css" rel="stylesheet">
</head>
<body>
    <main>
        <section class="print-container">
        </section>
    </main>
</body>
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
    integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
    crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
    crossorigin="anonymous"></script>
<!-- <script src="print_header_body.js"></script> -->

<script type="module">
    import print_table_header_body from '/print_header_body.js';
    $("section[class='print-container']").append(print_table_header_body());
</script>

</html>
```

### print_table_header_body.js

```jsx
/**
 *  表頭表身列印功能
 *  類似報價單的外部主項目和內部羅列的子項目
 * @param {Object} [obj={}] - 包含列印所需資訊的物件。
 *      @prop {String} [obj.title_setting] - 表單標題。
 *      @typedef {Array<{Object}>} [obj.navbar_setting] - 表頭主項目，內部由 標題 與 data schema 組成物件陣列。
 *          @prop {String} obj.navbar_setting[].title - 表頭主項目標題。
 *          @prop {String} obj.navbar_setting[].schema - 表頭主項目對應的 data schema。
 *      @typedef {Array<{Object}>} [obj.table_setting] - 表身 table 的 th，內部由 標題 與 data schema 組成物件陣列。
 *          @prop {String} obj.table_setting[].title - 表身 th 標題。
 *          @prop {String} obj.table_setting[].schema - 表身子項目 td 對應的 data schema。
 *          @prop {Number} obj.table_setting[].width - 設定欄位的寬度 (px)。
 *          @prop {Boolean} obj.table_setting[].is_main - 設定此欄位是否把剩餘的寬度都佔滿。
 *      @typedef {Array<{obj.navbar_setting[].schema, item_data}>} [obj.data] - 完整的表頭表身資料。
 *          @prop {String} obj.data[].[obj.navbar_setting[].schema] - 表頭主項目的資料。
 *          @typedef {Array<Object>} [obj.data[].item_data] - 表身子項目 table 的 td 資料。
 *              @prop {String} obj.data[].item_data[].[obj.table_setting[].schema] - 表身子項目的資料。
 * @return 完整的列印 dom 元素
 */
export default function print_table_header_body(obj = {}) {
    const {
        title_setting = '<h3 class="text-center text-secondary flex-fill fw-bold no-wrap">💠原神影幻杯亞洲公開賽💠</h3><h3 class="text-center text-secondary flex-fill fw-bold no-wrap">七聖召喚角色卡牌採購單</h3>',
        navbar_setting = [
            { title: "顧客姓名", schema: "th_title_1" },
            { title: "會員編號", schema: "th_title_2" },
            { title: "收貨地址", schema: "th_title_3" },
        ],
        table_setting = [
            { title: "角色名稱", schema: "td_data_1", width: 130, is_main: true },
            { title: "屬性", schema: "td_data_2" , width: 60 },
            { title: "陣營", schema: "td_data_3" , width: 60 },
            { title: "血量", schema: "td_data_4" , width: 60 },
            { title: "普攻傷害", schema: "td_data_5" , width: 100 },
            { title: "元素戰技傷害", schema: "td_data_6" , width: 150 },
            { title: "元素爆發傷害", schema: "td_data_7", width: 150 },
        ],
        data = [
            {
                th_title_1: "賽諾",
                th_title_2: "808529882",
                th_title_3: "須彌城教令院",
                item_data: [
                    { td_data_1: "甘雨", td_data_2: "冰", td_data_3: "璃月", td_data_4: "10", td_data_5: "2", td_data_6: "1", td_data_7: "2" },
                    { td_data_1: "迪奧娜", td_data_2: "冰", td_data_3: "蒙德", td_data_4: "10", td_data_5: "2", td_data_6: "2", td_data_7: "1" },
                    { td_data_1: "凱亞", td_data_2: "冰", td_data_3: "蒙德", td_data_4: "10", td_data_5: "2", td_data_6: "3", td_data_7: "2" },
                    { td_data_1: "重雲", td_data_2: "冰", td_data_3: "璃月", td_data_4: "10", td_data_5: "2", td_data_6: "3", td_data_7: "7" },
                    { td_data_1: "神里綾華", td_data_2: "冰", td_data_3: "稻妻", td_data_4: "10", td_data_5: "2", td_data_6: "3", td_data_7: "4" },
                    { td_data_1: "優菈", td_data_2: "冰", td_data_3: "蒙德", td_data_4: "10", td_data_5: "2", td_data_6: "2", td_data_7: "2" },
                    { td_data_1: "申鶴", td_data_2: "冰", td_data_3: "璃月", td_data_4: "10", td_data_5: "2", td_data_6: "2", td_data_7: "1" },
                    { td_data_1: "七七", td_data_2: "冰", td_data_3: "璃月", td_data_4: "10", td_data_5: "2", td_data_6: "0", td_data_7: "3" },
                    { td_data_1: "萊依拉", td_data_2: "冰", td_data_3: "須彌", td_data_4: "10", td_data_5: "2", td_data_6: "0", td_data_7: "3" },
                    { td_data_1: "芭芭拉", td_data_2: "水", td_data_3: "蒙德", td_data_4: "10", td_data_5: "1", td_data_6: "1", td_data_7: "0" },
                    { td_data_1: "行秋", td_data_2: "水", td_data_3: "璃月", td_data_4: "10", td_data_5: "2", td_data_6: "2", td_data_7: "2" },
                    { td_data_1: "莫娜", td_data_2: "水", td_data_3: "蒙德", td_data_4: "10", td_data_5: "1", td_data_6: "1", td_data_7: "4" },
                    { td_data_1: "達達利亞", td_data_2: "水", td_data_3: "至冬", td_data_4: "10", td_data_5: "2", td_data_6: "2", td_data_7: "7" },
                    { td_data_1: "珊瑚宮心海", td_data_2: "水", td_data_3: "稻妻", td_data_4: "10", td_data_5: "2", td_data_6: "0", td_data_7: "2" },
                    { td_data_1: "神里綾人", td_data_2: "水", td_data_3: "稻妻", td_data_4: "10", td_data_5: "2", td_data_6: "2", td_data_7: "1" },
                    { td_data_1: "坎蒂絲", td_data_2: "水", td_data_3: "須彌", td_data_4: "10", td_data_5: "2", td_data_6: "2", td_data_7: "2" },
                    { td_data_1: "妮露", td_data_2: "水", td_data_3: "須彌", td_data_4: "10", td_data_5: "2", td_data_6: "3", td_data_7: "2" },
                    { td_data_1: "夜蘭", td_data_2: "水", td_data_3: "璃月", td_data_4: "10", td_data_5: "2", td_data_6: "3", td_data_7: "1" },
                    { td_data_1: "迪盧克", td_data_2: "火", td_data_3: "蒙德", td_data_4: "10", td_data_5: "2", td_data_6: "3", td_data_7: "8" },
                    { td_data_1: "香菱", td_data_2: "火", td_data_3: "璃月", td_data_4: "10", td_data_5: "2", td_data_6: "0", td_data_7: "3" },
                    { td_data_1: "班尼特", td_data_2: "火", td_data_3: "蒙德", td_data_4: "10", td_data_5: "2", td_data_6: "3", td_data_7: "2" },
                    { td_data_1: "安柏", td_data_2: "火", td_data_3: "蒙德", td_data_4: "10", td_data_5: "2", td_data_6: "0", td_data_7: "2" },
                    { td_data_1: "宵宮", td_data_2: "火", td_data_3: "稻妻", td_data_4: "10", td_data_5: "2", td_data_6: "0", td_data_7: "3" },
                    { td_data_1: "可莉", td_data_2: "火", td_data_3: "蒙德", td_data_4: "10", td_data_5: "1", td_data_6: "3", td_data_7: "3" },
                    { td_data_1: "胡桃", td_data_2: "火", td_data_3: "璃月", td_data_4: "10", td_data_5: "2", td_data_6: "0", td_data_7: "4" },
                ],
            },
            {
                th_title_1: "刻師傅",
                th_title_2: "135764843",
                th_title_3: "璃月港總務司",
                item_data: [
                    { td_data_1: "甘雨", td_data_2: "冰", td_data_3: "璃月", td_data_4: "10", td_data_5: "1", td_data_6: "1", td_data_7: "2" },
                ],
            },

        ],
    } = obj;

    const colum_length = table_setting.length;

    if(data.length === 0){
        return `<div class="fs-1 position-absolute top-50 start-50 translate-middle">
                    <b class="text-secondary">查無資料，請重新確認</b>
                </div>`;
    }

    let dom_string = "";
    data.forEach((obj1, index1) => {
        dom_string += `
            <div class="mb-5" ${index1 < data.length - 1 ? 'style="page-break-after: always;"' : ""}>
                <table id="print-header-body-table-${index1}" class="table table-hover m-0 text-center">
                    <thead class="thead-light">
                        <tr>
                            <th class="bg-transparent border-0" colspan="${colum_length}">
                                ${title_setting}
                                <div>
                                    <div class="container my-2">
                                        <div class="row fs-5 print-navbar-setting">
                                            ${navbar_setting.reduce((dom_string, item) => 
                                                dom_string += `<div class="col-6 text-start"><div>${item.title}：${obj1[item.schema]}</div></div>`, "")
                                            }
                                        </div>
                                    </div>
                                </div>
                            </th>
                        </tr>
                        <tr>
                            ${table_setting.reduce((dom_string, item) => 
                                dom_string += 
                                    `<th class="text-center print-thead-setting"
                                        ${item.width !== undefined ? `style="${item.is_main ? "" : `max-width: ${item.width}px; width: ${item.width}px;`} min-width: ${item.width}px;"` : ""}
                                    >${item.title}</th>`, "")
                            }
                        </tr>
                    </thead>

                    <tbody id="print-header-body-tbody-${index1}">
                        ${obj1.item_data.reduce((dom_string, item1) => dom_string += `<tr class="print-tbody-setting">
                            ${table_setting.reduce((dom_string, item2) => dom_string += `<td>${item1[item2.schema]}</td>`, "")}
                        </tr>`, "")}
                    </tbody>
                </table>
            </div>
        `;
    });

    return dom_string;
}
```

## 核心原理

- 位於渲染框架頂層的 `page-break-after: always;` CSS 參數即為本次關鍵，該參數明確定義在列印時，位於該層 DOM 元素之後的內容全部移往下一格，也因此放進每張表頭時，便能讓表頭表頭之間分屬不同分頁
- 在者因為列印時 `<thead>` 的特性，在內容過長時， `<thead>` 會完整保留移往下一個分頁上，這裡便使用此特性，將整個表頭內容全部放進 `<thead>` ，即可動態的讓不特定內容在列印時，都處於每個分頁的表頭內。

## 參考文獻

[@page - CSS：层叠样式表 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@page)

[原來前端網頁列印，不是只要 window.print() 就好了](https://medium.com/unalai/原來前端網頁列印-不是只要-window-print-就好了-7af44cacf43e)

## 寫在後面

- 這是我第一次嘗試在 gitbu 上分享東西，事情的起因是小組內需要這樣的列印功能，但查找的可行方案好像都沒法很好的支援動態表頭內容，最後靈機一動想到原生 `<thead>` 的分頁顯示特性，這才有了這個小工具，也順便練習怎麼寫 JSDoc 的註解。
- 雖然最初立項只是完成小組的需求而已，無法完美契合其他工況，但關鍵還是核心邏輯的使用，所以就當拋磚引玉吧，若使用上有所不便，還請多多包涵。