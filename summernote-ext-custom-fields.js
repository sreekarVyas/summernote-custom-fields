/**
 *
 * copyright 2024 Caliber Technologies Pvt. Ltd..
 * email: mustafa.mr@caliberuniversal.com;chandra.lk@caliberuniversal.com;sreekar.va@caliberuniversal.com
 * license: Proprietary
 *
 */
(function (factory) {
  /* Global define */
  if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define(["jquery"], factory);
  } else if (typeof module === "object" && module.exports) {
    // Node/CommonJS
    module.exports = factory(require("jquery"));
  } else {
    // Browser globals
    factory(window.jQuery);
  }
})(function ($) {
  /**
   * @class plugin.customFields
   *
   * example Plugin
   */
  $.extend($.summernote.plugins, {
    customFields: function (context) {
      var self = this;
      var ui = $.summernote.ui;
      var $editor = context.layoutInfo.editor;

      // Text Field
      context.memo("button.text-field", function () {
        var button = ui.button({
          contents: '<i class="note-icon-pencil"/> Text Field',
          tooltip: "Text Field",
          click: function () {
            context.invoke("saveRange");
            var $dialog = ui
              .dialog({
                title: "Add Text Field",
                body:
                  '<div class="row mb-3">' +
                  '<label for="text-field-name" class="col-sm-2 col-form-label">Name: </label>' +
                  '<div class="col-sm-10">' +
                  '<input type="text" id="text-field-name" class="form-control form-control-sm">' +
                  "</div>" +
                  "</div>",
                footer: '<button id="ok" class="btn btn-primary">Ok</button>',
              })
              .render()
              .appendTo($editor);

            $dialog.find("button#ok").on("click", function (event) {
              event.preventDefault();
              context.invoke("restoreRange");
              context.invoke(
                "editor.insertNode",
                $("<input>", {
                  type: "text",
                  class: "custom-field custom-field-text-field",
                  name: $dialog.find("#text-field-name").val(),
                })[0]
              );
              ui.hideDialog($dialog);
            });

            ui.onDialogHidden($dialog, function () {
              $dialog.remove();
            });

            ui.showDialog($dialog);
          },
        });
        return button.render();
      });

      // Text Area
      context.memo("button.text-area", function () {
        var button = ui.button({
          contents: '<i class="note-icon-pencil"/> Text Area',
          tooltip: "Text Area",
          click: function () {
            context.invoke("saveRange");
            var $dialog = ui
              .dialog({
                title: "Add Text Area",
                body:
                  '<div class="row mb-3">' +
                  '<label for="text-area-name" class="col-sm-2 col-form-label">Name: </label>' +
                  '<div class="col-sm-10">' +
                  '<input type="text" id="text-area-name" class="form-control form-control-sm">' +
                  "</div>" +
                  "</div>",
                footer: '<button id="ok" class="btn btn-primary">Ok</button>',
              })
              .render()
              .appendTo($editor);

            $dialog.find("button#ok").on("click", function (event) {
              event.preventDefault();
              context.invoke("restoreRange");
              context.invoke(
                "editor.insertNode",
                $("<textarea>", {
                  class: "custom-field custom-field-text-area",
                  name: $dialog.find("#text-area-name").val(),
                })[0]
              );
              ui.hideDialog($dialog);
            });

            ui.onDialogHidden($dialog, function () {
              $dialog.remove();
            });

            ui.showDialog($dialog);
          },
        });

        return button.render();
      });

      // Radio Button Group
      context.memo("button.radio-button-group", function () {
        var button = ui.button({
          contents: '<i class="note-icon-circle"/> Radio Button Group',
          tooltip: "Radio Button Group",
          click: function () {
            context.invoke("saveRange");
            var $dialog = ui
              .dialog({
                title: "Add Radio Button Group",
                body:
                  '<div class="row mb-3">' +
                  '<label for="radio-button-group-name" class="col-sm-4 col-form-label">Name: </label>' +
                  '<div class="col-sm-8">' +
                  '<input type="text" id="radio-button-group-name" class="form-control form-control-sm">' +
                  "</div>" +
                  "</div>" +
                  '<div class="row mb-3">' +
                  '<label for="no-of-options" class="col-sm-4 col-form-label">No. of Options: </label>' +
                  '<div class="col-sm-8">' +
                  '<input type="number" id="no-of-options" class="form-control form-control-sm">' +
                  "</div>" +
                  "</div>" +
                  '<div id="options-set"></div>',
                footer: '<button id="ok" class="btn btn-primary">Ok</button>',
              })
              .render()
              .appendTo($editor);

            $dialog.find("#no-of-options").on("change", function () {
              $dialog.find("#options-set").html(function () {
                var noOfOptions = $dialog.find("#no-of-options").val();
                var html = "";
                for (var i = 0; i < noOfOptions; i++) {
                  html +=
                    '<div class="row mb-3">' +
                    '<div class="col-auto">' +
                    '<span class="form-text">Option ' +
                    (i + 1) +
                    "</span>" +
                    "</div>" +
                    '<div class="col-auto">' +
                    '<label for="option-' +
                    (i + 1) +
                    '-label" class="col-form-label">Label</label>' +
                    "</div>" +
                    '<div class="col-sm-3">' +
                    '<input type="text" id="option-' +
                    (i + 1) +
                    '-label" class="form-control form-control-sm">' +
                    "</div>" +
                    '<div class="col-auto">' +
                    '<label for="option-' +
                    (i + 1) +
                    '-value" class="col-form-label">Value</label>' +
                    "</div>" +
                    '<div class="col-sm-3">' +
                    '<input type="text" id="option-' +
                    (i + 1) +
                    '-value" class="form-control form-control-sm">' +
                    "</div>" +
                    "</div>";
                }
                return html;
              });
            });

            $dialog.find("button#ok").on("click", function (event) {
              event.preventDefault();
              context.invoke("restoreRange");
              var noOfOptions = $dialog.find("#no-of-options").val();
              for (var i = 0; i < noOfOptions; i++) {
                context.invoke(
                  "editor.insertNode",
                  $("<label>", {
                    for: $dialog.find("#option-" + (i + 1)).val(),
                    html: $dialog.find("#option-" + (i + 1) + "-label").val(),
                  })[0]
                );
                context.invoke(
                  "editor.insertNode",
                  $("<input>", {
                    type: "radio",
                    id: $dialog.find("#option-" + (i + 1)).val(),
                    class: "custom-field custom-field-radio-button",
                    name: $dialog.find("#radio-button-group-name").val(),
                    value: $dialog.find("#option-" + (i + 1) + "-value").val(),
                  })[0]
                );
                context.invoke("editor.insertNode", $("<br>")[0]);
              }
              ui.hideDialog($dialog);
            });

            ui.onDialogHidden($dialog, function () {
              $dialog.remove();
            });

            ui.showDialog($dialog);
          },
        });

        return button.render();
      });

      context.memo("button.checkboxes", function () {
        var button = ui.button({
          contents: '<i class="note-icon-square"/> Checkboxes',
          tooltip: "Checkboxes",
          click: function () {
            context.invoke("saveRange");
            var $dialog = ui
              .dialog({
                title: "Add Checkboxes",
                body:
                  '<div class="row mb-3">' +
                  '<label for="checkboxes-group-name" class="col-sm-4 col-form-label">Name: </label>' +
                  '<div class="col-sm-8">' +
                  '<input type="text" id="checkboxes-group-name" class="form-control form-control-sm">' +
                  "</div>" +
                  "</div>" +
                  '<div class="row mb-3">' +
                  '<label for="no-of-options" class="col-sm-4 col-form-label">No. of Options: </label>' +
                  '<div class="col-sm-8">' +
                  '<input type="number" id="no-of-options" class="form-control form-control-sm">' +
                  "</div>" +
                  "</div>" +
                  '<div id="options-set"></div>',
                footer: '<button id="ok" class="btn btn-primary">Ok</button>',
              })
              .render()
              .appendTo($editor);

            $dialog.find("#no-of-options").on("change", function () {
              $dialog.find("#options-set").html(function () {
                var noOfOptions = $dialog.find("#no-of-options").val();
                var html = "";
                for (var i = 0; i < noOfOptions; i++) {
                  html +=
                    '<div class="row mb-3">' +
                    '<div class="col-auto">' +
                    '<span class="form-text">Option ' +
                    (i + 1) +
                    "</span>" +
                    "</div>" +
                    '<div class="col-auto">' +
                    '<label for="option-' +
                    (i + 1) +
                    '-check-parameter" class="col-form-label">Check Parameter</label>' +
                    "</div>" +
                    '<div class="col-sm-3">' +
                    '<input type="text" id="option-' +
                    (i + 1) +
                    '-check-parameter" class="form-control form-control-sm">' +
                    "</div>" +
                    "</div>";
                }
                return html;
              });
            });

            $dialog.find("button#ok").on("click", function (event) {
              event.preventDefault();
              context.invoke("restoreRange");
              var noOfOptions = $dialog.find("#no-of-options").val();
              var currentName = $dialog.find("#checkboxes-group-name").val();
              for (var i = 0; i < noOfOptions; i++) {
                context.invoke(
                  "editor.insertNode",
                  $("<label>", {
                    for: $dialog.find("#option-" + (i + 1)).val(),
                    html: $dialog
                      .find("#option-" + (i + 1) + "-check-parameter")
                      .val(),
                  })[0]
                );
                context.invoke(
                  "editor.insertNode",
                  $("<input>", {
                    type: "checkbox",
                    id: $dialog.find("#option-" + (i + 1)).val(),
                    class: "custom-field custom-field-checkboxes",
                    name: $dialog.find("#checkboxes-group-name").val(),
                    value: $dialog.find("#option-" + (i + 1) + "-check-parameter").val(),
                  })[0]
                );
                context.invoke("editor.insertNode", $("<br>")[0]);
              }
              ui.hideDialog($dialog);
            });
            ui.onDialogHidden($dialog, function () {
              $dialog.remove();
            });

            ui.showDialog($dialog);
          },
        });
        return button.render();
      });
    },
  });
});
