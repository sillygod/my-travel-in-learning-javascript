(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _componentsSearchableTable = require('./components/SearchableTable');

var _componentsSearchableTable2 = _interopRequireDefault(_componentsSearchableTable);

var _componentsData = require('./components/data');

// Filterable CheatSheet Component
_react2['default'].render(_react2['default'].createElement(_componentsSearchableTable2['default'], { data: _componentsData.data }), document.getElementById('searchableTable'));

},{"./components/SearchableTable":2,"./components/data":3,"react":"react"}],2:[function(require,module,exports){
/*
*   Searchable Table
*   Author: Jean-Pierre Sierens
*   ===========================================================================
*/

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var SearchableTable = (function (_React$Component) {
    _inherits(SearchableTable, _React$Component);

    function SearchableTable() {
        _classCallCheck(this, SearchableTable);

        _get(Object.getPrototypeOf(SearchableTable.prototype), 'constructor', this).call(this);
        // Initial state of the component
        this.state = { filterText: '' };
    }

    _createClass(SearchableTable, [{
        key: 'handleUserInput',
        value: function handleUserInput(filterText) {
            // When there's a change in the state, the component and all its
            // sub-components get updated.
            this.setState({ filterText: filterText });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2['default'].createElement(
                'div',
                null,
                _react2['default'].createElement(SearchBar, {
                    filterText: this.state.filterText,
                    onUserInput: this.handleUserInput.bind(this)
                }),
                _react2['default'].createElement(Table, {
                    data: this.props.data,
                    filterText: this.state.filterText
                })
            );
        }
    }]);

    return SearchableTable;
})(_react2['default'].Component);

exports['default'] = SearchableTable;

var SearchBar = (function (_React$Component2) {
    _inherits(SearchBar, _React$Component2);

    function SearchBar() {
        _classCallCheck(this, SearchBar);

        _get(Object.getPrototypeOf(SearchBar.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(SearchBar, [{
        key: 'handleChange',
        value: function handleChange() {
            // passing filter data up by using a callback
            this.props.onUserInput(
            // ref is like the id
            this.refs.filterTextInput.getDOMNode().value);
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2['default'].createElement(
                'form',
                null,
                _react2['default'].createElement('input', {
                    type: 'text',
                    placeholder: 'Search for one keyword...',
                    ref: 'filterTextInput',
                    value: this.props.filterText,
                    onChange: this.handleChange.bind(this)
                })
            );
        }
    }]);

    return SearchBar;
})(_react2['default'].Component);

var Table = (function (_React$Component3) {
    _inherits(Table, _React$Component3);

    function Table() {
        _classCallCheck(this, Table);

        _get(Object.getPrototypeOf(Table.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Table, [{
        key: 'render',
        value: function render() {
            var sections = [];
            var data = this.props.data;
            data.forEach((function (product) {
                if (product.name.indexOf(this.props.filterText) === -1) {
                    return;
                }
                sections.push(_react2['default'].createElement(Section, { data: product }));
            }).bind(this));
            return _react2['default'].createElement(
                'div',
                null,
                sections
            );
        }
    }]);

    return Table;
})(_react2['default'].Component);

var Section = (function (_React$Component4) {
    _inherits(Section, _React$Component4);

    function Section() {
        _classCallCheck(this, Section);

        _get(Object.getPrototypeOf(Section.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(Section, [{
        key: 'render',
        value: function render() {
            return _react2['default'].createElement(
                'div',
                null,
                _react2['default'].createElement(
                    'p',
                    null,
                    this.props.data.name,
                    ' = ',
                    this.props.data.price,
                    ' '
                )
            );
        }
    }]);

    return Section;
})(_react2['default'].Component);

module.exports = exports['default'];

},{"react":"react"}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var data = [{ category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football" }, { category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball" }, { category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball" }, { category: "Electronics", price: "$49.99", stocked: true, name: "Football" }, { category: "Electronics", price: "$49.99", stocked: true, name: "Football" }, { category: "Electronics", price: "$49.99", stocked: true, name: "Football" }];
exports.data = data;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9qaW5nL0Rlc2t0b3AvcHJhY3RpY2UvZXM2cmVhY3QvYXBwLmpzIiwiL2hvbWUvamluZy9EZXNrdG9wL3ByYWN0aWNlL2VzNnJlYWN0L2NvbXBvbmVudHMvU2VhcmNoYWJsZVRhYmxlLmpzIiwiL2hvbWUvamluZy9EZXNrdG9wL3ByYWN0aWNlL2VzNnJlYWN0L2NvbXBvbmVudHMvZGF0YS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7cUJDQWtCLE9BQU87Ozs7eUNBQ0csOEJBQThCOzs7OzhCQUN2QyxtQkFBbUI7OztBQUd0QyxtQkFBTSxNQUFNLENBQUMsMkVBQWlCLElBQUksc0JBQU8sR0FBRyxFQUN4QyxRQUFRLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztxQkNBOUIsT0FBTzs7OztJQUVKLGVBQWU7Y0FBZixlQUFlOztBQUNyQixhQURNLGVBQWUsR0FDbEI7OEJBREcsZUFBZTs7QUFFNUIsbUNBRmEsZUFBZSw2Q0FFcEI7O0FBRVIsWUFBSSxDQUFDLEtBQUssR0FBRyxFQUFDLFVBQVUsRUFBRSxFQUFFLEVBQUMsQ0FBQTtLQUNoQzs7aUJBTGdCLGVBQWU7O2VBTWpCLHlCQUFDLFVBQVUsRUFBRTs7O0FBR3hCLGdCQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsVUFBVSxFQUFFLFVBQVUsRUFBQyxDQUFDLENBQUM7U0FDM0M7OztlQUNLLGtCQUFFO0FBQ0osbUJBQ0k7OztnQkFDSSxpQ0FBQyxTQUFTO0FBQ04sOEJBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQUFBQztBQUNsQywrQkFBVyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxBQUFDO2tCQUMvQztnQkFDRixpQ0FBQyxLQUFLO0FBQ0Ysd0JBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQUFBQztBQUN0Qiw4QkFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxBQUFDO2tCQUNwQzthQUNBLENBQ1I7U0FDTDs7O1dBeEJnQixlQUFlO0dBQVMsbUJBQU0sU0FBUzs7cUJBQXZDLGVBQWU7O0lBMkI5QixTQUFTO2NBQVQsU0FBUzs7YUFBVCxTQUFTOzhCQUFULFNBQVM7O21DQUFULFNBQVM7OztpQkFBVCxTQUFTOztlQUNDLHdCQUFHOztBQUVYLGdCQUFJLENBQUMsS0FBSyxDQUFDLFdBQVc7O0FBRWxCLGdCQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLLENBQy9DLENBQUM7U0FDTDs7O2VBQ0ssa0JBQUU7QUFDSixtQkFDSTs7O2dCQUNJO0FBQ0ksd0JBQUksRUFBQyxNQUFNO0FBQ1gsK0JBQVcsRUFBQywyQkFBMkI7QUFDdkMsdUJBQUcsRUFBQyxpQkFBaUI7QUFDckIseUJBQUssRUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQUFBQztBQUM5Qiw0QkFBUSxFQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxBQUFDO2tCQUMxQzthQUNDLENBQ1Q7U0FDTDs7O1dBcEJDLFNBQVM7R0FBUyxtQkFBTSxTQUFTOztJQXVCakMsS0FBSztjQUFMLEtBQUs7O2FBQUwsS0FBSzs4QkFBTCxLQUFLOzttQ0FBTCxLQUFLOzs7aUJBQUwsS0FBSzs7ZUFDRCxrQkFBRTtBQUNKLGdCQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDbEIsZ0JBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO0FBQzNCLGdCQUFJLENBQUMsT0FBTyxDQUFDLENBQUEsVUFBUyxPQUFPLEVBQUM7QUFDMUIsb0JBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtBQUNwRCwyQkFBTztpQkFDVjtBQUNELHdCQUFRLENBQUMsSUFBSSxDQUFDLGlDQUFDLE9BQU8sSUFBQyxJQUFJLEVBQUUsT0FBTyxBQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzdDLENBQUEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtBQUNiLG1CQUNJOzs7Z0JBQU0sUUFBUTthQUFPLENBQ3ZCO1NBQ0w7OztXQWJDLEtBQUs7R0FBUyxtQkFBTSxTQUFTOztJQWdCN0IsT0FBTztjQUFQLE9BQU87O2FBQVAsT0FBTzs4QkFBUCxPQUFPOzttQ0FBUCxPQUFPOzs7aUJBQVAsT0FBTzs7ZUFDSCxrQkFBRTtBQUNKLG1CQUNJOzs7Z0JBQ0k7OztvQkFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJOztvQkFBSyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLOztpQkFBTTthQUN0RCxDQUNSO1NBQ0w7OztXQVBDLE9BQU87R0FBUyxtQkFBTSxTQUFTOzs7Ozs7Ozs7O0FDMUU5QixJQUFNLElBQUksR0FBRyxDQUNoQixFQUFDLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLEVBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBQyxFQUM3RSxFQUFDLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBQyxFQUM1RSxFQUFDLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLEVBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBQyxFQUNoRixFQUFDLFFBQVEsRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUMsRUFDMUUsRUFBQyxRQUFRLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFDLEVBQzFFLEVBQUMsUUFBUSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBQyxDQUM3RSxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgU2VhcmNoYWJsZVRhYmxlIGZyb20gJy4vY29tcG9uZW50cy9TZWFyY2hhYmxlVGFibGUnO1xuaW1wb3J0IHtkYXRhfSBmcm9tICcuL2NvbXBvbmVudHMvZGF0YSc7XG5cbi8vIEZpbHRlcmFibGUgQ2hlYXRTaGVldCBDb21wb25lbnRcblJlYWN0LnJlbmRlcig8U2VhcmNoYWJsZVRhYmxlIGRhdGE9e2RhdGF9IC8+LFxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWFyY2hhYmxlVGFibGUnKSk7IiwiLypcbiogICBTZWFyY2hhYmxlIFRhYmxlXG4qICAgQXV0aG9yOiBKZWFuLVBpZXJyZSBTaWVyZW5zXG4qICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4qL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZWFyY2hhYmxlVGFibGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICAvLyBJbml0aWFsIHN0YXRlIG9mIHRoZSBjb21wb25lbnRcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtmaWx0ZXJUZXh0OiAnJ31cbiAgICB9XG4gICAgaGFuZGxlVXNlcklucHV0KGZpbHRlclRleHQpIHtcbiAgICAgICAgLy8gV2hlbiB0aGVyZSdzIGEgY2hhbmdlIGluIHRoZSBzdGF0ZSwgdGhlIGNvbXBvbmVudCBhbmQgYWxsIGl0c1xuICAgICAgICAvLyBzdWItY29tcG9uZW50cyBnZXQgdXBkYXRlZC5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZmlsdGVyVGV4dDogZmlsdGVyVGV4dH0pO1xuICAgIH1cbiAgICByZW5kZXIoKXtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPFNlYXJjaEJhclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJUZXh0PXt0aGlzLnN0YXRlLmZpbHRlclRleHR9XG4gICAgICAgICAgICAgICAgICAgIG9uVXNlcklucHV0PXt0aGlzLmhhbmRsZVVzZXJJbnB1dC5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPFRhYmxlXG4gICAgICAgICAgICAgICAgICAgIGRhdGE9e3RoaXMucHJvcHMuZGF0YX1cbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyVGV4dD17dGhpcy5zdGF0ZS5maWx0ZXJUZXh0fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNsYXNzIFNlYXJjaEJhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgaGFuZGxlQ2hhbmdlKCkge1xuICAgICAgICAvLyBwYXNzaW5nIGZpbHRlciBkYXRhIHVwIGJ5IHVzaW5nIGEgY2FsbGJhY2tcbiAgICAgICAgdGhpcy5wcm9wcy5vblVzZXJJbnB1dChcbiAgICAgICAgICAgIC8vIHJlZiBpcyBsaWtlIHRoZSBpZFxuICAgICAgICAgICAgdGhpcy5yZWZzLmZpbHRlclRleHRJbnB1dC5nZXRET01Ob2RlKCkudmFsdWVcbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Zm9ybT5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaCBmb3Igb25lIGtleXdvcmQuLi5cIlxuICAgICAgICAgICAgICAgICAgICByZWY9XCJmaWx0ZXJUZXh0SW5wdXRcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT0ge3RoaXMucHJvcHMuZmlsdGVyVGV4dH1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9IHt0aGlzLmhhbmRsZUNoYW5nZS5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jbGFzcyBUYWJsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGxldCBzZWN0aW9ucyA9IFtdO1xuICAgICAgICBsZXQgZGF0YSA9IHRoaXMucHJvcHMuZGF0YTtcbiAgICAgICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKHByb2R1Y3Qpe1xuICAgICAgICAgICAgaWYgKHByb2R1Y3QubmFtZS5pbmRleE9mKHRoaXMucHJvcHMuZmlsdGVyVGV4dCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VjdGlvbnMucHVzaCg8U2VjdGlvbiBkYXRhPXtwcm9kdWN0fSAvPik7XG4gICAgICAgIH0uYmluZCh0aGlzKSlcbiAgICAgICAgcmV0dXJuKFxuICAgICAgICAgICAgPGRpdj57c2VjdGlvbnN9PC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5jbGFzcyBTZWN0aW9uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICByZW5kZXIoKXtcbiAgICAgICAgcmV0dXJuKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8cD57dGhpcy5wcm9wcy5kYXRhLm5hbWV9ID0ge3RoaXMucHJvcHMuZGF0YS5wcmljZX0gPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGNvbnN0IGRhdGEgPSBbXG4gICAge2NhdGVnb3J5OiBcIlNwb3J0aW5nIEdvb2RzXCIsIHByaWNlOlwiJDQ5Ljk5XCIsIHN0b2NrZWQ6IHRydWUsIG5hbWU6IFwiRm9vdGJhbGxcIn0sXG4gICAge2NhdGVnb3J5OiBcIlNwb3J0aW5nIEdvb2RzXCIsIHByaWNlOlwiJDkuOTlcIiwgc3RvY2tlZDogdHJ1ZSwgbmFtZTogXCJCYXNlYmFsbFwifSxcbiAgICB7Y2F0ZWdvcnk6IFwiU3BvcnRpbmcgR29vZHNcIiwgcHJpY2U6XCIkMjkuOTlcIiwgc3RvY2tlZDogZmFsc2UsIG5hbWU6IFwiQmFza2V0YmFsbFwifSxcbiAgICB7Y2F0ZWdvcnk6IFwiRWxlY3Ryb25pY3NcIiwgcHJpY2U6XCIkNDkuOTlcIiwgc3RvY2tlZDogdHJ1ZSwgbmFtZTogXCJGb290YmFsbFwifSxcbiAgICB7Y2F0ZWdvcnk6IFwiRWxlY3Ryb25pY3NcIiwgcHJpY2U6XCIkNDkuOTlcIiwgc3RvY2tlZDogdHJ1ZSwgbmFtZTogXCJGb290YmFsbFwifSxcbiAgICB7Y2F0ZWdvcnk6IFwiRWxlY3Ryb25pY3NcIiwgcHJpY2U6XCIkNDkuOTlcIiwgc3RvY2tlZDogdHJ1ZSwgbmFtZTogXCJGb290YmFsbFwifSxcbl07Il19
