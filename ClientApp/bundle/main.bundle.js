System.register("widgets/base.widget.js", [], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      class WidgetConfig {}

      _export("WidgetConfig", WidgetConfig);

      class Widget {}

      _export("Widget", Widget);
    }
  };
});
System.register("app/importTest.js", [], function (_export, _context) {
    "use strict";

    function multiply(a, b) {
        return a * b;
    }

    _export("default", multiply);

    return {
        setters: [],
        execute: function () {}
    };
});
System.register('app/app.module.js', ['widgets/base.widget', 'app/importTest'], function (_export, _context) {
  "use strict";

  var WidgetConfig, multiply;
  return {
    setters: [function (_widgetsBaseWidget) {
      WidgetConfig = _widgetsBaseWidget.WidgetConfig;
    }, function (_appImportTest) {
      multiply = _appImportTest.multiply;
    }],
    execute: function () {
      debugger;
      //console.log(multiply(2, 3)); // => 2 * 3 = 6

      console.log('test');
    }
  };
});
//# sourceMappingURL=main.bundle.js.map