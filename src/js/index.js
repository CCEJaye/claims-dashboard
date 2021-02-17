$(window).on("load", () => {
    Comps.setLoading();
    Comps.init();
    Comps.updateSelect("#selBlameType", ["<option>All Types</option>"], ["All Types"]);
    Comps.updateSelect("#selScheme", ["<option>Arch RE DL2 Scheme</option>"], ["Arch RE DL2 Scheme"]);
    Comps.updateSelect("#selPeriod", [
      "<option>October 2020</option>",
      "<option>November 2020</option>",
      "<option>December 2020</option>",
      "<option>January 2021</option>",
      "<option>February 2021</option>",
      "<option>March 2021</option>"
   ], 
   ["October 2020"]);
});