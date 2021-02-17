
(function(Data, $) {
   Data.getAll = (onComplete = (response = {}) => { }) => {
      const data = await Util.ajaxGet("php/request.php", {});
      onComplete(data);
   }
}(window.Data = window.Data || {}, jQuery));