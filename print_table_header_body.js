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