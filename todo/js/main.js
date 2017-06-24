var Storage = require('./my-storage');
var $ = require('jquery');
var Sortable = require('sortablejs');

$(function () {
    var db = new Storage("localStorage");
    var node = db.getCollection('node-order');

    if (node.length > 0) {

        var $node = $('#node');
        var note = [];
        for (var index = 0; index < node.length; index++) {
            note = db.getItem(node[index]);
            var $note = $('<li id=' + node[index] + '>');
            var $span = $('<span>x</span>');

            $note.text(note.text);
            $span.addClass("close");
            $note.appendTo($node);
            $note.append($span);
        }
    }

    $("li").mousedown(function () {
        var el = document.getElementById('node');
        var sortable = Sortable.create(el, {
            store: {
                /**
                 * Get the order of elements. Called once during initialization.
                 * @param   {Sortable}  sortable
                 * @returns {Array}
                 */
                get: function (sortable) {
                    var order = localStorage.getItem("node-order");
                    return order ? order.split('|') : [];
                },

                /**
                 * Save the order of elements. Called onEnd (when the item is dropped).
                 * @param {Sortable}  sortable
                 */
                set: function (sortable) {
                    var nodes = sortable["el"]["childNodes"];
                    var order = [];
                    for (var index = 0; index < nodes.length; index++) {
                        var node = nodes[index]["id"];
                        order.push(node);
                    }
                    localStorage.setItem("node-order", JSON.stringify(order));
                }
            }
        });
    });

    $("#add").click(function () {
        var note = {
            text: $('#input').val()
        };
        db.insert('node-order', note);
        var $node = $('#node');
        var $note = $('<li>');
        var $span = $('<span>x</span>');
        $note.text(note.text);
        $span.addClass("close");
        $span.append($note);
        $note.appendTo($node);
        $note.append($span);
        location.reload();
    });
    $("span").click(function () {
        var $li = $(this).parents("li").attr('id');
        db.delete($li);
        localStorage.removeItem($li);
        location.reload();
    });
});