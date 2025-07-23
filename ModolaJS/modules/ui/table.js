const MODULA_STD_TABLE = "modula-std-table";
const MODULA_STD_TABLE_TR = "modula-std-table-tr";
const MODULA_STD_TABLE_TH = "modula-std-table-th";
const MODULA_STD_TABLE_TD = "modula-std-table-td";

Modola.ui.createTable = (cols, rows, config = {}) => {
    let header = M("tr", {}, cols.map(col => {
        let th = M("th", { text: col });
        th.classList.add(MODULA_STD_TABLE_TH);
        return th;
    }));
    header.classList.add(MODULA_STD_TABLE_TR);

    let body = rows.map(row => {
        let tr = M("tr", {}, cols.map(col => {
            let td = M("td", { text: row[col] });
            td.classList.add(MODULA_STD_TABLE_TD);
            return td;
        }))
        tr.classList.add(MODULA_STD_TABLE_TR);
        return tr;
    });

    let table = M("table", config, [header, ...body]);
    table.classList.add(MODULA_STD_TABLE);
    return table;
};