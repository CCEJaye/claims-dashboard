(function (Generate, $) {
    Generate.selectOptions = (list = []) => {
        let str = "";
        for (let i = 0; i < list.length; i++) {
            str += "<option>"+list[i]+"</option>";
        }
        return str;
    }
}(window.Generate = window.Generate || {}, jQuery));