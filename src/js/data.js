
(function(Data, $) {
   Data.getAllClaims = async (onComplete = (response = {}) => { }) => {
      const data = await Util.ajaxGet("php/request.php", {type: "allClaims", params: []});
      onComplete(data.data);
   }
}(window.Data = window.Data || {}, jQuery));